import React, { useEffect, useState } from "react";
import {consultarNiveles, cambiarStatusNivel} from "../services/niveles";
import ModalAgregarNivel from "../components/Nivel/ModalAgregarNivel";
import ModalModificarNivel from "../components/Nivel/ModalModificarNivel";
import Sidebar from "../components/Sidebar";
import Switch from '@mui/material/Switch';

const Nivel = () => {
    const [niveles, setNiveles] = useState([]);
    const [modalEditar, setModalEditar] = useState(false);
    const [modalAgregar, setModalAgregar] = useState(false);
    const [nivelSeleccionado, setNivelSeleccionado] = useState(null);

    const [error, setError] = useState();
    
    const cargarNiveles = async () => {
        try {
            const response = await consultarNiveles();
            const data = response.result || response; // Doble protección
            
            if (!Array.isArray(data)) {
                throw new Error(`Formato inesperado: ${JSON.stringify(response)}`);
            }
            
            setNiveles(data.map(nivel => ({
                ...nivel,
                activo: nivel.status // Todos los switches aparecerán encendidos
            })));

            //setNiveles(data);
            setError(null);
        } catch (err) {
            console.error("Error cargando niveles:", err);
            setError("Error al cargar niveles");
            setNiveles([]);
        }
    }

    const cambiarStatus = async (event, idNivel) => {
        event.preventDefault();
        try {
            await cambiarStatusNivel(idNivel);
            
            // Actualiza el estado local invirtiendo el valor actual
            setNiveles(prevNiveles => 
                prevNiveles.map(nivel => 
                    nivel.idNivel === idNivel 
                        ? { ...nivel, status: !nivel.status } // Invertimos el estado
                        : nivel
                )
            );
        } catch (error) {
            console.error("Error al cambiar el estado:", error);
        }
    };

    useEffect(()=> {
        cargarNiveles();
    }, []);

    return(
        <div className="flex min-h-screen">
            <Sidebar/>
            <div className="flex-1 ml-12 p-6 transition-all duration-300">
                <div>
                    <h1 className="px-3 py-2 whitespace-nowrap  mt-2 text-left text-3xl font-bold tracking-tight text-gray-500"> Niveles Academicos </h1>

                    <button className="px-3 py-2 whitespace-nowrap ml-3 rounded-md bg-green-500 text-sm font-semibold text-white shadow-sm hover:bg-green-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-300"
                        onClick={
                            () => setModalAgregar(true)
                        }> Agregar nivel 
                    </button>
            
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                            <tr>
                                <th className="px-6 py-3 text-left font-medium text-gray-500"> Nivel academico </th>
                                <th className="px-6 py-3 text-left font-medium text-gray-500"> Acciones </th>
                            </tr>
                        </thead>

                        <tbody className="bg-white divide-y divide-gray-200">
                            {error ? (
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap" colSpan="2" style={{color: 'red'}}>{error}</td>
                                </tr>
                            ) : niveles.length > 0 ? (
                                niveles.map((nivel) => (
                                    <tr key={nivel.idNivel}>
                                        <td className="px-6 py-4 whitespace-nowrap">{nivel.nivelAcademico}</td>
                                        
                                        <td className=""> 
                                            <Switch checked={nivel.status} onChange={(e) => cambiarStatus(e, nivel.idNivel)} className="ml-6"/>

                                            <button className="ml-6 rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300"
                                                onClick={() => {
                                                    setNivelSeleccionado(nivel);
                                                    setModalEditar(true);
                                                }}>Editar
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="2">No hay niveles disponibles</td>
                                </tr>
                            )}
                        </tbody>

                    </table>
                </div>
            </div>

            {modalAgregar && (
                <ModalAgregarNivel
                    cerrar = {()=> setModalAgregar(false)}
                    recargar = {cargarNiveles}
                />    
            )}

            {modalEditar && (
                <ModalModificarNivel
                    nivel = {nivelSeleccionado}
                    cerrar = {()=> setModalEditar(false)}
                    recargar = {cargarNiveles}
                /> 
            )}

        </div>
    );
}

export default Nivel;

