import {
  Box,
  Button,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
  Chip,
} from '@material-ui/core';
import { PropTypes } from 'prop-types';
import AddIcon from '@material-ui/icons/Add';
import ConfirmarEliminacion from '../ui/ConfirmarEliminacion';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { todasLasActividades } from '../../state/actividades';
import { useRecoilValue } from 'recoil';
import { useMemo, useState } from 'react';
import { fechaHoraActividad } from '../../utils/dateUtils';
import clsx from 'clsx';
import { Buscador } from '../ui/Buscador';
import { anyPass, compose, drop, filter, take, isEmpty } from 'ramda';
import { validateSearch } from '../../utils/validateSearch';
import { Alert } from '@material-ui/lab';
import Pagination from '@material-ui/lab/Pagination';
import LinkIcon from '@material-ui/icons/Link';

const useStyles = makeStyles(({ palette }) => ({
  icon: {
    width: '30px',
    height: '30px',
    color: '#000',
  },
  floatRight: {
    marginLeft: 'auto',
  },
  activa: {
    color: palette.success.main,
  },
  inactiva: {
    color: palette.error.main,
  },
  error: {
    backgroundColor: palette.error.main,
    color: palette.error.contrastText,
  },
  warning: {
    backgroundColor: palette.warning.main,
    color: palette.warning.contrastText,
  },
  success: {
    backgroundColor: palette.success.main,
    color: palette.success.contrastText,
  },
}));

export default function ListadoActividades() {
  const classes = useStyles();

  const actividades = useRecoilValue(todasLasActividades({ inactivas: true }));
  const [textoParaBuscar, setTextoParaBuscar] = useState('');
  const [abrirModal, setAbrirModal] = useState(false);
  const [actividadAEliminar, setActividadAEliminar] = useState();
  const [paginaActual, setPaginaActual] = useState(1);
  const [mostrarAlerta, setMostrarAlerta] = useState(false);
  const [actividadCopiada, setActividadCopiada] = useState('');
  const tamanioPagina = 30;
  const eliminarActividad = (actividad) => {
    setActividadAEliminar(actividad);
    setAbrirModal(true);
  };

  const masDeUnTurno = (turnos) => {
    return turnos >= 1;
  };

  const validarNombreActividad = (it) => {
    return validateSearch(textoParaBuscar, it.nombre);
  };
  const validarNombreEspacio = (it) => {
    return validateSearch(textoParaBuscar, it.Espacio.nombre);
  };
  const validarNombreResponsable = (it) => {
    return validateSearch(textoParaBuscar, it.responsable);
  };

  const copiarLink = (actividad) => {
    const URI = `https://turnos.unahur.edu.ar/turnos/nuevo?actividad=${actividad.id}`;
    //const URI = `${process.env.REACT_APP_API_URL}/turnos/nuevo?actividad=${actividad.id}`;
    navigator.clipboard.writeText(URI);
    setActividadCopiada(actividad.nombre);
    setMostrarAlerta(true);
  };

  const validar = anyPass([
    validarNombreActividad,
    validarNombreEspacio,
    validarNombreResponsable,
  ]);

  const actividadesFiltradas = useMemo(() => filter(validar, actividades), [
    actividades,
    validar,
  ]);

  const actividadesConPaginacion = useMemo(
    () =>
      compose(
        take(tamanioPagina),
        drop(tamanioPagina * (paginaActual - 1))
      )(actividadesFiltradas),
    [tamanioPagina, paginaActual, actividadesFiltradas]
  );
  const cambioDeTextoParaBuscar = (e) => {
    setPaginaActual(1);
    setTextoParaBuscar(e.target.value);
  };

  const cambiarPagina = (event, value) => {
    setPaginaActual(value);
  };

  return (
    <>
      {mostrarAlerta ? (
        <Alert severity="success">
          El link a {actividadCopiada} fue copiado al portapeles
        </Alert>
      ) : null}
      <br />
      <Grid container alignItems="center" spacing={3}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h4" color="primary">
            Actividades
          </Typography>
        </Grid>
        <Grid item className={classes.floatRight}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to={`/actividades/nueva`}
            startIcon={<AddIcon />}
          >
            Nueva actividad
          </Button>
        </Grid>
        <Grid item xs={12} sm={8} md={5}>
          <Buscador
            label="Buscá una actividad por nombre, espacio o responsable"
            onChange={cambioDeTextoParaBuscar}
          />
        </Grid>
      </Grid>
      <Box mt={2}>
        {isEmpty(actividadesConPaginacion) ? (
          <Alert severity="warning">
            No se encontraron actividades que cumplan con la búsqueda
          </Alert>
        ) : (
          <TableContainer>
            <Table size="medium">
              <TableHead>
                <TableRow>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Espacio</TableCell>
                  <TableCell>Responsable</TableCell>
                  <TableCell>Estado</TableCell>
                  <TableCell>Fecha y hora</TableCell>
                  <TableCell>Cupo</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {actividadesConPaginacion.map((actividad) => (
                  <TableRow key={actividad.id}>
                    <TableCell>
                      <Typography>{actividad.nombre}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>{actividad.Espacio.nombre}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>{actividad.responsable}</Typography>
                    </TableCell>
                    <TableCell>
                      {actividad.activa ? (
                        <FiberManualRecordIcon className={classes.activa} />
                      ) : (
                        <FiberManualRecordIcon className={classes.inactiva} />
                      )}
                    </TableCell>
                    <TableCell>
                      {fechaHoraActividad(
                        actividad.fechaHoraInicio,
                        actividad.fechaHoraFin
                      )}
                    </TableCell>
                    <TableCell>
                      <Cupo
                        anotados={actividad.turnos}
                        cantidadMax={actividad.Espacio.aforo}
                      />
                    </TableCell>
                    <TableCell>
                      <Tooltip title="Editar">
                        <span>
                          <IconButton
                            className={classes.icon}
                            aria-label="edit"
                            component={Link}
                            to={`/actividades/${actividad.id}`}
                          >
                            <EditIcon />
                          </IconButton>
                        </span>
                      </Tooltip>
                      <Tooltip title="Duplicar">
                        <span>
                          <IconButton
                            className={classes.icon}
                            aria-label="duplicate"
                            component={Link}
                            to={`/actividades/${actividad.id}/duplicar`}
                          >
                            <FileCopyIcon />
                          </IconButton>
                        </span>
                      </Tooltip>
                      <Tooltip
                        title={
                          masDeUnTurno(actividad.turnos)
                            ? 'No se puede eliminar, ya tiene turnos asignados'
                            : 'Eliminar'
                        }
                      >
                        <span>
                          <IconButton
                            disabled={masDeUnTurno(actividad.turnos)}
                            className={classes.icon}
                            aria-label="delete"
                          >
                            <DeleteIcon
                              onClick={() => eliminarActividad(actividad)}
                            />
                          </IconButton>
                        </span>
                      </Tooltip>
                      <Tooltip title="Link">
                        <span>
                          <IconButton
                            className={classes.icon}
                            aria-label="copy link"
                          >
                            <LinkIcon onClick={() => copiarLink(actividad)} />
                          </IconButton>
                        </span>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
      <Box display="flex" justifyContent="center" style={{ margin: 40 }}>
        <Pagination
          size="large"
          count={Math.ceil(actividadesFiltradas.length / tamanioPagina)}
          color="primary"
          onChange={cambiarPagina}
          page={paginaActual}
        />
      </Box>
      <ConfirmarEliminacion
        abrirModal={abrirModal}
        setAbrirModal={setAbrirModal}
        ruta={'actividades'}
        entidadAEliminar={actividadAEliminar}
      />
    </>
  );
}

function Cupo({ anotados, cantidadMax }) {
  const porcentaje = (anotados * 100) / cantidadMax;
  const classes = useStyles();

  return (
    <Chip
      label={`${anotados} / ${cantidadMax}`}
      className={clsx({
        [classes.error]: porcentaje >= 80,
        [classes.warning]: porcentaje >= 30 && porcentaje < 80,
        [classes.success]: porcentaje < 30,
      })}
    />
  );
}

Cupo.propTypes = {
  anotados: PropTypes.number,
  cantidadMax: PropTypes.number,
};
