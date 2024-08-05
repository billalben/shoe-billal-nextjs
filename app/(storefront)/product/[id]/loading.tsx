import { Skeleton } from "@/components/ui/skeleton";

export default function ProductLoadingRoute() {
  return (
    <div className="grid items-start gap-6 py-6 md:grid-cols-2 lg:gap-x-16">
      <div className="space-y-6">
        <Skeleton className="h-96 w-full" />
        <div className="flex flex-wrap items-center justify-start gap-4">
          <Skeleton className="h-[100px] w-[100px]" />
          <Skeleton className="h-[100px] w-[100px]" />
          <Skeleton className="h-[100px] w-[100px]" />
        </div>
      </div>

      <div className="flex h-full flex-col gap-4">
        <Skeleton className="h-7 w-56" />
        <Skeleton className="h-5 w-36" />
        <div className="flex items-center gap-1">
          <Skeleton className="h-5 w-5 rounded-full" />
          <Skeleton className="h-5 w-5 rounded-full" />
          <Skeleton className="h-5 w-5 rounded-full" />
          <Skeleton className="h-5 w-5 rounded-full" />
        </div>
        <div className="flex-1 space-y-1 pt-8">
          <Skeleton className="w-4/4 h-4" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-2/4" />
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="w-4/4 h-4" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="w-4/4 h-4" />
        </div>
        <Skeleton className="h-12 w-full" />
      </div>
    </div>
  );
}
