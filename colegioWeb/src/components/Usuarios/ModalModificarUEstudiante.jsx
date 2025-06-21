import { useState, useEffect } from "react";

function ModalModificarUEstudiante ({usuario, cerrar, recargar}) {
    const guardar = async () => {

    }

    const cancelar = async () =>{
        cerrar();
    }

    return(
        <>
            <div className="px-8 py-6 whitespace-nowrap  transition ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0">
                <div className="container mx-auto w-11/12 md:w-3/5 max-w-3xl">
                    <div className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
                        <h3 className="text-gray-600 font-lg font-bold tracking-normal leading-tight mb-4"> Modificar estudiante </h3>
                    
                    </div>
                </div>
            </div>
        
        
        </>
    );
    
}

export default ModalModificarUEstudiante;
