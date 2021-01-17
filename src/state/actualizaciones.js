import { atomFamily, useSetRecoilState } from 'recoil';

export const contadorActualizacionesState = atomFamily({
  key: 'contadorActualizaciones',
  default: 0,
});

export function useNotificarActualizacion(nombreEntidad) {
  const setContador = useSetRecoilState(
    contadorActualizacionesState(nombreEntidad)
  );
  return () => {
    setContador((contador) => contador + 1);
  };
}
