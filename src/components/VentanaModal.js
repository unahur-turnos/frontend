import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import React from 'react';
import { eliminarPorId } from '../api/metodosApi';

export default function VentanaModal(props) {
  const { abrirModal, setAbrirModal, espacios, setEspacios, idEspacio } = props;

  const cerrarModal = () => {
    setAbrirModal(false);
  };

  const eliminarEspacio = () => {
    eliminarPorId('espacios', idEspacio)
      .then(() => {
        const items = espacios.filter((espacio) => idEspacio !== espacio.id);
        setEspacios(items);
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
          onClick={() => eliminarEspacio()}
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
  espacios: PropTypes.array,
  setEspacios: PropTypes.func,
  idEspacio: PropTypes.number,
};
