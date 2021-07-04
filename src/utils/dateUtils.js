import { DateTime } from 'luxon';

export const toString = (fecha) => {
  return DateTime.fromISO(fecha)
    .setLocale('es')
    .toLocaleString(DateTime.DATETIME_SHORT);
};

export const dateFormatter = (fecha) => {
  return DateTime.fromISO(fecha).setLocale('es').toFormat("yyyy-MM-dd'T'HH:mm");
};

export const hourFormatter = (fecha) => {
  return DateTime.fromISO(fecha).setLocale('es').toFormat('T');
};

export const formatCurrentDay = (fecha) => {
  return DateTime.fromISO(fecha).toFormat('yyyy-MM-dd');
};

export const fechaHoraActividad = (fechaHoraInicio, fechaHoraFin) => {
  const inicio = DateTime.fromISO(fechaHoraInicio)
    .setLocale('es')
    .toFormat("cccc D 'de' T 'a'");
  const fin = hourFormatter(fechaHoraFin);

  return `${inicio} ${fin}`;
};

export const formatISO = (fecha) => {
  return DateTime.fromISO(fecha).toISO();
};

export const formatDateToDay = (day, hour) => {
  return `${day}T${hour}`;
};

export const getDateOnly = (fecha) => {
  return DateTime.fromISO(fecha).toISODate();
};

export const horarioComparable = (horario) => {
  return DateTime.fromISO(horario);
};
