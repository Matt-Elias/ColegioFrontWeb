import axios from "axios";

const API_URL = "http://localhost:8080/usuario";

const getToken =  () => localStorage.getItem("token");

export const consultarUsuarios = async () => {
    const response = await axios.get(`${API_URL}/consultarUsuario`, {
        headers: {Authorization: `Bearer ${getToken()}`}
    });

    console.log("Datos recibidos: ",response.data);
    return response.data.result || [];
}

export const soloEstudiantes = async () => {
    const response = await axios.get(`${API_URL}/soloEstudiantes`, {
        headers: {Authorization: `Bearer ${getToken()}`}
    });

    console.log("Datos recibidos: ",response.data);
    return response.data.result || [];
}

export const soloPadres = async () => {
    const response = await axios.get(`${API_URL}/soloPadres`, {
        headers: {Authorization: `Bearer ${getToken()}`}
    });

    console.log("Datos recibidos: ",response.data);
    return response.data.result || [];
}

export const soloProfesores = async () => {
    const response = await axios.get(`${API_URL}/soloProfesores`, {
        headers: {Authorization: `Bearer ${getToken()}`}
    });

    console.log("Datos recibidos: ",response.data);
    return response.data.result || [];
}

export const crearUsuario = async (usuario) => {
    const response = await axios.post(`${API_URL}/crearUsuario`, usuario, {
        headers: {Authorization: `Bearer ${getToken()}`}
    });
    return response.data;
}

export const modificarUsuario = async (usuario) => {
    const response = await axios.put(`${API_URL}/modificarUsuario`, usuario, {
        headers: {Authorization: `Bearer ${getToken()}`}
    });
    return response.data;
}

export const cambiarStatusUsuario = async (idUsuario) => {
    const response = await axios.put(`${API_URL}/cambiarStatusUsuario`, {idUsuario}, {
        headers: {Authorization: `Bearer ${getToken()}`}
    });
    return response.data;
}

