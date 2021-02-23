import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
  useMediaQuery,
} from '@material-ui/core';
import { Link, useHistory, useParams } from 'react-router-dom';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';

import { DateTime } from 'luxon';
import { ERRORES } from '../textos/Textos';
import { PropTypes } from 'prop-types';
import { actividadPorId } from '../../state/actividades';
import { dateFormatter } from '../../utils/dateUtils';
import { todasLasCarreras } from '../../state/carreras';
import { todosLosEspacios } from '../../state/espacios';
import { useApi } from '../../utils/fetchApi';
import { useNotificarActualizacion } from '../../state/actualizaciones';
import { useRecoilValue } from 'recoil';
import { useState } from 'react';
import { useInputStyles } from '../../utils/numberFieldWithoutArrows';

export default function AltaActividad(props) {
  const matches = useMediaQuery('(min-width:600px)');
  const inputClasses = useInputStyles();
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
    dniResponsable,
    activa,
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
            <Typography variant="h6">Nombre de la actividad:</Typography>
          </Grid>

          <Grid item xs={12} sm={6} align={!matches && 'center'}>
            <TextValidator
              label="Ingresá el nombre"
              style={{ minWidth: 250 }}
              name="nombre"
              value={nombre}
              onChange={handleChange}
              validators={['required']}
              errorMessages={[ERRORES.requerido]}
            />
          </Grid>

          <Grid item xs={12} sm={6} align={matches ? 'right' : 'center'}>
            <Typography variant="h6">Espacio:</Typography>
          </Grid>

          <Grid item xs={12} sm={6} align={!matches && 'center'}>
            <FormControl style={{ minWidth: 250 }}>
              <InputLabel id="labelEspacios">Elegí un espacio</InputLabel>
              <Select
                labelId="labelEspacios"
                name="espacioId"
                value={espacioId}
                onChange={handleChange}
                required
              >
                {espacios.map((espacio) => (
                  <MenuItem value={espacio.id} key={espacio.id}>
                    {espacio.nombre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} align={matches ? 'right' : 'center'}>
            <Typography variant="h6">Fecha y hora de inicio:</Typography>
          </Grid>

          <Grid item xs={12} sm={6} align={!matches && 'center'}>
            <TextValidator
              type="datetime-local"
              name="fechaHoraInicio"
              value={dateFormatter(fechaHoraInicio)}
              onChange={handleChange}
              validators={['fechaInicioValida']}
              errorMessages={[ERRORES.fechaInicio]}
            />
          </Grid>

          <Grid item xs={12} sm={6} align={matches ? 'right' : 'center'}>
            <Typography variant="h6">Fecha y hora de cierre:</Typography>
          </Grid>

          <Grid item xs={12} sm={6} align={!matches && 'center'}>
            <TextValidator
              type="datetime-local"
              name="fechaHoraFin"
              value={dateFormatter(fechaHoraFin)}
              onChange={handleChange}
              validators={['fechaFinValida']}
              errorMessages={[ERRORES.fechaFin]}
            />
          </Grid>

          <Grid item xs={12} sm={6} align={matches ? 'right' : 'center'}>
            <Typography variant="h6">
              Nombre y apellido del responsable:
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6} align={!matches && 'center'}>
            <TextField
              label="Ingresá el nombre del responsable"
              style={{ minWidth: 250 }}
              name="responsable"
              value={responsable}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6} align={matches ? 'right' : 'center'}>
            <Typography variant="h6">DNI del responsable:</Typography>
          </Grid>

          <Grid item xs={12} sm={6} align={!matches && 'center'}>
            <TextField
              label="Ingresá el DNI del responsable"
              style={{ minWidth: 250 }}
              type="number"
              name="dniResponsable"
              className={inputClasses.numberFieldWithoutArrows}
              value={dniResponsable}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6} align={matches ? 'right' : 'center'}>
            <Typography variant="h6">En calidad de:</Typography>
          </Grid>

          <Grid item xs={12} sm={6} align={!matches && 'center'}>
            <FormControl>
              <RadioGroup
                row
                aria-label="tipoResponsable"
                name="tipoResponsable"
                defaultValue={'Docente'}
                onChange={handleChange}
              >
                <FormControlLabel
                  value={'Docente'}
                  control={<Radio color="primary" />}
                  label="Docente"
                />
                <FormControlLabel
                  value={'Invitado'}
                  control={<Radio color="primary" />}
                  label="Invitado"
                />
                <FormControlLabel
                  value={'No docente'}
                  control={<Radio color="primary" />}
                  label="No docente"
                />
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} align={matches ? 'right' : 'center'}>
            <Typography variant="h6">Estado:</Typography>
          </Grid>

          <Grid item xs={12} sm={6} align={!matches && 'center'}>
            <FormControl>
              <RadioGroup
                row
                aria-label="activa"
                name="activa"
                value={activa.toString()}
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

          <Grid item xs={12} sm={6} align={matches ? 'right' : 'center'}>
            <Typography variant="h6">Carrera:</Typography>
          </Grid>

          <Grid item xs={12} sm={6} align={!matches && 'center'}>
            <FormControl style={{ minWidth: 250 }}>
              <InputLabel id="labelCarreras">
                Elegí a qué carrera está destinada
              </InputLabel>
              <Select
                labelId="labelCarreras"
                name="restriccionId"
                value={restriccionId}
                onChange={handleChange}
              >
                {carreras.map((carrera) => (
                  <MenuItem value={carrera.id} key={carrera.id}>
                    {carrera.nombre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid container item xs={12} align="center" spacing={1}>
            <Grid item xs={6} align="right">
              <Button variant="contained" color="primary" type="submit">
                Guardar
              </Button>
            </Grid>
            <Grid item xs={6} align="left">
              <Button component={Link} to="/actividades">
                Cancelar
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </ValidatorForm>
    </>
  );
}

AltaActividad.propTypes = {
  titulo: PropTypes.string,
};
