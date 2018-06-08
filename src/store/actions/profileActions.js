import validate from 'validate.js';
import {
  GET_ERRORS,
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE
} from './types';
import { auth, db } from '../../firebase';

// Profile loading
export const setProfileLoading = () => ({
  type: PROFILE_LOADING
});

// Get current profile
export const getProfiles = () => dispatch => {
  dispatch(setProfileLoading());

  db.doGetProfiles()
    .then(snapshot => {
      if (!snapshot.empty) {
        const profiles = snapshot.docs.map(profile => profile.data());
        dispatch({
          type: GET_PROFILES,
          profiles
        });
      } else {
        console.log('No profiles found.');
        dispatch({
          type: GET_PROFILES,
          profiles: []
        });
      }
    })
    .catch(err => console.log(err));
};

// Get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());

  const userId = auth.currentUser().uid;

  db.doGetProfileByUser(userId)
    .then(snapshot => {
      if (!snapshot.empty) {
        const profile = snapshot.docs[0].data();
        dispatch({
          type: GET_PROFILE,
          profile
        });
      } else {
        console.log('No profile found.');
        dispatch({
          type: GET_PROFILE,
          profile: null
        });
      }
    })
    .catch(err => console.log(err));
};

// Get profile by handle
export const getProfileByHandle = handle => dispatch => {
  dispatch(setProfileLoading());

  db.doGetProfileByHandle(handle)
    .then(profile => {
      dispatch({
        type: GET_PROFILE,
        profile: profile.data()
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_PROFILE,
        profile: null
      });
    });
  // doGetProfileByHandle(handle)
  //   .then(snapshot => {
  //     if (!snapshot.empty) {
  //       const profile = snapshot.docs[0].data();
  //       dispatch({
  //         type: GET_PROFILE,
  //         profile
  //       });
  //     } else {
  //       dispatch({
  //         type: GET_PROFILE,
  //         profile: null
  //       });
  //     }
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   });
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

  // Check for user input errors
  let errors;
  errors = validate(profileData, constraints);
  console.log(errors);
  if (errors) {
    dispatch({
      type: GET_ERRORS,
      payload: errors
    });
    return;
  }
  // Attempt to get profileRef by handle
  db.doGetProfileByHandle(profileData.handle).then(profile => {
    console.log(profile.exists);
    // If profile exists => error - handle must be unique
    if (profile.exists) {
      console.log('handle already taken');
      errors = { handle: ['handle already taken'] };
      if (errors) {
        dispatch({
          type: GET_ERRORS,
          payload: errors
        });
      }
    } else {
      // Else, create Profile with handle as ID
      db.doCreateProfile(profileData)
        .then(() => {
          history.push('/dashboard');
        })
        .catch(err => {
          console.log(err);
          dispatch({
            type: GET_ERRORS,
            payload: err
          });
        });
    }
  });
};

// Clear current profile
export const clearCurrentProfile = () => ({
  type: CLEAR_CURRENT_PROFILE
});
