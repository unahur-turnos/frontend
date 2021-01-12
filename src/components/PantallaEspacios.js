import {
  Container,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';

import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import VentanaModal from './VentanaModal';
import { makeStyles } from '@material-ui/core/styles';
import { todosLosEspacios } from '../state/espacios';
import { useRecoilValue } from 'recoil';
import AddCircleIcon from '@material-ui/icons/AddCircleOutline';
import { Link } from 'react-router-dom';
import { Typography, Box } from '@material-ui/core';

export default function PantallaEspacios() {
  const useStyles = makeStyles({
    container: {
      marginTop: '15%',
      display: 'flex',
      justifyContent: 'center',
    },
    tableContainer: {
      minWidth: 900,
    },
    tamañoBoton: {
      width: '30px',
      height: '30px',
      marginLeft: '15px',
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
      <Box mt={8} className={classes.titulo}>
        <Typography variant="h4" color="primary">
          Espacios
        </Typography>
      </Box>
      <Container className={classes.container}>
        <TableContainer component={Paper} className={classes.tableContainer}>
          <Table
            className={classes.table}
            size="medium"
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Edificio</TableCell>
                <TableCell>Piso</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Aforo</TableCell>
                <TableCell> </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {espacios.map((espacio, id) => (
                <TableRow key={id}>
                  <TableCell component="th" scope="row">
                    {espacio.nombre}
                  </TableCell>
                  <TableCell>{espacio.Edificio.nombre}</TableCell>
                  <TableCell>{espacio.piso}</TableCell>
                  <TableCell>
                    {espacio.habilitado ? (
                      <FiberManualRecordIcon
                        style={{ color: 'green' }}
                        className={classes.tamañoBoton}
                      />
                    ) : (
                      <FiberManualRecordIcon
                        style={{ color: 'red' }}
                        className={classes.tamañoBoton}
                      />
                    )}
                  </TableCell>
                  <TableCell>{espacio.aforo}</TableCell>
                  <TableCell>
                    <IconButton
                      edge="end"
                      className={classes.tamañoBoton}
                      color="inherit"
                      aria-label="menu"
                      component={Link}
                      to={`/espacios/${espacio.id}`}
                    >
                      <CreateIcon />
                    </IconButton>
                    <IconButton
                      edge="end"
                      className={classes.tamañoBoton}
                      color="inherit"
                      aria-label="menu"
                    >
                      <DeleteIcon onClick={() => eliminarEspacio(espacio.id)} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <VentanaModal
            abrirModal={abrirModal}
            setAbrirModal={setAbrirModal}
            espacios={espacios}
            setEspacios={setEspacios}
            idEspacio={idEspacioAEliminar}
          />
        </TableContainer>
      </Container>
      <Box className={classes.boxAgregar} mt={2}>
        <Typography color="primary" aria-label="botonAgregar">
          Agregar
        </Typography>
        <IconButton
          color="inherit"
          className={classes.botonAgregar}
          aria-label="menu"
          component={Link}
          to={`/espacios/nuevo`}
        >
          <AddCircleIcon color="primary" />
        </IconButton>
      </Box>
    </>
  );
}

const useStyles = makeStyles({
  container: {
    marginTop: '5%',
    display: 'flex',
    justifyContent: 'center',
  },
  tableContainer: {
    minWidth: 900,
  },
  tamañoBoton: {
    width: '30px',
    height: '30px',
    marginLeft: '15px',
  },
  titulo: {
    display: 'flex',
    justifyContent: 'center',
  },
  boxAgregar: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginRight: '-150px',
  },
  botonAgregar: {
    width: '40px',
    height: '40px',
    top: '-7px',
  },
});
