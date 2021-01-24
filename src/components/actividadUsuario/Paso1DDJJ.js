import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { PropTypes } from 'prop-types';
import { useState, useEffect } from 'react';
import { getData } from '../../helpers/fetchApi';
import { useRecoilValue } from 'recoil';
import { todasLasActividades } from '../../state/actividades';
import useMediaQuery from '@material-ui/core/useMediaQuery';

export default function Paso1DDJJ({ handleChange }) {
  const headers = {
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsImRuaSI6MzMsImlhdCI6MTYxMTUyODU0OSwiZXhwIjoxNjI3MDgwNTQ5fQ.SA77Q9lHe390tJxuRFAwQOUKWmnlRke1xn23LCYWYjE',
    },
  };

  const actividadesPorIdDB = useRecoilValue(todasLasActividades(headers));
  //const actividadesPorIdDB = useRecoilValue(actividadPorId);
  //const actividadesDB = useRecoilValue(todasLasActividades);

  const classes = useStyles();

  // useEffect( async () => {
  //   try{
  //     const response = await getData('actividades', {
  //       'headers': {
  //         'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsImRuaSI6MzMsImlhdCI6MTYxMTUyODU0OSwiZXhwIjoxNjI3MDgwNTQ5fQ.SA77Q9lHe390tJxuRFAwQOUKWmnlRke1xn23LCYWYjE'
  //       }
  //     });
  //     setActividad(response.data.data);
  //   }
  //   catch(error){
  //     return;
  //   }
  // }, [])

  const [actividad, setActividad] = useState(actividadesPorIdDB);

  const matches = useMediaQuery('(min-width:600px)');

  return (
    <>
      {console.log()}
      <Box mt={8} display="flex" justifyContent="center">
        <Typography variant="h4" color="primary">
          Declaración jurada
        </Typography>
      </Box>
      <Grid
        container
        alignItems="flex-end"
        spacing={4}
        style={{ marginTop: '8px' }}
      >
        <Grid item xs={matches ? 6 : 12} align={matches ? 'right' : 'center'}>
          <Typography variant="h6">Seleccione actividad:</Typography>
        </Grid>

        <Grid item xs={matches ? 6 : 12} align={matches ? 'left' : 'center'}>
          <FormControl style={{ minWidth: 250 }}>
            <InputLabel id="actividadesDisponibles">
              Actividades disponibles:
            </InputLabel>
            <Select
              labelId="labelIdActividad"
              id="selectIDActividad"
              name="actividadId"
              onChange={handleChange}
            >
              {actividad.map((actividad, id) => (
                <MenuItem key={actividad.id} value={actividad.id}>
                  {actividad.nombre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={matches ? 6 : 12} align={matches ? 'right' : 'center'}>
          <Typography variant="h6">Horario:</Typography>
        </Grid>

        <Grid item xs={matches ? 6 : 12} align={matches ? 'left' : 'center'}>
          <FormControl style={{ minWidth: 250 }}>
            <InputLabel id="labelEspacios">Único horario</InputLabel>
            <Select
              labelId="labelEspacios"
              name="espacioId"
              onChange={handleChange}
            >
              <MenuItem>Hardcode</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={matches ? 6 : 12} align={matches ? 'right' : 'center'}>
          <Typography variant="h6">Medio de transporte</Typography>
        </Grid>

        <Grid item xs={matches ? 6 : 12} align={matches ? 'left' : 'center'}>
          <FormControl style={{ minWidth: 250 }}>
            <InputLabel id="medioDeTransporte">Elija un transporte</InputLabel>
            <Select
              labelId="medioDeTransporte"
              name="medioDeTransporte"
              onChange={handleChange}
              defaultValue={'auto'}
            >
              <MenuItem value={'auto'}>Auto</MenuItem>
              <MenuItem value={'bondi'}>Transporte público</MenuItem>
              <MenuItem value={'bici'}>Caminando/Bici</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </>
  );
}

const useStyles = makeStyles({
  marginTopCampos: {
    marginTop: '25px',
  },
});

Paso1DDJJ.propTypes = {
  handleChange: PropTypes.func,
};

const styles = (theme) => ({
  preguntasRespons: {
    padding: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      backgroundColor: theme.palette.secondary.main,
    },
  },
});
