import axios from 'axios';
// import setAuthToken from '../utils/setAuthToken';

import {
  GET_ERRORS,
  SET_CURRENT_USER,
  AUTH_BEGIN,
  AUTH_SUCCESS,
  AUTH_FAILED,
} from './types';

// URL for Firebase Signup
const registerUrl =
  'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAqhMK8Ga1sqbOIS94OzU7MTz9_JR8EPwg';

const setAccountInfoUrl =
  'https://www.googleapis.com/identitytoolkit/v3/relyingparty/setAccountInfo?key=AIzaSyAqhMK8Ga1sqbOIS94OzU7MTz9_JR8EPwg';

const loginUrl =
  'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAqhMK8Ga1sqbOIS94OzU7MTz9_JR8EPwg';

const userDataUrl =
  'https://www.googleapis.com/identitytoolkit/v3/relyingparty/getAccountInfo?key=AIzaSyAqhMK8Ga1sqbOIS94OzU7MTz9_JR8EPwg';

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
      .then(
        res => {
          console.log(res.data);
          const { idToken, localId, expiresIn } = res.data;

          // calc expiry date in ms
          const expDate = new Date(new Date().getTime() + expiresIn * 1000);

          // Set auth items in localStorage
          localStorage.setItem('token', idToken);
          localStorage.setItem('expDate', expDate);

          // Add additional user info
          const accountInfo = {
            idToken: idToken,
            displayName: name,
          };

          axios
            .post(setAccountInfoUrl, accountInfo)
            .then(res => {
              console.log(res.data);

              const user = {
                name: res.data.displayName,
                photoUrl: res.data.photoUrl,
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
            .catch(err => {
              console.log(err.response.data);
            });
        }
        // dispatch({
        //   type: SET_CURRENT_USER,
        //   payload: res.data,
        // }),
      )
      .catch(err => {
        console.log(err.response.data.error);
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

export const loginUser = ({ email, password }) => dispatch => {
  const authData = {
    email,
    password,
    returnSecureToken: true,
  };
  axios
    .post(loginUrl, authData)
    .then(res => {
      console.log(res.data);
      const { idToken, localId, expiresIn } = res.data;

      // calc expiry date in ms
      const expDate = new Date(new Date().getTime() + expiresIn * 1000);

      // Set auth items in localStorage
      localStorage.setItem('token', idToken);
      localStorage.setItem('expDate', expDate);

      // Get user data
      axios
        .post(userDataUrl, idToken)
        .then(res => {
          console.log(res.data);

          const user = {
            name: res.data.displayName,
            photoUrl: res.data.photoUrl,
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
      console.log(err.response.data.error);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data.error,
      });
      dispatch({
        type: AUTH_FAILED,
      });
    });
};
