import { Spinner } from "@/components";
import { Anime } from "@/models";
import { useGetAnimeQuery, usePrefetch } from "@/services/api/anime";
import { Inter } from "next/font/google";
import { useState } from "react";
import copy from "clipboard-copy";
import { toast } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  const pagePrefetch = usePrefetch("getAnime");
  const { data, isLoading } = useGetAnimeQuery({ page, q: search });

  return (
    <main
      className={`flex min-h-screen flex-col items-center p-24 ${inter.className}`}
    >
      <div className="flex flex-row justify-center items-center h-max">
        {isLoading && <Spinner />}
      </div>
      {!isLoading && (
        <div className="grid grid-cols-4 gap-3 max-w-3xl">
          {data?.data?.map((anime: Anime) => (
            <div className="shadow-md bg-white rounded relative overflow-hidden space-y-3 pb-3">
              <img
                src={anime.images.webp.image_url}
                className="aspect-portrait object-cover w-full"
              />
              <div className="px-3 py-1 space-y-3">
                <div className="flex flex-row justify-between">
                  <p>{anime.year || "-"}</p>
                  <p>Score: {anime.score || "0"}</p>
                </div>
                <h3
                  className="font-bold h-full line-clamp-2 cursor-pointer"
                  title={anime.title}
                  onClick={() => {
                    copy(anime.title);
                    toast.success("Copied");
                  }}
                >
                  {anime.title}
                </h3>
              </div>
            </div>
          ))}
          <div className="flex flex-row justify-center w-full col-span-4">
            <button
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
            >
              <span className="sr-only">Previous</span>
              <svg
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <button
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              onMouseOver={() => pagePrefetch({ page: page + 1, q: search })}
              onClick={() => setPage(page + 1)}
              disabled={!data?.pagination?.has_next_page || false}
            >
              <span className="sr-only">Next</span>
              <svg
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <p className="col-span-4 text-center">
            {data?.pagination?.items?.total} Anime
          </p>
        </div>
      )}
    </main>
  );
}
