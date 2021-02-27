import { Box, Button, Typography } from '@material-ui/core';
import {
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import React, { useState } from 'react';

import AddIcon from '@material-ui/icons/Add';
import ConfirmarEliminacion from '../ui/ConfirmarEliminacion';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { todosLosEspacios } from '../../state/espacios';
import { useRecoilValue } from 'recoil';
import { BuscadorPorNombre } from '../ui/BuscadorPorNombre';

const useStyles = makeStyles(({ palette }) => ({
  icon: {
    width: '30px',
    height: '30px',
    color: '#000',
  },
  floatRight: {
    marginLeft: 'auto',
  },
  activo: {
    color: palette.success.main,
  },
  inactivo: {
    color: palette.error.main,
  },
}));

export default function PantallaEspacios() {
  const classes = useStyles();

  const espaciosRecoil = useRecoilValue(todosLosEspacios);
  const [espacios, setEspacios] = useState(espaciosRecoil);

  const [abrirModal, setAbrirModal] = useState(false);
  const [espacioAEliminar, setEspacioAEliminar] = useState();

  const eliminarEspacio = (espacio) => {
    setEspacioAEliminar(espacio);
    setAbrirModal(true);
  };

  return (
    <>
      <Grid container alignItems="center" spacing={3}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h4" color="primary">
            Espacios
          </Typography>
        </Grid>
        <Grid item className={classes.floatRight}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to={`/espacios/nuevo`}
            startIcon={<AddIcon />}
          >
            Nuevo espacio
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={5}>
          <BuscadorPorNombre
            listaDeRecoil={espaciosRecoil}
            setListaParaMostrar={setEspacios}
            label={'Buscá un espacio'}
          />
        </Grid>
      </Grid>
      <Box mt={2}>
        <TableContainer>
          <Table size="medium">
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Edificio</TableCell>
                <TableCell>Piso</TableCell>
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
                      <DeleteIcon onClick={() => eliminarEspacio(espacio)} />
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
        ruta={'espacios'}
        entidadAEliminar={espacioAEliminar}
      />
    </>
  );
}
