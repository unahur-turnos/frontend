import { Box, IconButton, Menu, MenuItem } from '@material-ui/core';
import { DefaultValue, useSetRecoilState } from 'recoil';

import AccountCircle from '@material-ui/icons/AccountCircle';
import { useState } from 'react';
import { hayUsuarioLogueadoState, usuarioState } from '../../state/usuario';
import { useRecoilValue } from 'recoil';
import { useHistory } from 'react-router-dom';

export default function BotonCerrarSesion() {
  const setUsuario = useSetRecoilState(usuarioState);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const history = useHistory();
  const hayUsuarioLogueado = useRecoilValue(hayUsuarioLogueadoState);

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

  const iniciarSesion = () => {
    history.push('/login');
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
        {hayUsuarioLogueado && (
          <MenuItem onClick={cerrarSesion}>Cerrar sesión</MenuItem>
        )}
        {!hayUsuarioLogueado && (
          <MenuItem onClick={iniciarSesion}>Iniciar sesión</MenuItem>
        )}
      </Menu>
    </Box>
  );
}
