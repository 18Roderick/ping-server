//ts-check
const ping = require("ping");

function convertPingData(pingData) {
  const reg = /\./g;
  let data = {};
  if (!data) return data;
  data.host = reg.test(pingData.host) ? pingData.host : "";
  data.isAlive = pingData.alive ?? false;
  data.times = !isNaN(pingData.time) ? pingData.time : null;
  data.repeatedTimes = pingData.times ? pingData.times.length || null : null;
  data.min = !isNaN(pingData.min) ? parseFloat(pingData.min ?? 0) : null;
  data.max = !isNaN(pingData.max) ? parseFloat(pingData.max ?? 0) : null;
  data.avg = !isNaN(pingData.avg) ? parseFloat(pingData.avg ?? 0) : null;
  data.packetLoss = !isNaN(pingData.packetLoss) ? parseFloat(pingData.packetLoss) : null;
  data.numericHost = pingData.numeric_host ?? null;
  data.log = removerCharacters(pingData.output);

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
  let log = await ping.promise.probe(server);
  const data = convertPingData(log);
  return data;
}

// makePing(`8.8.8.8`).then(console.info).then(console.error);

module.exports = {
  makePing,
};
