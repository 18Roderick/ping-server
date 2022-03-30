//ts-check
const ping = require("ping");

function convertPingData(pingData) {
  const reg = /\./g;
  let data = {};
  if (!data) return data;
  console.log(pingData);
  data.host = reg.test(pingData.host) ? pingData.host : "";
  data.alive = pingData.alive ?? false;
  data.time = !isNaN(pingData.time) ? pingData.time : null;
  data.times = pingData.times ? pingData.times.length || null : null;
  data.min = !isNaN(pingData.min) ? parseFloat(pingData.min ?? 0) : null;
  data.max = !isNaN(pingData.max) ? parseFloat(pingData.max ?? 0) : null;
  data.avg = !isNaN(pingData.avg) ? parseFloat(pingData.avg ?? 0) : null;
  data.packetLoss = !isNaN(pingData.packetLoss) ? parseFloat(pingData.packetLoss) : null;
  data.numericHost = pingData.numeric_host ?? null;
  data.details = removerCharacters(pingData.output);

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
  let log = await ping.promise.probe(testHost);
  const data = convertPingData(log);

  return data;
}

module.exports = {
  makePing,
};
