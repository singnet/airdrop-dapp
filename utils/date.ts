import moment from "moment"

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

export const checkDateIsGreaterThan = (date1, date2) => {
  return moment(date1).isAfter(date2);
};

export const checkDateIsBetween = (start, end) => {
  return moment().isBetween(moment(start), moment(end));
};