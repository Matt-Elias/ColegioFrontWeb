import axios from "axios";

const API_URL = 'http://localhost:8080';

export const login = async(credentials) => {
    try {
        const response = await axios.post(`${API_URL}/login`, credentials);
        // Verifica la estructura REAL 
        console.log("Respuesta RAW del backend:", response.data);

        if (response.data) {
          return {
            success: true,
            data: {
              token: response.data.token || response.data.result?.token,
              role: "ADMINISTRADOR",
              correoElectronico: response.data.correoElectronico || response.data.result?.correoElectronico,
              idUsuario: response.data.usuarioId || response.data.result?.usuarioId
            },
          message: response.data.text || "Inicio de sesión exitoso"
          };
        }
        return {
          success: false,
          message: "Formato inválido"
        };        
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message 
        || "Error al conectar con el servidor"
      };
    }
}

export const getProtectedData = async (token) => {
  const response = await axios.get(`${API_URL}/ruta-protegida`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.data;
};

