import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const EVENTOS_API_URL = `${API_URL}/evento`;

const getToken = () => localStorage.getItem("token");

export const consultarEventos = async () => {
    const response = await axios.get(`${EVENTOS_API_URL}/obtenerEventos`, {
        headers: {Authorization: `Bearer ${getToken()}`},
    });

    console.log("Datos recibidos: ", response.data);

    return response.data.result || [];
}

export const crearEventos = async (evento) => {
    const response = await axios.post(`${EVENTOS_API_URL}/crearEvento`, evento, {
        headers: {Authorization: `Bearer ${getToken()}`},
    });
    return response.data;
}

export const modificarEventos = async (evento) => {
    const response = await axios.put(`${EVENTOS_API_URL}/modificarEvento`, evento, {
        headers: {Authorization: `Bearer ${getToken()}`},
    });
    return response.data;
}



