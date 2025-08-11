import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const REGISTROS_API_URL = `${API_URL}/registroAsistencia`;

const getToken = () => localStorage.getItem("token");

export const consultarListado = async () => {
    try {
        const response = await axios.get(`${REGISTROS_API_URL}/asistenciaActual`, {
            headers: {Authorization: `Bearer ${getToken()}`},
        });

        console.log("Datos recibidos: ", response.data);
        
        // Obtener el array de resultados
        const dataArray = Array.isArray(response.data) ? response.data : 
                         Array.isArray(response.data.result) ? response.data.result : [];
        
        // Mapear cada array a un objeto con propiedades nombradas
        const registros = dataArray.map(item => {
            return {
                id_registro_asistencia: item[0],
                fecha_hora: item[1],
                registro: item[2],
                usuario_id: item[3],
                estudiante_id: item[4],
                id_usuario: item[5],
                contrasena: item[6],
                correo_electronico: item[7],
                fecha_alta: item[8],
                nombre_completo: item[9],
                status: item[10],
                tipo_usuario: item[11],
                url_imagen: item[12],
                id_estudiante: item[13],
                matricula: item[14],
                tipo: item[15],
                grado_grupo_id_grado_grupo: item[16]
            };
        });

        return registros;
    } catch (error) {
        console.error("Error en consultarListado: ", error);
        throw error;
    }
}
