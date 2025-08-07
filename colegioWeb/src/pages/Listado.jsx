import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { consultarListado } from "../services/listado";
import estudiante from "../services/estudiante";

const Listado = () => {
    const [listados, setListados] = useState([]);
    const [error, setError] = useState();
    const [fechaActual, setFechaActual] = useState("");
    const [estudiantesMap, setEstudiantesMap] = useState({});

    const cargarDatos = async () => {
        try {
            const registros = await consultarListado();
            
            if (!Array.isArray(registros)) {
                throw new Error(`Formato inesperado: ${JSON.stringify(registros)}`);
            }

             // Obtener IDs únicos de estudiantes
            const estudiantesIds = [...new Set(registros.map(r => r.estudiante_id))];
            
            // Obtener datos de estudiantes
            const estudiantesPromises = estudiantesIds.map(id => 
                estudiante.getDatosEstudiante(localStorage.getItem("token"), id)
            );

            const estudiantesResults = await Promise.all(estudiantesPromises);
            const estudiantesData = {};
            
            estudiantesResults.forEach(result => {
                if (result.success) {
                    estudiantesData[result.data.id] = result.data;
                }
            });

            setEstudiantesMap(estudiantesData);
            setListados(registros);
            setError(null);

            const hoy = new Date();
            setFechaActual(hoy.toLocaleDateString('es-MX', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }));

        } catch (error) {
            console.error("Error cargando niveles: ", error);
            setError("Error al cargar los datos. Por favor intente más tarde.");
            setListados([]);
        }
    }

    useEffect(() => {
        cargarDatos();
    }, []);
    
    const formatearFecha = (dateTimeString) => {
        if (!dateTimeString) return '';
        const date = new Date(dateTimeString);
        return date.toLocaleDateString('es-MX', { 
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    const formatearHora = (dateTimeString) => {
        if (!dateTimeString) return '';
        const date = new Date(dateTimeString);
        return date.toLocaleTimeString('es-MX', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: false // Para formato 24 horas
        });
    };

    const registroEstilo = (registro) => {
        return registro === 'Entrada' 
            ? 'text-green-600 ' 
            : 'text-red-600 ';
    };

    const formatearDataTime = (dateTimeString) => {
        if (!dateTimeString) return '';
        const date = new Date(dateTimeString);
        return date.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' });
    };

    return(
        <div className="flex min-h-screen">
            <Sidebar/>
            <div className="flex-1 ml-12 p-6 transition-all duration-300">
                <h1 className="px-3 py-2 whitespace-nowrap  mt-2 text-left text-3xl font-bold tracking-tight text-gray-500"> Listado de asistencias </h1>

                <h3 className="py-2 px-3 text-gray-600 font-lg font-bold tracking-normal leading-tight mb-4"> Fecha: {fechaActual} </h3>

                <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 text-left font-medium text-gray-500"> Fecha </th>
                            <th className="px-6 py-3 text-left font-medium text-gray-500"> Hora </th>
                            <th className="px-6 py-3 text-left font-medium text-gray-500"> Registro </th>
                            <th className="px-6 py-3 text-left font-medium text-gray-500"> Estudiante </th>
                            <th className="px-6 py-3 text-left font-medium text-gray-500"> Matricula </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {error ? (
                            <tr>
                                <td className="px-6 py-4 whitespace-nowrap" colSpan="2" style={{color: 'red'}}> {error} </td>
                            </tr>
                        ) : listados.length > 0 ? (
                            listados.map((listado) => {
                                const estudiante = estudiantesMap[listado.estudiante_id] || {};
                                return (
                                    <tr key={listado.id_registro_asistencia}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {formatearFecha(listado.fecha_hora)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {formatearHora(listado.fecha_hora)}
                                        </td>
                                        <td className={`px-6 py-4 whitespace-nowrap ${registroEstilo(listado.registro)}`}>
                                            {listado.registro}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {estudiante.nombreCompleto || listado.nombre_completo || 'Desconocido'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {estudiante.matricula || listado.matricula}
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan="2">No hay un listado disponible por ahora</td>
                            </tr>
                        )}

                    </tbody> 
                </table>

            </div>

        </div>
    );
}

export default Listado;