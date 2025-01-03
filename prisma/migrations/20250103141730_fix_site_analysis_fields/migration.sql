/*
  Warnings:

  - Added the required column `siteUrl` to the `SiteAnalysis` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SiteAnalysis" ADD COLUMN     "siteUrl" TEXT NOT NULL;
