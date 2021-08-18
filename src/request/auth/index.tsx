import { decodeToken, setTokenToCookies } from '../../utils/authentication';
import { compose } from 'ramda';
import { store } from '../../store';
import {
	AUTH_TOKEN_RESOLVED,
	AUTH_USER_DATE_FROM_TOKEN,
} from '../../module/auth/constants/action-types';

export const decodeTokenAndDispatchToAuthReducer = compose(
	dispatchUserdataFromToken,
	decodeToken,
	dispatchToken,
	(token: any) => {
		setTokenToCookies(token);
		return token;
	}
);

function dispatchToken(token: string) {
	store.dispatch({ type: AUTH_TOKEN_RESOLVED, payload: token });
	return token;
}
function dispatchUserdataFromToken(decodedToken: any) {
	store.dispatch({ type: AUTH_USER_DATE_FROM_TOKEN, payload: decodedToken });
}

export async function loginAction(name: string, pass: string) {
	try {
		const userName = 'admin';
		const password = 'admin';

		if (userName === name && password === pass) {
			const token = 'fvffffgfgfffgfgftokenfffgfgffgfg';
			setTokenToCookies(token);
			return Promise.resolve();
		} else return Promise.reject('Your are not authorized');
	} catch (error) {
		return Promise.reject(error);
	}
}
