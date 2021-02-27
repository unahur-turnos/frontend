import { InputAdornment, TextField } from '@material-ui/core';
import { any, anyPass, filter, includes } from 'ramda';
import { PropTypes } from 'prop-types';
import { parserStringToLowerCase } from '../../utils/parserStringToLowerCase';
import SearchIcon from '@material-ui/icons/Search';

export function BuscadorDePersonas(props) {
  const { listaDeRecoil, setListaParaMostrar } = props;

  const filtrarLista = (e) => {
    const nuevaLista = filter(
      (it) =>
        includes(
          parserStringToLowerCase(e.target.value),
          parserStringToLowerCase(it.Usuario.apellido)
        ),
      listaDeRecoil
    );

    setListaParaMostrar(nuevaLista);
  };

  return (
    <TextField
      fullWidth
      label="Busca una persona por nombre o DNI"
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
