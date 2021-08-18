import { combineReducers } from 'redux';
import { auth } from './authReducer';
import movieReducer from './movieReducer';

export const appReducers = combineReducers({
	auth: auth,
	movies: movieReducer,
});
