import { getBreeds } from "@/lib/clients/cat-api";
import BreedFilterForm from "./form";

type SelectOption = {
  value: string;
  label: string;
};

export default async function BreedFilter() {
  // We fetch all breeds, since there aren't that many and they're cached.
  const breeds = await getBreeds();

  const countries = breeds.reduce((options, breed) => {
    if (options.some((option) => option.value === breed.country_code)) {
      return options;
    }

    return [...options, { value: breed.country_code, label: breed.origin }];
  }, [] as SelectOption[]);

  return <BreedFilterForm countries={countries} />;
}
