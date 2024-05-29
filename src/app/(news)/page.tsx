"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { HashLoader } from "react-spinners";
import { z } from "zod";

import { NewsResponse } from "@/@types/News";
import { Input } from "@/components/Input";
import { NewsItem } from "@/components/NewsItem";
import { API_URL } from "@/services/api";

const newsFilterFormScheme = z.object({
  search: z.string().optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  type: z.string().optional(),
});

type NewsFilterFormInputs = z.infer<typeof newsFilterFormScheme>;

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<NewsFilterFormInputs>({
    resolver: zodResolver(newsFilterFormScheme),
    defaultValues: {
      search: "",
      startDate: undefined,
      endDate: undefined,
      type: "",
    },
  });

  const pageSize = 8;
  const [page, setPage] = useState(1);

  const {
    data: newsData,
    isLoading,
    isError,
  } = useQuery<NewsResponse>({
    queryKey: ["news", page, pageSize],
    queryFn: () =>
      fetch(`${API_URL}?page=${page}&qtd=${pageSize}`).then((res) =>
        res.json(),
      ),
  });

  async function handleNewsFilter(data: NewsFilterFormInputs) {
    console.log(data);
    reset();
  }

  const handleNextPage = () => {
    if (newsData?.nextPage !== null) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (newsData?.previousPage !== null) {
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

      <form
        onSubmit={handleSubmit(handleNewsFilter)}
        className="flex w-full   flex-col  items-center justify-center gap-4 sm:flex-row"
      >
        <Input
          label="Busca"
          id="search"
          register={register("search")}
          type="text"
          placeholder="Termo de busca"
        />

        {/* <Input
          label="De"
          id="startDate"
          register={register("startDate")}
          type="date"
          placeholder="De"
        />

        <Input
          label="Até"
          id="endDate"
          register={register("endDate")}
          type="date"
          placeholder="Até"
        /> */}

        <div className="flex items-center justify-between gap-4">
          <label htmlFor="type" className="text-gray-800">
            Tipo
          </label>
          <select
            {...register("type")}
            id="type"
            className="rounded-md border border-gray-300 px-2 py-1"
          >
            <option value="">Tipo</option>
            <option value="noticia">Notícia</option>
            <option value="release">Lançamento</option>
          </select>
        </div>

        <button
          type="submit"
          className="rounded-md bg-sky-700 px-4 py-2 text-white hover:bg-sky-600"
          disabled={isSubmitting}
        >
          Filtrar
        </button>
      </form>

      <div className="flex justify-center">
        <ul className="grid justify-center gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array.isArray(newsData?.items) &&
            newsData.items.map((news) => <NewsItem key={news.id} {...news} />)}
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
          Página {page} de {newsData?.totalPages || 1}
        </span>

        <button
          onClick={handleNextPage}
          disabled={!newsData?.nextPage}
          className="w-32 rounded bg-sky-700 px-4 py-2 text-white hover:bg-sky-600 disabled:cursor-not-allowed"
        >
          Próxima
        </button>
      </div>
    </main>
  );
}
