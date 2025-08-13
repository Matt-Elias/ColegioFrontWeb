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

        console.log("URL completa:", `${REGISTROS_API_URL}/asistenciaActual`);
        console.log("Respuesta completa:", response.data);
        console.log("Cantidad de registros:", dataArray.length);
        
        // AQUÍ ESTÁ EL CAMBIO: Ahora mapeamos objetos, no arrays
        const registros = dataArray.map(item => {
            // item ya es un objeto RegistroAsistencia, no un array
            return {
                id_registro_asistencia: item.idRegistroAsistencia,
                fecha_hora: item.fechaHora,
                registro: item.registro,
                usuario_id: item.usuario?.idUsuario,
                estudiante_id: item.estudiante?.idEstudiante,
                // Datos del usuario
                id_usuario: item.usuario?.idUsuario,
                contrasena: item.usuario?.contrasena,
                correo_electronico: item.usuario?.correoElectronico,
                fecha_alta: item.usuario?.fechaAlta,
                nombre_completo: item.usuario?.nombreCompleto,
                status: item.usuario?.status,
                tipo_usuario: item.usuario?.tipoUsuario,
                url_imagen: item.usuario?.urlImagen,
                // Datos del estudiante
                id_estudiante: item.estudiante?.idEstudiante,
                matricula: item.estudiante?.matricula,
                tipo: item.estudiante?.tipo,
                // Si el nombre del estudiante está en un campo específico, úsalo aquí
                nombre_estudiante: item.estudiante?.nombreCompleto || item.estudiante?.nombre || 'Sin nombre',
                grado_grupo_id_grado_grupo: item.estudiante?.gradoGrupo?.idGradoGrupo,
                grado_grupo: item.estudiante?.gradoGrupo?.gradoGrupo,
                nivel_academico: item.estudiante?.gradoGrupo?.nivel?.nivelAcademico
            };
        });

        return registros;
    } catch (error) {
        console.error("Error en consultarListado: ", error);
        throw error;
    }
}