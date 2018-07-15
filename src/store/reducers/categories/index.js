import { GET_CATEGORIES_FAILED, GET_CATEGORIES_SUCCESS } from '../../actions/types';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
      case GET_CATEGORIES_SUCCESS:
      return [ ...action.categories] ;
      case GET_CATEGORIES_FAILED:
      return { ...state, error: action.error };
    default:
      return state;
  }
};
