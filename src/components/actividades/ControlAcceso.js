import {
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  makeStyles,
} from '@material-ui/core';

import AssignmentIcon from '@material-ui/icons/Assignment';
import { Autocomplete } from '@material-ui/lab';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import ConfirmarEntrada from '../ui/ConfirmarEntrada';
import { DateTime } from 'luxon';
import { PropTypes } from 'prop-types';
import { autorizacionesPorActividad } from '../../state/autorizaciones';
import { hourFormatter } from '../../utils/dateUtils';
import { todasLasActividades } from '../../state/actividades';
import { useRecoilValue } from 'recoil';
import { useState } from 'react';

export default function ControlAcceso() {
  const classes = useStyles();

  const fechaActual = DateTime.local().toISODate();
  const actividades = useRecoilValue(
    todasLasActividades({ desde: '2021-02-01', hasta: fechaActual })
  );

  const [actividadSeleccionada, setActividadSeleccionada] = useState(null);

  return (
    <>
      <Grid container className={classes.container} spacing={4}>
        <Grid item xs={12} align="center">
          <Typography variant="h4" color="primary">
            Actividades del día
          </Typography>
        </Grid>

        <Grid item xs={12} align="center">
          <SeleccionDeActividad
            actividades={actividades}
            setActividadSeleccionada={setActividadSeleccionada}
          />
        </Grid>

        <Grid item xs={12} align="center">
          {actividadSeleccionada && (
            <DatosActividad actividad={actividadSeleccionada} />
          )}
        </Grid>

        <Grid item xs={12} align="center">
          {actividadSeleccionada && (
            <ListadoAutorizaciones idActividad={actividadSeleccionada.id} />
          )}
        </Grid>
      </Grid>
    </>
  );
}

function SeleccionDeActividad({ actividades, setActividadSeleccionada }) {
  const classes = useStyles();

  return (
    <Autocomplete
      id="actividades"
      options={actividades}
      getOptionLabel={(actividad) => actividad.nombre}
      className={classes.autocomplete}
      noOptionsText="No hay actividades que coincidan con la búsqueda"
      onChange={(event, actividad) => {
        setActividadSeleccionada(actividad);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Seleccione una actividad"
          variant="outlined"
        />
      )}
      renderOption={(actividad) => {
        return (
          <Grid container alignItems="center">
            <Grid item>
              <AssignmentIcon color="primary" className={classes.icon} />
            </Grid>
            <Grid item xs>
              <Typography variant="body1" style={{ fontWeight: 700 }}>
                {actividad.nombre}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {`${actividad.Espacio.nombre} - ${actividad.Espacio.Edificio.nombre}`}
              </Typography>
            </Grid>
          </Grid>
        );
      }}
    />
  );
}

function DatosActividad({ actividad }) {
  const classes = useStyles();
  const {
    nombre,
    Espacio,
    fechaHoraInicio,
    fechaHoraFin,
    responsable,
  } = actividad;

  return (
    <Card className={classes.card} variant="outlined">
      <CardContent>
        <Typography variant="h6">{nombre}</Typography>
        <Typography variant="body1">{`Espacio: ${Espacio.nombre}`}</Typography>
        <Typography variant="body1">
          {`Edificio: ${Espacio.Edificio.nombre}`}
        </Typography>
        <Typography variant="body1">
          {`Horario: ${hourFormatter(fechaHoraInicio)} a ${hourFormatter(
            fechaHoraFin
          )}`}
        </Typography>
        <Typography variant="body1">{`Responsable: ${responsable}`}</Typography>
      </CardContent>
    </Card>
  );
}

function ListadoAutorizaciones({ idActividad }) {
  const classes = useStyles();
  const autorizacionesState = useRecoilValue(
    autorizacionesPorActividad(idActividad)
  );
  const [
    autorizacionesNoRegistradas,
    setAutorizacionesNoRegistradas,
  ] = useState(
    autorizacionesState.filter(
      (autorizacion) => autorizacion.fechaHoraIngreso === null
    )
  );
  const [autorizacionesRegistradas, setAutorizacionesRegistradas] = useState(
    autorizacionesState.filter(
      (autorizacion) => autorizacion.fechaHoraIngreso !== null
    )
  );
  const [abrirModal, setAbrirModal] = useState(false);
  const [registroAutorizacion, setRegistroAutorizacion] = useState(
    autorizacionesNoRegistradas[0]
  );

  const confirmarRegistro = (autorizacion) => {
    setRegistroAutorizacion(autorizacion);
    setAbrirModal(true);
  };

  return (
    <TableContainer>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableCell} align="center">
              Asistente
            </TableCell>
            <TableCell className={classes.tableCell} align="center">
              DNI
            </TableCell>
            <TableCell className={classes.tableCell} align="center">
              Acciones
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {autorizacionesNoRegistradas.map((autorizacion) => {
            return (
              <TableRow key={autorizacion.id}>
                <TableCell align="center">{`${autorizacion.Usuario.apellido} ${autorizacion.Usuario.nombre}`}</TableCell>
                <TableCell align="center">{`${autorizacion.Usuario.dni}`}</TableCell>
                <TableCell align="center">
                  <IconButton
                    color="primary"
                    onClick={() => confirmarRegistro(autorizacion)}
                  >
                    <CheckBoxIcon style={{ border: 'none' }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
          {autorizacionesRegistradas
            .sort(function (a, b) {
              return (
                (a.fechaHoraIngreso === null) + (b.fechaHoraIngreso === null) ||
                -(a.fechaHoraIngreso > b.fechaHoraIngreso) ||
                +(a.fechaHoraIngreso < b.fechaHoraIngreso)
              );
            })
            .map((autorizacion) => {
              return (
                <TableRow key={autorizacion.id}>
                  <TableCell align="center">{`${autorizacion.Usuario.apellido} ${autorizacion.Usuario.nombre}`}</TableCell>
                  <TableCell align="center">{`${autorizacion.Usuario.dni}`}</TableCell>
                  <TableCell align="center">
                    <Typography variant="h6">
                      {console.log(autorizacion.fechaHoraIngreso)}
                      {DateTime.fromISO(
                        autorizacion.fechaHoraIngreso !== null
                          ? autorizacion.fechaHoraIngreso
                          : DateTime.local()
                      )
                        .setLocale('es')
                        .toFormat('T')}
                    </Typography>
                  </TableCell>
                </TableRow>
              );
            })}
          {console.log('----------------')}
        </TableBody>
      </Table>
      <ConfirmarEntrada
        abrirModal={abrirModal}
        setAbrirModal={setAbrirModal}
        entidad={registroAutorizacion}
        autorizacionesRegistradas={autorizacionesRegistradas}
        autorizacionesNoRegistradas={autorizacionesNoRegistradas}
        setEntidad={setRegistroAutorizacion}
        setAutorizacionesRegistradas={setAutorizacionesRegistradas}
        setAutorizacionesNoRegistradas={setAutorizacionesNoRegistradas}
      />
    </TableContainer>
  );
}

SeleccionDeActividad.propTypes = {
  actividades: PropTypes.arrayOf(PropTypes.object),
  setActividadSeleccionada: PropTypes.func,
};

DatosActividad.propTypes = {
  actividad: PropTypes.object,
};

ListadoAutorizaciones.propTypes = {
  idActividad: PropTypes.number,
};

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: 16,
  },
  autocomplete: {
    width: 400,
  },
  icon: {
    marginRight: 16,
  },
  card: {
    maxWidth: 275,
    borderRadius: 20,
    borderColor: theme.palette.primary.main,
  },
  table: {
    maxWidth: '50%',
  },
  tableCell: {
    width: '33%',
  },
}));
