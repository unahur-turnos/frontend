import {
  Box,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Grid,
  Chip,
} from '@material-ui/core';
import { PropTypes } from 'prop-types';
import AddIcon from '@material-ui/icons/Add';
import ConfirmarEliminacion from '../ui/ConfirmarEliminacion';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { todasLasActividades } from '../../state/actividades';
import { useRecoilValue } from 'recoil';
import { useState } from 'react';
import { fechaHoraActividad } from '../../utils/dateUtils';
import clsx from 'clsx';

const useStyles = makeStyles(({ palette }) => ({
  icon: {
    width: '30px',
    height: '30px',
    color: '#000',
  },
  floatRight: {
    marginLeft: 'auto',
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

  const actividades = useRecoilValue(todasLasActividades());

  const [abrirModal, setAbrirModal] = useState(false);
  const [actividadAEliminar, setActividadAEliminar] = useState();

  const eliminarActividad = (actividad) => {
    setActividadAEliminar(actividad);
    setAbrirModal(true);
  };

  return (
    <>
      <Grid container alignItems="center">
        <Grid item>
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
      </Grid>
      <Box mt={2}>
        <TableContainer>
          <Table size="medium">
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Espacio</TableCell>
                <TableCell>Responsable</TableCell>
                <TableCell>Fecha y hora</TableCell>
                <TableCell>Cupo</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {actividades.map((actividad) => (
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
                    {fechaHoraActividad(
                      actividad.fechaHoraInicio,
                      actividad.fechaHoraFin
                    )}
                  </TableCell>
                  <TableCell>
                    <Cupo
                      anotados={actividad.autorizaciones}
                      cantidadMax={actividad.Espacio.aforo}
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton
                      className={classes.icon}
                      aria-label="edit"
                      component={Link}
                      to={`/actividades/${actividad.id}`}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton className={classes.icon} aria-label="delete">
                      <DeleteIcon
                        onClick={() => eliminarActividad(actividad)}
                      />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
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
  anotados: PropTypes.int,
  cantidadMax: PropTypes.int,
};
