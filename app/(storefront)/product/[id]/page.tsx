import { ShoppingBagButton } from "@/app/components/SubmitButtons";
import { FeaturedProducts } from "@/app/components/storefront/FeaturedProducts";
import { ImageSlider } from "@/app/components/storefront/ImageSlider";
import prisma from "@/app/lib/db";

import { StarIcon } from "lucide-react";
import { notFound } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";

async function getData(productId: string) {
  const data = await prisma.product.findUnique({
    where: {
      id: productId,
    },
    select: {
      price: true,
      images: true,
      description: true,
      name: true,
      id: true,
    },
  });

  if (!data) return notFound();

  return data;
}

export default async function ProductIdRoute({
  params,
}: {
  params: { id: string };
}) {
  noStore();
  const data = await getData(params.id);

  return (
    <>
      <div className="grid grid-cols-1 items-start gap-6 py-6 md:grid-cols-2 lg:gap-x-24">
        <ImageSlider images={data.images} />

        <div>
          <h1 className="text-3xl font-extrabold uppercase tracking-wide text-gray-900">
            {data.name}
          </h1>
          <p className="mt-3 text-2xl text-gray-900">${data.price}</p>
          <div className="mt-3 flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, index) => (
              <StarIcon
                key={index}
                className="h-5 w-5 fill-yellow-400 text-yellow-400"
              />
            ))}
          </div>
          <p className="mt-6 text-base text-gray-700">{data.description}</p>

          <ShoppingBagButton />
        </div>
      </div>

      <div className="mt-16">
        <FeaturedProducts />
      </div>
    </>
  );
}
