import { makeStyles } from '@material-ui/core';

export default function Footer() {
  const classes = useStyles();
  return (
    <>
      <div className={classes.footer}>
        <p>
          Esta aplicación ha sido realizada por estudiantes de la Licenciatura
          en Informática de la UNaHur. Se permite su uso, modificación y
          distribución bajo los términos de la licencia GPLv3. Si encontraste
          algún error o querés ver el código fuente, podés acceder a la
          organización de GitHub del proyecto.
        </p>
      </div>
    </>
  );
}

const useStyles = makeStyles(() => ({
  footer: {
    bottom: 0,
    backgroundColor: '#CCD1D1',
    padding: '1rem',
    position: 'fixed',
    left: 0,
    width: '100%',
    clear: 'both',
  },
}));

//   .footer{
//     margin-top: 1rem;
//     padding: 1rem;
//     background-color: rgb(235, 195, 64);
//     position: fixed;
//     bottom: 0;
//     left: 0;
//     width: 100%;
//   }
