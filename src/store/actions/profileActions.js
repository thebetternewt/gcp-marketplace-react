import validate from 'validate.js';
import { GET_ERRORS, GET_PROFILE, PROFILE_LOADING } from './types';
import { auth, db } from '../../firebase';
import { doGetProfile, doGetProfileByHandle } from '../../firebase/db';

// Profile loading
export const setProfileLoading = () => ({
  type: PROFILE_LOADING
});

// Get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());

  const userId = auth.currentUser().uid;
  doGetProfile(userId)
    .then(snapshot => {
      const profile = snapshot.docs[0].data();
      console.log(profile);
      dispatch({
        type: GET_PROFILE,
        profile
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_PROFILE,
        payload: {}
      });
    });
};

// Get profile by handle
export const getProfileByHandle = handle => dispatch => {
  dispatch(setProfileLoading());

  doGetProfileByHandle(handle)
    .then(snapshot => {
      const profile = snapshot.docs[0].data();
      dispatch({
        type: GET_PROFILE,
        profile
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_PROFILE,
        payload: {}
      });
    });
};

// Create profile
export const createProfile = (profileData, history) => dispatch => {
  dispatch(setProfileLoading());
  console.log(profileData);
  const constraints = {
    handle: {
      presence: { allowEmpty: false },
      length: { minimum: 3, maximum: 100 }
    },
    bio: {
      presence: { allowEmpty: false },
      length: { maximum: 300 }
    }
  };

  const errors = validate(profileData, constraints);
  console.log(errors);
  if (errors) {
    dispatch({
      type: GET_ERRORS,
      payload: errors
    });
  } else {
    console.log('no errors');

    db.doCreateProfile(profileData).then(() => {
      history.push('/dashboard');
    });
  }
};

// Clear current profile
// export const clearCurrentProfile = () => {
//   return {
//     type: CLEAR_CURRENT_PROFILE
//   };
// };
