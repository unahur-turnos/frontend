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

import ConfirmarEntrada from '../ui/ConfirmarEntrada';
import { DateTime } from 'luxon';
import { PropTypes } from 'prop-types';
import SelectorActividad from './SelectorActividad';
import { autorizacionesPorActividad } from '../../state/autorizaciones';
import { hourFormatter } from '../../utils/dateUtils';
import { sort } from 'ramda';
import { todasLasActividades } from '../../state/actividades';
import { useRecoilValue } from 'recoil';
import { useState } from 'react';

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

export default function ControlAcceso() {
  const classes = useStyles();

  const fechaActual = DateTime.local().toISODate();
  const actividades = useRecoilValue(
    todasLasActividades({ desde: fechaActual, hasta: fechaActual })
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
          <SelectorActividad
            actividades={actividades}
            funcionOnChange={setActividadSeleccionada}
            esAsistente={false}
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

function DatosActividad({ actividad }) {
  const classes = useStyles();
  const { Espacio, fechaHoraInicio, fechaHoraFin, responsable } = actividad;

  return (
    <Card className={classes.card} variant="outlined">
      <CardContent>
        <Typography variant="body1">{`${Espacio.nombre} (${Espacio.Edificio.nombre})`}</Typography>
        <Typography variant="body1">
          {`${hourFormatter(fechaHoraInicio)} - ${hourFormatter(fechaHoraFin)}`}
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
  const [autorizaciones, setAutorizaciones] = useState(autorizacionesState);
  const [listaDeAutCompleta, setListaDeAutCompleta] = useState();

  const [autorizacionARegistrar, setAutorizacionARegistrar] = useState();

  const [abrirModal, setAbrirModal] = useState(false);
  const [check, setCheck] = useState(true);

  const confirmarRegistro = (autorizacion) => {
    setAutorizacionARegistrar(autorizacion);
    setAbrirModal(true);
  };

  const listaOrdenada = () => {
    const orden = () =>
      function (a, b) {
        if (a.fechaHoraIngreso === b.fechaHoraIngreso) {
          return 0;
        } else if (a.fechaHoraIngreso === null) {
          return -1;
        } else if (b.fechaHoraIngreso === null) {
          return 1;
        } else {
          return a.fechaHoraIngreso < b.fechaHoraIngreso ||
            a.Usuario.apellido < b.Usuario.apellido
            ? 1
            : -1;
        }
      };
    return sort(orden(false), autorizaciones);
  };

  const cambioCheck = () => {
    setListaDeAutCompleta(autorizaciones);
    setCheck(!check);
    if (check) {
      const listaFiltrada = autorizaciones.filter(
        (autorizacion) => autorizacion.fechaHoraIngreso === null
      );
      setAutorizaciones(listaFiltrada);
    } else {
      setAutorizaciones(listaDeAutCompleta);
    }
  };

  return (
    <>
      <Box display="flex" justifyContent="center">
        <FormGroup>
          <FormControlLabel
            label="Ver registrados"
            labelPlacement="start"
            control={
              <Switch defaultChecked onChange={cambioCheck} color="primary" />
            }
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
            {listaOrdenada().map((autorizacion) => {
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
          autorizaciones={autorizaciones}
          setAutorizaciones={setAutorizaciones}
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
