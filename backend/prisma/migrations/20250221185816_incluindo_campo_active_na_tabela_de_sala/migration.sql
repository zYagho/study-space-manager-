/*
  Warnings:

  - Added the required column `active` to the `rooms` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "rooms" ADD COLUMN     "active" BOOLEAN NOT NULL;
