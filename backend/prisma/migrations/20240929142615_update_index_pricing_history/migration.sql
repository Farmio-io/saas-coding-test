/*
  Warnings:

  - A unique constraint covering the columns `[product_id,customer_id]` on the table `Pricing` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Pricing_product_id_customer_id_idx";

-- AlterTable
ALTER TABLE "Pricing" ALTER COLUMN "effective_date" SET DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "Pricing_product_id_customer_id_key" ON "Pricing"("product_id", "customer_id");
