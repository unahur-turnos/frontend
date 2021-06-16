import {
  Avatar,
  Box,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  makeStyles,
} from '@material-ui/core';
import { DefaultValue, useRecoilState } from 'recoil';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { take } from 'ramda';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { usuarioState } from '../../state/usuario';

export default function MenuNavBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [usuario, setUsuario] = useRecoilState(usuarioState);
  const history = useHistory();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const misDatos = () => {
    history.push('/misDatos');
    handleClose();
  };

  const cerrarSesion = () => {
    setUsuario(new DefaultValue());
    handleClose();
  };

  return (
    <Box display="flex" justifyContent="flex-end">
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <Avatar fontSize="large" className={classes.backgroundAvatar}>
          {take(1, usuario.nombre).toUpperCase()}
          {take(1, usuario.apellido).toUpperCase()}
        </Avatar>
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={misDatos}>
          <ListItemIcon>
            <AccountCircleIcon fontSize="small" color="primary" />
          </ListItemIcon>
          <ListItemText primary="Mis datos" />
        </MenuItem>
        <MenuItem onClick={cerrarSesion}>
          <ListItemIcon>
            <ExitToAppIcon fontSize="small" color="primary" />
          </ListItemIcon>
          <ListItemText primary="Cerrar sesión" />
        </MenuItem>
      </Menu>
    </Box>
  );
}

const useStyles = makeStyles(({ palette }) => ({
  backgroundAvatar: {
    backgroundColor: palette.secondary.dark,
  },
}));
