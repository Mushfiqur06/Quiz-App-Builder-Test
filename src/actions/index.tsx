import axios from 'axios';
import { baseUrl } from '../config/moviesApi';
import { ADD_ALL_MOVIES } from './movie-action-type';

export function fetchMovies() {
	return function (dispatch: any) {
		return axios.get(baseUrl.API_ENDPOINT).then(({ data }) => {
			dispatch(addAllMovies(data));
		});
	};
}

function addAllMovies(payload: any) {
	console.log('Ok', payload);
	return {
		type: ADD_ALL_MOVIES,
		payload,
	};
}
