import {
	AUTH_TOKEN_RESOLVED,
	AUTH_USER_DATE_FROM_TOKEN,
	USER_LOGOUT,
} from '../constants/action-types';

const INITIAL_STATE = {
	token: '',
	userDataFromToken: {},
};
console.log('Helllo');
export const auth = (state = INITIAL_STATE, action: any) => {
	switch (action.type) {
		case AUTH_TOKEN_RESOLVED:
			return {
				...state,
				token: action.payload,
			};
		case AUTH_USER_DATE_FROM_TOKEN:
			return {
				...state,
				userDataFromToken: action.payload,
			};
		case USER_LOGOUT:
			return {
				token: '',
				userDataFromToken: {},
			};

		default:
			return state;
	}
};
