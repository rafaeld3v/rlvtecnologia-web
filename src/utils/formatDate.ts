export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString("pt-BR", { month: "long" });
  const year = date.getFullYear();
  return `${day} de ${month} de ${year}`;
};
