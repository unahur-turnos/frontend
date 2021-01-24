import { Button, Grid, Typography } from '@material-ui/core';
import { Link, useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import Paso1DDJJ from './Paso1DDJJ';
import Paso2DDJJ from './Paso2DDJJ';
import Paso3DDJJ from './Paso3DDJJ';

export default function Actividad() {
  const [numeroPaso, setNumeroPaso] = useState(1);

  const { id } = useParams();
  const classes = useStyles();

  const [actividad, setActividad] = useState();

  const handleChange = (e) => {
    setActividad({
      ...actividad,
      [e.target.name]: e.target.value,
    });
  };

  const avanzarAlSiguiente = () => {
    setNumeroPaso(numeroPaso + 1);
  };

  return (
    <>
      {numeroPaso === 1 && <Paso1DDJJ handleChange={handleChange} />}
      {numeroPaso === 2 && <Paso2DDJJ handleChange={handleChange} />}
      {numeroPaso === 3 && <Paso3DDJJ handleChange={handleChange} />}

      <Grid item xs={12}>
        <Typography
          color="primary"
          align="center"
          className={classes.marginBotonYTexto}
        >
          Paso {numeroPaso} de 3
        </Typography>
      </Grid>

      <Grid align="center" className={classes.marginBotonYTexto}>
        {numeroPaso === 3 && (
          <Button variant="contained" color="primary">
            Guardar
          </Button>
        )}

        {numeroPaso != 3 && (
          <Button
            variant="contained"
            color="primary"
            onClick={avanzarAlSiguiente}
          >
            Siguiente
          </Button>
        )}

        <Button component={Link} to="/">
          Cancelar
        </Button>
      </Grid>
    </>
  );
}

const useStyles = makeStyles({
  marginBotonYTexto: {
    marginTop: '25px',
  },
});
