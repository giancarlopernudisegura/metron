/*
  Warnings:

  - You are about to drop the column `instructorEmail` on the `Assignment` table. All the data in the column will be lost.
  - You are about to drop the `Class` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TeachingAssistant` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Assignment" DROP CONSTRAINT "Assignment_courseId_fkey";

-- DropForeignKey
ALTER TABLE "Assignment" DROP CONSTRAINT "Assignment_instructorEmail_fkey";

-- DropForeignKey
ALTER TABLE "TeachingAssistant" DROP CONSTRAINT "TeachingAssistant_assignmentId_fkey";

-- DropForeignKey
ALTER TABLE "TeachingAssistant" DROP CONSTRAINT "TeachingAssistant_userEmail_fkey";

-- DropIndex
DROP INDEX "Assignment_instructorEmail_idx";

-- AlterTable
ALTER TABLE "Assignment" DROP COLUMN "instructorEmail";

-- DropTable
DROP TABLE "Class";

-- DropTable
DROP TABLE "TeachingAssistant";

-- CreateTable
CREATE TABLE "Course" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT E'',

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeachingStaff" (
    "userEmail" TEXT NOT NULL,
    "courseId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Student" (
    "userEmail" TEXT NOT NULL,
    "courseId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Course_name_key" ON "Course"("name");

-- CreateIndex
CREATE INDEX "Course_name_idx" ON "Course"("name");

-- CreateIndex
CREATE INDEX "TeachingStaff_courseId_userEmail_idx" ON "TeachingStaff"("courseId", "userEmail");

-- CreateIndex
CREATE UNIQUE INDEX "TeachingStaff_courseId_userEmail_key" ON "TeachingStaff"("courseId", "userEmail");

-- CreateIndex
CREATE INDEX "Student_courseId_userEmail_idx" ON "Student"("courseId", "userEmail");

-- CreateIndex
CREATE UNIQUE INDEX "Student_courseId_userEmail_key" ON "Student"("courseId", "userEmail");

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeachingStaff" ADD CONSTRAINT "TeachingStaff_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeachingStaff" ADD CONSTRAINT "TeachingStaff_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
