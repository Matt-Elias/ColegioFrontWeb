import React, { useState, useEffect, useMemo } from "react";
import Sidebar from "../components/Sidebar";
import { consultarListado } from "../services/listado";
import estudiante from "../services/estudiante";
import { Paginacion } from "../components/Paginacion";

const Listado = () => {
    const [listados, setListados] = useState([]);
    const [error, setError] = useState();
    const [fechaActual, setFechaActual] = useState("");
    const [estudiantesMap, setEstudiantesMap] = useState({});
    const [paginaActual, setPaginaActual] = useState(1);
    const [itemsPorPagina, setItemsPorPagina] = useState(10);

    const cargarDatos = async () => {
        try {
            const registros = await consultarListado();

            console.log("Datos crudos desde API:", registros);
            
            // Verificar que registros sea un array
            if (!Array.isArray(registros)) {
                throw new Error(`Formato inesperado: ${JSON.stringify(registros)}`);
            }

            console.log("Registros procesados:", registros);
            console.log("Primer registro para debug:", registros[0]);

            // Debug de zona horaria - MEJORADO
            const fechaOriginal = registros[0]?.fecha_hora;
            const fechaJS = new Date(fechaOriginal);
            console.log("=== DEBUG ZONA HORARIA ===");
            console.log("Fecha original del servidor:", fechaOriginal);
            console.log("Interpretación JavaScript UTC:", fechaJS.toUTCString());
            console.log("Hora local del navegador:", fechaJS.toLocaleString());
            console.log("Hora con +6 horas:", new Date(fechaJS.getTime() + 6*60*60*1000).toLocaleString());
            console.log("========================");

            // Obtener IDs únicos de estudiantes
            const estudiantesIds = [...new Set(registros.map(r => r.estudiante_id).filter(id => id))];
            console.log("IDs de estudiantes únicos:", estudiantesIds);
            
            // Obtener datos de estudiantes
            const estudiantesPromises = estudiantesIds.map(id => 
                estudiante.getDatosEstudiante(localStorage.getItem("token"), id)
            );

            const estudiantesResults = await Promise.all(estudiantesPromises);
            const estudiantesData = {};
            
            estudiantesResults.forEach(result => {
                if (result.success) {
                    // Usamos idEntidadEstudiante como clave porque es el ID del estudiante
                    estudiantesData[result.data.idEntidadEstudiante] = result.data;
                }
            });

            console.log("Datos de estudiantes obtenidos:", estudiantesData);

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
            console.error("Error cargando datos: ", error);
            setError("Error al cargar los datos. Por favor intente más tarde.");
            setListados([]);
        }
    }

    useEffect(() => {
        cargarDatos();
    }, []);
    
    const formatearFecha = (dateTimeString) => {
        if (!dateTimeString) return '';
        
        // Crear fecha y ajustar zona horaria correctamente
        const date = new Date(dateTimeString);
        
        // Si la fecha viene en UTC pero representa hora local de México,
        // necesitamos interpretar la hora UTC como si fuera hora local
        const fechaCorregida = new Date(date.getTime() + (6 * 60 * 60 * 1000)); // +6 horas
        
        return fechaCorregida.toLocaleDateString('es-MX', { 
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    const formatearHora = (dateTimeString) => {
        if (!dateTimeString) return '';
        
        // Crear fecha y ajustar zona horaria correctamente
        const date = new Date(dateTimeString);
        
        // Si la fecha viene en UTC pero representa hora local de México,
        // necesitamos interpretar la hora UTC como si fuera hora local
        const fechaCorregida = new Date(date.getTime() + (6 * 60 * 60 * 1000)); // +6 horas
        
        return fechaCorregida.toLocaleTimeString('es-MX', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: false
        });
    };

    const registroEstilo = (registro) => {
        return registro === 'Entrada' 
            ? 'text-green-600 ' 
            : 'text-red-600 ';
    };

    const listadoPaginado = useMemo(() => {
        const inicio = (paginaActual - 1) * itemsPorPagina;
        const fin = inicio + itemsPorPagina;
        return listados.slice(inicio, fin);
    }, [listados, paginaActual, itemsPorPagina]);

    const totalPaginas = useMemo(() => {
        return Math.ceil(listados.length / itemsPorPagina);
    }, [listados, itemsPorPagina]);
    
    const cambiarPagina = (nuevaPagina) => {
        setPaginaActual(nuevaPagina);
    };
    
    const cambiarItemsPorPagina = (nuevoNumero) => {
        setItemsPorPagina(nuevoNumero);
        setPaginaActual(1); // Resetear a la primera página
    };

    return(
        <div className="flex min-h-screen">
            <Sidebar/>
            <div className="flex-1 ml-12 p-6 transition-all duration-300">
                <h1 className="px-3 py-2 whitespace-nowrap mt-2 text-left text-3xl font-bold tracking-tight text-gray-500"> 
                    Listado de asistencias 
                </h1>

                <h3 className="py-2 px-3 text-gray-600 font-lg font-bold tracking-normal leading-tight mb-4"> 
                    Fecha: {fechaActual} 
                </h3>

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
                                <td className="px-6 py-4 whitespace-nowrap" colSpan="5" style={{color: 'red'}}> 
                                    {error} 
                                </td>
                            </tr>
                        ) : listadoPaginado.length > 0 ? (
                            listadoPaginado.map((listado, index) => {
                                // Obtener datos del estudiante desde el mapa
                                const estudianteData = estudiantesMap[listado.estudiante_id];
                                
                                return (
                                    <tr key={listado.id_registro_asistencia || index}>
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
                                            {estudianteData?.nombreCompleto || 'Sin nombre'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {listado.matricula || estudianteData?.matricula || 'Sin matricula'}
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan="5">No hay un listado disponible por ahora</td>
                            </tr>
                        )}
                    </tbody> 
                </table>

                <Paginacion 
                    paginaActual={paginaActual}
                    totalPaginas={totalPaginas}
                    cambiarPagina={cambiarPagina}
                    itemsPorPagina={itemsPorPagina}
                    cambiarItemsPorPagina={cambiarItemsPorPagina}
                />   
            </div>
        </div>
    );
}

export default Listado;