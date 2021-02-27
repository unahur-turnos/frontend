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
import { turnosPorActividad } from '../../state/turnos';
import { hourFormatter, fechaHoraActividad } from '../../utils/dateUtils';
import { compose, filter, isNil, sortWith, ascend, propOr } from 'ramda';
import { todasLasActividades } from '../../state/actividades';
import { useRecoilValue } from 'recoil';
import { useState } from 'react';
import { path } from 'ramda';
import { useMemo } from 'react';
import { BuscadorDePersonas } from '../ui/BuscadorDePersonas';

const minDate = new Date(-1000000000).toISOString();

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: 16,
  },
  icon: {
    marginRight: 16,
  },
  card: {
    maxWidth: 320,
    borderColor: theme.palette.primary.main,
  },
  table: {
    maxWidth: '100%',
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
      <Grid item xs={12} align="center">
        <Typography variant="h4" color="primary">
          Control de turnos
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
      <Grid item xs={12} align="center">
        {actividadSeleccionada && (
          <ListadoTurnos idActividad={actividadSeleccionada.id} />
        )}
      </Grid>
    </Grid>
  );
}

function DatosActividad({ actividad }) {
  const classes = useStyles();
  const {
    Espacio,
    fechaHoraInicio,
    fechaHoraFin,
    responsable,
    telefonoDeContactoResponsable,
  } = actividad;

  return (
    <Card className={classes.card} variant="outlined">
      <CardContent>
        <Typography variant="body1">{`${Espacio.nombre} (${Espacio.Edificio.nombre})`}</Typography>
        <Typography variant="body2">
          {fechaHoraActividad(fechaHoraInicio, fechaHoraFin)}
        </Typography>
        <Typography variant="body2">{`Responsable: ${responsable}`}</Typography>
        <Typography variant="body2">
          Teléfono: {telefonoDeContactoResponsable || '-'}
        </Typography>
      </CardContent>
    </Card>
  );
}

function ListadoTurnos({ idActividad }) {
  const classes = useStyles();

  const todosLosTurnos = useRecoilValue(turnosPorActividad(idActividad));
  const [turnoARegistrar, setTurnoARegistrar] = useState();
  const [abrirModal, setAbrirModal] = useState(false);
  const [ocultarRegistrados, setOcultarRegistrados] = useState(false);
  // El useMemo evita que esto se recalcule a cada rato, solo lo hace si cambian sus dependencias.
  const turnosFiltrados = useMemo(
    () =>
      compose(
        sortWith([
          ascend(propOr(minDate, 'fechaHoraIngreso')),
          ascend(path(['Usuario', 'apellido'])),
        ]),
        filter((it) => !ocultarRegistrados || isNil(it.fechaHoraIngreso))
      )(todosLosTurnos),
    [todosLosTurnos, ocultarRegistrados]
  );
  const [listaDeTurnos, setListaDeTurnos] = useState(turnosFiltrados);

  const confirmarRegistro = (turno) => {
    setTurnoARegistrar(turno);
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
      <Grid container spacing={4} align="center">
        <Grid item xs={12}>
          <Grid item xs={12} sm={6} md={4}>
            <BuscadorDePersonas
              listaDeRecoil={turnosFiltrados}
              setListaParaMostrar={setListaDeTurnos}
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} sm={9} md={7}>
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
              {listaDeTurnos.map((turno) => {
                return (
                  <TableRow key={turno.id}>
                    <TableCell align="center">{`${turno.Usuario.apellido} ${turno.Usuario.nombre}`}</TableCell>
                    <TableCell align="center">{`${turno.Usuario.dni}`}</TableCell>
                    <TableCell align="center">
                      {!turno.fechaHoraIngreso ? (
                        <Button
                          color="primary"
                          onClick={() => confirmarRegistro(turno)}
                        >
                          Registrar
                        </Button>
                      ) : (
                        <Typography>
                          {hourFormatter(turno.fechaHoraIngreso)}
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
            turnoARegistrar={turnoARegistrar}
            idActividad={idActividad}
          />
        </TableContainer>
      </Grid>
    </>
  );
}

DatosActividad.propTypes = {
  actividad: PropTypes.object,
};

ListadoTurnos.propTypes = {
  idActividad: PropTypes.number,
};
