"use server";

import { ApiBreed } from "./types";

const API_BASE_URL = "https://api.thecatapi.com/v1";

const catCall = async <T>(endpoint: string) => {
  const data = await fetch(`${API_BASE_URL}${endpoint}`, {
    cache: "force-cache",
    headers: new Headers({
      "Content-Type": "application/json",
      "x-api-key": process.env.CAT_API_KEY!,
    }),
  });

  return data.json() as Promise<T>;
};

export const getBreeds = async () => {
  return catCall<ApiBreed[]>("/breeds?limit=1000");
};
