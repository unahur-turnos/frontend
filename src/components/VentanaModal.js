import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { blue } from '@material-ui/core/colors';

export default function VentanaModal(props) {
  const { abrirModal, setAbrirModal, espacios, setEspacios, idEspacio } = props;

  const cerrarModal = () => {
    setAbrirModal(false);
  };

  const eliminarEspacio = () => {
    const items = espacios.items.filter((item) => idEspacio !== item.idEspacio);
    setEspacios({ items });
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
  espacios: PropTypes.object,
  setEspacios: PropTypes.func,
  idEspacio: PropTypes.number,
};
