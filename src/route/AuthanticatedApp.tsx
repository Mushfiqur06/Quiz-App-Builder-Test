import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { userInLoggedIn } from '../utils/authentication';

export function PrivateRoute({ component: Component, ...rest }: any) {
	return (
		<Route
			{...rest}
			render={(props) =>
				userInLoggedIn() ? (
					<Component {...props} />
				) : (
					<Redirect
						to={{
							pathname: '/',
						}}
					/>
				)
			}
		/>
	);
}
