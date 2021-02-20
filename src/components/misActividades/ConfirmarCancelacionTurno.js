import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import { filter } from 'ramda';
import { useApi } from '../../utils/fetchApi';
import { DangerButton } from '../ui/Botones';

export default function ConfirmarCancelacionTurno({
  abrirModal,
  setAbrirModal,
  listaAutorizaciones,
  setListaAutorizaciones,
  entidadAEliminar,
}) {
  const { deleteById } = useApi('autorizaciones');

  const cerrarModal = () => {
    setAbrirModal(false);
  };

  const eliminar = async () => {
    //await deleteById(entidadAEliminar.id);
    console.log(entidadAEliminar.id);
    setListaAutorizaciones(
      filter(
        (autorizacion) => autorizacion.id !== entidadAEliminar.id,
        listaAutorizaciones
      )
    );
    cerrarModal();
  };

  return (
    <Dialog
      onClose={() => cerrarModal()}
      aria-labelledby="simple-dialog-title"
      open={abrirModal}
    >
      <DialogTitle id="alert-dialog-slide-title">
        ¿Confirma que desea cancelar el turno{' '}
        <strong>{entidadAEliminar?.nombre}</strong>?
      </DialogTitle>
      <DialogActions>
        <Button onClick={cerrarModal}>Cancelar</Button>
        <DangerButton variant="contained" onClick={eliminar}>
          Borrar
        </DangerButton>
      </DialogActions>
    </Dialog>
  );
}

ConfirmarCancelacionTurno.propTypes = {
  abrirModal: PropTypes.bool,
  setAbrirModal: PropTypes.func,
  listaAutorizaciones: PropTypes.object,
  setListaAutorizaciones: PropTypes.func,
  entidadAEliminar: PropTypes.shape({
    id: PropTypes.number,
    nombre: PropTypes.string,
  }),
};
