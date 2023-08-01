import { v4 as uuid } from "uuid";
import { queueTypes, INTERVALS, pingMonitor } from "./QueueManager";

import { PrismaClient, TasksTypes, TasksEstatus } from "@prisma/client";

import * as monitorConsumer from "./process/monitorProcess";

const JOB_TYPES = {
	DAILY: "DAILYSUMMARY",
	MONTHLY: "MONHTLY",
} as const;

const monitorQueue = {};

const prisma = new PrismaClient();

//function find repeatable jobs
async function findRepeatableJob(key: string) {
	const listJobs = await pingMonitor.getRepeatableJobs();
	for (let job of listJobs) {
		if (job.key === key) return job;
	}
	return null;
}

//process the pings to the servers
pingMonitor.process(queueTypes.pingMonitor, monitorConsumer.pingConsumer);

//process the daily summary of ping data
pingMonitor.process(JOB_TYPES.DAILY, monitorConsumer.dailySummary);

//agregar worker de ping
export const addPing = async function (payload) {
	if (!payload) return false;
	const unique = uuid();
	const job = await pingMonitor.add(queueTypes.pingMonitor, payload, {
		repeat: {
			every: INTERVALS.TWO_MINUTES,
		},
		jobId: unique,
	});
	return job.id;
};

//agregar worker de ping
export const dailySummary = async function () {
	const unique = uuid();
	//add a job to summarize the daily data
	let task = await prisma.tasks.findFirst({
		where: {
			type: TasksTypes.SUMMARY,
		},
	});

	const newJob = () =>
		pingMonitor.add(
			JOB_TYPES.DAILY,
			{},
			{
				jobId: unique,
				repeat: {
					cron: INTERVALS.EVERY_DAY,
				},
			},
		);

	if (!task) {
		const job = await newJob();

		task = await prisma.tasks.create({
			data: {
				type: TasksTypes.SUMMARY,
				idTask: job?.id as string,
				estatus: TasksEstatus.running,
			},
		});
		return job?.id;
	} else {
		const job = await findRepeatableJob(task.idTask);
		if (job == null) {
			const job = await newJob();
			task = await prisma.tasks.update({
				where: { id: task.id },
				data: {
					idTask: job?.id as string,
				},
			});
		}
	}
	return task?.idTask;
};

//stop repeatable job
export const stopRepeatable = async function (key) {
	//TODO crea a function to stop repeatable jobs
};

//remover worker de ping
export const removePingRepeatable = async function (key) {
	console.log("Borrando Job");
	const result = await pingMonitor.removeRepeatableByKey(key);
	console.log("Respuesta de Borrado ", result);
	return key;
};

//remover todos los pings
export const removeAllPing = async function () {
	await pingMonitor.empty();
	await pingMonitor.clean(0, "completed");
	await pingMonitor.clean(0, "wait");
	await pingMonitor.clean(0, "active");
	await pingMonitor.clean(0, "delayed");
};

//remover todos los jobs repetitivos
export const removeAllRepeatable = async function () {
	const listJobs = await pingMonitor.getRepeatableJobs();
	for (let job of listJobs) {
		await pingMonitor.removeRepeatableByKey(job.key);
	}
	return true;
};

//export const removeAllRepeatable().then(console.info).catch(console.error);

//export const stop("").then(console.info).catch(console.error);
