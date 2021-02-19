import { Button, Dialog } from '@material-ui/core';
import { always, identity, propEq } from 'ramda';

import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import { useApi } from '../../utils/fetchApi';
import { map, ifElse } from 'ramda';

const reemplazarPorId = (elemento) =>
  map(ifElse(propEq('id', elemento.id), always(elemento), identity));

export default function ConfirmarEntrada({
  abrirModal,
  setAbrirModal,
  autorizacionARegistrar,
  setAutorizaciones,
}) {
  const { create } = useApi(
    `autorizaciones/${autorizacionARegistrar?.id}/ingreso`
  );

  const cerrarModal = () => {
    setAbrirModal(false);
  };

  const registrarIngreso = async () => {
    const { data } = await create(autorizacionARegistrar);
    setAutorizaciones(reemplazarPorId(data));
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
  autorizaciones: PropTypes.arrayOf(PropTypes.object),
  setAutorizaciones: PropTypes.func,
};
