-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `Pings` (
	`idPing` varchar(191) NOT NULL,
	`times` double NOT NULL,
	`packetLoss` double NOT NULL,
	`min` double NOT NULL,
	`max` double NOT NULL,
	`avg` double NOT NULL,
	`log` varchar(191) NOT NULL,
	`isAlive` tinyint NOT NULL,
	`numericHost` varchar(191) NOT NULL,
	`createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`serversIdServer` varchar(191),
	CONSTRAINT `Pings_idPing` PRIMARY KEY(`idPing`)
);
--> statement-breakpoint
CREATE TABLE `Servers` (
	`idServer` varchar(191) NOT NULL,
	`url` varchar(191),
	`ip` varchar(191),
	`description` varchar(191),
	`title` varchar(191) NOT NULL,
	`status` enum('ACTIVE','INACTIVE') NOT NULL DEFAULT 'ACTIVE',
	`workerType` enum('SERVER','URL') NOT NULL,
	`createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`updatedAt` datetime(3) NOT NULL,
	`idUser` varchar(191),
	CONSTRAINT `Servers_idServer` PRIMARY KEY(`idServer`)
);
--> statement-breakpoint
CREATE TABLE `Tasks` (
	`idTask` varchar(191) NOT NULL,
	`log` varchar(191) NOT NULL,
	`type` enum('UNDEFINED','SERVER','BACKGROUND','SUMMARY','ADMIN','DAILY') NOT NULL DEFAULT 'UNDEFINED',
	`interval` bigint NOT NULL,
	`createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`updatedAt` datetime(3) NOT NULL,
	CONSTRAINT `Tasks_idTask` PRIMARY KEY(`idTask`)
);
--> statement-breakpoint
CREATE TABLE `TasksServers` (
	`id` varchar(191) NOT NULL,
	`serverIdServer` varchar(191) NOT NULL,
	`taskIdTask` varchar(191) NOT NULL,
	CONSTRAINT `TasksServers_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `Users` (
	`idUser` varchar(191) NOT NULL,
	`name` varchar(191) NOT NULL,
	`lastName` varchar(191) NOT NULL,
	`email` varchar(191) NOT NULL,
	`password` varchar(191) NOT NULL,
	`createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`updatedAt` datetime(3) NOT NULL,
	`status` enum('ACTIVE','INACTIVE') NOT NULL DEFAULT 'ACTIVE',
	CONSTRAINT `Users_idUser` PRIMARY KEY(`idUser`),
	CONSTRAINT `Users_email_key` UNIQUE(`email`)
);
--> statement-breakpoint
ALTER TABLE `Pings` ADD CONSTRAINT `Pings_serversIdServer_fkey` FOREIGN KEY (`serversIdServer`) REFERENCES `Servers`(`idServer`) ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `Servers` ADD CONSTRAINT `Servers_idUser_fkey` FOREIGN KEY (`idUser`) REFERENCES `Users`(`idUser`) ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `TasksServers` ADD CONSTRAINT `TasksServers_serverIdServer_fkey` FOREIGN KEY (`serverIdServer`) REFERENCES `Servers`(`idServer`) ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `TasksServers` ADD CONSTRAINT `TasksServers_taskIdTask_fkey` FOREIGN KEY (`taskIdTask`) REFERENCES `Tasks`(`idTask`) ON DELETE restrict ON UPDATE cascade;
*/