import Image from "next/image";
import { getBreed, getBreedCats } from "@/lib/clients/cat-api";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default async function BreedPage({
  params,
  searchParams,
}: {
  params: Promise<{ breedId: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { breedId } = await params;
  const page = +((await searchParams)?.page ?? "1");

  const breed = await getBreed(breedId);
  const catImages = await getBreedCats(breedId, page - 1);

  return (
    <>
      <h2>Everything about the {breed.name}</h2>
      <h2>Here are some examples:</h2>

      <ul className="my-8 grid auto-rows-min gap-4 grid-cols-1 sm:grid-cols-3 lg:grid-cols-5">
        {catImages.data.map((img) => (
          <li key={img.id}>
            <div className="group space-y-2">
              <div className="aspect-square rounded-xl bg-muted overflow-hidden flex items-center justify-center">
                {img.url ? (
                  <Image
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform"
                    src={img?.url}
                    width={img.width}
                    height={img.height}
                    alt="A cat"
                  />
                ) : (
                  <p>No image</p>
                )}
              </div>

              {/* <div className="flex items-center justify-between">
                <p className="line-clamp-2 text-xs text-muted-foreground">
                  230923 votes
                </p>
                <Button variant="outline">Vote up</Button>
              </div> */}
            </div>
          </li>
        ))}
      </ul>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            {page > 1 && (
              <PaginationPrevious href={`/${breedId}?page=${page - 1}`} />
            )}
          </PaginationItem>
          {Array.from({
            length: Math.ceil(
              catImages.paging.totalItems / catImages.paging.itemsPerPage
            ),
          }).map((_, i) => (
            <PaginationItem key={i}>
              <PaginationLink
                href={`/${breedId}?page=${i + 1}`}
                isActive={page === i + 1}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            {page <
              Math.ceil(
                catImages.paging.totalItems / catImages.paging.itemsPerPage
              ) && <PaginationNext href={`/${breedId}?page=${page + 1}`} />}
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
}
