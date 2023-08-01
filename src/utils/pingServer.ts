import ping, { PingResponse } from "ping";

interface PingData {
	host: string;
	isAlive: boolean;
	times?: number;
	repeatedTimes: number;
	min: number;
	max: number;
	avg: number;
	packetLoss: number;
	numericHost: string;
	log: string;
}

function convertPingData(pingData: PingResponse) {
	const reg = /\./g;
	let data = {} as PingData;
	if (!data) return data;
	const output = removerCharacters(pingData.output);
	const metrics = getDataFromLog(output);

	data.host = reg.test(pingData.host) ? pingData.host : "";
	data.isAlive = pingData.alive ?? false;
	data.times = !Number.isNaN(pingData.time)
		? parseInt(pingData.time as string)
		: null;
	data.repeatedTimes = pingData.times ? pingData.times.length || null : null;
	data.min = !Number.isNaN(pingData.min)
		? parseFloat(pingData.min ?? "0")
		: metrics.min;
	data.max = !Number.isNaN(pingData.max)
		? parseFloat(pingData.max ?? "0")
		: metrics.max;
	data.avg = !Number.isNaN(pingData.avg)
		? parseFloat(pingData.avg ?? "0")
		: metrics.avg;
	data.packetLoss = !Number.isNaN(pingData.packetLoss)
		? parseFloat(pingData.packetLoss)
		: null;
	data.numericHost = pingData.numeric_host
		? pingData.numeric_host.replace(")", "")
		: null;
	data.log = removerCharacters(pingData.output);

	return data;
}

/*
expresión regular para extraer datos de ping
*/

function getDataFromLog(text) {
	const regexMetrics = /[^\/]*\/([0-9]+\.[0-9]+).*ms/gm;
	const regexAvg = /[a-z,=,\s+]/gm;
	const data = {
		min: null,
		avg: null,
		max: null,
	};
	if (!text) return data;

	//extraer la sección con datos de métricas de ping
	let strMetrics = text.match(regexMetrics);

	if (Array.isArray(strMetrics) && strMetrics.length > 0) {
		//extraer los valores de métricas
		const metrics = strMetrics[0]
			.replace(regexAvg, "")
			.split("/")
			.filter((item) => item ?? !Number.isNaN(item));

		data.min = metrics[0] ? parseFloat(metrics[0]) : null;
		data.avg = metrics[1] ? parseFloat(metrics[1]) : null;
		data.max = metrics[2] ? parseFloat(metrics[2]) : null;
	}

	return data;
}

// function removeBreakLine(str) {
//   if (!str) return str;
//   return str.replace(/\r?\n|\r/g, " ");
// }

function removerCharacters(str): string {
	if (!str) return str;
	return str.replace(/\+/g, "");
}

/** @function */
/**
 * @param {string} domain server domain www.example.com
 */
/** @returns */
/**
 * @typedef {Object} PingData Return ping Data
 * @property {string} host - server domain
 * @property {boolean} isAlive status of server
 * @property {boolean} isAlive status of server
 * @property {number} times cicles of pings
 * @property {number} repeatedTimes status of server
 * @property {number} min min speed ping
 * @property {number} max max speed ping
 * @property {number} avg avg speed ping
 * @property {number} packetLoss packages loss
 * @property {string} numericHost number host
 * @property {string} log complete log of ping
 */
export const makePing = async (server): Promise<PingData> => {
	if (!server) throw new Error("IP o Dominio Invalido");
	let log: PingResponse = await ping.promise.probe(server, {
		extra: ["-c", "2"],
	});
	const data = convertPingData(log);
	return data;
};

/*{

  host: 'www.roderickromero.dev',

  isAlive: true,

  times: 88.1,

  repeatedTimes: 2,

  min: 88.106,

  max: 137.165,

  avg: 112.635,

  packetLoss: 0,

  numericHost: '104.21.88.116',

  log: 'PING www.roderickromero.dev (104.21.88.116) 56(84) bytes of data.\n' +

    '64 bytes from 104.21.88.116: icmp_seq=1 ttl=37 time=88.1 ms\n' +

    '64 bytes from 104.21.88.116: icmp_seq=2 ttl=37 time=137 ms\n' +

    '\n' +

    '--- www.roderickromero.dev ping statistics ---\n' +

    '2 packets transmitted, 2 received, 0% packet loss, time 2ms\n' +

    'rtt min/avg/max/mdev = 88.106/112.635/137.165/24.531 ms\n'

} */

// makePing(`8.8.8.8`).then(console.info).then(console.error);
