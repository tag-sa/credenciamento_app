import moment from "moment";

export const getAge = (date: string) => {
  const today = moment();
  const birthDate = moment(date);
  const years = today.diff(birthDate, "year");

  return years;
};
