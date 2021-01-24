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
import { Link, useParams } from 'react-router-dom';
import { create, update } from '../../helpers/fetchApi';

import { makeStyles } from '@material-ui/core/styles';
import { todasLasActividades } from '../../state/actividades';
import { actividadPorId } from '../../state/actividades';
import { useRecoilValue } from 'recoil';
import { useState } from 'react';

export default function Actividad() {
  const useStyles = makeStyles({
    marginBotonYTexto: {
      marginTop: '25px',
    },
    marginTopCampos: {
      marginTop: '25px',
    },
  });
  const { id } = useParams();
  const actividadesDB = useRecoilValue(todasLasActividades);
  //const actividadesPorIdDB = useRecoilValue(actividadPorId);
  const classes = useStyles();

  const [actividad, setActividad] = useState(actividadesDB);

  const handleChange = (e) => {
    setActividad({
      ...actividad,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Box mt={12} align="center">
        <Typography variant="h4" color="primary">
          Solicitud de actividad
        </Typography>
      </Box>

      <Grid align="center" className={classes.marginTopCampos}>
        <Grid
          container
          alignItems="flex-end"
          spacing={3}
          style={{ marginTop: '8px' }}
        >
          <Grid item xs={6} align="right">
            <Typography variant="h6">Seleccione actividad:</Typography>
          </Grid>
          <Grid item xs={6} align="left">
            <FormControl style={{ minWidth: 250 }}>
              <InputLabel id="idActividad">Elija una actividad</InputLabel>
              <Select
                labelId="labelIdActividad"
                id="selectIDActividad"
                defaultValue={actividad.actividadId}
                name="actividadId"
                onChange={handleChange}
              >
                {actividadesDB.map((actividad) => (
                  <MenuItem key={actividad.id} value={actividad.id}>
                    {actividad.nombre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6} align="right">
            <Typography variant="h6">Horarios:</Typography>
          </Grid>
          <Grid item xs={6} align="left">
            <FormControl style={{ minWidth: 250 }}>
              <InputLabel id="idEdificio">Elija un horario</InputLabel>
              <Select
                labelId="labelHorarios"
                id="selectHorario"
                defaultValue={actividad.edificioId}
                name="fechaHoraInicio"
                onChange={handleChange}
              ></Select>
            </FormControl>
            {/* <FormControl style={{ minWidth: 250 }}>
                <InputLabel id="idEdificio">Elija un horario</InputLabel>
                <Select
                  labelId="labelHorarios"
                  id="selectHorario"
                  defaultValue={actividad.edificioId}
                  name="fechaHoraInicio"
                  onChange={handleChange}
                >
                  {actividadesPorIdDB.map((actividad) => (
                    <MenuItem key={actividad.id} value={actividad.id}>
                      {actividad.nombre}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl> */}
          </Grid>

          <Grid item xs={6} align="right">
            <Typography variant="h6">Medio de transporte:</Typography>
          </Grid>
          <Grid item xs={6} align="left">
            <FormControl style={{ minWidth: 250 }}>
              <InputLabel id="idPiso">Elija un medio de transporte</InputLabel>
              <Select
                labelId="labelIdPiso"
                id="inputIDPiso"
                //defaultValue={actividad}
                name="piso"
                onChange={handleChange}
              >
                <MenuItem value={'0'}>Colectivo</MenuItem>
                <MenuItem value={'1'}>Tren</MenuItem>
                <MenuItem value={'2'}>Auto</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Typography
          color="primary"
          align="center"
          className={classes.marginBotonYTexto}
        >
          Paso 1 de 3
        </Typography>
      </Grid>

      <Grid align="center" className={classes.marginBotonYTexto}>
        <Button variant="contained" color="primary" component={Link} to="/">
          Siguiente
        </Button>
        <Button component={Link} to="/">
          Cancelar
        </Button>
      </Grid>
    </>
  );
}
