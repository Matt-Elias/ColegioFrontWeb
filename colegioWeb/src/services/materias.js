import axios from "axios";

const API_URL = "http://localhost:8080/materia";

const getToken = () => localStorage.getItem("token");

export const consultarMaterias = async () => {
    const response = await axios.get(`${API_URL}/obtenerMaterias`, {
        headers: {Authorization: `Bearer ${getToken()}`},
    });

    console.log("Datos recibidos: ", response.data);

    return response.data.result || [];
}

export const crearMateria = async (materia) => {
    const response = await axios.post(`${API_URL}/crearMateria`, materia, {
        headers: {Authorization: `Bearer ${getToken()}`},
    });
    return response.data;
}

export const modificarMateria = async (materia) => {
    const response = await axios.put(`${API_URL}/modificarMateria`, materia, {
        headers: {Authorization: `Bearer ${getToken()}`}
    });
    return response.data;
}
