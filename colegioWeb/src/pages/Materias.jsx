import React, { useState, useEffect } from "react";
import ModalAgregarMateria from "../components/Materia/ModalAgregarMateria";
import ModalModificarMateria from "../components/Materia/ModalModificarMateria";
import Sidebar from "../components/Sidebar";
import { consultarMaterias } from "../services/materias";
import { consultarUsuarios } from "../services/usuarios";

const Materias = () => {
    const [materias, setMaterias] = useState([]);
    const [modalAgregar, setModalAgregar] = useState(false);
    const [modalEditar, setModalEditar] = useState(false);
    const [materiaSeleccionada, setMateriaSeleccionada] = useState(null);

    const [profesores, setProfesores] = useState([]);
    const [idProfesor, setIdProfesor] = useState("");
    const [loadingProfesores, setLoadingProfesores] = useState(true);

    const [error, setError] = useState();

    const cargarMaterias = async () => {
        try {
            const response = await consultarMaterias();
            const data = response.result || response;

            if (!Array.isArray(data)) {
                throw new Error (`Formato inesperado: ${JSON.stringify(response)}`);
            }

            setMaterias(data);
            setError(null);
        } catch (error) {
            console.error("Error cargando niveles: ", err);
            setError("Error al cargar grados y grupos");
            setMaterias([]);
        }
    }

    const cargarProfesores = async () => {
        try {
            const response = await consultarUsuarios();
            console.log("Datos recibidos de la API para materias: ", response);

            const data = Array.isArray(response) ? response : (response?.data || []);
            
            const profesoresFiltrados = data.filter(usuario => {
                if (!usuario) return false;
                
                const tipo = usuario.tipoUsuario?.toLowerCase().trim();
                return tipo === "profesor";
            });

            console.log("Profesores filtrados:", profesoresFiltrados);

            //setProfesores(profesoresData);
            setProfesores(profesoresFiltrados);
            setLoadingProfesores(false);
        } catch (error) {
            console.error("Error cargando profesores:", error);
            setProfesores([]);
            setLoadingProfesores(false);
        }
    };

    const obtenerNombreProfesor = (idProfesor) => {
        if (!idProfesor) return "Sin asignar";
        const profesor = profesores.find(p => p.idUsuario === idProfesor);
        return profesor?.nombreCompleto || `Profesor ID: ${idProfesor}`;
    }

    useEffect(()=>{
        cargarMaterias();
        cargarProfesores();
    }, []);

    return(
        <div className="flex min-h-screen"> 
            <Sidebar />
            <div className="flex-1 ml-12 p-6 transition-all duration-300">
                <div>
                    <h1 className="px-3 py-2 whitespace-nowrap  mt-2 text-left text-3xl font-bold tracking-tight text-gray-500"> Materias</h1>

                    <button className="px-3 py-2 whitespace-nowrap ml-3 rounded-md bg-green-500 text-sm font-semibold text-white shadow-sm hover:bg-green-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-300"
                        onClick={
                            () => setModalAgregar(true)
                        }> Agregar materia 
                    </button>

                    <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                           <tr>
                                <th className="px-6 py-3 text-left font-medium text-gray-500"> Materia </th>
                                <th className="px-6 py-3 text-left font-medium text-gray-500"> Profesor asignado </th>
                                <th className="px-6 py-3 text-left font-medium text-gray-500"> Asignaciones </th>
                                <th className="px-6 py-3 text-left font-medium text-gray-500"> Acciones </th>
                           </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {error ? (
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap" colSpan="2" style={{color: 'red'}}> {error} </td>
                                </tr>
                            ) : materias.length > 0 ? (
                                materias.map((materia) => (
                                    <tr key={materia.idMateria}>
                                        <td className="px-6 py-4 whitespace-nowrap"> {materia.nombreMateria } </td>
                                        <td className="px-6 py-4 whitespace-nowrap"> {materia.profesor ? obtenerNombreProfesor(materia.profesor.idProfesor) : 'Sin asignar'} </td>
                                        <td className="px-6 py-4 whitespace-nowrap"> {materia.asignaciones } </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <button className="ml-0  rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300"
                                                onClick={()=> {
                                                    setMateriaSeleccionada(materia);
                                                    setModalEditar(true);
                                                }}
                                            > Editar
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="2">No hay materias disponibles</td>
                                </tr>
                            ) }

                        </tbody>
                    </table>
                </div>
            </div>

            {modalAgregar && (
                <ModalAgregarMateria 
                    cerrar={()=> setModalAgregar(false)}
                    recargar={cargarMaterias}
                />
            )}

            {modalEditar && (
                <ModalModificarMateria 
                    materia={materiaSeleccionada}
                    cerrar={()=> setModalEditar(false)}
                    recargar={cargarMaterias}
                />
            )}


        </div>    
    );
}

export default Materias;
