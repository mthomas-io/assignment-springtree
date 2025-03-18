import Image from "next/image";
import { getBreed, getBreedCatImages } from "@/lib/clients/cat-api";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import VoteForm from "@/components/voting-form";
import UserForm from "@/components/user-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
  const catImages = await getBreedCatImages(breedId, page - 1);

  return (
    <>
      <div className="my-16 flex flex-col md:flex-row items-start gap-16">
        <div className="w-full md:w-64 flex flex-col gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Set your voting profile</CardTitle>
              <CardDescription>
                This allows our cat overlords to see who is voting.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <UserForm />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>This is the {breed.name} cat</CardTitle>
              <CardDescription>
                Here are all details, and you can vote on your favorites in the
                image gallery.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <h2>details:</h2>
              <p>to do</p>
            </CardContent>
          </Card>
        </div>

        <div className="flex-1">
          <p className="mx-auto text-xl italic text-pretty max-w-lg">
            &quot;{breed.description}&quot;
          </p>

          <ul className="my-8 grid auto-rows-min gap-4 grid-cols-2 lg:grid-cols-4">
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

                  <div className="flex items-center justify-between">
                    {/* <p className="line-clamp-2 text-xs text-muted-foreground">
                  230923 votes
                </p> */}
                    <VoteForm imageId={img.id} />
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {/* To do: extract to component */}
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
        </div>
      </div>
    </>
  );
}
