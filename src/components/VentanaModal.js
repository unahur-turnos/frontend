import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import axios from 'axios';

export default function VentanaModal(props) {
  const { abrirModal, setAbrirModal, espacios, setEspacios, idEspacio } = props;

  const cerrarModal = () => {
    setAbrirModal(false);
  };

  const eliminarEspacio = () => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/espacios/${idEspacio}`)
      .then((res) => {
        const items = espacios.filter((espacio) => idEspacio !== espacio.id);
        setEspacios(items);
      })
      .catch((err) => {
        console.log('No se pudo hacer el delete: ' + err);
      });
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
