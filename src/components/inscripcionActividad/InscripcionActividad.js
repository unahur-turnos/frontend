import { Button, Grid, Typography } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import Paso1DDJJ from './Paso1DDJJ';
import Paso2DDJJ from './Paso2DDJJ';
import Paso3DDJJ from './Paso3DDJJ';
import { useApi } from '../../utils/fetchApi';
import { useRecoilValue } from 'recoil';
import { usuarioState } from '../../state/usuario';

export default function Actividad() {
  const history = useHistory();
  const classes = useStyles();
  const { create } = useApi('autorizaciones');
  const usuario = useRecoilValue(usuarioState);

  const [numeroPaso, setNumeroPaso] = useState(1);

  const [informacionSeleccionada, setInformacionSeleccionada] = useState(
    ESTADOINICIAL
  );

  const handleChange = (e) => {
    setInformacionSeleccionada({
      ...informacionSeleccionada,
      [e.target.name]: e.target.value,
    });
  };

  const agregarUnValor = (name, valor) => {
    setInformacionSeleccionada({
      ...informacionSeleccionada,
      [name]: valor,
    });
  };

  const avanzarAlSiguiente = () => {
    setNumeroPaso(numeroPaso + 1);
  };

  const guardarInscripcion = async () => {
    try {
      await create({
        actividadId: informacionSeleccionada.actividad.id,
        estuvoEnContacto: informacionSeleccionada.estuvoEnContacto,
        usuarioId: usuario.id,
      });

      history.push('/inscripcion/final');
    } catch (error) {
      console.log(
        'Hubo un error al crear la autorización. (Hay que ver de mandar un mensaje cuando falla: ' +
          error
      );
      return;
    }
  };

  return (
    <>
      {numeroPaso === 1 && (
        <Paso1DDJJ
          handleChange={handleChange}
          agregarUnValor={agregarUnValor}
        />
      )}
      {numeroPaso === 2 && <Paso2DDJJ handleChange={handleChange} />}
      {numeroPaso === 3 && (
        <Paso3DDJJ informacionSeleccionada={informacionSeleccionada} />
      )}

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
          <Button
            variant="contained"
            color="primary"
            onClick={guardarInscripcion}
          >
            Guardar
          </Button>
        )}

        {numeroPaso != 3 && (
          <Button
            variant="contained"
            color="primary"
            onClick={avanzarAlSiguiente}
            disabled={informacionSeleccionada.actividad ? false : true}
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

const ESTADOINICIAL = {
  medioDeTransporte: 'Auto',
  personaDeRiesgo: false,
  estuvoEnContacto: false,
  autorizacionCuidar: false,
  capacitacionUNAHUR: false,
};
