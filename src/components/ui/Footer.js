import { makeStyles, Typography } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';

export default function Footer() {
  const classes = useStyles();
  return (
    <>
      <div className={classes.footer}>
        <Divider />
        <br />
        <Typography className={classes.texto}>
          Esta aplicación ha sido realizada por estudiantes de la Licenciatura
          en Informática de la UNaHur.
        </Typography>

        <Typography className={classes.texto}>
          Si encontraste algún error o querés ver el código fuente, podés
          acceder a la organización de{' '}
          <a href="https://github.com/unahur-turnos">Github</a> del proyecto.
        </Typography>
        <br />
      </div>
    </>
  );
}

const useStyles = makeStyles(() => ({
  footer: {
    left: 0,
    width: '100%',
    textAlign: 'center',
  },
  texto: {
    fontSize: 'small',
    color: '#2C3E50',
  },
}));
