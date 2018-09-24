import { combineReducers } from 'redux';
import authReducer from './authReducer';
import moviesReducer from './moviesReducer';
import adminReducer from './adminReducer';
import userReducer from './userReducer';

export default combineReducers({
  auth: authReducer,
  movies: moviesReducer,
  admin: adminReducer,
  user: userReducer
});
