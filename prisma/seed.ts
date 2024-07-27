import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  // await prisma.banner.create({
  //   data: {
  //     title: "Banner 1",
  //     imageString: "https://via.placeholder.com/150",
  //   },
  // });
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
