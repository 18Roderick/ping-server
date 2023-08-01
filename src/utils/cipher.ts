import * as argon from "argon2";

export const encrypt = function (str) {
	return argon.hash(str);
};

export const compare = function (str, password) {
	return argon.verify(password, str);
};
