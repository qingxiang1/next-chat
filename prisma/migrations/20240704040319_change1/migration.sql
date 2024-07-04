/*
  Warnings:

  - Added the required column `user_id` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `user_id` VARCHAR(191) NOT NULL,
    MODIFY `password` VARCHAR(191) NULL,
    MODIFY `ip` VARCHAR(191) NULL,
    MODIFY `sys_type` VARCHAR(191) NULL;
