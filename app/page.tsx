import { Suspense } from "react";
import BreedFilter from "@/components/breed-filter";
import BreedList from "@/components/breed-list";
import { Skeleton } from "@/components/ui/skeleton";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;

  const filters = {
    origin: (params.origin as string) ?? "",
    search: (params.search as string) ?? "",
  };

  return (
    <div>
      <div className="flex max-w-xl mx-auto my-8 p-8 border-1 rounded-xl">
        <Suspense fallback={<Skeleton className="h-12 w-xl rounded-xl" />}>
          <BreedFilter />
        </Suspense>
      </div>

      <Suspense
        fallback={
          <div className="grid auto-rows-min gap-4 grid-cols-1 sm:grid-cols-3 lg:grid-cols-5">
            {Array.from({ length: 20 }).map((_, i) => (
              <Skeleton key={i} className="aspect-square rounded-xl" />
            ))}
          </div>
        }
      >
        <BreedList filters={filters} />
      </Suspense>
    </div>
  );
}
