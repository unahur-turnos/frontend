import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  makeStyles,
  MenuItem,
  Radio,
  RadioGroup,
  Typography,
} from '@material-ui/core';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useApi } from '../../utils/fetchApi';
import PropTypes from 'prop-types';
import { espacioPorId } from '../../state/espacios';
import { useNotificarActualizacion } from '../../state/actualizaciones';
import { todosLosEdificios } from '../../state/edificio';
import { useRecoilValue } from 'recoil';
import { useState } from 'react';
import {
  TextValidator,
  ValidatorForm,
  SelectValidator,
} from 'react-material-ui-form-validator';
import { ERRORES } from '../textos/Textos';

export default function Espacio(props) {
  const { id } = useParams();
  const { titulo } = props;
  const espacioDB = useRecoilValue(espacioPorId(id)).data;
  const edificiosDB = useRecoilValue(todosLosEdificios);
  const history = useHistory();
  const notificarActualizacion = useNotificarActualizacion('espacios');
  const { create, update } = useApi('espacios');
  const classes = useStyles();
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
      <ValidatorForm onSubmit={saveData} instantValidate={false}>
        <Grid item align="center" xs={12}>
          <Typography variant="h4" color="primary">
            {titulo}
          </Typography>
        </Grid>

        <Grid container spacing={4} xs={12} align="center">
          <Grid item xs={12}>
            <Grid item xs={12} sm={7} md={4} style={{ marginTop: 20 }}>
              <TextValidator
                id="nombre"
                label="Ingresá el nombre"
                name="nombre"
                value={espacio.nombre}
                validators={['required']}
                errorMessages={[ERRORES.requerido]}
                fullWidth
                onChange={handleChange}
                defaultValue={espacio.nombre}
              />
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Grid item xs={12} sm={7} md={4}>
              <SelectValidator
                fullWidth
                labelId="labelIdEdificio"
                label="Elegí un edificio"
                id="selectIDEdificio"
                value={espacio.edificioId}
                validators={['required']}
                align="left"
                errorMessages={[ERRORES.requerido]}
                defaultValue={espacio.edificioId}
                name="edificioId"
                onChange={handleChange}
              >
                {edificiosDB.map((edificio) => (
                  <MenuItem key={edificio.id} value={edificio.id}>
                    {edificio.nombre}
                  </MenuItem>
                ))}
              </SelectValidator>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Grid item xs={12} sm={7} md={4}>
              <SelectValidator
                fullWidth
                align="left"
                label="Elegí un piso"
                labelId="labelIdPiso"
                id="inputIDPiso"
                validators={['required']}
                errorMessages={[ERRORES.requerido]}
                defaultValue={espacio.piso}
                value={espacio.piso}
                name="piso"
                onChange={handleChange}
              >
                <MenuItem value={'0'}>0</MenuItem>
                <MenuItem value={'1'}>1</MenuItem>
                <MenuItem value={'2'}>2</MenuItem>
              </SelectValidator>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Grid item xs={12} sm={7} md={4}>
              <TextValidator
                align="left"
                id="aforo"
                label="Ingresá el aforo"
                fullWidth
                value={espacio.aforo}
                defaultValue={espacio.aforo}
                name="aforo"
                type="number"
                className={`${classes.numberTextField}`}
                onChange={handleChange}
                validators={['required']}
                errorMessages={[ERRORES.requerido]}
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid
              component={Box}
              display="flex"
              item
              xs={12}
              sm={7}
              md={4}
              alignItems="center"
            >
              <FormLabel component="legend">Estado:</FormLabel>
              <FormControl>
                <RadioGroup
                  row
                  aria-label="estado"
                  name="habilitado"
                  value={espacio.habilitado.toString()}
                  onChange={handleChange}
                  style={{ marginLeft: 20 }}
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
        </Grid>

        <Grid container item xs={12} spacing={1} style={{ marginTop: 20 }}>
          <Grid item xs={6} align="right">
            <Button variant="contained" color="primary" type="submit">
              Guardar
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button component={Link} to="/espacios">
              Cancelar
            </Button>
          </Grid>
        </Grid>
      </ValidatorForm>
    </>
  );
}

Espacio.propTypes = {
  titulo: PropTypes.string,
};

const useStyles = makeStyles(() => ({
  numberTextField: {
    '& input::-webkit-clear-button, & input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
      display: 'none',
    },
  },
}));
