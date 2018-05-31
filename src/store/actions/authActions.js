import axios from 'axios';
// import setAuthToken from '../utils/setAuthToken';

import {
  GET_ERRORS,
  // SET_CURRENT_USER,
  AUTH_BEGIN,
  AUTH_SUCCESS,
  AUTH_FAILED,
  AUTH_LOGOUT,
  SET_USER_DATA,
} from './types';

// URL for Firebase Signup
const registerUrl = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${
  process.env.REACT_APP_FIREBASE_API_KEY
}`;

const setAccountInfoUrl = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/setAccountInfo?key=${
  process.env.REACT_APP_FIREBASE_API_KEY
}`;

const loginUrl = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${
  process.env.REACT_APP_FIREBASE_API_KEY
}`;

const userDataUrl = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/getAccountInfo?key=${
  process.env.REACT_APP_FIREBASE_API_KEY
}`;

// Register User
export const registerUser = ({
  email,
  password,
  confirmPassword,
  name,
  photoUrl,
}) => dispatch => {
  dispatch({
    type: AUTH_BEGIN,
  });

  if (password !== confirmPassword) {
    // Dispatch error for passwords not matching
    dispatch({
      type: GET_ERRORS,
      payload: { errors: [{ message: 'Passwords do not match' }] },
    });
    dispatch({
      type: AUTH_FAILED,
    });
  } else {
    const authData = {
      email,
      password,
      returnSecureToken: true,
    };

    // Register new user
    axios
      .post(registerUrl, authData)
      .then(res => {
        const { idToken, localId, expiresIn } = res.data;

        // calc expiry date in ms
        const expDate = new Date(new Date().getTime() + expiresIn * 1000);

        // Set auth items in localStorage
        localStorage.setItem('token', idToken);
        localStorage.setItem('expDate', expDate);

        // Add additional user info
        const accountInfo = {
          idToken,
          displayName: name,
          photoUrl,
        };

        axios
          .post(setAccountInfoUrl, accountInfo)
          .then(acctInfoResult => {
            const user = {
              name: acctInfoResult.data.displayName,
              photoUrl: acctInfoResult.data.photoUrl,
              userId: localId,
            };

            // Set user info in localStorage
            localStorage.setItem('user', JSON.stringify(user));

            dispatch({
              type: AUTH_SUCCESS,
              token: idToken,
              userId: localId,
            });
          })
          .catch(err => console.log(err.response.data));
      })
      .catch(err => {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data.error,
        });
        dispatch({
          type: AUTH_FAILED,
        });
      });
  }
};

// Login User
export const loginUser = ({ email, password }) => dispatch => {
  const authData = {
    email,
    password,
    returnSecureToken: true,
  };
  axios
    .post(loginUrl, authData)
    .then(res => {
      // console.log(res.data);
      const { idToken, localId, expiresIn } = res.data;

      // calc expiry date in ms
      const expDate = new Date(new Date().getTime() + expiresIn * 1000);

      // Set auth items in localStorage
      localStorage.setItem('token', idToken);
      localStorage.setItem('expDate', expDate);

      // Get user data
      axios
        .post(userDataUrl, { idToken })
        .then(userDataResult => {
          // console.log(res.data);

          const user = {
            name: userDataResult.data.displayName,
            photoUrl: userDataResult.data.photoUrl,
            userId: localId,
          };

          // Set user info in localStorage
          localStorage.setItem('user', JSON.stringify(user));

          dispatch({
            type: AUTH_SUCCESS,
            token: idToken,
            userId: localId,
          });
        })
        .catch(err => console.log(err.response.data));
    })
    .catch(err => {
      // console.log(err.response.data.error);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data.error,
      });
      dispatch({
        type: AUTH_FAILED,
      });
    });
};

// Logout user
export const logoutUser = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expDate');
  localStorage.removeItem('localId');
  return {
    type: AUTH_LOGOUT,
  };
};

// Get user data
export const getUserData = idToken => dispatch => {
  axios
    .post(userDataUrl, { idToken })
    .then(res => {
      console.log(res.data.users[0]);
      dispatch({
        type: SET_USER_DATA,
        payload: res.data.users[0],
      });
    })
    .catch(err => {
      console.log(err.response.data);
    });
};

export const checkAuthTimeout = expTime => dispatch => {
  // Log user out after given expTime period (ms)
  setTimeout(() => {
    dispatch(logoutUser());
  }, expTime);
};

// Check Auth State
export const checkAuthState = () => dispatch => {
  const token = localStorage.getItem('token');
  if (!token) {
    dispatch(logoutUser());
  } else {
    // Pull expDate from LS and convert from String to Date
    const expDate = new Date(localStorage.getItem('expDate'));
    if (expDate > new Date()) {
      const userId = localStorage.getItem('userId');
      dispatch({
        type: AUTH_SUCCESS,
        token,
        userId,
      });
      dispatch(checkAuthTimeout(expDate.getTime() - new Date().getTime()));
    } else {
      dispatch(logoutUser());
    }
  }
};
