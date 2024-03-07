"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { HashLoader } from "react-spinners";

import { NewsResponse } from "@/@types/News";
import { API_URL } from "@/services/api";
import { formatDate } from "@/utils/formatDate";

interface NewsDetailsProps {
  params: {
    id: string;
  };
}

export default function NewsDetails({ params }: NewsDetailsProps) {
  const { data, isLoading, isError } = useQuery<NewsResponse>({
    queryKey: ["news-details", params.id],
    queryFn: () =>
      fetch(`${API_URL}?id=${params.id}`).then((res) => res.json()),
    enabled: !!params.id,
  });

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
        <h1 className="mb-4 text-3xl font-bold">Erro ao carregar notícia...</h1>
      </main>
    );
  }

  return (
    <div className="h-full w-full">
      {Array.isArray(data?.items) &&
        data.items
          .filter((news) => news.id === Number(params.id))
          .map((news) => (
            <>
              <div
                key={news.id}
                className="flex w-full flex-col items-center justify-center gap-4 bg-sky-700 px-4 py-8 md:p-12"
              >
                <h1 className="mb-4 text-3xl font-bold text-white">
                  Lorem ipsum
                </h1>
              </div>

              <div className="m-auto flex max-w-[1040px] flex-col items-start gap-4 px-8 py-8">
                <h1 className="mb-4 text-3xl font-bold">{news.titulo}</h1>

                <div className="flex flex-col gap-1">
                  <span className=" text-gray-600">
                    Data da publicação: {formatDate(news.data_publicacao)}
                  </span>
                  <span className=" text-gray-600">
                    Editora: {news.editorias}
                  </span>
                </div>

                <div className="flex w-full items-center justify-center ">
                  <Image
                    src={`${API_URL}?id=${params.id}/${JSON.parse(news.imagens).image_fulltext}`}
                    alt=""
                    width={768}
                    height={352}
                  />
                </div>

                <p className="text-lg">{news.introducao}</p>

                <Link
                  className="mt-4 text-sky-700 underline hover:text-sky-600"
                  href={news.link || ""}
                >
                  Ver notícia completa no site oficial
                </Link>
              </div>
            </>
          ))}
    </div>
  );
}
