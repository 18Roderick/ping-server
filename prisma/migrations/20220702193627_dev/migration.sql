-- CreateTable
CREATE TABLE `EstatusServidores` (
    `idEstatus` INTEGER NOT NULL AUTO_INCREMENT,
    `tipo` INTEGER NOT NULL,
    `descripcion` VARCHAR(255) NULL,
    `titulo` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `tipo`(`tipo`),
    UNIQUE INDEX `titulo`(`titulo`),
    PRIMARY KEY (`idEstatus`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EstatusUsuarios` (
    `idEstatus` INTEGER NOT NULL AUTO_INCREMENT,
    `tipo` INTEGER NOT NULL,
    `descripcion` VARCHAR(255) NULL,
    `titulo` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `tipo`(`tipo`),
    UNIQUE INDEX `titulo`(`titulo`),
    PRIMARY KEY (`idEstatus`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PingServidores` (
    `idPingServidor` INTEGER NOT NULL AUTO_INCREMENT,
    `idServidor` INTEGER NOT NULL,
    `times` FLOAT NULL,
    `packetLoss` FLOAT NULL,
    `min` FLOAT NULL,
    `max` FLOAT NULL,
    `avg` FLOAT NULL,
    `log` TEXT NULL,
    `isAlive` BOOLEAN NULL,
    `numericHost` VARCHAR(255) NULL,
    `fechaPing` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `idServidor`(`idServidor`),
    PRIMARY KEY (`idPingServidor`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Servidores` (
    `publicId` CHAR(255) NULL,
    `idServidor` INTEGER NOT NULL AUTO_INCREMENT,
    `estatus` INTEGER NOT NULL,
    `dominio` VARCHAR(255) NOT NULL,
    `ip` VARCHAR(255) NULL,
    `fechaCreacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fechaActualizacion` DATETIME(3) NULL,
    `descripcion` TEXT NULL,
    `idUsuario` INTEGER NULL,
    `nombre` VARCHAR(255) NOT NULL,

    INDEX `Servidores_publicId_idServidor_idx`(`publicId`, `idServidor`),
    INDEX `Servidores_ibfk_1`(`estatus`),
    INDEX `Servidores_idUsuario_fkey`(`idUsuario`),
    PRIMARY KEY (`idServidor`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tasks` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idTask` VARCHAR(500) NOT NULL,
    `idServidor` INTEGER NULL,
    `estatus` ENUM('running', 'stopped', 'deleted') NULL DEFAULT 'stopped',
    `fechaCreacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `interval` INTEGER NULL,
    `error` TEXT NULL,
    `type` ENUM('UNDEFINED', 'SERVER', 'BACKGROUND', 'SUMMARY', 'ADMIN', 'DAILY') NOT NULL DEFAULT 'UNDEFINED',
    `ultimaEjecucion` DATETIME(0) NULL,

    UNIQUE INDEX `idTask`(`idTask`),
    INDEX `Tasks_idServidor_idTask_idx`(`idServidor`, `idTask`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Usuarios` (
    `publicId` CHAR(36) NOT NULL,
    `idUsuario` INTEGER NOT NULL AUTO_INCREMENT,
    `estatus` INTEGER NOT NULL DEFAULT 1,
    `nombre` VARCHAR(50) NOT NULL,
    `apellido` VARCHAR(50) NOT NULL,
    `email` VARCHAR(255) NULL,
    `password` VARCHAR(255) NOT NULL,
    `fechaCreacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fechaActualizacion` DATETIME(3) NULL,

    UNIQUE INDEX `publicId`(`publicId`),
    UNIQUE INDEX `email`(`email`),
    INDEX `Usuarios_idUsuario_publicId_idx`(`idUsuario`, `publicId`),
    INDEX `Usuarios_ibfk_1`(`estatus`),
    PRIMARY KEY (`idUsuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PingServidores` ADD CONSTRAINT `PingServidores_ibfk_1` FOREIGN KEY (`idServidor`) REFERENCES `Servidores`(`idServidor`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Servidores` ADD CONSTRAINT `Servidores_ibfk_1` FOREIGN KEY (`estatus`) REFERENCES `EstatusServidores`(`tipo`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Servidores` ADD CONSTRAINT `Servidores_idUsuario_fkey` FOREIGN KEY (`idUsuario`) REFERENCES `Usuarios`(`idUsuario`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tasks` ADD CONSTRAINT `Tasks_ibfk_1` FOREIGN KEY (`idServidor`) REFERENCES `Servidores`(`idServidor`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Usuarios` ADD CONSTRAINT `Usuarios_ibfk_1` FOREIGN KEY (`estatus`) REFERENCES `EstatusUsuarios`(`tipo`) ON DELETE NO ACTION ON UPDATE NO ACTION;
