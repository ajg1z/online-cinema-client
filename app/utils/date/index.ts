import { format, isValid, parse } from 'date-fns';
import { enUS } from 'date-fns/locale';

export const DATE_FORMATS_CLIENT = {
  hour: 'EEEEEE dd.MM.yyyy HH:mm',
  day: 'dd.MM.yyyy',
  week: 'EEEEEE dd.MM.yyyy',
  month: 'MMM yyyy',
  quarter: 'yyyy q',
  year: 'yyyy',
};

export type DiscretenessType =
  | `hour`
  | `day`
  | `week`
  | `month`
  | `quarter`
  | `year`;

const currentLocalization = enUS;

export const parseClientDate = (
  date: string,
  discreteness: DiscretenessType,
) => {
  let formatString = DATE_FORMATS_CLIENT[discreteness];

  const parsedDate = parse(date, formatString, new Date(), {
    weekStartsOn: 1,
    firstWeekContainsDate: 4,
    locale: currentLocalization,
  });

  return isValid(parsedDate) ? parsedDate : new Date();
};

export const formatDate = (
  date: number | Date,
  formatData: DiscretenessType,
) => {
  return format(date, formatData, {
    locale: currentLocalization,
    weekStartsOn: 1,
    firstWeekContainsDate: 4,
  });
};

export const convertMongoDate = (date: string) =>
  new Date(date).toLocaleDateString(`ru`);
