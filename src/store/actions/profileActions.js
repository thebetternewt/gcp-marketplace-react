import validate from 'validate.js';
import {
  GET_ERRORS,
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  DELETE_PROFILE
} from './types';
import { auth, db } from '../../firebase';
import { setCurrentUser } from './authActions';

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
    .then(snap => {
      if (!snap.empty) {
        const profile = snap.docs[0].data();
        dispatch({
          type: GET_PROFILE,
          profile
        });
      } else {
        dispatch({
          type: GET_PROFILE,
          profile: null
        });
      }
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_PROFILE,
        profile: null
      });
    });
};

// Create profile
export const createProfile = (profileData, history) => async dispatch => {
  dispatch(setProfileLoading());

  let errors;
  // Check for user input errors
  errors = validateProfileData(profileData);
  console.log(errors);
  if (errors) {
    dispatch({
      type: GET_ERRORS,
      payload: errors
    });
    return;
  }
  // Attempt to get profile by handle
  const snap = await db.doGetProfileByHandle(profileData.handle);
  if (!snap.empty) {
    // If profile exists => error - handle must be unique
    console.log('handle already taken');
    errors = { handle: ['handle already taken'] };
    if (errors) {
      dispatch({
        type: GET_ERRORS,
        payload: errors
      });
    }
  } else {
    // Else, create Profile
    await db.doCreateProfile(profileData).catch(err => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err
      });
    });

    history.push('/dashboard');
  }
};

// Update Profile
export const updateProfile = (profileData, history) => async dispatch => {
  dispatch(setProfileLoading);

  let errors;

  // Check for user input errors
  errors = validateProfileData(profileData);
  if (errors) {
    dispatch({
      type: GET_ERRORS,
      payload: errors
    });
    return;
  }

  // Attempt to get profile by handle
  const snap = await db.doGetProfileByHandle(profileData.handle);
  // Check if profile exists and belongs to current user
  if (!snap.empty && snap.docs[0].data().user !== auth.currentUser().uid) {
    // If profile handle exists and not owned by current user => error - handle must be unique
    errors = { handle: ['handle already taken'] };
    if (errors) {
      dispatch({
        type: GET_ERRORS,
        payload: errors
      });
    }
  } else {
    // Else, update Profile
    await db.doUpdateProfile(profileData).catch(err => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err
      });
    });

    // Redirect to user dashboard
    history.push('/dashboard');
  }
};

// Delete profile
export const deleteAccount = () => dispatch => {
  db.doDeleteAccount();
  setCurrentUser();
  dispatch({
    type: DELETE_PROFILE
  });
};

// Clear current profile
export const clearCurrentProfile = () => ({
  type: CLEAR_CURRENT_PROFILE
});

// Validate profile data
const validateProfileData = profileData => {
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

  // Return any errors
  return validate(profileData, constraints);
};
