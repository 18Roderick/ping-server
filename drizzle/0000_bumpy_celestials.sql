CREATE TABLE `Logs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`idUser` varchar(191),
	`updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`action` varchar(5000) NOT NULL,
	`errorLevel` enum('INFO','WARNING','ERROR','CRITICAL') NOT NULL DEFAULT 'INFO',
	`description` varchar(5000) NOT NULL,
	`affectedEntity` varchar(191),
	CONSTRAINT `Logs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `Pings` (
	`idPing` varchar(200) NOT NULL,
	`times` double NOT NULL,
	`packetLoss` double NOT NULL,
	`min` double NOT NULL,
	`max` double NOT NULL,
	`avg` double NOT NULL,
	`log` varchar(191) NOT NULL,
	`isAlive` tinyint NOT NULL,
	`numericHost` varchar(191) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`idServer` varchar(200) NOT NULL,
	CONSTRAINT `Pings_idPing` PRIMARY KEY(`idPing`)
);
--> statement-breakpoint
CREATE TABLE `Servers` (
	`idServer` varchar(200) NOT NULL,
	`url` varchar(191),
	`ip` varchar(191),
	`description` varchar(191),
	`title` varchar(191) NOT NULL,
	`status` enum('ACTIVE','INACTIVE') NOT NULL DEFAULT 'ACTIVE',
	`workerType` enum('SERVER','URL') NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	`idUser` varchar(200) NOT NULL,
	CONSTRAINT `Servers_idServer` PRIMARY KEY(`idServer`)
);
--> statement-breakpoint
CREATE TABLE `Tasks` (
	`idTask` varchar(200) NOT NULL,
	`idJob` varchar(300) NOT NULL,
	`log` varchar(500) NOT NULL,
	`type` enum('UNDEFINED','SERVER','BACKGROUND','SUMMARY','ADMIN','DAILY') NOT NULL DEFAULT 'UNDEFINED',
	`cron` varchar(191) NOT NULL,
	`status` enum('RUNNING','STOPPED','DELETED','WAITING') NOT NULL DEFAULT 'RUNNING',
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	`idServer` varchar(200),
	`retriesFailed` int NOT NULL DEFAULT 0,
	CONSTRAINT `Tasks_idTask` PRIMARY KEY(`idTask`)
);
--> statement-breakpoint
CREATE TABLE `Users` (
	`idUser` varchar(200) NOT NULL,
	`name` varchar(191) NOT NULL,
	`lastName` varchar(191) NOT NULL,
	`email` varchar(191) NOT NULL,
	`password` varchar(191) NOT NULL,
	`updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	`status` enum('ACTIVE','INACTIVE') NOT NULL DEFAULT 'ACTIVE',
	CONSTRAINT `Users_idUser` PRIMARY KEY(`idUser`),
	CONSTRAINT `Users_email_key` UNIQUE(`email`)
);
--> statement-breakpoint
ALTER TABLE `Pings` ADD CONSTRAINT `Pings_idServer_Servers_idServer_fk` FOREIGN KEY (`idServer`) REFERENCES `Servers`(`idServer`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `Servers` ADD CONSTRAINT `Servers_idUser_Users_idUser_fk` FOREIGN KEY (`idUser`) REFERENCES `Users`(`idUser`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `Tasks` ADD CONSTRAINT `Tasks_idServer_Servers_idServer_fk` FOREIGN KEY (`idServer`) REFERENCES `Servers`(`idServer`) ON DELETE cascade ON UPDATE cascade;