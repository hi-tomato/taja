import dayjs from "dayjs";
import "dayjs/locale/ko";

dayjs.locale("ko");

export const FORMATTED = dayjs().format("YYYY.MM.DD HH:mm");

export const formatDate = (
  date: Date | string | number,
  format: string = "YYYY.MM.DD HH:mm"
) => {
  return dayjs(date).format(format);
};

export const NOW = dayjs();

export { dayjs };
