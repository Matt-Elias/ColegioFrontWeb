import { useState } from "react";
import { crearNivel } from "../../services/niveles";

function ModalAgregarNivel ({cerrar, recargar}) {
    const [nombreNivel, setNombreNivel] = useState("");

    const guardar = async () => {
        await crearNivel({nivelAcademico: nombreNivel});
        recargar();
        cerrar();
    }

    const cancelar = async () => {
        cerrar();
    }

    return (
        <>
        <div className="px-8 py-6 whitespace-nowrap  transition ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0">
            <div className="container mx-auto w-11/12 md:w-2/5 max-w-lg">
                <div className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">

                    <div>
                        <h3 className="text-gray-600 font-lg font-bold tracking-normal leading-tight mb-4">Agregar Nivel</h3>
                            <label className="text-gray-500 text-sm font-bold leading-tight tracking-normal">Nivel academico</label>
                            <input className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-sky-300 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="Nivel academico" value={nombreNivel} onChange={(e) => setNombreNivel(e.target.value)} />
                            
                            <button className="ml-0 rounded-md bg-green-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-300"
                                onClick={guardar}> Guardar 
                            </button>

                            <button className="ml-6 rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-300"
                                onClick={cancelar}> Cancelar 
                            </button>
                    </div>

                </div>
            </div>
        </div>
        </> 
    );
}

export default ModalAgregarNivel;
