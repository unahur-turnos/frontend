import { Box, IconButton, Menu, MenuItem } from '@material-ui/core';
import { DefaultValue, useSetRecoilState } from 'recoil';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { useState } from 'react';
import { usuarioState } from '../../state/usuario';

export default function BotonCerrarSesion() {
  const setUsuario = useSetRecoilState(usuarioState);
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
        <AccountCircle fontSize="large" />
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
