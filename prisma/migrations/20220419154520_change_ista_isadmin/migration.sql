/*
  Warnings:

  - You are about to drop the column `isTA` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "isTA",
ADD COLUMN     "isAdmin" BOOLEAN NOT NULL DEFAULT false;
