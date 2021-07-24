const Bull = require("bull");
const ping = require("ping");

const { Servidores, PingServidores } = require("../models");

const pingQueue = new Bull("pingQueue");

const myFirstQueue = new Bull("my-first-queue");

const testHost = "www.google.com";

const job = myFirstQueue.add(
  {
    foo: "bar",
  },
  {
    repeat: {
      cron: "*/1 * * * *",
      limit: 1,
    },
  }
);

myFirstQueue.process(async (job) => {
  let log = await ping.promise.probe(testHost);
  console.log(log);
});

myFirstQueue.on("completed", (job, result) => {
  console.log(`Job completed with result ${job.data}`);
});

