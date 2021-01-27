import {
  Box,
  Fab,
  Zoom,
  makeStyles,
  Toolbar,
  useScrollTrigger,
} from '@material-ui/core';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import PropTypes from 'prop-types';
import logoCovid from '../../assets/logoCovid.png';
import unahur from '../../assets/unahur.png';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  header: {
    backgroundColor: '#C4C4C4',
    color: '#4DB6AD',
    height: '5vw',
    minWidth: '100vw',
  },
  tamanioImagen: {
    width: '60px',
    height: '56px',
  },
  tamanioUnahur: {
    width: '180px',
    height: '45px',
    marginTop: '1px',
  },
}));

function ScrollTop(props) {
  const { children, window } = props;
  const classes = useStyles();
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      '#back-to-top-anchor'
    );

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.root}>
        {children}
      </div>
    </Zoom>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

export default function Header(props) {
  const classes = useStyles();
  return (
    <Box display="flex">
      <Toolbar className={classes.header} id="back-to-top-anchor">
        <img src={logoCovid} className={classes.tamanioImagen} alt="" />
        <img src={unahur} className={classes.tamanioUnahur} alt="" />
        <ScrollTop {...props}>
          <Fab color="primary" size="small" aria-label="scroll back to top">
            <KeyboardArrowUpIcon />
          </Fab>
        </ScrollTop>
      </Toolbar>
    </Box>
  );
}
