import { DateTime } from 'luxon';

export const toString = (fecha) => {
  return DateTime.fromISO(fecha)
    .setLocale('es')
    .toLocaleString(DateTime.DATETIME_SHORT);
};

export const dateFormatter = (fecha) => {
  return DateTime.fromISO(fecha).setLocale('es').toFormat("yyyy-MM-dd'T'HH:mm");
};
