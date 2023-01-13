import dayjs from 'dayjs';

export const getDayYYMMDD = (date: string) => {
  return dayjs(date).format('YYYY.DD.MM.HH:mm');
};
