/*
  Warnings:

  - Made the column `tipo` on table `Producto` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Producto" ALTER COLUMN "tipo" SET NOT NULL;
