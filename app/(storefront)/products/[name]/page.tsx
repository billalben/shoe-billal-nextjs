import { ProductCard } from "@/app/components/storefront/ProductCard";
import prisma from "@/app/lib/db";
import { notFound } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";
import { ProductStatus } from "@prisma/client";

async function fetchProductsByCategory(
  category: "all" | "men" | "women" | "kids",
) {
  const whereClause =
    category === "all"
      ? { status: ProductStatus.published }
      : { status: ProductStatus.published, category };

  const data = await prisma.product.findMany({
    select: {
      id: true,
      name: true,
      images: true,
      price: true,
      description: true,
    },
    where: whereClause,
  });

  return data;
}

async function getData(productCategory: string) {
  const categoryTitleMap: { [key: string]: string } = {
    all: "All Products",
    men: "Products for Men",
    women: "Products for Women",
    kids: "Products for Kids",
  };

  const title = categoryTitleMap[productCategory];
  if (!title) return notFound();

  const data = await fetchProductsByCategory(
    productCategory as "all" | "men" | "women" | "kids",
  );

  return { title, data };
}

export default async function CategoriesPage({
  params,
}: {
  params: { name: string };
}) {
  noStore();
  const { data, title } = await getData(params.name);
  return (
    <section>
      <h1 className="my-5 text-3xl font-semibold">{title}</h1>
      <div className="relative grid min-h-[500px] gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {data.length > 0 ? (
          data.map((item) => <ProductCard item={item} key={item.id} />)
        ) : (
          <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            No products found
          </p>
        )}
      </div>
    </section>
  );
}
