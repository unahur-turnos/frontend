import { Avatar, Box, IconButton, Menu, MenuItem } from '@material-ui/core';
import { DefaultValue, useRecoilState } from 'recoil';
import { useState } from 'react';
import { usuarioState } from '../../state/usuario';
import { take } from 'ramda';

export default function BotonCerrarSesion() {
  const [usuario, setUsuario] = useRecoilState(usuarioState);
  const [anchorEl, setAnchorEl] = useState(null);
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
        <Avatar fontSize="large" style={{ backgroundColor: '#009688' }}>
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
