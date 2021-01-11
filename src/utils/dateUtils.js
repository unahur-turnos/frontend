import { DateTime } from 'luxon';

export const formatearFecha = (fecha) => {
  return DateTime.fromISO(fecha)
    .setLocale('es')
    .toLocaleString(DateTime.DATETIME_SHORT);
};
