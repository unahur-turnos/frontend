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

import { actividadPorId } from '../../state/actividades';
import { toISO } from '../../utils/dateUtils';
import { todosLosEspacios } from '../../state/espacios';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { useState } from 'react';

export default function AltaActividad() {
  const { id } = useParams();
  const actividadDB = useRecoilValue(actividadPorId(id));

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
    requiereControl,
  } = actividad;

  const handleChange = (e) => {
    setActividad({
      ...actividad,
      [e.target.name]: e.target.value,
    });
  };

  const crearActividad = (e) => {
    e.preventDefault();
    create('actividades', {
      ...actividad,
    });
  };

  const actualizarActividad = (e) => {
    e.preventDefault();
    update('actividades', id, {
      ...actividad,
    });
  };

  const espacios = useRecoilValue(todosLosEspacios);

  return (
    <>
      <Box mt={8}>
        <Typography variant="h4" color="primary">
          Carga de actividades
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
                value={'Ambos'}
                control={<Radio color="primary" />}
                label="Ambos"
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
            value={toISO(fechaHoraInicio)}
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
            value={toISO(fechaHoraFin)}
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

        <Grid item xs={6} align="right">
          <Typography variant="h6">Destinada a:</Typography>
        </Grid>
        <Grid item xs={6}>
          <FormControl style={{ minWidth: 250 }}>
            <InputLabel id="labelDestino">
              Elija el destino de la actividad
            </InputLabel>
            <Select labelId="labelDestino">{}</Select>
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
              value={estado}
              onChange={handleChange}
            >
              <FormControlLabel
                value={true}
                control={<Radio color="primary" />}
                label="Activo"
              />
              <FormControlLabel
                value={false}
                control={<Radio color="primary" />}
                label="Inactivo"
              />
            </RadioGroup>
          </FormControl>
        </Grid>

        <Grid item xs={6} component={Box} align="right" alignSelf="center">
          <Typography variant="h6">Tipo de turno:</Typography>
        </Grid>
        <Grid item xs={6}>
          <RadioGroup
            row
            aria-label="requiereControl"
            name="requiereControl"
            value={requiereControl}
            onChange={handleChange}
          >
            <FormControlLabel
              value={true}
              control={<Radio color="primary" />}
              label="Automatico"
            />
            <FormControlLabel
              value={false}
              control={<Radio color="primary" />}
              label="A confirmar"
            />
          </RadioGroup>
        </Grid>

        <Grid item xs={12} align="center">
          {(!id && (
            <Button
              variant="contained"
              color="primary"
              onClick={crearActividad}
            >
              Guardar
            </Button>
          )) || (
            <Button
              variant="contained"
              color="primary"
              onClick={actualizarActividad}
            >
              Actualizar
            </Button>
          )}
        </Grid>
      </Grid>
    </>
  );
}
