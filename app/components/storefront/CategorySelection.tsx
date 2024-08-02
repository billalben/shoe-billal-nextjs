import Image from "next/image";
import Link from "next/link";
import all from "@/public/all.jpeg";
import men from "@/public/men.jpeg";
import women from "@/public/women.jpeg";

export function CategoriesSelection() {
  return (
    <div className="py-24 sm:py-32">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-extrabold tracking-tight">
          Shop by Category
        </h2>

        <Link
          className="text-sm font-semibold text-primary hover:text-primary/80"
          href="/products/all"
        >
          Browse all Products &rarr;
        </Link>
      </div>

      <div className="mt-6 grid gap-6 md:max-h-[668px] md:grid-cols-2 md:grid-rows-2">
        <div className="relative overflow-hidden rounded-lg md:row-span-2">
          <Image
            src={all}
            alt="All Products Image"
            className="h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50" />
          <div className="absolute bottom-0 w-full p-6">
            <Link href="/products/all">
              <h3 className="font-semibold text-white">All Products</h3>
              <p className="mt-1 text-sm text-white">Shop Now</p>
            </Link>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-lg">
          <Image
            src={men}
            alt="Products for men Image"
            className="h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-55" />
          <div className="absolute bottom-0 w-full p-6">
            <Link href="/products/men">
              <h3 className="font-semibold text-white">Products for Men</h3>
              <p className="mt-1 text-sm text-white">Shop Now</p>
            </Link>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-lg">
          <Image
            src={women}
            alt="Women product image"
            className="h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-55" />
          <div className="absolute bottom-0 w-full p-6">
            <Link href="/products/women">
              <h3 className="font-semibold text-white">Products for Women</h3>
              <p className="mt-1 text-sm text-white">Shop Now</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
