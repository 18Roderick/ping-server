const ping = require("ping");

const testHost = "www.google.com";

const pingTest = async () => {
  try {
    let log = await ping.promise.probe(testHost);
    console.log(log);
  } catch (error) {
    console.log(error);
  }
};

pingTest();
