import { useEffect, useState } from "react";
import { crearGrado } from "../../services/grados";
import { consultarNiveles } from "../../services/niveles";

function ModalAgregarGrado ({cerrar, recargar}) {
    const [gradoGrupoInput, setGradoGrupoInput] = useState("");

    const [niveles, setNiveles] = useState([]);
    const [idNivel, setIdNivel] = useState("");
    const [loadingNiveles, setLoadingNiveles] = useState(true); 
    const [error, setError] = useState({});
    
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
    }, []);

    const guardar = async () => {
        let newErrors = {};

        if (gradoGrupoInput.trim() === "") {
            newErrors.gradoGrupoInput = "El grado y el grupo es obligatorio";
        }

        if (idNivel === "") {
            newErrors.idNivel = "Falta seleccionar una opción";
        }

        if (Object.keys(newErrors).length > 0) {
            setError(newErrors);
            return;
        }

        setError({});
        await crearGrado({
            gradoGrupo:gradoGrupoInput,
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
                    
                    <h3 className="text-gray-600 font-lg font-bold tracking-normal leading-tight mb-4"> Agregar Grado y grupo</h3>
            
                    <div>
                        <label className="text-gray-500 text-sm font-bold leading-tight tracking-normal"> Grado y grupo: </label>
                        <input className= {`mb-2 mt-2 text-gray-600 focus:outline-none focus:border focus:border-sky-300 font-normal w-full h-10 flex items-center pl-3 text-sm rounded border ${ error.gradoGrupoInput ? "border-red-500" : "border-gray-300" }`} placeholder="Grado y grupo" value={gradoGrupoInput} onChange={(e) => { setGradoGrupoInput(e.target.value); if (e.target.value.trim() !== "") { setError(prev => ({ ...prev, gradoGrupoInput: undefined })); }  } } />
                        <p className="text-red-500 text-xs mb-4">{error.gradoGrupoInput}</p>
                    </div>

                    <div className="mb-4">
                        <label className="text-gray-500 text-sm font-bold leading-tight tracking-normal"> Seleccione un nivel</label>
                        {loadingNiveles ? (
                                <p>Cargando niveles...</p>
                        ): (
                            <select className={`mb-2 mt-2 text-gray-600 focus:outline-none focus:border focus:border-sky-300 font-normal w-full h-10 flex items-center pl-3 pr-8 text-sm rounded border ${ error.idNivel ? "border-red-500" : "border-gray-300" }`}
                                value={idNivel}
                                onChange={(e)=> {setIdNivel(e.target.value); if (e.target.value !== "") { setError(prev => ({ ...prev, idNivel: undefined })); }  } }
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

                        {error.idNivel && ( <p className="text-red-500 text-xs mb-4">{error.idNivel}</p> )}
                    </div>

                    <button className="ml-0 rounded-md bg-green-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-300"
                        onClick={guardar}> Guardar 
                    </button>

                    <button className="ml-6 rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-300"
                        onClick={cancelar}> Cancelar 
                    </button>
                        
                </div>
            </div>
        </div>

        </>
    );
}

export default ModalAgregarGrado;
