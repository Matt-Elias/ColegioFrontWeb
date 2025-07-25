import { useState, useEffect } from "react";
import { modificarGrado } from "../../services/grados";
import { consultarNiveles } from "../../services/niveles";

function ModalModificarGrado ({gradoGrupo, cerrar, recargar}) {
    const [gradoGrupoInput, setGradoGrupoInput] = useState("");

    const [niveles, setNiveles] = useState([]);
    const [idNivel, setIdNivel] = useState("");
    const [loadingNiveles, setLoadingNiveles] = useState(true); 

    useEffect(()=>{
        const cargarNivelesDisponibles = async () => {
            try {
                const response = await consultarNiveles();
                setNiveles(response);
    
                if (gradoGrupo?.nivel?.idNivel) {
                    setIdNivel(gradoGrupo.nivel.idNivel);
                }
                setLoadingNiveles(false);
    
            } catch (error) {
                console.log("Error cargando niveles: ", error);
                setLoadingNiveles(false);
            }
        };
    
        cargarNivelesDisponibles();
    }, [gradoGrupo]);

    useEffect(()=>{
        //Esto cargar los datos al momento de editarlos
        if (gradoGrupo) {
            setGradoGrupoInput(gradoGrupo.gradoGrupo || "");
        }
    }, [gradoGrupo]);

    const guardar = async () => {
        await modificarGrado({
            idGradoGrupo: gradoGrupo.idGradoGrupo,
            gradoGrupo: gradoGrupoInput,
            nivel: {idNivel}
        });
        recargar();
        cerrar();
    }

    const cancelar = async () => {
        cerrar();
    }

    return(
        <>
        <div className="px-8 py-6 whitespace-nowrap  transition ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0">
            <div className="container mx-auto w-11/12 md:w-2/3 max-w-lg">
                <div className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
                    <div>
                        <h3 className="text-gray-600 font-lg font-bold tracking-normal leading-tight mb-4"> Modificar Grado y grupo</h3>

                        <label className="text-gray-500 text-sm font-bold leading-tight tracking-normal"> Grado y grupo: </label>
                        <input className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-sky-300 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="Grado y grupo" value={gradoGrupoInput} onChange={(e) => setGradoGrupoInput(e.target.value)} />
                        
                        {/**En el select deberia ser un .map(item) para traer en listado todos los niveles */}
                        <label className="text-gray-500 text-sm font-bold leading-tight tracking-normal"> Seleccione un nivel</label>
                        {loadingNiveles ? (
                            <p>Cargando niveles...</p>
                        ): (
                            <select className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-sky-300 font-normal w-full h-10 flex items-center pl-3 pr-8 text-sm border-gray-300 rounded border"
                                value={idNivel}
                                onChange={(e)=> setIdNivel(e.target.value)}
                            >

                            <option value="" >Seleccione un nivel</option>
                            {niveles.map(
                                (nivel)=>(
                                    <option key={nivel.idNivel} value={nivel.idNivel} >
                                        {nivel.nivelAcademico}
                                    </option>
                                )
                            )}
                            </select>
                        )}
                        
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

export default ModalModificarGrado;
