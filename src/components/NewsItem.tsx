/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-unused-vars */

import Image from "next/image";
import Link from "next/link";

import { NewsProps } from "@/@types/News";
import { API_URL } from "@/services/api";
import { formatDate } from "@/utils/formatDate";

export function NewsItem({
  id,
  link,
  titulo,
  imagens,
  data_publicacao,
}: NewsProps) {
  const limitedTitle =
    titulo.length > 56 ? titulo.substring(0, 56) + "..." : titulo;

  return (
    <li className="flex max-h-96 w-60 flex-col gap-4 rounded-md bg-white p-4 shadow shadow-gray-400">
      <Link href={`/news-details/${id}`}>
        {imagens && (
          <Image
            src={`${API_URL}/${JSON.parse(imagens).image_intro}`}
            alt={titulo}
            width={128}
            height={128}
            className="text-sm"
          />
        )}

        <strong className="flex h-10 overflow-y-hidden text-sm">
          {limitedTitle}
        </strong>

        <strong className="text-xs">{formatDate(data_publicacao)}</strong>
      </Link>

      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-center text-sm underline hover:text-sky-700"
      >
        Site oficial
      </a>
    </li>
  );
}
