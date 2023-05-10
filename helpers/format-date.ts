import { TDateISO } from '@/types/date-iso';

export const formatDate = (date: TDateISO) => {
  const timestamp = new Date(Date.parse(date));
  const day = timestamp.getDate();
  const month = timestamp.getMonth() + 1;
  const year = timestamp.getFullYear();

  return `${day < 10 ? '0' + day : day}.${month < 10 ? '0' + month : month}.${year}`;
};
