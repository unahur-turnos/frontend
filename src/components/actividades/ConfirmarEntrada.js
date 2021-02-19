import { Button, Dialog } from '@material-ui/core';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import { useApi } from '../../utils/fetchApi';
import { useNotificarActualizacion } from '../../state/actualizaciones';

export default function ConfirmarEntrada({
  abrirModal,
  setAbrirModal,
  autorizacionARegistrar,
  idActividad,
}) {
  const { create } = useApi(
    `autorizaciones/${autorizacionARegistrar?.id}/ingreso`
  );

  const notificarActualizacion = useNotificarActualizacion(
    `actividades/${idActividad}/autorizaciones`
  );

  const cerrarModal = () => {
    setAbrirModal(false);
  };

  const registrarIngreso = async () => {
    await create(autorizacionARegistrar);
    notificarActualizacion();
    cerrarModal();
  };

  return (
    <Dialog
      onClose={() => cerrarModal()}
      aria-labelledby="simple-dialog-title"
      open={abrirModal}
    >
      <DialogTitle>
        ¿Confirma que desea registrar el ingreso de{' '}
        <strong>
          {autorizacionARegistrar?.Usuario.apellido}{' '}
          {autorizacionARegistrar?.Usuario.nombre}
        </strong>
        ?
      </DialogTitle>
      <DialogActions>
        <Button variant="contained" color="primary" onClick={registrarIngreso}>
          Confirmar
        </Button>
        <Button onClick={cerrarModal}>Cancelar</Button>
      </DialogActions>
    </Dialog>
  );
}

ConfirmarEntrada.propTypes = {
  abrirModal: PropTypes.bool,
  setAbrirModal: PropTypes.func,
  autorizacionARegistrar: PropTypes.object,
  idActividad: PropTypes.number,
};
