const ping = require("ping");

const testHost = "www.google.com";

function convertPingData(pingData) {
  let data = {};
  if (!data) return data;

  data.host = pingData.host ?? "";
  data.alive = pingData.alive ?? false;
  data.time = pingData.time ?? 0;
  data.times = pingData.times ? pingData.times.length : null;
  data.min = !isNaN(pingData.min) ? parseFloat(pingData.min ?? 0) : 0;
  data.max = !isNaN(pingData.max) ? parseFloat(pingData.max ?? 0) : 0;
  data.avg = !isNaN(pingData.avg) ? parseFloat(pingData.avg ?? 0) : 0;
  data.packetLoss = parseFloat(pingData.packetLoss ?? 0);
  data.numericHost = pingData.numeric_host;
  data.details = pingData.output;

  return data;
}

// function removeBreakLine(str) {
//   if (!str) return str;
//   return str.replace(/\r?\n|\r/g, " ");
// }

const pingTest = async () => {
  try {
    let log = await ping.promise.probe(testHost);
    const data = convertPingData(log);
    console.log(log, data);
  } catch (error) {
    console.log(error);
  }
};

pingTest();
