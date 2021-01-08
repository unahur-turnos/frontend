const createData = (
  id,
  nombre,
  espacio,
  responsable,
  fechaInicio,
  fechaFin,
  aforo
) => {
  return { id, nombre, espacio, responsable, fechaInicio, fechaFin, aforo };
};

export const getActividades = () => {
  return [
    createData(
      1,
      'Lectura grupal',
      'Malvinas',
      'Ashe Rodriguez',
      new Date(),
      new Date(),
      25
    ),
    createData(
      2,
      'Laboratorio de Diseño Industrial',
      'Origone A',
      'Joaquin Pettinari',
      new Date(),
      new Date(),
      25
    ),
    createData(
      3,
      'Prácticas de voley',
      'Deportivo',
      'Pablo Gerez',
      new Date(),
      new Date(),
      25
    ),
    createData(
      4,
      'Prácticas de voley',
      'Deportivo',
      'Pablo Gerez',
      new Date(),
      new Date(),
      25
    ),
    createData(
      5,
      'Prácticas de voley',
      'Deportivo',
      'Pablo Gerez',
      new Date(),
      new Date(),
      25
    ),
  ];
};
