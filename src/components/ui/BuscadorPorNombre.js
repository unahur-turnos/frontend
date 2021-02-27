import { InputAdornment, TextField } from '@material-ui/core';
import { filter, includes } from 'ramda';
import { PropTypes } from 'prop-types';
import { parserStringToLowerCase } from '../../utils/parserStringToLowerCase';
import SearchIcon from '@material-ui/icons/Search';

export function BuscadorPorNombre(props) {
  const { listaDeRecoil, setListaParaMostrar, label } = props;

  const filtrarLista = (e) => {
    const nuevaLista = filter(
      (it) =>
        includes(
          parserStringToLowerCase(e.target.value),
          parserStringToLowerCase(it.nombre)
        ),
      listaDeRecoil
    );
    setListaParaMostrar(nuevaLista);
  };

  return (
    <TextField
      fullWidth
      label={label}
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

BuscadorPorNombre.propTypes = {
  listaDeRecoil: PropTypes.arrayOf(PropTypes.object),
  setListaParaMostrar: PropTypes.func,
  label: PropTypes.string,
};
