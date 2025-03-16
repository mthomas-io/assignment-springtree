"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useActionState } from "react";
import { Button } from "../ui/button";
import CountrySelect from "./country-select";
import SearchBox from "./search-box";

type Props = {
  countries: {
    value: string;
    label: string;
  }[];
};

type FormErrors = {
  search?: string;
};

type FormState = {
  errors: FormErrors;
};

export default function BreedFilterForm({ countries }: Props) {
  const searchParams = useSearchParams();
  const path = usePathname();
  const router = useRouter();

  const initialState: FormState = {
    errors: {},
  };

  const handleClearForm = () => {
    // just call with empty form data
    return performSearch(state, new FormData());
  };

  // Very basic form validation to then perform search,
  // can be moved to its own Action file once we use actual server stuff
  const performSearch = (
    previousState: FormState | undefined,
    formData: FormData
  ) => {
    const errors: FormErrors = {};

    const origin = formData.get("origin") as string;
    const search = formData.get("search") as string;

    if (origin && !search) {
      errors.search = "A search query is required!";
    }

    // Check if any errors exist
    if (Object.keys(errors).length > 0) {
      console.log("returning errors");
      return {
        errors,
      };
    }

    // Since our formdata contains only strings, it can be passed as SearchParams directly
    const newSearchParams = new URLSearchParams();

    if (origin) {
      newSearchParams.set("origin", origin);
    }

    if (search) {
      newSearchParams.set("search", search);
    }

    router.push(`${path}?${newSearchParams.toString()}`);
    return {
      errors: {},
    };
  };

  const [state, formAction, isPending] = useActionState<FormState, FormData>(
    performSearch,
    initialState
  );

  return (
    <form action={formAction} className="w-full space-y-2">
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="flex-1">
          <CountrySelect
            id="country-select"
            name="origin"
            initialValue={searchParams.get("origin") ?? ""}
            countries={countries}
          />
        </div>
        <div className="flex-1">
          <SearchBox
            name="search"
            value={searchParams.get("search") ?? ""}
            error={state?.errors.search}
          />
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <Button type="button" variant="ghost" onClick={handleClearForm}>
          Clear
        </Button>
        <Button type="submit" disabled={isPending}>
          Search
        </Button>
      </div>
    </form>
  );
}
