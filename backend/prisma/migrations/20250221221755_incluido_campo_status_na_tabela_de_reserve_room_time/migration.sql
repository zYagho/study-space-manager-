/*
  Warnings:

  - Added the required column `reserveDay` to the `room_reservations_schedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `room_reservations_schedule` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "room_reservations_schedule" ADD COLUMN     "reserveDay" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "status" BOOLEAN NOT NULL;
