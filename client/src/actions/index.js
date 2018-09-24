import axios from 'axios';
import { FETCH_USER, FETCH_MOVIES } from './types';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitNewMovie = (values, file) => async dispatch => {
  const uploadConfig = await axios.get('/api/upload');

  await axios.put(uploadConfig.data.url, file, {
    headers: {
      'Content-Type': file.type
    }
  });

  console.log(values);
  const res = await axios.post('/api/NewMovie', {
    ...values,
    imageUrl: uploadConfig.data.key
  });

  console.log(res);
  dispatch({ type: FETCH_MOVIES, payload: res.data });
};

export const fetchMovies = () => async dispatch => {
  const res = await axios.get('/api/movies');

  dispatch({ type: FETCH_MOVIES, payload: res.data });
};

export const handleToken = token => async dispatch => {
  const res = await axios.post('/api/stripe', token);

  dispatch({ type: FETCH_USER, payload: res.data });
};
