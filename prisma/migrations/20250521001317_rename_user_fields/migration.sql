/*
  Warnings:

  - You are about to drop the column `apellido1` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `apellido2` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `nombre` on the `User` table. All the data in the column will be lost.
  - Added the required column `firstName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName1` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName2` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "apellido1",
DROP COLUMN "apellido2",
DROP COLUMN "nombre",
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName1" TEXT NOT NULL,
ADD COLUMN     "lastName2" TEXT NOT NULL;
