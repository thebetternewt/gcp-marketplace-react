import { auth } from '../../firebase';

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

  // Register new user
  auth
    .doCreateUserWithEmailAndPassword(email, password)
    .then(res => {
      const { user } = res;

      user
        .updateProfile({ displayName: name })
        .then(res => console.log(res))
        .catch(err => console.log(err));

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
  dispatch({
    type: SET_CURRENT_USER,
    user
  });
};

export const checkAuthTimeout = expTime => dispatch => {
  // Log user out after given expTime period (ms)
  setTimeout(() => {
    dispatch(logoutUser());
  }, expTime);
};
