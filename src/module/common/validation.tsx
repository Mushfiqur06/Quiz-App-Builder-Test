import { compose, F, is, isNil, T } from "ramda";

export const isStringAndLengthGtZero = compose(
  (value: any) => {
    if (isNil(value)) {
      return F();
    } else if (value.length > 0) {
      return T();
    } else {
      return F();
    }
  },
  (value: any) => {
    if (is(String, value)) {
      return value.trim();
    } else {
      return null;
    }
  }
);

export const isArrayAndNotEmpty = compose(
  (array: any) => {
    if (array === null) {
      return false;
    } else if (array.length > 0) {
      return true;
    } else {
      return false;
    }
  },
  (array: any) => {
    if (Array.isArray(array)) {
      return array;
    } else {
      return null;
    }
  }
);

export const rendomID = () => Math.floor(Math.random() * (100000 - 1)) + 1;
