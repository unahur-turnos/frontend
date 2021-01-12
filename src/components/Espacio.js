import { Link, useParams } from 'react-router-dom';
import {
  Box,
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
  Button,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { espacioPorId } from '../state/espacios';
import { todosLosEdificios } from '../state/edificio';
import { useRecoilValue } from 'recoil';
import { create, update } from '../helpers/fetchApi';

export default function Espacio(props) {
  const { id } = useParams();
  const { titulo } = props;
  const espacioDB = useRecoilValue(espacioPorId(id)).data;
  const edificiosDB = useRecoilValue(todosLosEdificios);

  const [espacio, setEspacio] = useState(espacioDB);

  const handleChange = (e) => {
    setEspacio({
      ...espacio,
      [e.target.name]: e.target.value,
    });
    console.log(e.target.value);
    console.log(e.target.name);
  };

  const saveData = () => {
    console.log(espacio);
    const data = {
      edificioId: espacio.edificioId,
      piso: espacio.piso,
      nombre: espacio.nombre,
      habilitado: espacio.habilitado,
      aforo: espacio.aforo,
    };
    console.log(data);
    //Anda todo menos el create (post) no se porque
    id !== undefined
      ? update(`espacios/${id}`, data)
      : create('espacios', data);
  };

  return (
    <>
      <Box mt={8}>
        <Typography variant="h4" color="primary">
          {titulo}
        </Typography>
      </Box>

      <Box display="flex" flexDirection="column" mt={2}>
        <Box>
          <Grid
            container
            direction="row"
            justify="space-around"
            alignItems="flex-end"
            spacing={3}
          >
            <Grid item xs={6}>
              <Typography variant="h6">Nombre del espacio:</Typography>
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="nombre"
                label="Ingrese nombre"
                name="nombre"
                style={{ minWidth: 250 }}
                onChange={handleChange}
                defaultValue={espacio.nombre}
              />
            </Grid>

            <Grid item xs={6}>
              <Typography variant="h6">Edificio:</Typography>
            </Grid>
            <Grid item xs={6}>
              <FormControl style={{ minWidth: 250 }}>
                <InputLabel id="idEdificio">Elija un edificio</InputLabel>
                <Select
                  labelId="labelIdEdificio"
                  id="selectIDEdificio"
                  defaultValue={espacio.Edificio.id}
                  name="edificioId"
                  onChange={handleChange}
                >
                  {edificiosDB.map((edificio, key) => (
                    <MenuItem key={edificio.id} value={edificio.id}>
                      {edificio.nombre}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="h6">Piso:</Typography>
            </Grid>
            <Grid item xs={6}>
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

            <Grid item xs={6}>
              <Typography variant="h6">Aforo:</Typography>
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="aforo"
                label="Ingrese el aforo"
                style={{ minWidth: 250 }}
                defaultValue={espacio.aforo}
                name="aforo"
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={6}>
              <Typography variant="h6">Estado:</Typography>
            </Grid>
            <Grid item xs={6}>
              <FormControl>
                <RadioGroup
                  row
                  aria-label="estado"
                  name="habilitado"
                  value={espacio.habilitado.toString()}
                  onChange={handleChange}
                >
                  {/*Si llega de la bd no*/}
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
        </Box>

        <Box mt={5}>
          <Button
            variant="contained"
            color="primary"
            onClick={saveData}
            component={Link}
            to="/espacios"
          >
            Guardar
          </Button>
          <Button component={Link} to="/espacios">
            Cancelar
          </Button>
        </Box>
      </Box>
    </>
  );
}

Espacio.propTypes = {
  titulo: PropTypes.string,
};
