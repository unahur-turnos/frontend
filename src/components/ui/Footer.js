import { makeStyles, Typography } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';

export default function Footer() {
  const classes = useStyles();
  return (
    <>
      <div className={classes.footer}>
        <Divider />
        <br />
        <Typography variant="body2" className={classes.texto}>
          Esta aplicación ha sido realizada por estudiantes de la Licenciatura
          en Informática de la UNaHur.
        </Typography>

        <Typography variant="body2" className={classes.texto}>
          Si encontraste algún error o querés ver el código fuente, podés
          acceder a la organización de{' '}
          <a href="https://github.com/unahur-turnos">Github</a> del proyecto.
        </Typography>
        <br />
      </div>
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  footer: {
    left: 0,
    width: '100%',
    textAlign: 'center',
  },
  texto: {
    color: theme.palette.text.secondary,
  },
}));
