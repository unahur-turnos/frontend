import { Button, Dialog } from '@material-ui/core';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import { useApi } from '../../utils/fetchApi';
import { useNotificarActualizacion } from '../../state/actualizaciones';

export default function ConfirmarEntrada({
  abrirModal,
  setAbrirModal,
  turnoARegistrar,
  idActividad,
}) {
  const { create } = useApi(`turnos/${turnoARegistrar?.id}/ingreso`);

  const notificarActualizacion = useNotificarActualizacion(
    `actividades/${idActividad}/turnos`
  );

  const cerrarModal = () => {
    setAbrirModal(false);
  };

  const registrarIngreso = async () => {
    await create(turnoARegistrar);
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
          {turnoARegistrar?.Usuario.apellido} {turnoARegistrar?.Usuario.nombre}
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
  turnoARegistrar: PropTypes.object,
  idActividad: PropTypes.number,
};
