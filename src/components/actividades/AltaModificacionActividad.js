import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  Typography,
} from '@material-ui/core';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Autocomplete } from '@material-ui/lab';
import {
  SelectValidator,
  TextValidator,
  ValidatorForm,
} from 'react-material-ui-form-validator';
import { DateTime } from 'luxon';
import { PropTypes } from 'prop-types';
import { actividadPorId } from '../../state/actividades';
import { dateFormatter } from '../../utils/dateUtils';
import { todasLasCarreras } from '../../state/carreras';
import { todosLosEspacios } from '../../state/espacios';
import { useApi } from '../../utils/fetchApi';
import { useNotificarActualizacion } from '../../state/actualizaciones';
import { useRecoilValue } from 'recoil';
import { useState } from 'react';
import { ERRORES, AYUDAS } from '../textos/Textos';

export default function AltaActividad(props) {
  const { id } = useParams();
  const { titulo } = props;
  const actividadDB = useRecoilValue(actividadPorId(id));
  const notificarActualizacion = useNotificarActualizacion('actividades');
  const history = useHistory();
  const { create, update } = useApi('actividades');

  ValidatorForm.addValidationRule(
    'fechaInicioValida',
    (value) => DateTime.fromISO(value) > DateTime.local()
  );

  ValidatorForm.addValidationRule(
    'fechaFinValida',
    (value) => value > actividad.fechaHoraInicio
  );

  const [actividad, setActividad] = useState(actividadDB.data);
  const {
    espacioId,
    nombre,
    fechaHoraInicio,
    fechaHoraFin,
    responsable,
    restriccionId,
  } = actividad;

  const handleChange = (e) => {
    setActividad({
      ...actividad,
      [e.target.name]: e.target.value,
    });
  };

  const saveData = async () => {
    if (id !== undefined) {
      await update(actividad);
    } else {
      await create(actividad);
    }

    notificarActualizacion();
    history.push('/actividades');
  };

  const espacios = useRecoilValue(todosLosEspacios);
  const carreras = useRecoilValue(todasLasCarreras);

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
                label="Ingresá el nombre"
                fullWidth
                name="nombre"
                value={nombre}
                onChange={handleChange}
                validators={['required']}
                errorMessages={[ERRORES.requerido]}
              />
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Grid item xs={12} sm={7} md={4}>
              <SelectValidator
                fullWidth
                label="Elegí un espacio"
                labelId="labelEspacios"
                name="espacioId"
                value={espacioId}
                onChange={handleChange}
                validators={['required']}
                errorMessages={[ERRORES.requerido]}
                align="left"
              >
                {espacios.map((espacio) => (
                  <MenuItem value={espacio.id} key={espacio.id}>
                    {espacio.nombre}
                  </MenuItem>
                ))}
              </SelectValidator>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Grid item xs={12} sm={7} md={4}>
              <TextValidator
                type="datetime-local"
                name="fechaHoraInicio"
                label="Fecha y hora de inicio"
                value={dateFormatter(fechaHoraInicio)}
                fullWidth
                onChange={handleChange}
                validators={['fechaInicioValida']}
                errorMessages={[ERRORES.fechaInicio]}
              />
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Grid item xs={12} sm={7} md={4}>
              <TextValidator
                type="datetime-local"
                name="fechaHoraFin"
                value={dateFormatter(fechaHoraFin)}
                label="Fecha y hora de cierre"
                fullWidth
                onChange={handleChange}
                validators={['fechaFinValida']}
                errorMessages={[ERRORES.fechaFin]}
              />
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Grid item xs={12} sm={7} md={4}>
              <TextValidator
                label="Ingresá información del responsable"
                fullWidth
                name="responsable"
                value={responsable}
                validators={['required']}
                errorMessages={[ERRORES.responsable]}
                onChange={handleChange}
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
                  name="estado"
                  defaultValue={'true'}
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

          <Grid item xs={12}>
            <Grid item xs={12} sm={7} md={4}>
              <Autocomplete
                fullWidth
                options={carreras}
                getOptionLabel={(carrera) => carrera.nombre}
                noOptionsText="No hay carreras que coincidan con la búsqueda"
                value={restriccionId}
                onChange={(event, carrera) => {
                  setActividad({
                    ...actividad,
                    restriccionId: carrera.id,
                  });
                }}
                renderInput={(params) => (
                  <TextValidator
                    {...params}
                    validators={['required']}
                    errorMessages={[ERRORES.requerido]}
                    label="Buscá a qué carrera está destinada"
                    helperText={AYUDAS.selectorCarreras}
                  />
                )}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid container item xs={12} spacing={1} style={{ marginTop: 20 }}>
          <Grid item xs={6} align="right">
            <Button component={Link} to="/actividades">
              Cancelar
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button variant="contained" color="primary" type="submit">
              Guardar
            </Button>
          </Grid>
        </Grid>
      </ValidatorForm>
    </>
  );
}

AltaActividad.propTypes = {
  titulo: PropTypes.string,
};
