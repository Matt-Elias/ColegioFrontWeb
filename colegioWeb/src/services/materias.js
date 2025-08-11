import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const MATERIAS_API_URL = `${API_URL}/materia`;

const getToken = () => localStorage.getItem("token");

export const consultarMaterias = async () => {
    const response = await axios.get(`${MATERIAS_API_URL}/obtenerMaterias`, {
        headers: {Authorization: `Bearer ${getToken()}`},
    });

    console.log("Datos recibidos: ", response.data);

    return response.data.result || [];
}

export const crearMateria = async (materia) => {
    const response = await axios.post(`${MATERIAS_API_URL}/crearMateria`, materia, {
        headers: {Authorization: `Bearer ${getToken()}`},
    });
    return response.data;
}

export const modificarMateria = async (materia) => {
    const response = await axios.put(`${MATERIAS_API_URL}/modificarMateria`, materia, {
        headers: {Authorization: `Bearer ${getToken()}`}
    });
    return response.data;
}
