import {
  Button,
  Card,
  CardContent,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  makeStyles,
  TextField,
} from '@material-ui/core';

import ConfirmarEntrada from '../ui/ConfirmarEntrada';
import { DateTime } from 'luxon';
import { PropTypes } from 'prop-types';
import SelectorActividad from './SelectorActividad';
import { autorizacionesPorActividad } from '../../state/autorizaciones';
import { sort } from 'ramda';
import { hourFormatter } from '../../utils/dateUtils';
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
  const [autorizaciones, setAutorizaciones] = useState(autorizacionesState);

  const [abrirModal, setAbrirModal] = useState(false);
  const [autorizacionARegistrar, setAutorizacionARegistrar] = useState();

  const confirmarRegistro = (autorizacion) => {
    setAutorizacionARegistrar(autorizacion);
    setAbrirModal(true);
  };

  const ordenarLista = () => {
    const listaOrdenada = () =>
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
    return sort(listaOrdenada(false), autorizaciones);
  };

  return (
    <>
      {/* <TextField 
      label="Ingrese un DNI, o apellido" 
      
      /> */}

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
            {ordenarLista().map((autorizacion) => {
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
