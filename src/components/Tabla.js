import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CreateIcon from '@material-ui/icons/Create';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import VentanaModal from './VentanaModal';

const useStyles = makeStyles({
  table: {
    minWidth: 600,
    left: '200px',

    // width: '100%',
  },
  container: {
    marginTop: '5%',
    width: '150%',
    display: 'flex',
    alignItems: 'center',
  },
  tamañoBoton: {
    width: '30px',
    height: '30px',
    //padding: '10px',
    marginLeft: '15px',
  },
});

function createData(nombre, edificio, piso, estado, idEspacio) {
  return { nombre, edificio, piso, estado, idEspacio };
}

const rows = {
  items: [
    createData('Frozen yoghurt', 159, 6.0, 'activo', 0),
    createData('Ice cream sandwich', 237, 9.0, 'inactivo', 1),
    createData('Eclair', 262, 16.0, 'activo', 2),
    createData('Cupcake', 305, 3.7, 'inactivo', 3),
    createData('Gingerbread', 356, 16.0, 'inactivo', 4),
  ],
};

export default function DenseTable() {
  const [espacios, setEspacios] = useState(rows);
  const classes = useStyles();
  const eliminarEspacio = (id, idEspacio) => {
    console.log(idEspacio);
    const items = espacios.items;
    items.splice(idEspacio, 1);
    setEspacios({ items });
    console.log(espacios.items);
    console.log(items);
  };

  return (
    <TableContainer component={Paper} className={classes.container}>
      <Table className={classes.table} size="medium" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Nombre</TableCell>
            <TableCell align="left">Edificio</TableCell>
            <TableCell align="left">Piso</TableCell>
            <TableCell align="left">Estado</TableCell>
            <TableCell align="left"> </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {espacios.items.map((row, id) => (
            <TableRow key={row.nombre}>
              <TableCell component="th" scope="row">
                {row.nombre}
              </TableCell>
              <TableCell align="left">{row.edificio}</TableCell>
              <TableCell align="left">{row.piso}</TableCell>
              <TableCell align="left">
                {row.estado === 'inactivo' && (
                  <FiberManualRecordIcon
                    style={{ color: 'red' }}
                    className={classes.tamañoBoton}
                  />
                )}
                {row.estado === 'activo' && (
                  <FiberManualRecordIcon
                    style={{ color: 'green' }}
                    className={classes.tamañoBoton}
                  />
                )}
              </TableCell>
              <TableCell align="left">
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
                  <DeleteIcon
                    onClick={eliminarEspacio.bind(id, row.idEspacio)}
                  />
                </IconButton>
                <VentanaModal />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
