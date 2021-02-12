import { Button, Dialog } from '@material-ui/core';

import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import { useApi } from '../../utils/fetchApi';
import { useNotificarActualizacion } from '../../state/actualizaciones';

export default function ConfirmarEntrada({
  abrirModal,
  setAbrirModal,
  ruta,
  entidad,
}) {
  const notificarActualizacion = useNotificarActualizacion(ruta);
  const { create } = useApi(ruta);

  const cerrarModal = () => {
    setAbrirModal(false);
  };

  // TODO: pegarle al nuevo endpoint
  const registrarIngreso = async () => {
    //  await create(entidad.id);
    //  notificarActualizacion();
    cerrarModal();
  };

  return (
    <Dialog
      onClose={() => cerrarModal()}
      aria-labelledby="simple-dialog-title"
      open={abrirModal}
    >
      {console.log(entidad)}
      <DialogTitle>
        ¿Confirma que desea registrar el ingreso de{' '}
        <strong>
          {entidad.Usuario.apellido} {entidad.Usuario.nombre}
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
  ruta: PropTypes.string,
  entidad: PropTypes.object,
};
