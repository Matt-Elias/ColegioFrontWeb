import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const NIVELES_API_URL = `${API_URL}/nivel`;

const getToken = () => localStorage.getItem("token");

export const consultarNiveles = async () => {
    const response = await axios.get(`${NIVELES_API_URL}/consultarNiveles`, {
        headers: {Authorization: `Bearer ${getToken()}`},
    });
    
    console.log("Datos recibidos:", response.data);
    
    // Accede a la propiedad result que contiene el array
    return response.data.result || []; // Si no hay result, devuelve array vacío
}

export const crearNivel = async (nivel) => {
    const response = await axios.post(`${NIVELES_API_URL}/crearNivel`, nivel, {
        headers: {Authorization: `Bearer ${getToken()}`}
    });
    return response.data;
}

export const modificarNivel = async (nivel) => {
    const response = await axios.put(`${NIVELES_API_URL}/modificarNivel`, nivel, {
        headers: {Authorization: `Bearer ${getToken()}`}
    });
    return response.data;
}

export const cambiarStatusNivel = async (idNivel) => {
    const response = await axios.put(`${NIVELES_API_URL}/cambiarStatus`, {idNivel}, {
        headers: {Authorization: `Bearer ${getToken()}`}
    });
    //return response.data;
}

