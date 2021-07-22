import { Button, Grid, Typography, InputAdornment } from '@material-ui/core';
import { BotonGuardar } from '../ui/BotonGuardar';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { useApi } from '../../utils/fetchApi';
import { useSetRecoilState } from 'recoil';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import PhoneEnabledIcon from '@material-ui/icons/PhoneEnabled';
import LockIcon from '@material-ui/icons/Lock';
import EmailIcon from '@material-ui/icons/Email';
import { rutaInicialUsuario, usuarioState } from '../../state/usuario';
import { ERRORES } from '../textos/Textos';
import { useInputStyles } from '../../utils/numberFieldWithoutArrows';

export default function Registro() {
  const inputClasses = useInputStyles();
  const history = useHistory();
  const { create } = useApi('usuarios/registro');

  ValidatorForm.addValidationRule(
    'isPasswordMatch',
    (value) => value === informacionDelUsuario.contrasenia
  );

  ValidatorForm.addValidationRule('contraseñaValida', (value) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/.test(String(value))
  );

  const setUsuario = useSetRecoilState(usuarioState);

  const [informacionDelUsuario, setInformacionDelUsuario] = useState({
    contrasenia: '',
    confirmarContraseña: '',
  });
  const [iconoCargando, setIconoCargando] = useState(false);
  const [tengoErrorEn, setTengoErrorEn] = useState({
    nombre: false,
    apellido: false,
    dni: false,
    email: false,
    telefono: false,
    contraseña: false,
    global: false,
  });

  const handleChange = (e) => {
    setInformacionDelUsuario({
      ...informacionDelUsuario,
      [e.target.name]: e.target.value,
    });
  };

  const volverAlLogin = () => {
    history.push('/login');
  };

  const validarRegistro = async () => {
    setIconoCargando(true);
    setTengoErrorEn({ ...tengoErrorEn, global: false });

    create(informacionDelUsuario)
      .then((usuario) => {
        setUsuario(usuario);
        history.push(rutaInicialUsuario(usuario));
      })
      .catch((err) => {
        ERRORES.mensajeDeError = err.response.data.error;
        setIconoCargando(false);
        setTengoErrorEn({ ...tengoErrorEn, global: true });
      });
  };

  return (
    <>
      <ValidatorForm onSubmit={validarRegistro} instantValidate={false}>
        <Grid item align="center" xs={12}>
          <Typography variant="h4" color="primary">
            Registrarse
          </Typography>
        </Grid>

        <Grid container spacing={4} align="center">
          <Grid item xs={12}>
            <Grid item xs={12} sm={7} md={4} style={{ marginTop: 20 }}>
              <TextValidator
                id="nombreUsuario"
                label="Ingresá tu/s nombre/s"
                name="nombre"
                value={informacionDelUsuario.nombre}
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
                label="Ingresá tu/s apellido/s"
                name="apellido"
                onChange={handleChange}
                fullWidth
                value={informacionDelUsuario.apellido}
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
                id="dniUsuario"
                label="Ingresá tu DNI"
                name="dni"
                type="number"
                className={inputClasses.numberFieldWithoutArrows}
                fullWidth
                onChange={handleChange}
                value={informacionDelUsuario.dni}
                validators={[
                  'required',
                  'minNumber:1000000',
                  'maxNumber:99999999',
                ]}
                errorMessages={[ERRORES.requerido, ERRORES.dni, ERRORES.dni]}
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
                label="Ingresá un correo electrónico"
                name="email"
                onChange={handleChange}
                fullWidth
                value={informacionDelUsuario.email}
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
                value={informacionDelUsuario.telefono}
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
                label="Ingresá una contraseña"
                name="contrasenia"
                type="password"
                fullWidth
                helperText="Mínimo 8 caracteres, con minúsculas, mayúsculas y números"
                onChange={handleChange}
                value={informacionDelUsuario.contrasenia}
                validators={['required', 'contraseñaValida']}
                errorMessages={[ERRORES.requerido, ERRORES.contrasenia]}
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

          <Grid item xs={12}>
            <Grid item xs={12} sm={7} md={4}>
              <TextValidator
                id="confirmarContraseña"
                label="Repetí tu contraseña"
                name="confirmarContraseña"
                type="password"
                fullWidth
                onChange={handleChange}
                value={informacionDelUsuario.confirmarContraseña}
                validators={['required', 'isPasswordMatch']}
                errorMessages={[
                  ERRORES.requerido,
                  ERRORES.contraseniasNoCoinciden,
                ]}
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

          {tengoErrorEn.global && (
            <Grid item xs={12} align="center">
              <Typography color="error">{ERRORES.mensajeDeError}</Typography>
            </Grid>
          )}
        </Grid>
        <Grid container spacing={1} style={{ marginTop: 20, marginBottom: 20 }}>
          <Grid item xs={6} align="right">
            <Button onClick={volverAlLogin}>Cancelar</Button>
          </Grid>
          <Grid item xs={6}>
            <BotonGuardar loading={iconoCargando} />
          </Grid>
        </Grid>
      </ValidatorForm>
    </>
  );
}
