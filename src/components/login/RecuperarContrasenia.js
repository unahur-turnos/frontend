import { Card, Typography, Grid, CardContent, Box } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { TextValidator } from 'react-material-ui-form-validator';

export default function RecuperarContrasenia() {
  return (
    <>
      <Box mt={5} display="flex" justifyContent="center">
        <Typography variant="h4" color="primary">
          Recuperar contraseña
        </Typography>
      </Box>
      <Grid container spacing={4} align="center">
        <Grid item xs={12}>
          <Grid item xs={9} sm={7} md={4} style={{ marginTop: 20 }}>
            Hola
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
