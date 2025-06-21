import React, { useState, useEffect } from "react";
import {consultarPeriodos} from "../services/periodos";
import ModalModificarPeriodos from "../components/Periodos/ModalModificarPeriodos";
import Sidebar from "../components/Sidebar";

const Periodos = () => {
    const [periodos, setPeriodos] = useState([]);
    const [modalEditar, setModalEditar] = useState(false);
    const [periodoSeleccionado, setPeriodoSeleccionado] = useState(null);

    const [error, setError] = useState();

    const cargarPeriodos = async () => {
        try {
            const response = await consultarPeriodos();
            const data = response.result || response;

            if (!Array.isArray(data)) {
                throw new Error(`Formato inesperado: ${JSON.stringify(response)}`);
            }
            
            setPeriodos(data);
            setError(null);
        } catch (err) {
            console.error("Error cargando niveles: ",err);
            setError("Error al cargar periodos");
            setPeriodos([]);
        }
    }

    useEffect(()=> {
        cargarPeriodos();
    }, []);

    return(
        <div className="flex min-h-screen">
            <Sidebar/>
            <div className="flex-1 ml-12 p-6 transition-all duration-300">
                <div>
                    <h1 className="px-3 py-2 whitespace-nowrap  mt-2 text-left text-3xl font-bold tracking-tight text-gray-500"> Periodos </h1>

                    <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                            <tr>
                                <th className="px-6 py-3 text-left font-medium text-gray-500"> Calificaciones </th>
                                <th className="px-6 py-3 text-left font-medium text-gray-500"> Asistencia </th>
                                <th className="px-6 py-3 text-left font-medium text-gray-500"> Tareas </th>
                                <th className="px-6 py-3 text-left font-medium text-gray-500"> Proyectos </th>
                                <th className="px-6 py-3 text-left font-medium text-gray-500"> Tipo de periodo </th>
                                <th className="px-6 py-3 text-left font-medium text-gray-500"> Nivel </th>
                                <th className="px-6 py-3 text-left font-medium text-gray-500"> Acciones </th>
                            </tr>
                        </thead>

                        <tbody className="bg-white divide-y divide-gray-200">
                            {error ? (
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap" colSpan="2" style={{color: 'red'}}> {error} </td>
                                </tr>
                            ): periodos.length > 0 ? (
                                periodos.map((periodo)=>(
                                    <tr key={periodo.idPeriodo}>
                                        <td className="px-6 py-4 whitespace-nowrap"> {periodo.calificaciones} </td>
                                        <td className="px-6 py-4 whitespace-nowrap"> {periodo.asistencia} </td>
                                        <td className="px-6 py-4 whitespace-nowrap"> {periodo.tareas} </td>
                                        <td className="px-6 py-4 whitespace-nowrap"> {periodo.proyectos} </td>
                                        <td className="px-6 py-4 whitespace-nowrap"> {periodo.tipoPeriodo} </td>
                                        <td className="px-6 py-4 whitespace-nowrap"> {periodo.nivel?.nivelAcademico || `ID: ${periodo.nivel?.idNivel}`} </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <button className="ml-0 rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300"
                                                onClick={()=> {
                                                    setPeriodoSeleccionado(periodo);
                                                    setModalEditar(true);
                                                }}
                                            > Editar
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ): (
                                <tr>
                                    <td colSpan="2">No hay periodos disponibles</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {modalEditar && (
                <ModalModificarPeriodos
                    periodo= {periodoSeleccionado}
                    cerrar = {()=> setModalEditar(false)}
                    recargar = {cargarPeriodos}
                />
            )}
        </div>
    );
}

export default Periodos;