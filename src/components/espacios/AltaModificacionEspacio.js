import { Button, Grid, MenuItem, Typography } from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';
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
import { useInputStyles } from '../../utils/numberFieldWithoutArrows';
import { BotonGuardar } from '../ui/BotonCargando';

export default function Espacio(props) {
  const { id } = useParams();
  const inputClasses = useInputStyles();
  const { titulo } = props;
  const espacioDB = useRecoilValue(espacioPorId(id)).data;
  const edificiosDB = useRecoilValue(todosLosEdificios);
  const history = useHistory();
  const notificarActualizacion = useNotificarActualizacion('espacios');
  const { create, update } = useApi('espacios');
  const [espacio, setEspacio] = useState(espacioDB);
  const [iconoCargando, setIconoCargando] = useState(false);

  const handleChange = (e) => {
    setEspacio({
      ...espacio,
      [e.target.name]: e.target.value,
    });
  };

  const saveData = async () => {
    setIconoCargando(true);
    if (id !== undefined) {
      await update(espacio);
    } else {
      await create(espacio);
    }

    notificarActualizacion();
    irListaEspacios();
  };

  const irListaEspacios = () => {
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

        <Grid container spacing={4} align="center">
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
              />
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Grid item xs={12} sm={7} md={4}>
              <SelectValidator
                fullWidth
                label="Elegí un edificio"
                id="selectIDEdificio"
                value={espacio.edificioId}
                validators={['required']}
                align="left"
                errorMessages={[ERRORES.requerido]}
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
                id="inputIDPiso"
                validators={['required']}
                errorMessages={[ERRORES.requerido]}
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
                name="aforo"
                type="number"
                className={inputClasses.numberFieldWithoutArrows}
                onChange={handleChange}
                validators={['required']}
                errorMessages={[ERRORES.requerido]}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid container spacing={1} style={{ marginTop: 20 }}>
          <Grid item xs={6} align="right">
            <Button onClick={irListaEspacios}>Cancelar</Button>
          </Grid>
          <Grid item xs={6}>
            <BotonGuardar loading={iconoCargando} />
          </Grid>
        </Grid>
      </ValidatorForm>
    </>
  );
}

Espacio.propTypes = {
  titulo: PropTypes.string,
};
