import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import { Button } from '@material-ui/core/';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import logoCovid from '../../assets/logoCovid.png';
import unahur from '../../assets/unahur.png';

import { Link } from 'react-router-dom';

const drawerWidth = 220;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
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
  listText: {
    color: '#202020',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function ResponsiveDrawer(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [screen, setScreen] = useState('inicio');

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <ListItem
          onClick={() => setScreen('inicio')}
          color="inherit"
          style={{
            backgroundColor: screen.includes('inicio') ? '#BAE2CD' : '#FFFFFF',
          }}
          component={Link}
          to={`/`}
        >
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText className={classes.listText} primary={'Inicio'} />
        </ListItem>
        <ListItem
          onClick={() => setScreen('actividades')}
          className={classes.button}
          style={{
            backgroundColor: screen.includes('actividades')
              ? '#BAE2CD'
              : '#FFFFFF',
          }}
          component={Link}
          to={`/actividades`}
        >
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText className={classes.listText} primary={'Actividades'} />
        </ListItem>
        <ListItem
          onClick={() => setScreen('espacios')}
          className={classes.button}
          color="#FFFAFA"
          style={{
            backgroundColor: screen.includes('espacios')
              ? '#BAE2CD'
              : '#FFFFFF',
          }}
          component={Link}
          to={`/espacios`}
        >
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText className={classes.listText} primary={'Espacios'} />
        </ListItem>
      </List>
      <Divider />
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.header} id="back-to-top-anchor">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <img src={logoCovid} className={classes.tamanioImagen} alt="" />
          <img src={unahur} className={classes.tamanioUnahur} alt="" />
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
