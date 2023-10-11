const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit'
  };

  const formattedDate = new Date(dateString).toLocaleDateString('pt-BR', options);
  return formattedDate;
};

export default formatDate;
