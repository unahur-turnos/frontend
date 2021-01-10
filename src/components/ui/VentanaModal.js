import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import React from 'react';
import { deleteById } from '../../helpers/fetchApi';

export default function VentanaModal(props) {
  const {
    abrirModal,
    setAbrirModal,
    ruta,
    entidades,
    setEntidades,
    idEntidadAEliminar,
  } = props;

  const cerrarModal = () => {
    setAbrirModal(false);
  };

  const eliminar = () => {
    deleteById(ruta, idEntidadAEliminar)
      .then(() => {
        const items = entidades.filter(
          (entidad) => idEntidadAEliminar !== entidad.id
        );
        setEntidades(items);
      })
      .catch((error) => console.log(error));

    cerrarModal();
  };

  return (
    <Dialog
      onClose={() => cerrarModal()}
      aria-labelledby="simple-dialog-title"
      open={abrirModal}
    >
      <DialogTitle id="alert-dialog-slide-title">
        {'¿Está seguro que desea borrar?'}
      </DialogTitle>
      <DialogActions>
        <Button onClick={() => cerrarModal()}>Cancelar</Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => eliminar()}
        >
          Borrar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

VentanaModal.propTypes = {
  abrirModal: PropTypes.bool,
  setAbrirModal: PropTypes.func,
  ruta: PropTypes.string,
  entidades: PropTypes.array,
  setEntidades: PropTypes.func,
  idEntidadAEliminar: PropTypes.number,
};
