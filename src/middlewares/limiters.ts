import rateLimiter from "express-rate-limit";

const loginOptions = {
	windowMs: 60 * 60 * 1000, //1000 peticiones por hora como maximo
	max: 3, //Maximo de peticiones por minuto
	delayMs: 0, //Delay de petcion desabilitada hasta que exceda el maximo
};

export const loginLimiter = rateLimiter(loginOptions);
