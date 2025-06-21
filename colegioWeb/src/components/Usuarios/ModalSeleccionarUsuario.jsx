import { useState, useEffect } from "react";
import ModalAgregarUEstudiante from "../../components/Usuarios/ModalAgregarUEstudiante";
import ModalAgregarUPadre from "../../components/Usuarios/ModalAgregarUPadre";
import ModalAgregarUProfesor from "../../components/Usuarios/ModalAgregarUProfesor";

function ModalSeleccionarUsuario ({cerrar}) {
    const [modalActivo, setModalActivo] = useState(null);
    
    const estudianteSeleccionado = async () => {
        setModalActivo('estudiante');
    }

    const padreSeleccionado = async () => {
        setModalActivo('padre');
    }

    const profesorSeleccionado = async () => {
        setModalActivo('profesor');
    }

    const cerrarModalEspecifico = () => {
        setModalActivo(null);
    }

    const cancelar =  async () => {
        cerrar();
    }

    if (modalActivo === 'estudiante') {
        return <ModalAgregarUEstudiante cerrar={cerrarModalEspecifico} recargar={()=> window.location.reload()}/>
    }

    if (modalActivo === 'padre') {
        return <ModalAgregarUPadre cerrar={cerrarModalEspecifico} recargar={()=> window.location.reload()}/>
    }

    if (modalActivo === 'profesor') {
        return <ModalAgregarUProfesor cerrar={cerrarModalEspecifico} recargar={()=> window.location.reload()}/>
    }

    return(
        <>
            <div className="px-8 py-6 transition ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0 flex items justify-center">
                <div className="container mx-auto max-w-3/5 md:w-3/5 max-w-1xl">
                    <div className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">

                        <h3 className="text-gray-600 font-lg font-bold tracking-normal leading-tight mb-4"> Selecciona un tipo de usuario </h3>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 ml-0">

                            <button className="ml-0 rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-300 w-full"  
                                onClick={estudianteSeleccionado}> Estudiante 
                            </button>

                            <button className="ml-0 rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-300 w-full"  
                                onClick={padreSeleccionado}> Padre de familia
                            </button>

                            <button className="ml-0 rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-300 w-full"  
                                onClick={profesorSeleccionado}> Profesor
                            </button>

                        </div>

                        <button className="ml-0 rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-300" 
                            onClick={cancelar}> Cancelar 
                        </button>

                    </div>
                </div>
            </div>
        </>
    );
}

export default ModalSeleccionarUsuario;
