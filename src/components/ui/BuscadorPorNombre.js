import { TextField } from '@material-ui/core';
import { filter, includes } from 'ramda';
import { PropTypes } from 'prop-types';
import { parserStringToLowerCase } from '../../utils/parserStringToLowerCase';

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

  return <TextField label={label} variant="outlined" onChange={filtrarLista} />;
}

BuscadorPorNombre.propTypes = {
  listaDeRecoil: PropTypes.arrayOf(PropTypes.object),
  setListaParaMostrar: PropTypes.func,
  label: PropTypes.string,
};
