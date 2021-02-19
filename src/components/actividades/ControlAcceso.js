import {
  Box,
  Button,
  Card,
  CardContent,
  FormControlLabel,
  FormGroup,
  Grid,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  makeStyles,
} from '@material-ui/core';

import ConfirmarEntrada from './ConfirmarEntrada';
import { DateTime } from 'luxon';
import { PropTypes } from 'prop-types';
import SelectorActividad from './SelectorActividad';
import { autorizacionesPorActividad } from '../../state/autorizaciones';
import { hourFormatter, fechaHoraActividad } from '../../utils/dateUtils';
import { compose, filter, isNil, sortWith, ascend, propOr } from 'ramda';
import { todasLasActividades } from '../../state/actividades';
import { useRecoilValue } from 'recoil';
import { useState } from 'react';
import { path } from 'ramda';
import { useMemo } from 'react';

const minDate = new Date(-1000000000).toISOString();

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
    maxWidth: 320,
    borderColor: theme.palette.primary.main,
  },
  table: {
    maxWidth: '50%',
  },
  tableCell: {
    width: '33%',
  },
}));

export default function ControlAcceso() {
  const classes = useStyles();

  const fechaActual = DateTime.local().toISODate();
  const actividades = useRecoilValue(
    todasLasActividades({ desde: fechaActual })
  );

  const [actividadSeleccionada, setActividadSeleccionada] = useState(null);

  return (
    <Grid container className={classes.container} spacing={4}>
      <Grid item md={12} align="center">
        <Typography variant="h4" color="primary">
          Control de acceso
        </Typography>
      </Grid>
      <Grid container justify="center" spacing={4}>
        <Grid item>
          <SelectorActividad
            actividades={actividades}
            funcionOnChange={setActividadSeleccionada}
            esAsistente={false}
          />
        </Grid>

        <Grid item>
          {actividadSeleccionada && (
            <DatosActividad actividad={actividadSeleccionada} />
          )}
        </Grid>
      </Grid>
      <Grid item md={12} align="center">
        {actividadSeleccionada && (
          <ListadoAutorizaciones idActividad={actividadSeleccionada.id} />
        )}
      </Grid>
    </Grid>
  );
}

function DatosActividad({ actividad }) {
  const classes = useStyles();
  const { Espacio, fechaHoraInicio, fechaHoraFin, responsable } = actividad;

  return (
    <Card className={classes.card} variant="outlined">
      <CardContent>
        <Typography variant="body1">{`${Espacio.nombre} (${Espacio.Edificio.nombre})`}</Typography>
        <Typography variant="body2">
          {fechaHoraActividad(fechaHoraInicio, fechaHoraFin)}
        </Typography>
        <Typography variant="body2">{`Responsable: ${responsable}`}</Typography>
      </CardContent>
    </Card>
  );
}

function ListadoAutorizaciones({ idActividad }) {
  const classes = useStyles();

  const todasLasAutorizaciones = useRecoilValue(
    autorizacionesPorActividad(idActividad)
  );

  const [autorizacionARegistrar, setAutorizacionARegistrar] = useState();

  const [abrirModal, setAbrirModal] = useState(false);
  const [ocultarRegistrados, setOcultarRegistrados] = useState(false);

  // El useMemo evita que esto se recalcule a cada rato, solo lo hace si cambian sus dependencias.
  const autorizacionesFiltradas = useMemo(
    () =>
      compose(
        sortWith([
          ascend(propOr(minDate, 'fechaHoraIngreso')),
          ascend(path(['Usuario', 'apellido'])),
        ]),
        filter((it) => !ocultarRegistrados || isNil(it.fechaHoraIngreso))
      )(todasLasAutorizaciones),
    [todasLasAutorizaciones, ocultarRegistrados]
  );

  const confirmarRegistro = (autorizacion) => {
    setAutorizacionARegistrar(autorizacion);
    setAbrirModal(true);
  };

  const cambioCheck = () => setOcultarRegistrados(!ocultarRegistrados);

  return (
    <>
      <Box display="flex" justifyContent="center">
        <FormGroup>
          <FormControlLabel
            label="Ocultar registrados"
            control={<Switch onChange={cambioCheck} color="primary" />}
          />
        </FormGroup>
      </Box>
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
                Ingreso
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {autorizacionesFiltradas.map((autorizacion) => {
              return (
                <TableRow key={autorizacion.id}>
                  <TableCell align="center">{`${autorizacion.Usuario.apellido} ${autorizacion.Usuario.nombre}`}</TableCell>
                  <TableCell align="center">{`${autorizacion.Usuario.dni}`}</TableCell>
                  <TableCell align="center">
                    {!autorizacion.fechaHoraIngreso ? (
                      <Button
                        color="primary"
                        onClick={() => confirmarRegistro(autorizacion)}
                      >
                        Registrar
                      </Button>
                    ) : (
                      <Typography>
                        {hourFormatter(autorizacion.fechaHoraIngreso)}
                      </Typography>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <ConfirmarEntrada
          abrirModal={abrirModal}
          setAbrirModal={setAbrirModal}
          autorizacionARegistrar={autorizacionARegistrar}
          idActividad={idActividad}
        />
      </TableContainer>
    </>
  );
}

DatosActividad.propTypes = {
  actividad: PropTypes.object,
};

ListadoAutorizaciones.propTypes = {
  idActividad: PropTypes.number,
};
