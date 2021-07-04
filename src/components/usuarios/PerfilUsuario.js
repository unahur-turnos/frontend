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
import SchoolIcon from '@material-ui/icons/School';
import TextField from '@material-ui/core/TextField';
import { inscripcionCarrerasPorUsuario } from '../../state/inscripcionCarreras';
import { useApi } from '../../utils/fetchApi';
import { useHistory } from 'react-router';
import { useInputStyles } from '../../utils/numberFieldWithoutArrows';
import { useState } from 'react';
import { usuarioState } from '../../state/usuario';

export default function PerfilUsuario({ titulo }) {
  const { update } = useApi('usuarios');
  const usuarioDB = useRecoilValue(usuarioState);
  const [datosUsuario, setDatosUsuario] = useState(usuarioDB);
  const setUsuario = useSetRecoilState(usuarioState);

  const carreras = useRecoilValue(inscripcionCarrerasPorUsuario(usuarioDB.id));

  const [edicionActivada, setEdicionActivada] = useState(false);
  const [loading, setLoading] = useState(false);
  const [contraseniaIncorrecta, setContraseniaIncorrecta] = useState(false);

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

  const activarEdicion = () => {
    setEdicionActivada(true);
  };

  const desactivarEdicion = () => {
    setEdicionActivada(false);
  };

  const saveData = async () => {
    setLoading(true);
    try {
      const usuario = await update(datosUsuario);
      setUsuario(usuario);
      volver();
    } catch (e) {
      setLoading(false);
      setContraseniaIncorrecta(true);
    }
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
                disabled={edicionActivada}
                fullWidth
                label="Nombre/s"
                value={datosUsuario.nombre}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <AccountCircleIcon />
                    </InputAdornment>
                  ),
                  readOnly: true,
                }}
              />
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Grid item xs={12} sm={7} md={4}>
              <TextValidator
                disabled={edicionActivada}
                fullWidth
                label="Apellido/s"
                value={datosUsuario.apellido}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <AccountCircleIcon />
                    </InputAdornment>
                  ),
                  readOnly: true,
                }}
              />
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Grid item xs={12} sm={7} md={4}>
              <TextField
                disabled={edicionActivada}
                fullWidth
                label="DNI"
                value={datosUsuario.dni}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <AssignmentIndIcon />
                    </InputAdornment>
                  ),
                  readOnly: true,
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
                  readOnly: !edicionActivada,
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
                  readOnly: !edicionActivada,
                }}
              />
            </Grid>
          </Grid>

          {carreras &&
            carreras.map((carrera) => (
              <Grid item xs={12} key={carrera.nombreCarrera}>
                <Grid item xs={12} sm={7} md={4}>
                  <TextValidator
                    disabled={edicionActivada}
                    fullWidth
                    label="Carrera"
                    value={carrera.nombreCarrera}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <SchoolIcon />
                        </InputAdornment>
                      ),
                      readOnly: true,
                    }}
                  />
                </Grid>
              </Grid>
            ))}

          {edicionActivada && (
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
          )}
        </Grid>

        {contraseniaIncorrecta && (
          <Grid item xs={12} align="center" style={{ marginTop: 10 }}>
            <Typography color="error">
              La contraseña ingresada es incorrecta.
            </Typography>
          </Grid>
        )}

        <Grid container spacing={1} style={{ marginTop: 20 }}>
          {!edicionActivada && (
            <>
              <Grid item xs={6} align="right">
                <Button onClick={volver}>Volver</Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  onClick={activarEdicion}
                  variant="contained"
                  color="primary"
                >
                  Editar
                </Button>
              </Grid>
            </>
          )}
          {edicionActivada && (
            <>
              <Grid item xs={6} align="right">
                <Button onClick={desactivarEdicion}>Cancelar edición</Button>
              </Grid>
              <Grid item xs={6}>
                <BotonGuardar loading={loading} />
              </Grid>
            </>
          )}
        </Grid>
      </ValidatorForm>
    </>
  );
}

PerfilUsuario.propTypes = {
  titulo: PropTypes.string,
};
