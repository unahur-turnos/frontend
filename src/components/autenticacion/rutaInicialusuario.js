export default function rutaInicialusuario(usuario) {
  switch (usuario.rol) {
    case 'asistente':
      return '/autorizaciones/nueva';
    case 'bedel':
      return '/actividades/hoy';
    case 'admin':
      return '/actividades';
    default:
      return '/';
  }
}
