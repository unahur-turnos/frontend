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
  Typography,
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

  const actividades = useRecoilValue(todasLasActividades({ inactivas: true }));

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
                <TableCell>Fecha/Hora Inicio</TableCell>
                <TableCell>Fecha/Hora Fin</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {actividades.map((actividad) => (
                <TableRow key={actividad.id}>
                  <TableCell>{actividad.nombre}</TableCell>
                  <TableCell>{actividad.Espacio.nombre}</TableCell>
                  <TableCell>{actividad.responsable}</TableCell>
                  <TableCell>{toString(actividad.fechaHoraInicio)}</TableCell>
                  <TableCell>{toString(actividad.fechaHoraFin)}</TableCell>
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
