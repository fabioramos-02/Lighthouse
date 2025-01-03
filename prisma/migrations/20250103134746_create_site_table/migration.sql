/*
  Warnings:

  - You are about to drop the column `siteUrl` on the `SiteAnalysis` table. All the data in the column will be lost.
  - Added the required column `siteId` to the `SiteAnalysis` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SiteAnalysis" DROP COLUMN "siteUrl",
ADD COLUMN     "siteId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Site" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "orgao" TEXT NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Site_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Site_url_key" ON "Site"("url");

-- AddForeignKey
ALTER TABLE "SiteAnalysis" ADD CONSTRAINT "SiteAnalysis_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Site"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
