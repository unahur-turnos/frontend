import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { deleteById } from '../../helpers/fetchApi';
import { useNotificarActualizacion } from '../../state/actualizaciones';
import { usuarioState } from '../../state/usuario';

export default function ConfirmarEliminacion({
  abrirModal,
  setAbrirModal,
  ruta,
  entidadAEliminar,
}) {
  const notificarActualizacion = useNotificarActualizacion(ruta);
  const usuario = useRecoilValue(usuarioState);

  const cerrarModal = () => {
    setAbrirModal(false);
  };

  const eliminar = async () => {
    await deleteById(ruta, entidadAEliminar.id, usuario);
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
        ¿Confirma que desea eliminar <strong>{entidadAEliminar?.nombre}</strong>
        ?
      </DialogTitle>
      <DialogActions>
        <Button variant="contained" onClick={cerrarModal}>
          Cancelar
        </Button>
        <Button variant="contained" color="secondary" onClick={eliminar}>
          Borrar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

ConfirmarEliminacion.propTypes = {
  abrirModal: PropTypes.bool,
  setAbrirModal: PropTypes.func,
  ruta: PropTypes.string,
  entidadAEliminar: PropTypes.shape({
    id: PropTypes.number,
    nombre: PropTypes.string,
  }),
};
