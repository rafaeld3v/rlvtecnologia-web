export interface NewsProps {
  id: number;
  tipo: string;
  titulo: string;
  introducao: string;
  data_publicacao: string;
  produto_id?: number;
  produtos?: string;
  editorias: string;
  imagens: string;
  produtos_relacionados: string;
  destaque: boolean;
  link: string;
}

export interface NewsResponse {
  count: number;
  page: number;
  totalPages: number;
  nextPage: number | null;
  previousPage: number | null;
  showingFrom: number;
  showingTo: number;
  items: NewsProps[];
}
