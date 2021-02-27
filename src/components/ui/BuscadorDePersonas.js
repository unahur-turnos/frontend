import { InputAdornment, TextField } from '@material-ui/core';
import { anyPass, filter, includes, startsWith } from 'ramda';

import { PropTypes } from 'prop-types';
import SearchIcon from '@material-ui/icons/Search';
import { parserStringToLowerCase } from '../../utils/parserStringToLowerCase';

export function BuscadorDePersonas(props) {
  const { listaDeRecoil, setListaParaMostrar } = props;

  const filtrarLista = (e) => {
    const validarBusqueda = (valor) => {
      return includes(
        parserStringToLowerCase(e.target.value),
        parserStringToLowerCase(valor)
      );
    };

    const validarNombre = (it) => {
      return validarBusqueda(it.Usuario.nombre);
    };
    const validarApellido = (it) => {
      return validarBusqueda(it.Usuario.apellido);
    };
    const validarDNI = (it) => {
      return startsWith(e.target.value.toString(), it.Usuario.dni.toString());
    };

    const validar = anyPass([validarNombre, validarApellido, validarDNI]);

    const nuevaLista = filter((it) => validar(it), listaDeRecoil);

    setListaParaMostrar(nuevaLista);
  };

  return (
    <TextField
      fullWidth
      label="Buscar por nombre, apellido o DNI"
      variant="outlined"
      onChange={filtrarLista}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
}

BuscadorDePersonas.propTypes = {
  listaDeRecoil: PropTypes.arrayOf(PropTypes.object),
  setListaParaMostrar: PropTypes.func,
};
