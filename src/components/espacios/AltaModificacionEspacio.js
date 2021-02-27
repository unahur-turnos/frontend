import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
  useMediaQuery,
} from '@material-ui/core';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useApi } from '../../utils/fetchApi';
import PropTypes from 'prop-types';
import { espacioPorId } from '../../state/espacios';
import { useNotificarActualizacion } from '../../state/actualizaciones';
import { todosLosEdificios } from '../../state/edificio';
import { useRecoilValue } from 'recoil';
import { useState } from 'react';

export default function Espacio(props) {
  const matches = useMediaQuery('(min-width:600px)');
  const { id } = useParams();
  const { titulo } = props;
  const espacioDB = useRecoilValue(espacioPorId(id)).data;
  const edificiosDB = useRecoilValue(todosLosEdificios);
  const history = useHistory();
  const notificarActualizacion = useNotificarActualizacion('espacios');
  const { create, update } = useApi('espacios');

  const [espacio, setEspacio] = useState(espacioDB);

  const handleChange = (e) => {
    setEspacio({
      ...espacio,
      [e.target.name]: e.target.value,
    });
  };

  const saveData = async () => {
    if (id !== undefined) {
      await update(espacio);
    } else {
      await create(espacio);
    }

    notificarActualizacion();
    history.push('/espacios');
  };

  return (
    <>
      <Box mt={1} display="flex" justifyContent="center">
        <Typography variant="h4" color="primary">
          {titulo}
        </Typography>
      </Box>

      <Grid
        container
        alignItems="flex-end"
        spacing={matches ? 4 : 2}
        style={{ marginTop: '8px' }}
      >
        <Grid item xs={12} sm={6} align={matches ? 'right' : 'center'}>
          <Typography variant="h6">Nombre del espacio:</Typography>
        </Grid>

        <Grid item xs={12} sm={6} align={!matches && 'center'}>
          <TextField
            id="nombre"
            label="Ingresá el nombre"
            name="nombre"
            style={{ minWidth: 250 }}
            onChange={handleChange}
            defaultValue={espacio.nombre}
          />
        </Grid>

        <Grid item xs={12} sm={6} align={matches ? 'right' : 'center'}>
          <Typography variant="h6">Edificio:</Typography>
        </Grid>

        <Grid item xs={12} sm={6} align={!matches && 'center'}>
          <FormControl style={{ minWidth: 250 }}>
            <InputLabel id="idEdificio">Elija un edificio</InputLabel>
            <Select
              labelId="labelIdEdificio"
              id="selectIDEdificio"
              defaultValue={espacio.edificioId}
              name="edificioId"
              onChange={handleChange}
            >
              {edificiosDB.map((edificio) => (
                <MenuItem key={edificio.id} value={edificio.id}>
                  {edificio.nombre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} align={matches ? 'right' : 'center'}>
          <Typography variant="h6">Piso:</Typography>
        </Grid>

        <Grid item xs={12} sm={6} align={!matches && 'center'}>
          <FormControl style={{ minWidth: 250 }}>
            <InputLabel id="idPiso">Elija un piso</InputLabel>
            <Select
              labelId="labelIdPiso"
              id="inputIDPiso"
              defaultValue={espacio.piso}
              name="piso"
              onChange={handleChange}
            >
              <MenuItem value={'0'}>0</MenuItem>
              <MenuItem value={'1'}>1</MenuItem>
              <MenuItem value={'2'}>2</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} align={matches ? 'right' : 'center'}>
          <Typography variant="h6">Aforo:</Typography>
        </Grid>

        <Grid item xs={12} sm={6} align={!matches && 'center'}>
          <TextField
            id="aforo"
            label="Ingresá el aforo"
            style={{ minWidth: 250 }}
            defaultValue={espacio.aforo}
            name="aforo"
            type="number"
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} sm={6} align={matches ? 'right' : 'center'}>
          <Typography variant="h6">Estado:</Typography>
        </Grid>

        <Grid item xs={12} sm={6} align={!matches && 'center'}>
          <FormControl>
            <RadioGroup
              row
              aria-label="estado"
              name="habilitado"
              value={espacio.habilitado.toString()}
              onChange={handleChange}
            >
              <FormControlLabel
                value={'true'}
                control={<Radio color="primary" />}
                label="Activo"
              />
              <FormControlLabel
                value={'false'}
                control={<Radio color="primary" />}
                label="Inactivo"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>

      <Grid container item xs={12} spacing={1}>
        <Grid item xs={6} align="right">
          <Button variant="contained" color="primary" onClick={saveData}>
            Guardar
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button component={Link} to="/espacios">
            Cancelar
          </Button>
          <p />
          <p />
        </Grid>
      </Grid>
    </>
  );
}

Espacio.propTypes = {
  titulo: PropTypes.string,
};
