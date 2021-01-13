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
} from '@material-ui/core';
import { create, update } from '../../helpers/fetchApi';

import { PropTypes } from 'prop-types';
import { actividadPorId } from '../../state/actividades';
import { useNotificarActualizacion } from '../../state/actualizaciones';
import { dateFormatter } from '../../utils/dateUtils';
import { todosLosEspacios } from '../../state/espacios';
import { Link, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { useState } from 'react';

export default function AltaActividad(props) {
  const { id } = useParams();
  const { titulo } = props;
  const actividadDB = useRecoilValue(actividadPorId(id));
  const notificarActualizacion = useNotificarActualizacion('actividades');

  const [actividad, setActividad] = useState(actividadDB.data);
  const {
    espacioId,
    nombre,
    fechaHoraInicio,
    fechaHoraFin,
    responsable,
    dniResponsable,
    tipoResponsable,
    estado,
  } = actividad;

  const handleChange = (e) => {
    setActividad({
      ...actividad,
      [e.target.name]: e.target.value,
    });
  };

  const saveData = async () => {
    if (id !== undefined) {
      await update(`espacios/${id}`, actividad);
    } else {
      await create('espacios', actividad);
    }

    notificarActualizacion();
    history.push('/espacios');
  };

  const espacios = useRecoilValue(todosLosEspacios);

  return (
    <>
      <Box mt={8}>
        <Typography variant="h4" color="primary">
          {titulo}
        </Typography>
      </Box>

      <Grid
        container
        alignItems="flex-end"
        spacing={3}
        style={{ marginTop: '8px' }}
      >
        <Grid item xs={6} align="right">
          <Typography variant="h6">Nombre de la actividad:</Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Ingrese nombre"
            style={{ minWidth: 250 }}
            name="nombre"
            value={nombre}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={6} component={Box} align="right" alignSelf="center">
          <Typography variant="h6">Para quién va dirigido:</Typography>
        </Grid>
        <Grid item xs={6}>
          <FormControl>
            <RadioGroup
              row
              aria-label="paraQuienVaDirigido"
              name="paraQuienVaDirigido"
              value={true}
              onChange={handleChange}
            >
              <FormControlLabel
                value={'Estudiantes'}
                control={<Radio color="primary" />}
                label="Estudiantes"
              />
              <FormControlLabel
                value={'Invitados'}
                control={<Radio color="primary" />}
                label="Invitados"
              />
              <FormControlLabel
                value={'Docentes'}
                control={<Radio color="primary" />}
                label="Docentes"
              />
              <FormControlLabel
                value={'No Docentes'}
                control={<Radio color="primary" />}
                label="No Docentes"
              />
            </RadioGroup>
          </FormControl>
        </Grid>

        <Grid item xs={6} align="right">
          <Typography variant="h6">Espacio:</Typography>
        </Grid>
        <Grid item xs={6}>
          <FormControl style={{ minWidth: 250 }}>
            <InputLabel id="labelEspacios">Elija un espacio</InputLabel>
            <Select
              labelId="labelEspacios"
              name="espacioId"
              value={espacioId}
              onChange={handleChange}
            >
              {espacios.map((espacio) => (
                <MenuItem value={espacio.id} key={espacio.id}>
                  {espacio.nombre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={6} align="right">
          <Typography variant="h6">Fecha/Hora de inicio:</Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField
            type="datetime-local"
            name="fechaHoraInicio"
            value={dateFormatter(fechaHoraInicio)}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={6} align="right">
          <Typography variant="h6">Fecha/Hora de cierre:</Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField
            type="datetime-local"
            name="fechaHoraFin"
            value={dateFormatter(fechaHoraFin)}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={6} align="right">
          <Typography variant="h6">
            Nombre y apellido del responsable:
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Ingrese el nombre del responsable"
            style={{ minWidth: 250 }}
            name="responsable"
            value={responsable}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={6} align="right">
          <Typography variant="h6">DNI del responsable:</Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Ingrese DNI del responsable"
            style={{ minWidth: 250 }}
            name="dniResponsable"
            value={dniResponsable}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={6} component={Box} align="right" alignSelf="center">
          <Typography variant="h6">En calidad de:</Typography>
        </Grid>
        <Grid item xs={6}>
          <FormControl>
            <RadioGroup
              row
              aria-label="tipoResponsable"
              name="tipoResponsable"
              value={tipoResponsable}
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

        <Grid item xs={6} component={Box} align="right" alignSelf="center">
          <Typography variant="h6">Estado:</Typography>
        </Grid>
        <Grid item xs={6}>
          <FormControl>
            <RadioGroup
              row
              aria-label="estado"
              name="estado"
              value={estado.toString()}
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

        <Grid container item xs={12} align="center" spacing={3}>
          <Grid item xs={6} align="right">
            <Button variant="contained" color="primary" onClick={saveData}>
              {!id ? 'Guardar' : 'Actualizar'}
            </Button>
          </Grid>
          <Grid item xs={6} align="left">
            <Button
              variant="contained"
              color="secondary"
              component={Link}
              to="/actividades"
            >
              Cancelar
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

AltaActividad.propTypes = {
  titulo: PropTypes.string,
};
