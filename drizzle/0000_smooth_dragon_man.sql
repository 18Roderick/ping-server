-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `Logs` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`idUser` varchar(191),
	`createdAt` datetime(3) NOT NULL DEFAULT 'CURRENT_TIMESTAMP(3)',
	`action` varchar(191) NOT NULL,
	`errorLevel` enum('INFO','WARNING','ERROR','CRITICAL') NOT NULL,
	`description` varchar(191) NOT NULL,
	`affectedEntity` varchar(191)
);
--> statement-breakpoint
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
	`createdAt` datetime(3) NOT NULL DEFAULT 'CURRENT_TIMESTAMP(3)',
	`serversIdServer` varchar(191)
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
	`createdAt` datetime(3) NOT NULL DEFAULT 'CURRENT_TIMESTAMP(3)',
	`updatedAt` datetime(3) NOT NULL,
	`idUser` varchar(191)
);
--> statement-breakpoint
CREATE TABLE `Tasks` (
	`idTask` varchar(191) NOT NULL,
	`idJob` varchar(191) NOT NULL,
	`log` varchar(191) NOT NULL,
	`type` enum('UNDEFINED','SERVER','BACKGROUND','SUMMARY','ADMIN','DAILY') NOT NULL DEFAULT 'UNDEFINED',
	`cron` varchar(191) NOT NULL,
	`status` enum('RUNNING','STOPPED','DELETED','WAITING') NOT NULL DEFAULT 'RUNNING',
	`createdAt` datetime(3) NOT NULL DEFAULT 'CURRENT_TIMESTAMP(3)',
	`updatedAt` datetime(3) NOT NULL,
	`serversIdServer` varchar(191),
	`retriesFailed` int(11) NOT NULL DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE `Users` (
	`idUser` varchar(191) NOT NULL,
	`name` varchar(191) NOT NULL,
	`lastName` varchar(191) NOT NULL,
	`email` varchar(191) NOT NULL,
	`password` varchar(191) NOT NULL,
	`createdAt` datetime(3) NOT NULL DEFAULT 'CURRENT_TIMESTAMP(3)',
	`updatedAt` datetime(3) NOT NULL,
	`status` enum('ACTIVE','INACTIVE') NOT NULL DEFAULT 'ACTIVE',
	CONSTRAINT `Users_email_key` UNIQUE(`email`)
);
--> statement-breakpoint
ALTER TABLE `Pings` ADD CONSTRAINT `Pings_serversIdServer_fkey` FOREIGN KEY (`serversIdServer`) REFERENCES `Servers`(`idServer`) ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `Servers` ADD CONSTRAINT `Servers_idUser_fkey` FOREIGN KEY (`idUser`) REFERENCES `Users`(`idUser`) ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `Tasks` ADD CONSTRAINT `Tasks_serversIdServer_fkey` FOREIGN KEY (`serversIdServer`) REFERENCES `Servers`(`idServer`) ON DELETE cascade ON UPDATE cascade;
*/