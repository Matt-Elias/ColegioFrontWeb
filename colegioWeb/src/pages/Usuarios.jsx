import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { cambiarStatusUsuario, consultarUsuarios } from "../services/usuarios";

import ModalModificarUEstudiante from "../components/Usuarios/ModalModificarUEstudiante";
import ModalModificarUPadre from "../components/Usuarios/ModalModificarUPadre";
import ModalModificarUProfesor from "../components/Usuarios/ModalModificarUProfesor";

import ModalSeleccionarUsuario from "../components/Usuarios/ModalSeleccionarUsuario";
import ModalVerUEstudiante from "../components/Usuarios/ModalVerUEstudiante";
import ModalVerUPadre from "../components/Usuarios/ModalVerUPadre";
import ModalVerUProfesor from "../components/Usuarios/ModalVerUProfesor";

const Usuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modalSeleccionarUsuario, setModalSeleccionarUsuario] = useState(false);
    const [usuarioSeleccionado , setUsuarioSeleccionado] = useState(null);
    const [filtroTipo, setFiltroTipo] = useState("todos");
    const [orden, setOrden] = useState("ninguno");

    const [modalEditarEstudiante, setModalEditarEstudiante] = useState(false);
    const [modalEditarPadre, setModalEditarPadre] = useState(false);
    const [modalEditarProfesor, setModalEditarProfesor] = useState(false);

    const [modalVerUEstudiante, setModalVerUEstudiante] = useState(false);
    const [modalVerUPadre, setModalVerUPadre] = useState(false);
    const [modalVerUProfesor, setModalVerUProfesor] = useState(false);

    useEffect(()=> {
        const cargarUsuarios = async () => {
            try {
                setLoading(true);
                const data = await consultarUsuarios();
                setUsuarios(data);
                setLoading(false);
            } catch (err) {
                setError("Error al cargar los usuarios");
                setLoading(false);
                console.error(err);
            }
        }
        cargarUsuarios();
    }, []);

    // Función para recargar usuarios después de agregar/modificar
    const recargarUsuarios = async () => {
        try {
            setLoading(true);
            const data = await consultarUsuarios();
            setUsuarios(data);
            setLoading(false);
        } catch (err) {
            setError("Error al recargar los usuarios");
            setLoading(false);
        }
    }

    // Filtrar y ordenar usuarios
    const usuariosFiltrados = usuarios.filter(usuario => {
        if (filtroTipo === "todos") return true;
        return usuario.tipoUsuario.toLowerCase() === filtroTipo.toLowerCase();
    });

    const usuariosOrdenados = [...usuariosFiltrados].sort((a, b) => {
        if (orden === "a-z") {
            return a.nombreCompleto.localeCompare(b.nombreCompleto);
        } else if (orden === "z-a") {
            return b.nombreCompleto.localeCompare(a.nombreCompleto);
        }
        return 0;
    });

    const manejarVerUsuario = (usuario) => {
        setUsuarioSeleccionado(usuario);
        switch(usuario.tipoUsuario.toLowerCase()) {
            case 'estudiante':
                setModalVerUEstudiante(true);
                break;

            case 'padre':
                setModalVerUPadre(true);
                break;
                
            case 'profesor':
                setModalVerUProfesor(true);
                break;
                
            default:
                console.error("Tipo de usuario no reconocido");
        }
    };

    const manejarEditarUsuario = (usuario) => {
        setUsuarioSeleccionado(usuario);
        switch(usuario.tipoUsuario.toLowerCase()) {
            case 'estudiante':
                setModalEditarEstudiante(true);
                break;

            case 'padre':
                setModalEditarPadre(true);
                break;
                
            case 'profesor':
                setModalEditarProfesor(true);
                break;
                
            default:
                console.error("Tipo de usuario no reconocido");
    
        }        
    }

    if (loading) {
        return (
            <div className="flex min-h-screen">
                <Sidebar />
                <div className="flex-1 ml-12 p-6 transition-all duration-300">
                    <p>Cargando usuarios...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex min-h-screen">
                <Sidebar />
                <div className="flex-1 ml-12 p-6 transition-all duration-300">
                    <p className="text-red-500">{error}</p>
                </div>
            </div>
        );
    }

    return(
        <div className="flex min-h-screen">
            <Sidebar/>
            <div className="flex-1 ml-12 p-6 transition-all duration-300">
                <div>
                    <h1 className="px-3 py-2 whitespace-nowrap  mt-2 text-left text-3xl font-bold tracking-tight text-gray-500"> Usuarios </h1>

                    <button className="px-3 py-2 whitespace-nowrap ml-3 rounded-md bg-green-500 text-sm font-semibold text-white shadow-sm hover:bg-green-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-300"
                        onClick={
                            () => setModalSeleccionarUsuario(true)
                        }> Agregar Usuario
                    </button>

                    <h3 className="ml-3 mt-3 text-gray-600 font-lg font-bold tracking-normal leading-tight mb-4 text-left"> Filtros</h3>
                   
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-3 ml-0">
                        <select className="py-2 ml-3 text-gray-600 focus:outline-none focus:border focus:border-sky-300 font-normal w-full h-10 flex items-center pl-3 pr-8 text-sm border-gray-300 rounded border"
                            value={filtroTipo}
                            onChange={(e) => setFiltroTipo(e.target.value)}
                        >
                            <option value="todos">Todos los usuarios</option>
                            <option value="estudiante">Estudiantes</option>
                            <option value="padre">Padres de familia</option>
                            <option value="profesor">Profesores</option> 
                        </select>

                        <select className="py-2  ml-3 text-gray-600 focus:outline-none focus:border focus:border-sky-300 font-normal w-full h-10 flex items-center pl-3 pr-8 text-sm border-gray-300 rounded border"
                            value={orden}
                            onChange={(e) => setOrden(e.target.value)}
                        
                        >
                            <option value="ninguno">Ninguno</option>
                            <option value="a-z">A-Z</option>
                            <option value="z-a">Z-A</option> 
                        </select>

                    </div>

                    <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                            <tr>
                                <th className="px-6 py-3 text-left font-medium text-gray-500"> Nombre completo</th>
                                <th className="px-6 py-3 text-left font-medium text-gray-500"> Correo electronico</th>
                                <th className="px-6 py-3 text-left font-medium text-gray-500"> Tipo de usuario</th>
                                <th className="px-6 py-3 text-left font-medium text-gray-500"> Acciones</th>
                            </tr>
                        </thead>

                        <tbody className="bg-white divide-y divide-gray-200">
                            {usuariosOrdenados.length > 0 ? (
                                usuariosOrdenados.map((usuario) => (
                                    <tr key={usuario.idUsuario}>
                                        <td className="px-6 py-4 whitespace-nowrap"> {usuario.nombreCompleto} </td>
                                        <td className="px-6 py-4 whitespace-nowrap"> {usuario.correoElectronico} </td>
                                        <td className="px-6 py-4 whitespace-nowrap"> {usuario.tipoUsuario} </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex gap-6">
                                                <button className="rounded-md bg-gray-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300" 
                                                    onClick={() => {
                                                        manejarVerUsuario(usuario);
                                                    }}
                                                > Ver
                                                </button>
                                                    
                                                <button className="rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300"
                                                    onClick={()=>{
                                                        manejarEditarUsuario(usuario);
                                                    }}
                                                > Editar

                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr 
                                    colSpan="4"
                                    className="px-6 py-4 text-center text-gray-500">
                                    No se encontro usuarios
                                </tr>
                            )}    
                        </tbody>
                    </table>
                </div>
            </div>
            
            {modalSeleccionarUsuario && (
                <ModalSeleccionarUsuario
                    cerrar={()=> setModalSeleccionarUsuario(false)}
                    recargar = {recargarUsuarios}
                />
            )}

            {modalVerUEstudiante && (
                <ModalVerUEstudiante 
                    cerrar={() => setModalVerUEstudiante(false)}
                    usuario={usuarioSeleccionado}
                />
            )}

            {modalVerUPadre && (
                <ModalVerUPadre 
                    cerrar={() => setModalVerUPadre(false)}
                    usuario={usuarioSeleccionado}
                />
            )}

            {modalVerUProfesor && (
                <ModalVerUProfesor 
                    cerrar={() => setModalVerUProfesor(false)}
                    usuario={usuarioSeleccionado}
                />
            )}

            {modalEditarEstudiante && (
                <ModalModificarUEstudiante 
                    cerrar={() => setModalEditarEstudiante(false)}
                    usuario={usuarioSeleccionado}
                    recargar={recargarUsuarios}
                />
            )}

            {modalEditarPadre && (
                <ModalModificarUPadre 
                    cerrar={() => setModalEditarPadre(false)}
                    usuario={usuarioSeleccionado}
                    recargar={recargarUsuarios}
                />
            )}

            {modalEditarProfesor && (
                <ModalModificarUProfesor 
                    cerrar={() => setModalEditarProfesor(false)}
                    usuario={usuarioSeleccionado}
                    recargar={recargarUsuarios}
                />
            )}

        </div>
    );
}

export default Usuarios;

