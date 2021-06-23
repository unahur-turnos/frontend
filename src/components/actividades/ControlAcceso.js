import {
  Box,
  Button,
  Card,
  CardContent,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { CSVLink } from 'react-csv';
import {
  anyPass,
  ascend,
  compose,
  filter,
  isNil,
  propOr,
  sortWith,
  startsWith,
  path,
} from 'ramda';
import { fechaHoraActividad, hourFormatter } from '../../utils/dateUtils';
import ConfirmarEntrada from './ConfirmarEntrada';
import { DateTime } from 'luxon';
import { PropTypes } from 'prop-types';
import SelectorActividad from './SelectorActividad';
import { todasLasActividades } from '../../state/actividades';
import { turnosPorActividad } from '../../state/turnos';
import { useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { useState } from 'react';
import { Buscador } from '../ui/Buscador';
import { validateSearch } from '../../utils/validateSearch';
import { toString } from '../../utils/dateUtils';
import GetAppIcon from '@material-ui/icons/GetApp';

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
          <ListadoTurnos
            idActividad={actividadSeleccionada.id}
            nombreActividad={actividadSeleccionada.nombre}
            fechaActividad={actividadSeleccionada.fechaHoraInicio}
          />
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

function ListadoTurnos({ idActividad, nombreActividad, fechaActividad }) {
  const classes = useStyles();

  const todosLosTurnos = useRecoilValue(turnosPorActividad(idActividad));
  const [turnoARegistrar, setTurnoARegistrar] = useState();
  const [abrirModal, setAbrirModal] = useState(false);
  const [ocultarRegistrados, setOcultarRegistrados] = useState(false);
  const [textoParaBuscar, setTextoParaBuscar] = useState('');

  const datosParaCsv = () => {
    return todosLosTurnos.map(({ Usuario }) => {
      return {
        Nombre: Usuario.nombre,
        Apellido: Usuario.apellido,
        Dni: Usuario.dni,
        Actividad: nombreActividad,
        'Fecha y hora': toString(fechaActividad),
      };
    });
  };

  const validarNombre = (it) => {
    return validateSearch(textoParaBuscar, it.Usuario.nombre);
  };
  const validarApellido = (it) => {
    return validateSearch(textoParaBuscar, it.Usuario.apellido);
  };

  const validarDNI = (it) => {
    return startsWith(textoParaBuscar.toString(), it.Usuario.dni.toString());
  };

  const validar = anyPass([validarNombre, validarApellido, validarDNI]);

  const turnosFiltrados = useMemo(
    () =>
      compose(
        sortWith([
          ascend(propOr(minDate, 'fechaHoraIngreso')),
          ascend(path(['Usuario', 'apellido'])),
        ]),
        filter((it) => !ocultarRegistrados || isNil(it.fechaHoraIngreso)),
        filter(validar)
      )(todosLosTurnos),

    [todosLosTurnos, ocultarRegistrados, validar]
  );

  const confirmarRegistro = (turno) => {
    setTurnoARegistrar(turno);
    setAbrirModal(true);
  };

  const cambioCheck = () => setOcultarRegistrados(!ocultarRegistrados);
  const cambioDeTextoParaBuscar = (e) => setTextoParaBuscar(e.target.value);
  return (
    <>
      <Box display="flex" justifyContent="center">
        <FormGroup>
          <FormControlLabel
            label="Ocultar registrados"
            control={<Switch onChange={cambioCheck} color="primary" />}
          />
        </FormGroup>

        <CSVLink data={datosParaCsv()} filename={`${nombreActividad}` + '.csv'}>
          <Tooltip title="Descargar en formato CSV">
            <span>
              <IconButton
                className={classes.icon}
                aria-label="edit"
                color="primary"
              >
                <GetAppIcon />
              </IconButton>
            </span>
          </Tooltip>
        </CSVLink>
      </Box>
      <br />
      <Grid container spacing={4} align="center">
        <Grid item xs={12}>
          <Grid item xs={12} sm={6} md={5}>
            <Buscador
              label="Buscar por nombre, apellido o DNI"
              onChange={cambioDeTextoParaBuscar}
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
              {turnosFiltrados.map((turno) => {
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
  nombreActividad: PropTypes.string,
  fechaActividad: PropTypes.string,
};
