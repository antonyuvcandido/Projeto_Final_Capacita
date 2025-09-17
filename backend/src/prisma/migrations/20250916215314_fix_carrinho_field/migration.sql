/*
  Warnings:

  - You are about to drop the column `IdUsuario` on the `Carrinho` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[idUsuario]` on the table `Carrinho` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `idUsuario` to the `Carrinho` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Carrinho" DROP CONSTRAINT "Carrinho_IdUsuario_fkey";

-- DropIndex
DROP INDEX "public"."Carrinho_IdUsuario_key";

-- AlterTable
ALTER TABLE "public"."Carrinho" DROP COLUMN "IdUsuario",
ADD COLUMN     "idUsuario" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Carrinho_idUsuario_key" ON "public"."Carrinho"("idUsuario");

-- AddForeignKey
ALTER TABLE "public"."Carrinho" ADD CONSTRAINT "Carrinho_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "public"."Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;
