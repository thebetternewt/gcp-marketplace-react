import axios from 'axios';
import { GET_PROFILE, PROFILE_LOADING } from './types';

// Profile loading
export const setProfileLoading = () => ({
  type: PROFILE_LOADING,
});

const profileUrl = `https://firestore.googleapis.com/v1beta1/name=projects/gcp-marketplace/databases/gcp-marketplace-5c110/documents/*/**`

// Get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get('/api/profile')
    .then(res => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_PROFILE,
        payload: {},
      });
    });
};
