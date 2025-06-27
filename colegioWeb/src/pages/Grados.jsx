import React, { useState, useEffect } from "react";
import { consultarGrados, cambiarStatusGrado } from "../services/grados";
import ModalAgregarGrado from "../components/GradosGrupos/ModalAgregarGrado";
import ModalModificarGrado from "../components/GradosGrupos/ModalModificarGrado";
import Sidebar from "../components/Sidebar";
import Switch from '@mui/material/Switch';

const Grados = () => {
    const [gradosGrupos, setGradosGrupos] = useState([]);
    const [modalAgregar, setModalAgregar] = useState(false);
    const [modalEditar, setModalEditar] = useState(false);
    const [gradoSeleccionado, setGradoSeleccionado] = useState(null);

    const [error, setError] = useState();

    const cargarGrados = async () => {
        try {
            const response = await consultarGrados();
            const data = response.result || response;

            if (!Array.isArray(data)) {
                throw new Error (`Formato inesperado: ${JSON.stringify(response)}`);
            }
            
            setGradosGrupos(data.map(gradoGrupo => ({
                ...gradoGrupo,
                activo: gradoGrupo.status
            })));

            //setGradosGrupos(data);
            setError(null);
        } catch (err) {
            console.error("Error cargando niveles: ", err);
            setError("Error al cargar grados y grupos");
            setGradosGrupos([]);
        }
    }

    useEffect(()=>{
        cargarGrados();
    }, []);

    const cambiarStatus = async (event, idGradoGrupo) => {
        event.preventDefault();
        try {
            await cambiarStatusGrado(idGradoGrupo);
            setGradosGrupos(prevGrados =>
                prevGrados.map(gradoGrupo => 
                    gradoGrupo.idGradoGrupo === idGradoGrupo
                        ? { ...gradoGrupo, status: !gradoGrupo.status}
                        : gradoGrupo
                )
            );
        } catch (error) {
            console.error("Error al cambiar el estado:", error);
        }
    }

    return(
        <div className="flex min-h-screen"> 
            <Sidebar/>
            <div className="flex-1 ml-12 p-6 transition-all duration-300">
                <div>
                    <h1 className="px-3 py-2 whitespace-nowrap  mt-2 text-left text-3xl font-bold tracking-tight text-gray-500"> Grados y grupos </h1>
                    
                    <button className="px-3 py-2 whitespace-nowrap ml-3 rounded-md bg-green-500 text-sm font-semibold text-white shadow-sm hover:bg-green-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-300"
                        onClick={
                            () => setModalAgregar(true)
                        }> Agregar grado 
                    </button>

                    <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                            <tr>
                                <th className="px-6 py-3 text-left font-medium text-gray-500"> Grado y grupo </th>
                                <th className="px-6 py-3 text-left font-medium text-gray-500"> Nivel academico </th>
                                <th className="px-6 py-3 text-left font-medium text-gray-500"> Acciones </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {error ? (
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap" colSpan="2" style={{color: 'red'}}> {error} </td>
                                </tr>
                            ): gradosGrupos.length > 0 ? (
                                gradosGrupos.map((gradoGrupo)=>(
                                    <tr key={gradoGrupo.idGradoGrupo}>
                                        <td className="px-6 py-4 whitespace-nowrap"> {gradoGrupo.gradoGrupo} </td>
                                        <td className="px-6 py-4 whitespace-nowrap"> {gradoGrupo.nivel?.nivelAcademico || `ID: ${gradoGrupo.nivel?.idNivel}`} </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <Switch checked={gradoGrupo.status} onChange={(e) => cambiarStatus(e, gradoGrupo.idGradoGrupo)} className="ml-0"/>
                                            
                                            <button className="ml-6  rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300"
                                                onClick={()=> {
                                                    setGradoSeleccionado(gradoGrupo);
                                                    setModalEditar(true);
                                                }}
                                            > Editar
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="2">No hay periodos disponibles</td>
                                </tr>
                            )}

                        </tbody>
                    </table>              
                </div>
            </div>

            {modalAgregar && (
                <ModalAgregarGrado
                    cerrar={()=> setModalAgregar(false)}
                    recargar={cargarGrados}
                />
            )}

            {modalEditar && (
                <ModalModificarGrado 
                    gradoGrupo={gradoSeleccionado}
                    cerrar={()=> setModalEditar(false)}
                    recargar={cargarGrados}
                />
            )}

        </div>
    );
}

export default Grados;
