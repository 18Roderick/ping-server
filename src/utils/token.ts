import * as jwt from "jsonwebtoken";
import fs from "node:fs";
import * as path from "node:path";

import config from "../config/configEnv";

//configuración de
const refreshTokenIat = "30d";
const temporalTokenIat = "8h";

const tokenConfig: jwt.SignOptions = {
	issuer: "Pingdom Copy",
	expiresIn: "1h",
	audience: "Client_Identity",
};

export const sign = function (payload): string {
	return jwt.sign(payload, config.tokenSecret, {
		...tokenConfig,
		expiresIn: temporalTokenIat,
	});
};

export const signRefreshToken = function (payload): string {
	return jwt.sign(payload, config.tokenSecret, {
		...tokenConfig,
		expiresIn: refreshTokenIat,
	});
};

export const verify = function (
	strToken,
): Promise<jwt.VerifyCallback<string | jwt.JwtPayload>> {
	return new Promise((resolve, reject) => {
		jwt.verify(strToken, config.tokenSecret, (err, decoded) => {
			if (err) reject(err);
			resolve(decoded);
		});
	});
};
