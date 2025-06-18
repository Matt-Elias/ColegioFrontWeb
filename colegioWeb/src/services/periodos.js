import axios from "axios";

const API_URL = "http://localhost:8080/periodo";

const getToken = () => localStorage.getItem("token");

export const consultarPeriodos = async () => {
    const response = await axios.get(`${API_URL}/consultarPeriodo`, {
        headers: {Authorization: `Bearer ${getToken()}`},
    });

    console.log("Datos recibidos: ", response.data);

    return response.data.result || [];
}

export const modificarPeriodo = async (periodo) => {
    const response = await axios.put(`${API_URL}/modificarPeriodo`, periodo, {
        headers: {Authorization: `Bearer ${getToken()}`}
    });
    return response.data;
}

