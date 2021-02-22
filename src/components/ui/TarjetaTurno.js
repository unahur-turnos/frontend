import {
  Button,
  Typography,
  Divider,
  Card,
  CardContent,
  CardActions,
  withStyles,
} from '@material-ui/core';
import { PropTypes } from 'prop-types';
import { fechaHoraActividad } from '../../utils/dateUtils';
import ConfirmarEliminacion from './ConfirmarEliminacion';
import { useState } from 'react';

export default function TarjetaTurno(props) {
  const { autorizacion, mostrarBoton } = props;
  const [abrirModal, setAbrirModal] = useState(false);
  const [entidad, setEntidad] = useState('');

  const autorizacionAEliminar = (entidad) => {
    setEntidad({
      id: entidad.id,
      nombre: entidad.Actividad.nombre,
    });
    setAbrirModal(true);
  };

  return (
    <>
      <Card>
        <CardContent>
          <Typography variant="h6">{autorizacion.Actividad.nombre} </Typography>
          <Typography variant="body2">
            {fechaHoraActividad(
              autorizacion.Actividad.fechaHoraInicio,
              autorizacion.Actividad.fechaHoraFin
            )}
          </Typography>
          <Typography variant="body2">
            {autorizacion.Actividad.Espacio.nombre} (
            {autorizacion.Actividad.Espacio.Edificio.nombre})
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {autorizacion.Actividad.responsable}
          </Typography>
        </CardContent>
        {mostrarBoton && (
          <>
            <Divider />
            <CardActions>
              <CancelButton
                size="small"
                onClick={() => autorizacionAEliminar(autorizacion)}
              >
                Cancelar turno
              </CancelButton>
            </CardActions>
          </>
        )}
      </Card>
      <ConfirmarEliminacion
        abrirModal={abrirModal}
        setAbrirModal={setAbrirModal}
        ruta={'autorizaciones'}
        rutaActualizacion={`usuarios/yo/autorizaciones`}
        entidadAEliminar={entidad}
      />
    </>
  );
}

TarjetaTurno.propTypes = {
  autorizacion: PropTypes.obj,
  mostrarBoton: PropTypes.bool,
};

const CancelButton = withStyles(({ palette }) => ({
  root: {
    color: palette.error.main,
    '&:hover': {
      color: palette.error.dark,
    },
  },
}))(Button);
