import {
  Button,
  Grid,
  Typography,
  makeStyles,
  Divider,
  Card,
  CardContent,
  CardActions,
} from '@material-ui/core';
import { useRecoilValue } from 'recoil';
import AddIcon from '@material-ui/icons/Add';
import { PropTypes } from 'prop-types';
import { todasLasAutorizacionesState } from '../../state/usuario';
import { DateTime } from 'luxon';
import { Link } from 'react-router-dom';
import { fechaHoraActividad } from '../../utils/dateUtils';
import ConfirmarEliminacion from '../ui/ConfirmarEliminacion';
import { useState } from 'react';
import ConfirmarCancelacionTurno from './ConfirmarCancelacionTurno';

export default function MisActividades() {
  const autorizaciones = useRecoilValue(todasLasAutorizacionesState);
  const classes = useStyles();
  const [autorizacionesFuturas, setAutorizacionesFuturas] = useState(
    autorizaciones.filter(
      (autorizacion) =>
        DateTime.fromISO(autorizacion.Actividad.fechaHoraInicio) >
        DateTime.local()
    )
  );

  const [autorizacionesPasadas, setAutorizacionesPasadas] = useState(
    autorizaciones.filter(
      (autorizacion) =>
        DateTime.fromISO(autorizacion.Actividad.fechaHoraInicio) <
        DateTime.local()
    )
  );

  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12} align="center">
          <Typography variant="h4" color="primary">
            Mis turnos
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6">Futuros turnos</Typography>
        </Grid>
        <Grid item className={classes.floatRight}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to={`/autorizaciones/nueva`}
            startIcon={<AddIcon />}
          >
            Nuevo turno
          </Button>
        </Grid>

        {autorizacionesFuturas.length !== 0 ? (
          <Tarjeta
            data={autorizacionesFuturas}
            setAutorizacionesPasadas={setAutorizacionesFuturas}
            soyFuturasActividades={true}
          />
        ) : (
          <Grid item xs={12}>
            <Typography>No hay futuros turnos</Typography>
          </Grid>
        )}
        <Grid item xs={12}>
          <Typography variant="h6">Turnos pasados</Typography>
        </Grid>
        {autorizacionesPasadas.length !== 0 ? (
          <Tarjeta
            data={autorizacionesPasadas}
            setAutorizacionesPasadas={setAutorizacionesPasadas}
            soyFuturasActividades={false}
          />
        ) : (
          <Grid item xs={12}>
            <Typography>No hay turnos pasados</Typography>
          </Grid>
        )}
      </Grid>
    </>
  );
}

function Tarjeta(props) {
  const { data, soyFuturasActividades, setAutorizacionesPasadas } = props;
  const classes = useStyles();
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
      <Grid container spacing={2}>
        {data.map((autorizacion) => (
          <Grid item xs={12} sm={6} md={4} key={autorizacion.id}>
            <Card>
              <CardContent>
                <Typography className={classes.title}>
                  {autorizacion.Actividad.nombre}{' '}
                </Typography>
                <Typography className={classes.subtitle}>
                  {fechaHoraActividad(
                    autorizacion.Actividad.fechaHoraInicio,
                    autorizacion.Actividad.fechaHoraFin
                  )}
                </Typography>
                <Typography className={classes.subtitle}>
                  {autorizacion.Actividad.Espacio.nombre} -{' '}
                  {autorizacion.Actividad.Espacio.Edificio.nombre}
                </Typography>
                <Typography className={classes.subtitle} color="textSecondary">
                  {autorizacion.Actividad.responsable}
                </Typography>
              </CardContent>
              {soyFuturasActividades && (
                <>
                  <Divider />
                  <CardActions>
                    <Button
                      size="small"
                      //style={{ color: 'red' }} ES LO MISMO
                      color="secondary"
                      onClick={() => autorizacionAEliminar(autorizacion)}
                    >
                      Cancelar turno
                    </Button>
                  </CardActions>
                </>
              )}
            </Card>
          </Grid>
        ))}
      </Grid>
      <ConfirmarEliminacion
        abrirModal={abrirModal}
        setAbrirModal={setAbrirModal}
        ruta={'autorizaciones'}
        entidadAEliminar={entidad}
      />
      <ConfirmarCancelacionTurno
        abrirModal={abrirModal}
        setAbrirModal={setAbrirModal}
        listaAutorizaciones={data}
        setListaAutorizaciones={setAutorizacionesPasadas}
        entidadAEliminar={entidad}
      />
    </>
  );
}

Tarjeta.propTypes = {
  data: PropTypes.obj,
  setAutorizacionesPasadas: PropTypes.func,
  soyFuturasActividades: PropTypes.bool,
};

const useStyles = makeStyles(() => ({
  floatRight: {
    marginLeft: 'auto',
  },
  title: {
    fontSize: 25,
  },
  subtitle: {
    fontSize: 15,
  },
}));
