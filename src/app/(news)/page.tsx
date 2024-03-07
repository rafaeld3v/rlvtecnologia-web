"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { HashLoader } from "react-spinners";

import { NewsResponse } from "@/@types/News";
import { NewsItem } from "@/components/NewsItem";
import { API_URL } from "@/services/api";

export default function Home() {
  const [page, setPage] = useState(1);
  const pageSize = 8;

  const { data, isLoading, isError } = useQuery<NewsResponse>({
    queryKey: ["news", page, pageSize],
    queryFn: () =>
      fetch(`${API_URL}?page=${page}&qtd=${pageSize}`).then((res) =>
        res.json(),
      ),
  });

  const handleNextPage = () => {
    if (data?.nextPage !== null) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (data?.previousPage !== null) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  if (isLoading) {
    return (
      <main className="flex h-screen w-full flex-col items-center justify-center gap-4">
        <HashLoader color="rgb(59, 130, 246, 1)" />
        <h1 className="mb-4 text-3xl font-bold">Está carregando...</h1>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="flex h-screen w-full flex-col items-center justify-center gap-4">
        <h1 className="mb-4 text-3xl font-bold">Erro ao buscar notícias...</h1>
      </main>
    );
  }

  return (
    <main className="flex h-full w-full flex-col gap-8">
      <div className="flex w-full flex-col items-center justify-center gap-4 bg-sky-700 px-4 py-8 md:p-12">
        <h1 className="text-3xl font-bold text-white ">Lorem ipsum</h1>
        <p className="text-md max-w-[1040px] text-center text-white">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto,
          maxime aspernatur. Nihil cumque exercitationem facilis nulla incidunt
          ipsam laboriosam, dolorum dignissimos minus, velit debitis! Aperiam
          repellendus odio qui minima itaque?
        </p>
      </div>

      <div className="flex justify-center">
        <ul className="grid justify-center gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array.isArray(data?.items) &&
            data.items.map((news) => <NewsItem key={news.id} {...news} />)}
        </ul>
      </div>

      <div className="m-auto flex max-w-[1040px] items-center justify-between gap-8 px-20 pb-8">
        <button
          onClick={handlePrevPage}
          disabled={page === 1}
          className="w-32 rounded bg-sky-700 px-4 py-2 text-white hover:bg-sky-600 disabled:cursor-not-allowed"
        >
          Anterior
        </button>

        <span>
          Página {page} de {data?.totalPages || 1}
        </span>

        <button
          onClick={handleNextPage}
          disabled={!data?.nextPage}
          className="w-32 rounded bg-sky-700 px-4 py-2 text-white hover:bg-sky-600 disabled:cursor-not-allowed"
        >
          Próxima
        </button>
      </div>
    </main>
  );
}
