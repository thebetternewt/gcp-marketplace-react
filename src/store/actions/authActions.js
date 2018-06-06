import { auth, db } from '../../firebase';
import validate from 'validate.js';

import {
  GET_ERRORS,
  AUTH_BEGIN,
  AUTH_SUCCESS,
  AUTH_FAILED,
  AUTH_LOGOUT,
  SET_CURRENT_USER
} from './types';

// Register User
export const registerUser = (name, email, password) => dispatch => {
  dispatch({
    type: AUTH_BEGIN
  });

  // Set validation constraints for username
  const constraints = {
    name: {
      presence: { allowEmpty: false },
      length: { minimum: 3, maximum: 50 }
    }
  };

  // Check for errors
  const errors = validate({ name }, constraints, { format: 'flat' });
  // Terminate auth if error
  if (errors) {
    dispatch({
      type: GET_ERRORS,
      payload: { message: errors[0] }
    });
    dispatch({
      type: AUTH_FAILED
    });
  } else {
    // Register new user
    auth
      .doCreateUserWithEmailAndPassword(email, password)
      .then(res => {
        // Create user in Firestore
        db.doCreateUser(name, email).then(docRef => {
          console.log('User created with id: ', docRef.id);
          const user = { name, email };

          dispatch({
            type: AUTH_SUCCESS,
            user
          });
        });
      })
      .catch(err => {
        dispatch({
          type: GET_ERRORS,
          payload: err
        });
        dispatch({
          type: AUTH_FAILED
        });
      });
  }
};

// Login User
export const loginUser = (email, password) => dispatch => {
  dispatch({
    type: AUTH_BEGIN
  });

  auth
    .doSignInWithEmailAndPassword(email, password)
    .then(res => {
      const { user } = res;

      dispatch({
        type: AUTH_SUCCESS,
        user
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err
      });
      dispatch({
        type: AUTH_FAILED
      });
    });
};

// Logout user
export const logoutUser = () => {
  auth.doSignOut();
  return {
    type: AUTH_LOGOUT
  };
};

// Set current user
export const setCurrentUser = user => dispatch => {
  if (user) {
    dispatch({
      type: SET_CURRENT_USER,
      user
    });
  } else {
    logoutUser();
  }
};

export const checkAuthTimeout = expTime => dispatch => {
  // Log user out after given expTime period (ms)
  setTimeout(() => {
    dispatch(logoutUser());
  }, expTime);
};
