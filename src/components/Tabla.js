import React from 'react';
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

function createData(name, calories, fat, carbs, protein, aforo) {
  return { name, calories, fat, carbs, protein, aforo };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 10),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 5),
  createData('Eclair', 262, 16.0, 24, 6.0, 8),
  createData('Cupcake', 305, 3.7, 67, 4.3, 20),
  createData('Gingerbread', 356, 16.0, 49, 3.9, 23),
];

export default function DenseTable() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper} className={classes.container}>
      <Table className={classes.table} size="medium" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Nombre</TableCell>
            <TableCell align="left">Espacio</TableCell>
            <TableCell align="left">Responsable</TableCell>
            <TableCell align="left">Fecha/hora inicio</TableCell>
            <TableCell align="left">Fecha/hora final</TableCell>
            <TableCell align="left">Aforo</TableCell>
            <TableCell align="left"> </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="left">{row.calories}</TableCell>
              <TableCell align="left">{row.fat}</TableCell>
              <TableCell align="left">{row.carbs}</TableCell>
              <TableCell align="left">{row.protein}</TableCell>
              <TableCell align="left">{row.aforo}</TableCell>
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
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
