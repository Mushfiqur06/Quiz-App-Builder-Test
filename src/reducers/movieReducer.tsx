import { ADD_ALL_MOVIES } from '../actions/movie-action-type';

function movieReducer(state = [], action: any) {
	if (action.type === ADD_ALL_MOVIES) {
		console.log('Called');
		return [...state, action.payload];
	}

	return state;
}

export default movieReducer;
