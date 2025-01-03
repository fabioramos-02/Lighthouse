-- AlterTable
ALTER TABLE "Site" ADD COLUMN     "usuarioId" INTEGER;

-- AddForeignKey
ALTER TABLE "Site" ADD CONSTRAINT "Site_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;
