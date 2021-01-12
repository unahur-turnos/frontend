import { DateTime } from 'luxon';

export const formatearFecha = (fecha) => {
  return DateTime.fromISO(fecha)
    .setLocale('es')
    .toLocaleString(DateTime.DATETIME_SHORT);
};

export const toDateString = (date) => {
  return new Date(date).toISOString().slice(0, 16);
};
