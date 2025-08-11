import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const PERIODOS_API_URL = `${API_URL}/periodo`;

const getToken = () => localStorage.getItem("token");

export const consultarPeriodos = async () => {
    const response = await axios.get(`${PERIODOS_API_URL}/consultarPeriodo`, {
        headers: {Authorization: `Bearer ${getToken()}`},
    });

    console.log("Datos recibidos: ", response.data);

    return response.data.result || [];
}

export const crearPeriodo = async (periodo) => {
    const response = await axios.post(`${PERIODOS_API_URL}/registrarPeriodo`, periodo, {
        headers: {Authorization: `Bearer ${getToken()}`}
    });
    return response.data;
}

export const modificarPeriodo = async (periodo) => {
    const response = await axios.put(`${PERIODOS_API_URL}/modificarPeriodo`, periodo, {
        headers: {Authorization: `Bearer ${getToken()}`}
    });
    return response.data;
}

