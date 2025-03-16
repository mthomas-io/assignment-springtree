import { getBreeds } from "@/lib/clients/cat-api";
import Image from "next/image";

type Props = {
  filters?: {
    origin?: string;
    search?: string;
  };
};

export default async function BreedList({ filters }: Props) {
  // Fetch all breeds for breed filter
  const allBreeds = await getBreeds();

  const filteredBreeds = !filters
    ? allBreeds
    : allBreeds.filter((breed) => {
        if (filters.origin && breed.country_code !== filters.origin)
          return false;

        const searchTarget = `${breed.name} ${breed.description}`.toLowerCase();
        if (
          filters.search &&
          searchTarget.indexOf(filters.search.toLowerCase()) === -1
        )
          return false;

        return true;
      });

  // filter breeds based on url params
  return (
    <div className="grid auto-rows-min gap-4 grid-cols-1 sm:grid-cols-3 lg:grid-cols-5">
      {filteredBreeds.map((breed) => (
        <div key={breed.id} className="group space-y-2">
          <div className="aspect-square rounded-xl bg-muted overflow-hidden flex items-center justify-center">
            {breed.image ? (
              <Image
                className="object-cover w-full h-full group-hover:scale-110 transition-transform"
                src={breed.image?.url}
                width={breed.image.width}
                height={breed.image.height}
                alt={breed.name}
              />
            ) : (
              <p>No image</p>
            )}
          </div>

          <div className="flex flex-col">
            <h2 className="font-bold">{breed.name}</h2>
            <p className="line-clamp-2 text-xs text-muted-foreground">
              {breed.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
