"use server";

import { ApiBreed, ApiCatImage } from "./types";

const API_BASE_URL = "https://api.thecatapi.com/v1";

const catCall = async <T>(endpoint: string) => {
  const data = await fetch(`${API_BASE_URL}${endpoint}`, {
    cache: "force-cache",
    headers: new Headers({
      "Content-Type": "application/json",
      "x-api-key": process.env.CAT_API_KEY!,
    }),
  });

  return {
    data: (await data.json()) as T,
    // I'm assuming for now that all pages return paging headers
    paging: {
      totalItems: +data.headers.get("pagination-count")!,
      currentPage: +data.headers.get("pagination-page")!,
      itemsPerPage: +data.headers.get("pagination-limit")!,
    },
  };
};

export const getBreeds = async () => {
  return catCall<ApiBreed[]>("/breeds?limit=1000").then(({ data }) => data);
};

export const getBreed = async (breedId: string) => {
  return catCall<ApiBreed>(`/breeds/${breedId}`).then(({ data }) => data);
};

export const getBreedCats = async (breedId: string, page: number = 0) => {
  return catCall<ApiCatImage[]>(
    `/images/search?size=med&mime_types=jpg&format=json&order=ASC&limit=6&page=${page}&breed_ids=${breedId}`
  );
};
