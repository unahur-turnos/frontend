export default function enrutador(usuario) {
  switch (usuario.rol) {
    case 'asistente':
      console.log('soy un asistente');
      return '/autorizaciones/nueva';
    case 'bedel':
      console.log('soy un bedel');
      return '/actividades/hoy';
    case 'admin':
      console.log('soy un admin');
      return '/actividades';
    default:
      return '/';
  }
}
