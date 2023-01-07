import dayjs from 'dayjs';

export const getDayYYMMDD = date => {
  return dayjs(date).format('YYYY.DD.MM.HH:mm');
};
