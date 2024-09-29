import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.customer.deleteMany();
  const customers = await prisma.customer.createMany({
    data: [
      { customer_name: "Steve Jobs", currency: "SGD" },
      { customer_name: "Mark Zuckeberg", currency: "IDR" },
      { customer_name: "Alan Turing", currency: "HKD" },
      { customer_name: "John Doe", currency: "USD" },
    ],
    skipDuplicates: true,
  });

  await prisma.product.deleteMany();
  const products = await prisma.product.createMany({
    data: [
      { product_name: "Indomie", description: "Indonesian Noodle" },
      { product_name: "Singmie", description: "Singaporean Noodle" },
      { product_name: "Hongmie", description: "Hongkong Noodle" },
      { product_name: "Usmie", description: "United States Noodle" },
    ],
    skipDuplicates: true,
  });

  console.log({ customers, products });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
