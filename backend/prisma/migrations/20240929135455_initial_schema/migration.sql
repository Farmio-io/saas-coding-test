-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('SGD', 'IDR', 'HKD', 'USD');

-- CreateTable
CREATE TABLE "Product" (
    "product_id" TEXT NOT NULL,
    "product_name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("product_id")
);

-- CreateTable
CREATE TABLE "Customer" (
    "customer_id" TEXT NOT NULL,
    "customer_name" TEXT NOT NULL,
    "currency" "Currency" NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("customer_id")
);

-- CreateTable
CREATE TABLE "Pricing" (
    "pricing_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "customer_id" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "effective_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pricing_pkey" PRIMARY KEY ("pricing_id")
);

-- CreateTable
CREATE TABLE "PriceHistory" (
    "history_id" TEXT NOT NULL,
    "pricing_id" TEXT NOT NULL,
    "previous_price" INTEGER NOT NULL,
    "updated_price" INTEGER NOT NULL,
    "update_timestamp" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PriceHistory_pkey" PRIMARY KEY ("history_id")
);

-- CreateIndex
CREATE INDEX "Pricing_effective_date_idx" ON "Pricing"("effective_date");

-- CreateIndex
CREATE INDEX "Pricing_product_id_customer_id_idx" ON "Pricing"("product_id", "customer_id");

-- CreateIndex
CREATE INDEX "PriceHistory_pricing_id_idx" ON "PriceHistory"("pricing_id");

-- AddForeignKey
ALTER TABLE "Pricing" ADD CONSTRAINT "Pricing_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pricing" ADD CONSTRAINT "Pricing_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "Customer"("customer_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PriceHistory" ADD CONSTRAINT "PriceHistory_pricing_id_fkey" FOREIGN KEY ("pricing_id") REFERENCES "Pricing"("pricing_id") ON DELETE RESTRICT ON UPDATE CASCADE;
