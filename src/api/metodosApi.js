import axios from 'axios';

export const eliminarPorId = async (ruta, id) => {
  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_API_URL}/${ruta}/${id}`
    );
    return response;
  } catch (error) {
    console.log(`Error al eliminar: ${error}`);
  }
};
