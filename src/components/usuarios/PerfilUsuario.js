import { Button, Grid, InputAdornment, Typography } from '@material-ui/core';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import { BotonGuardar } from '../ui/BotonGuardar';
import { ERRORES } from '../textos/Textos';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import PhoneEnabledIcon from '@material-ui/icons/PhoneEnabled';
import { PropTypes } from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { omit } from 'ramda';
import { useApi } from '../../utils/fetchApi';
import { useHistory } from 'react-router';
import { useInputStyles } from '../../utils/numberFieldWithoutArrows';
import { useState } from 'react';
import { usuarioState } from '../../state/usuario';

export default function PerfilUsuario({ titulo }) {
  const usuarioDB = useRecoilValue(usuarioState);
  const [datosUsuario, setDatosUsuario] = useState(usuarioDB);
  const setUsuario = useSetRecoilState(usuarioState);

  const { update } = useApi('usuarios');

  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const inputClasses = useInputStyles();

  const handleChange = (e) => {
    setDatosUsuario({
      ...datosUsuario,
      [e.target.name]: e.target.value,
    });
  };

  const volver = () => {
    history.push('/');
  };

  const saveData = async () => {
    setLoading(true);
    await update(datosUsuario);
    setUsuario(omit(['contrasenia'], datosUsuario));
    volver();
  };

  return (
    <>
      <ValidatorForm onSubmit={saveData}>
        <Grid item align="center" xs={12}>
          <Typography variant="h4" color="primary">
            {titulo}
          </Typography>
        </Grid>

        <Grid container spacing={4} align="center">
          <Grid item xs={12}>
            <Grid item xs={12} sm={7} md={4} style={{ marginTop: 20 }}>
              <TextValidator
                id="nombreUsuario"
                label="Nombre/s"
                name="nombre"
                value={datosUsuario.nombre}
                fullWidth
                onChange={handleChange}
                validators={['required']}
                errorMessages={[ERRORES.requerido]}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <AccountCircleIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Grid item xs={12} sm={7} md={4}>
              <TextValidator
                id="apellidoUsuario"
                label="Apellido/s"
                name="apellido"
                onChange={handleChange}
                fullWidth
                value={datosUsuario.apellido}
                validators={['required']}
                errorMessages={[ERRORES.requerido]}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <AccountCircleIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Grid item xs={12} sm={7} md={4}>
              <TextField
                disabled
                fullWidth
                label="DNI"
                value={datosUsuario.dni}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <AssignmentIndIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Grid item xs={12} sm={7} md={4}>
              <TextValidator
                id="emailUsuario"
                label="Correo electrónico"
                name="email"
                onChange={handleChange}
                fullWidth
                value={datosUsuario.email}
                validators={['required', 'isEmail']}
                errorMessages={[ERRORES.requerido, ERRORES.email]}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Grid item xs={12} sm={7} md={4}>
              <TextValidator
                id="telefono"
                label="Número de celular"
                name="telefono"
                type="number"
                className={inputClasses.numberFieldWithoutArrows}
                onChange={handleChange}
                fullWidth
                value={datosUsuario.telefono}
                validators={['required']}
                errorMessages={[ERRORES.requerido]}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <PhoneEnabledIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Grid item xs={12} sm={7} md={4}>
              <TextValidator
                id="contraseniaUsuario"
                label="Ingresá tu contraseña"
                name="contrasenia"
                type="password"
                fullWidth
                onChange={handleChange}
                value={datosUsuario.contrasenia}
                validators={['required']}
                errorMessages={[ERRORES.requerido]}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <LockIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid container spacing={1} style={{ marginTop: 20 }}>
          <Grid item xs={6} align="right">
            <Button onClick={volver}>Cancelar</Button>
          </Grid>
          <Grid item xs={6}>
            <BotonGuardar loading={loading} />
          </Grid>
        </Grid>
      </ValidatorForm>
    </>
  );
}

PerfilUsuario.propTypes = {
  titulo: PropTypes.string,
};
