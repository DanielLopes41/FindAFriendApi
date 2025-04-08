/*
  Warnings:

  - You are about to drop the column `Email` on the `Orgs` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Orgs` table. All the data in the column will be lost.
  - You are about to drop the column `password_Hash` on the `Orgs` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Orgs` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `Orgs` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Orgs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password_hash` to the `Orgs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Orgs` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Orgs_Email_key";

-- AlterTable
ALTER TABLE "Orgs" DROP COLUMN "Email",
DROP COLUMN "createdAt",
DROP COLUMN "password_Hash",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "password_hash" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Orgs_email_key" ON "Orgs"("email");
