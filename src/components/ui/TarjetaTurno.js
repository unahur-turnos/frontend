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
  const { turno, mostrarBoton } = props;
  const [abrirModal, setAbrirModal] = useState(false);
  const [entidad, setEntidad] = useState('');

  const turnoAEliminar = (entidad) => {
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
          <Typography variant="h6">{turno.Actividad.nombre} </Typography>
          <Typography variant="body2">
            {fechaHoraActividad(
              turno.Actividad.fechaHoraInicio,
              turno.Actividad.fechaHoraFin
            )}
          </Typography>
          <Typography variant="body2">
            {turno.Actividad.Espacio.nombre} (
            {turno.Actividad.Espacio.Edificio.nombre})
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {turno.Actividad.responsable}
          </Typography>
        </CardContent>
        {mostrarBoton && (
          <>
            <Divider />
            <CardActions>
              <CancelButton size="small" onClick={() => turnoAEliminar(turno)}>
                Cancelar turno
              </CancelButton>
            </CardActions>
          </>
        )}
      </Card>
      <ConfirmarEliminacion
        abrirModal={abrirModal}
        setAbrirModal={setAbrirModal}
        ruta={'turnos'}
        rutaActualizacion={`usuarios/yo/turnos`}
        entidadAEliminar={entidad}
      />
    </>
  );
}

TarjetaTurno.propTypes = {
  turno: PropTypes.obj,
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
