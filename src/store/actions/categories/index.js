import Categories from "./../../../data/Profile/Categories";
import {
  GET_CATEGORIES,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAILED
} from "./../types";

export const getCategories = () => async dispatch => {
  dispatch({
    type: GET_CATEGORIES
  });
  const categories = new Categories();
  try {
    const resultCategories = await categories.get();
    dispatch({ type: GET_CATEGORIES_SUCCESS, categories: resultCategories });
  } catch (error) {
    dispatch({ type: GET_CATEGORIES_FAILED, error });
  }
};
