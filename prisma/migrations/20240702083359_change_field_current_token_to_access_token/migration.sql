/*
  Warnings:

  - You are about to drop the column `currentToken` on the `sessions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "sessions"
RENAME COLUMN "currentToken" TO "accessToken";
