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

import AddIcon from '@material-ui/icons/Add';
import ConfirmarEliminacion from '../ui/ConfirmarEliminacion';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { toString } from '../../utils/dateUtils';
import { todasLasActividades } from '../../state/actividades';
import { useRecoilValue } from 'recoil';
import { useState } from 'react';
import { fechaHoraActividad } from '../../utils/dateUtils';

const useStyles = makeStyles({
  icon: {
    width: '30px',
    height: '30px',
    color: '#000',
  },
  floatRight: {
    marginLeft: 'auto',
  },
});

export default function ListadoActividades() {
  const classes = useStyles();

  const actividades = useRecoilValue(todasLasActividades());

  const [abrirModal, setAbrirModal] = useState(false);
  const [actividadAEliminar, setActividadAEliminar] = useState();

  const eliminarActividad = (actividad) => {
    setActividadAEliminar(actividad);
    setAbrirModal(true);
  };

  const cuposConSuColor = (anotados, cantidadMax) => {
    const porcentaje = (anotados * 100) / cantidadMax;
    let background = '';
    let textColor = '';

    if (porcentaje < 30) {
      background = '#009673';
      textColor = 'white';
    } else if (porcentaje >= 30 && porcentaje <= 80) {
      background = 'orange';
      textColor = 'black';
    } else {
      background = 'red';
      textColor = 'white';
    }

    return (
      <Chip
        label={`${anotados} / ${cantidadMax}`}
        style={{ backgroundColor: background, color: textColor }}
      />
    );
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
                    {cuposConSuColor(
                      actividad.autorizaciones,
                      actividad.Espacio.aforo
                    )}
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
