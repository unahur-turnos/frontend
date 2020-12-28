import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import ListadoUsuarios from './ListadoUsuarios';
import ProTip from './ProTip';

const useStyles = makeStyles(() => ({
  card: {
    marginTop: '20px',
  },
}));

function EjemploApi() {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <Suspense fallback={<CircularProgress />}>
        <ErrorBoundary
          fallback={
            <Alert severity="warning">
              No pudimos cargar los usuarios. ¿Levantaste la API?{' '}
              <span role="img" aria-label="thinking">
                🤔
              </span>
            </Alert>
          }
        >
          <CardContent>
            <ListadoUsuarios />
          </CardContent>
        </ErrorBoundary>
      </Suspense>
    </Card>
  );
}

function ClonarProyecto() {
  return (
    <>
      <ProTip />
      <Grid container justify="center">
        <Button
          variant="contained"
          color="primary"
          href="https://github.com/unahur-desapp/react-recoil-app-seed/generate"
        >
          ¡Quiero crear mi proyecto!
        </Button>
      </Grid>
    </>
  );
}

export default function Home() {
  return (
    <>
      <Typography variant="h4" gutterBottom>
        Repositorio semilla React - Recoil - Material UI
      </Typography>
      <EjemploApi />
      <ClonarProyecto />
    </>
  );
}
