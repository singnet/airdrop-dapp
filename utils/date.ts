import moment from 'moment';

export const checkDateIsGreaterThan = (date1, date2) => moment(date1).isAfter(date2);

export const checkDateIsBetween = (start, end, dateToCheck) =>
  moment(dateToCheck).isBetween(moment(start), moment(end));

export const getDateInStandardFormat = (dateObj) => moment.utc(dateObj).local().format('LLL');
