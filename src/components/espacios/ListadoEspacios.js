import { Box, Typography } from '@material-ui/core';
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import React, { useState } from 'react';

import AddCircleIcon from '@material-ui/icons/AddCircle';
import ConfirmarEliminacion from '../ui/ConfirmarEliminacion';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { todosLosEspacios } from '../../state/espacios';
import { useRecoilValue } from 'recoil';

export default function PantallaEspacios() {
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

  const listaEspacios = useRecoilValue(todosLosEspacios);
  const [espacios, setEspacios] = useState(listaEspacios);

  const [abrirModal, setAbrirModal] = useState(false);
  const [idEspacioAEliminar, setIdEspacioAEliminar] = useState();

  const eliminarEspacio = (idEspacio) => {
    setIdEspacioAEliminar(idEspacio);
    setAbrirModal(true);
  };

  return (
    <>
      <Box mt={15}>
        <Typography variant="h4" color="primary">
          Espacios
        </Typography>
      </Box>
      <Box mt={2}>
        <TableContainer>
          <Table size="medium">
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Edificio</TableCell>
                <TableCell>Piso</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Aforo</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {espacios.map((espacio, id) => (
                <TableRow key={id}>
                  <TableCell>{espacio.nombre}</TableCell>
                  <TableCell>{espacio.Edificio.nombre}</TableCell>
                  <TableCell>{espacio.piso}</TableCell>
                  <TableCell>
                    {espacio.habilitado ? (
                      <FiberManualRecordIcon style={{ color: 'green' }} />
                    ) : (
                      <FiberManualRecordIcon style={{ color: 'red' }} />
                    )}
                  </TableCell>
                  <TableCell>{espacio.aforo}</TableCell>
                  <TableCell>
                    <IconButton
                      className={classes.icon}
                      aria-label="edit"
                      component={Link}
                      to={`/espacios/${espacio.id}`}
                    >
                      <CreateIcon />
                    </IconButton>
                    <IconButton className={classes.icon} aria-label="delete">
                      <DeleteIcon onClick={() => eliminarEspacio(espacio.id)} />
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
          to={`/espacios/nuevo`}
        >
          Agregar espacio
        </Typography>
        <AddCircleIcon color="primary" />
      </Box>
      <ConfirmarEliminacion
        abrirModal={abrirModal}
        setAbrirModal={setAbrirModal}
        ruta={'espacios'}
        entidades={espacios}
        setEntidades={setEspacios}
        idEntidadAEliminar={idEspacioAEliminar}
      />
    </>
  );
}
