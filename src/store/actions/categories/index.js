import Categories from './../../../data/Profile/Categories';
import { GET_CATEGORIES, GET_CATEGORIES_SUCCESS, GET_CATEGORIES_FAILED } from './../types';

export const getCategories = () => dispatch => {
  dispatch({
    type: GET_CATEGORIES
  });
  const categories = new Categories();
  categories
    .get()
    .then(categories => dispatch({ type: GET_CATEGORIES_SUCCESS, categories }))
    .catch(error => dispatch({ type: GET_CATEGORIES_FAILED, error }));
};
