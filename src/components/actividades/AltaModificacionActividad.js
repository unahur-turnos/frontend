import { AYUDAS, ERRORES } from '../textos/Textos';
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
import {
  SelectValidator,
  TextValidator,
  ValidatorForm,
} from 'react-material-ui-form-validator';
import { dateFormatter, formatISO } from '../../utils/dateUtils';
import { find, propEq } from 'ramda';
import { useHistory, useParams } from 'react-router-dom';

import { Autocomplete } from '@material-ui/lab';
import { BotonGuardar } from '../ui/BotonGuardar';
import { DateTime } from 'luxon';
import { PropTypes } from 'prop-types';
import { actividadPorId } from '../../state/actividades';
import { todasLasCarreras } from '../../state/carreras';
import { todosLosEspacios } from '../../state/espacios';
import { useApi } from '../../utils/fetchApi';
import { useInputStyles } from '../../utils/numberFieldWithoutArrows';
import { useNotificarActualizacion } from '../../state/actualizaciones';
import { useRecoilValue } from 'recoil';
import { useState } from 'react';

export default function AltaActividad({ titulo, esParaDuplicar = false }) {
  const inputClasses = useInputStyles();
  const { id } = useParams();
  const actividadDB = useRecoilValue(actividadPorId(id));
  const notificarActualizacion = useNotificarActualizacion('actividades');
  const history = useHistory();
  const { create, update } = useApi('actividades');
  const [iconoCargando, setIconoCargando] = useState(false);
  const espacios = useRecoilValue(todosLosEspacios);
  const carreras = useRecoilValue(todasLasCarreras);
  const [actividad, setActividad] = useState(actividadDB.data);
  const {
    espacioId,
    nombre,
    fechaHoraInicio,
    fechaHoraFin,
    responsable,
    telefonoDeContactoResponsable,
    activa,
    restriccionId,
  } = actividad;

  const carreraSeleccionada = find(propEq('id', restriccionId), carreras);

  ValidatorForm.addValidationRule(
    'fechaInicioValida',
    (value) => formatISO(value) > formatISO(DateTime.local())
  );

  ValidatorForm.addValidationRule(
    'fechaFinValida',
    (value) => formatISO(value) > formatISO(fechaHoraInicio)
  );

  const handleChange = (e) => {
    setActividad({
      ...actividad,
      [e.target.name]: e.target.value,
    });
  };

  const saveData = async () => {
    setIconoCargando(true);
    if (id !== undefined && !esParaDuplicar) {
      await update(actividad);
    } else {
      const actividadDuplicada = {
        espacioId: actividad.espacioId,
        nombre: actividad.nombre,
        fechaHoraInicio: actividad.fechaHoraInicio,
        fechaHoraFin: actividad.fechaHoraFin,
        responsable: actividad.responsable,
        telefonoDeContactoResponsable: actividad.telefonoDeContactoResponsable,
        estado: actividad.estado,
      };
      await create(esParaDuplicar ? actividadDuplicada : actividad);
    }

    notificarActualizacion();
    irListaActividades();
  };

  const irListaActividades = () => {
    history.push('/actividades');
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
                disabled={esParaDuplicar}
                label="Ingresá el nombre"
                fullWidth
                name="nombre"
                value={nombre || ''}
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
                disabled={esParaDuplicar}
                label="Elegí un espacio"
                name="espacioId"
                value={espacioId || ''}
                onChange={handleChange}
                validators={['required']}
                errorMessages={[ERRORES.requerido]}
                align="left"
              >
                {espacios.map((espacio, id) => (
                  <MenuItem value={espacio.id} key={id}>
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
                value={dateFormatter(fechaHoraInicio) || ''}
                fullWidth
                onChange={handleChange}
                validators={['required', 'fechaInicioValida']}
                errorMessages={[ERRORES.requerido, ERRORES.fechaInicio]}
              />
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Grid item xs={12} sm={7} md={4}>
              <TextValidator
                type="datetime-local"
                name="fechaHoraFin"
                value={dateFormatter(fechaHoraFin) || ''}
                label="Fecha y hora de cierre"
                fullWidth
                onChange={handleChange}
                validators={['required', 'fechaFinValida']}
                errorMessages={[ERRORES.requerido, ERRORES.fechaFin]}
              />
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Grid item xs={12} sm={7} md={4}>
              <TextValidator
                label="Persona responsable"
                fullWidth
                name="responsable"
                value={responsable || ''}
                validators={['required']}
                errorMessages={[ERRORES.requerido]}
                onChange={handleChange}
              />
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Grid item xs={12} sm={7} md={4}>
              <TextValidator
                label="Teléfono de contacto responsable"
                fullWidth
                type="number"
                className={inputClasses.numberFieldWithoutArrows}
                name="telefonoDeContactoResponsable"
                value={telefonoDeContactoResponsable || ''}
                onChange={handleChange}
              />
            </Grid>
          </Grid>

          {/* <Grid item xs={12}>
            <Grid item xs={12} sm={7} md={4}>
              <Autocomplete
                fullWidth
                options={carreras}
                getOptionLabel={(carrera) => carrera.nombre}
                defaultValue={{ nombre: carreraSeleccionada?.nombre }}
                noOptionsText="No hay carreras que coincidan con la búsqueda"
                onChange={(event, carrera) => {
                  setActividad({
                    ...actividad,
                    restriccionId: carrera?.id || null,
                  });
                }}
                renderInput={(params) => (
                  <TextValidator
                    {...params}
                    label="Buscá a qué carrera está destinada"
                    helperText={AYUDAS.selectorCarreras}
                  />
                )}
              />
            </Grid>
          </Grid> */}

          <Grid
            container
            component={Box}
            display="flex"
            justifyContent="center"
            alignItems="center"
            mt={3}
          >
            <FormLabel component="legend">Estado:</FormLabel>
            <FormControl>
              <RadioGroup
                row
                aria-label="activa"
                name="activa"
                value={activa.toString()}
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
        <Grid container spacing={1} style={{ marginTop: 20 }}>
          <Grid item xs={6} align="right">
            <Button onClick={irListaActividades}>Cancelar</Button>
          </Grid>
          <Grid item xs={6}>
            <BotonGuardar loading={iconoCargando} />
          </Grid>
        </Grid>
      </ValidatorForm>
    </>
  );
}

AltaActividad.propTypes = {
  titulo: PropTypes.string,
  esParaDuplicar: PropTypes.bool,
};
