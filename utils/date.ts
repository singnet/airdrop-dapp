import moment from "moment";

export const getDateInStandardFormat = (dateObject : string | Date) : string => {
  return moment.utc(dateObject).local().format("YYYY-MM-DD HH:mm:ss");
};

export const isDateBetween = (startDate: string | Date, endDate: string | Date, actualDate: string | Date): boolean => {
  startDate = new Date(startDate);
  endDate = new Date(endDate);
  actualDate = new Date(actualDate);
  return actualDate.getTime() > startDate.getTime() && actualDate.getTime() < endDate.getTime();
};

export const isDateGreaterThan = (date: string | Date, actualDate: string | Date): boolean => {
  date = new Date(date);
  actualDate = new Date(actualDate);
  return date.getTime() > actualDate.getTime();
};
