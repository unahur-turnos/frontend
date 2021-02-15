import { Button, Dialog } from '@material-ui/core';

import { DateTime } from 'luxon';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import { dateFormatter } from '../../utils/dateUtils';
import { useApi } from '../../utils/fetchApi';
import { useNotificarActualizacion } from '../../state/actualizaciones';

export default function ConfirmarEntrada({
  abrirModal,
  entidad,
  autorizacionesRegistradas,
  autorizacionesNoRegistradas,
  setAbrirModal,
  setEntidad,
  setAutorizacionesRegistradas,
  setAutorizacionesNoRegistradas,
}) {
  const { create } = useApi(`autorizaciones/${entidad?.id}/ingreso`);

  const cerrarModal = () => {
    setAbrirModal(false);
  };

  const registrarIngreso = async () => {
    //await create(entidad);
    setAutorizacionesNoRegistradas(
      autorizacionesNoRegistradas.filter((autorizacion) => {
        autorizacion.id !== entidad.id;
      })
    );
    setAutorizacionesRegistradas(autorizacionesRegistradas.concat(entidad));
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
          {entidad?.Usuario.apellido} {entidad?.Usuario.nombre}
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
  entidad: PropTypes.object,
  autorizacionesRegistradas: PropTypes.object,
  autorizacionesNoRegistradas: PropTypes.object,
  setEntidad: PropTypes.func,
  setAutorizacionesRegistradas: PropTypes.func,
  setAutorizacionesNoRegistradas: PropTypes.func,
};
