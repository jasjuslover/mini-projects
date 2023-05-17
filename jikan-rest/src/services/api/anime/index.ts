import { Anime, ListResponse } from "@/models";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const animeApi = createApi({
  reducerPath: "animeApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.jikan.moe/v4" }),
  tagTypes: ["Animes"],
  endpoints: (builder) => ({
    getAnime: builder.query<ListResponse<Anime>, any | void>({
      query: (arg: { page: number; q: string }) =>
        `/anime?page=${arg.page}&q=${arg.q}&rating=g&limit=8&order_by=score&sort=desc&start_date=2015-01-01`,
      providesTags: (result) =>
        result
          ? [
              ...result?.data?.map(({ mal_id }) => ({
                type: "Animes" as const,
                id: mal_id,
              })),
              "Animes",
            ]
          : ["Animes"],
    }),
  }),
});

export const { useGetAnimeQuery, usePrefetch } = animeApi;
