/*
  Warnings:

  - Added the required column `apellido1` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `apellido2` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "apellido1" TEXT NOT NULL,
ADD COLUMN     "apellido2" TEXT NOT NULL;
