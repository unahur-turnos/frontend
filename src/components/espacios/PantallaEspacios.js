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
import React, { useState } from 'react';

import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import VentanaModal from '../ui/VentanaModal';
import { makeStyles } from '@material-ui/core/styles';
import { todosLosEspacios } from '../../state/espacios';
import { useRecoilValue } from 'recoil';

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
            {espacios.map((espacio) => (
              <TableRow key={espacio.id}>
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
          ruta={'espacios'}
          entidades={espacios}
          setEntidades={setEspacios}
          idEntidadAEliminar={idEspacioAEliminar}
        />
      </TableContainer>
    </Container>
  );
}
