import { LoadingProductCard } from "@/app/components/storefront/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingFile() {
  return (
    <div>
      <Skeleton className="my-5 h-8 w-56" />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <LoadingProductCard />
        <LoadingProductCard />
        <LoadingProductCard />
      </div>
    </div>
  );
}
