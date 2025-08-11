import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const GRADOS_API_URL = `${API_URL}/gradoGrupo`;

const getToken = () => localStorage.getItem("token");

export const consultarGrados = async () => {
    const response = await axios.get(`${GRADOS_API_URL}/consultarGradoGrupos`, {
        headers: {Authorization: `Bearer ${getToken()}`},
    });

    console.log("Datos recibidos: ", response.data);

    return response.data.result || [];
}

export const crearGrado = async (gradoGrupo) => {
    const response = await axios.post(`${GRADOS_API_URL}/registrarGradoGrupos`, gradoGrupo, {
        headers: {Authorization: `Bearer ${getToken()}`},
    });
    return response.data;
}

export const modificarGrado = async (gradoGrupo) => {
    const response = await axios.put(`${GRADOS_API_URL}/modificarGradoGrupos`, gradoGrupo, {
        headers: {Authorization: `Bearer ${getToken()}`}
    });
    return response.data;
}

export const cambiarStatusGrado = async (idGradoGrupo) => {
    const response = await axios.put(`${GRADOS_API_URL}/cambiarStatusGradosGrupos`, {idGradoGrupo}, {
        headers: {Authorization: `Bearer ${getToken()}`}
    });
    return response.data;
}
