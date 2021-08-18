const R = require('ramda');

export const isStringAndLengthGtZero = R.compose(
	(value: any) => {
		if (R.isNil(value)) {
			return R.F();
		} else if (value.length > 0) {
			return R.T();
		} else {
			return R.F();
		}
	},
	(value: any) => {
		if (R.is(String, value)) {
			return value.trim();
		} else {
			return null;
		}
	}
);
