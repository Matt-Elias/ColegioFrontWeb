import axios from "axios";

const API_URL = "http://localhost:8080/nivel";

const getToken = () => localStorage.getItem("token");

export const consultarNiveles = async () => {
    const response = await axios.get(`${API_URL}/consultarNiveles`, {
        headers: {Authorization: `Bearer ${getToken()}`},
    });
    
    console.log("Datos recibidos:", response.data);
    
    // Accede a la propiedad result que contiene el array
    return response.data.result || []; // Si no hay result, devuelve array vacío
}

export const crearNivel = async (nivel) => {
    const response = await axios.post(`${API_URL}/crearNivel`, nivel, {
        headers: {Authorization: `Bearer ${getToken()}`}
    });
    return response.data;
}

export const modificarNivel = async (nivel) => {
    const response = await axios.put(`${API_URL}/modificarNivel`, nivel, {
        headers: {Authorization: `Bearer ${getToken()}`}
    });
    return response.data;
}

export const cambiarStatusNivel = async (idNivel) => {
    const response = await axios.put(`${API_URL}/cambiarStatus`, {idNivel}, {
        headers: {Authorization: `Bearer ${getToken()}`}
    });
    return response.data;
}

