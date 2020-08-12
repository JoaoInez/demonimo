import { pt } from "date-fns/locale";
import { formatDistanceToNowStrict } from "date-fns";

const howLongSince = (date) =>
  formatDistanceToNowStrict(new Date(date), { locale: pt });

export default howLongSince;
