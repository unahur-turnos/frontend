import {
  Button,
  Typography,
  Divider,
  Card,
  CardContent,
  CardActions,
} from '@material-ui/core';
import { PropTypes } from 'prop-types';
import { fechaHoraActividad } from '../../utils/dateUtils';
import ConfirmarEliminacion from '../ui/ConfirmarEliminacion';
import { useState } from 'react';

export default function Tarjeta(props) {
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
          <Typography variant="body1">
            {autorizacion.Actividad.nombre}{' '}
          </Typography>
          <Typography variant="body2">
            {fechaHoraActividad(
              autorizacion.Actividad.fechaHoraInicio,
              autorizacion.Actividad.fechaHoraFin
            )}
          </Typography>
          <Typography variant="body2">
            {autorizacion.Actividad.Espacio.nombre} -{' '}
            {autorizacion.Actividad.Espacio.Edificio.nombre}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {autorizacion.Actividad.responsable}
          </Typography>
        </CardContent>
        {mostrarBoton && (
          <>
            <Divider />
            <CardActions>
              <Button
                size="small"
                color="secondary"
                onClick={() => autorizacionAEliminar(autorizacion)}
              >
                Cancelar turno
              </Button>
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

Tarjeta.propTypes = {
  autorizacion: PropTypes.obj,
  mostrarBoton: PropTypes.bool,
};
