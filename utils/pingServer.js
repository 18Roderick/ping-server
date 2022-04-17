//ts-check
const ping = require("ping");

function convertPingData(pingData) {
  const reg = /\./g;
  let data = {};
  if (!data) return data;
  const output = removerCharacters(pingData.output);
  const metrics = getDataFromLog(output);

  data.host = reg.test(pingData.host) ? pingData.host : "";
  data.isAlive = pingData.alive ?? false;
  data.times = !isNaN(pingData.time) ? pingData.time : null;
  data.repeatedTimes = pingData.times ? pingData.times.length || null : null;
  data.min = !isNaN(pingData.min) ? parseFloat(pingData.min ?? 0) : metrics.min;
  data.max = !isNaN(pingData.max) ? parseFloat(pingData.max ?? 0) : metrics.max;
  data.avg = !isNaN(pingData.avg) ? parseFloat(pingData.avg ?? 0) : metrics.avg;
  data.packetLoss = !isNaN(pingData.packetLoss) ? parseFloat(pingData.packetLoss) : null;
  data.numericHost = pingData.numeric_host ?? null;
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

function removerCharacters(str) {
  if (!str) return str;
  return str.replace(/\+/g, "");
}

async function makePing(server) {
  if (!server) throw new Error("IP o Dominio Invalido");
  let log = await ping.promise.probe(server, { extra: ["-c", "2"] });
  const data = convertPingData(log);
  return data;
}

// makePing(`8.8.8.8`).then(console.info).then(console.error);

module.exports = {
  makePing,
};
