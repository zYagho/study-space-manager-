/*
  Warnings:

  - You are about to drop the column `active` on the `rooms` table. All the data in the column will be lost.
  - Added the required column `status` to the `reservations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `rooms` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "reservations" ADD COLUMN     "status" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "rooms" DROP COLUMN "active",
ADD COLUMN     "status" BOOLEAN NOT NULL;
