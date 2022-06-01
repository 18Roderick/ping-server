/*
  Warnings:

  - You are about to drop the column `descripcion` on the `Servidores` table. All the data in the column will be lost.
  - You are about to drop the column `idUsuario` on the `Servidores` table. All the data in the column will be lost.
  - You are about to drop the column `nombre` on the `Servidores` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Servidores` DROP FOREIGN KEY `Servidores_ibfk_2`;

-- AlterTable
ALTER TABLE `Servidores` DROP COLUMN `descripcion`,
    DROP COLUMN `idUsuario`,
    DROP COLUMN `nombre`,
    MODIFY `fechaActualizacion` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `Tasks` MODIFY `fechaCreacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `fechaActualizacion` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `Usuarios` MODIFY `fechaCreacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `fechaActualizacion` DATETIME(3) NULL;

-- CreateTable
CREATE TABLE `UsuariosServidores` (
    `idUsuario` INTEGER NOT NULL,
    `idServidor` INTEGER NOT NULL,
    `idDetalleServidor` INTEGER NOT NULL,
    `fechaCreacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fechaActualizacion` DATETIME(3) NULL,

    INDEX `UsuariosServidores_idUsuario_idServidor_idDetalleServidor_idx`(`idUsuario`, `idServidor`, `idDetalleServidor`),
    PRIMARY KEY (`idUsuario`, `idServidor`, `idDetalleServidor`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DetallesServidor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(255) NOT NULL,
    `descripcion` TEXT NULL,
    `fechaCreacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fechaActualizacion` DATETIME(3) NULL,

    INDEX `DetallesServidor_id_idx`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `Servidores_publicId_idServidor_idx` ON `Servidores`(`publicId`, `idServidor`);

-- CreateIndex
CREATE INDEX `Usuarios_idUsuario_publicId_idx` ON `Usuarios`(`idUsuario`, `publicId`);

-- AddForeignKey
ALTER TABLE `UsuariosServidores` ADD CONSTRAINT `UsuariosServidores_idServidor_fkey` FOREIGN KEY (`idServidor`) REFERENCES `Servidores`(`idServidor`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `UsuariosServidores` ADD CONSTRAINT `UsuariosServidores_idUsuario_fkey` FOREIGN KEY (`idUsuario`) REFERENCES `Usuarios`(`idUsuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `UsuariosServidores` ADD CONSTRAINT `UsuariosServidores_idDetalleServidor_fkey` FOREIGN KEY (`idDetalleServidor`) REFERENCES `DetallesServidor`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
