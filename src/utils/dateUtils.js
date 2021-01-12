import { DateTime } from 'luxon';

export const toString = (fecha) => {
  return DateTime.fromISO(fecha)
    .setLocale('es')
    .toLocaleString(DateTime.DATETIME_SHORT);
};

export const toISO = (fecha) => {
  return fecha !== null
    ? DateTime.fromISO(fecha).setLocale('es').toISO().slice(0, 16)
    : DateTime.local().toISO().slice(0, 16);
};
