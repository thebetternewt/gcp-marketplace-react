import {
  AUTH_BEGIN,
  AUTH_SUCCESS,
  AUTH_FAILED,
  // AUTH_LOGOUT,
  // SET_AUTH_REDIRECT_PATH,
} from '../actions/types';

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  authRedirectPath: '/',
};

const authBegin = (state, action) => ({
  ...state,
  error: null,
  loading: true,
});

const authSuccess = (state, action) => ({
  ...state,
  token: action.token,
  userId: action.userId,
  error: null,
  loading: false,
});

const authFailed = (state, action) => ({
  ...state,
  error: action.error,
  loading: false,
});

const authLogout = (state, action) => ({
  ...state,
  token: null,
  userId: null,
});

const setAuthRedirectPath = (state, action) => ({
  ...state,
  authRedirectPath: action.path,
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_BEGIN:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case AUTH_SUCCESS:
      return authSuccess(state, action);
    case AUTH_FAILED:
      return authFailed(state, action);
    // case AUTH_LOGOUT:
    //   return authLogout(state, action);
    // case SET_AUTH_REDIRECT_PATH:
    //   return setAuthRedirectPath(state, action);
    default:
      return state;
  }
};

export default reducer;
