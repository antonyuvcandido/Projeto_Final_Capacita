-- CreateTable
CREATE TABLE "public"."ItemTransacao" (
    "id" TEXT NOT NULL,
    "idTransacao" TEXT NOT NULL,
    "nomeProduto" TEXT NOT NULL,
    "precoProduto" DECIMAL(65,30) NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "imagemProduto" TEXT,
    "valorItem" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "ItemTransacao_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."ItemTransacao" ADD CONSTRAINT "ItemTransacao_idTransacao_fkey" FOREIGN KEY ("idTransacao") REFERENCES "public"."Transacao"("id") ON DELETE CASCADE ON UPDATE CASCADE;
