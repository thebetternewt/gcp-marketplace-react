import {
  AUTH_BEGIN,
  AUTH_SUCCESS,
  AUTH_FAILED,
  AUTH_LOGOUT,
  SET_CURRENT_USER
  // SET_AUTH_REDIRECT_PATH,
} from '../actions/types';

const initialState = {
  user: null,
  error: null,
  loading: false,
  authRedirectPath: '/dashboard'
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_BEGIN:
      return {
        ...state,
        error: null,
        loading: true
      };
    case AUTH_SUCCESS:
      return {
        ...state,
        user: action.user,
        error: null,
        loading: false
      };
    case AUTH_FAILED:
      return {
        ...state,
        error: action.error,
        loading: false
      };
    case AUTH_LOGOUT:
      return {
        ...state,
        user: null
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        user: action.user
      };
    default:
      return state;
  }
};

export default reducer;
