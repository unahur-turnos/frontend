import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';

import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Link } from 'react-router-dom';
import VentanaModal from '../ui/VentanaModal';
import { makeStyles } from '@material-ui/core/styles';
import { toString } from '../../utils/dateUtils';
import { todasLasActividades } from '../../state/actividades';
import { useRecoilValue } from 'recoil';
import { useState } from 'react';

export default function ListadoActividades() {
  const useStyles = makeStyles({
    icon: {
      width: '30px',
      height: '30px',
      color: '#000',
    },
    add: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
  });

  const classes = useStyles();

  const listaActividades = useRecoilValue(todasLasActividades);
  const [actividades, setActividades] = useState(listaActividades);

  const [abrirModal, setAbrirModal] = useState(false);
  const [idActividadAEliminar, setIdActividadAEliminar] = useState();

  const eliminarActividad = (idActividad) => {
    setIdActividadAEliminar(idActividad);
    setAbrirModal(true);
  };

  return (
    <>
      <Box mt={8}>
        <Typography variant="h4" color="primary">
          Actividades
        </Typography>
      </Box>
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
                        onClick={() => eliminarActividad(actividad.id)}
                      />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box className={classes.add} mt={2}>
        <Typography
          color="primary"
          style={{ textDecoration: 'none' }}
          aria-label="add"
          component={Link}
          to={`/actividades/nueva`}
        >
          Agregar actividad
        </Typography>
        <AddCircleIcon color="primary" />
      </Box>
      <VentanaModal
        abrirModal={abrirModal}
        setAbrirModal={setAbrirModal}
        ruta={'actividades'}
        entidades={actividades}
        setEntidades={setActividades}
        idEntidadAEliminar={idActividadAEliminar}
      />
    </>
  );
}
