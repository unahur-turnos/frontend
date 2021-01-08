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
import React from 'react';
import { getActividades } from '../../state/actividades';
import { makeStyles } from '@material-ui/core/styles';

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

  const actividades = getActividades();

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
                <TableCell>Aforo</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {actividades.map((actividad) => (
                <TableRow key={actividad.id}>
                  <TableCell>{actividad.nombre}</TableCell>
                  <TableCell>{actividad.espacio}</TableCell>
                  <TableCell>{actividad.responsable}</TableCell>
                  <TableCell>
                    {actividad.fechaInicio.toLocaleString()}
                  </TableCell>
                  <TableCell>{actividad.fechaFin.toLocaleString()}</TableCell>
                  <TableCell>{actividad.aforo}</TableCell>
                  <TableCell>
                    <IconButton
                      className={classes.icon}
                      aria-label="edit"
                      component={Link}
                      to={`/actividades/modificacion`}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton className={classes.icon} aria-label="delete">
                      <DeleteIcon />
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
          to={`/actividades/alta`}
        >
          Agregar actividad
        </Typography>
        <AddCircleIcon color="primary" />
      </Box>
    </>
  );
}
