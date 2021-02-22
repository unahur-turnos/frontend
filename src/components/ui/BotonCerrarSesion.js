import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  makeStyles,
} from '@material-ui/core';
import { DefaultValue, useRecoilState } from 'recoil';
import { useState } from 'react';
import { usuarioState } from '../../state/usuario';
import { take } from 'ramda';
import teal from '@material-ui/core/colors/teal';

export default function BotonCerrarSesion() {
  const [usuario, setUsuario] = useRecoilState(usuarioState);
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = useStyles();
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
        <MenuItem onClick={cerrarSesion}>Cerrar sesión</MenuItem>
      </Menu>
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  backgroundAvatar: {
    backgroundColor: teal[500],
  },
}));
