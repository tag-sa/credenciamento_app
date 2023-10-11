const formatTime = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit'
    };
  
    const formattedTime = new Date(dateString).toLocaleTimeString('pt-BR', options);
    return formattedTime;
  };
  
  const formatDateTimeRange = (start: string, end: string): string => {
    const formattedStart = formatTime(start);
    const formattedEnd = formatTime(end);
    return `${formattedStart} às ${formattedEnd}`;
  };
  
  export default formatDateTimeRange;