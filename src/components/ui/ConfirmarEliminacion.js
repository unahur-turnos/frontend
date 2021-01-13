import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import React from 'react';
import { deleteById } from '../../helpers/fetchApi';
import { useNotificarActualizacion } from '../../state/actualizaciones';

export default function VentanaModal(props) {
  const { abrirModal, setAbrirModal, ruta, idEntidadAEliminar } = props;

  const notificarActualizacion = useNotificarActualizacion(ruta);

  const cerrarModal = () => {
    setAbrirModal(false);
  };

  const eliminar = async () => {
    await deleteById(ruta, idEntidadAEliminar);
    notificarActualizacion();
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
        <Button variant="contained" onClick={() => cerrarModal()}>
          Cancelar
        </Button>
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
  idEntidadAEliminar: PropTypes.number,
};
