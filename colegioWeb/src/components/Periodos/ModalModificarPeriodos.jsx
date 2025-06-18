import { useState, useEffect } from "react";
import { modificarPeriodo } from "../../services/periodos";
import { consultarNiveles } from "../../services/niveles";

function ModalModificarPeriodos ({periodo, cerrar, recargar}) {
    const [calificaciones, setCalificaciones] = useState("");
    const [asistencia, setAsistencia ] = useState("");
    const [tareas, setTareas] = useState("");
    const [proyectos, setProyectos] = useState("");
    const [tipoPeriodo, setTipoPeriodo] = useState("");

    const [niveles, setNiveles] = useState([]);
    const [idNivel, setIdNivel] = useState("");
    const [loadingNiveles, setLoadingNiveles] = useState(true);

    // Cargar niveles al iniciar
    useEffect(() => {
        const cargarNivelesDisponibles = async () => {
            try {
                const response = await consultarNiveles();
                setNiveles(response);

                // Establecer el nivel actual del período si existe
                if (periodo?.nivel?.idNivel) {
                    setIdNivel(periodo.nivel.idNivel);
                }
                setLoadingNiveles(false);

            } catch (error) {
                console.log("Error cargando niveles:", error);
                setLoadingNiveles(false);
            }
        };

        cargarNivelesDisponibles();
    }, [periodo]);

    // Establecer los demás datos del período cuando cambie la prop
    useEffect(()=> {
        if (periodo) {
            setCalificaciones(periodo.calificaciones || "");
            setAsistencia(periodo.asistencia || "");
            setTareas(periodo.tareas || "");
            setProyectos(periodo.proyectos || "");
            setTipoPeriodo(periodo.tipoPeriodo || "");
        }
    }, [periodo]);

    const guardar = async () => {
        await modificarPeriodo({ 
            idPeriodo: periodo.idPeriodo, 
            calificaciones: calificaciones, 
            asistencia: asistencia,
            tareas: tareas,
            proyectos: proyectos,
            tipoPeriodo: tipoPeriodo,
            nivel: {idNivel} // Enviamos el objeto nivel con el id seleccionado
        });
        recargar();
        cerrar();
    }
    
    const cancelar =  async () => {
        cerrar();
    }

    return(
        <>
        <div className="px-8 py-6 whitespace-nowrap  transition ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0">
            <div className="container mx-auto w-11/12 md:w-3/5 max-w-3xl">
                <div className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
                    <h3 className="text-gray-600 font-lg font-bold tracking-normal leading-tight mb-4"> Editar Periodo</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="text-gray-500 text-sm font-bold leading-tight tracking-normal"> Calificaciones</label>
                            <input className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-sky-300 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="Calificaciones" value={calificaciones} onChange={(e) => setCalificaciones(e.target.value)} />
                        </div>

                        <div>
                            <label className="text-gray-500 text-sm font-bold leading-tight tracking-normal"> Asistencia</label>
                            <input className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-sky-300 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="Asistencia" value={asistencia} onChange={(e) => setAsistencia(e.target.value)} />
                        </div>

                        <div>
                            <label className="text-gray-500 text-sm font-bold leading-tight tracking-normal"> Tareas</label>
                            <input className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-sky-300 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="Tareas" value={tareas} onChange={(e) => setTareas(e.target.value)} />
                        </div>
                        
                        <div>
                            <label className="text-gray-500 text-sm font-bold leading-tight tracking-normal"> Proyectos</label>
                            <input className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-sky-300 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="Proyectos" value={proyectos} onChange={(e) => setProyectos(e.target.value)} />
                        </div>

                        <div>
                            <label className="text-gray-500 text-sm font-bold leading-tight tracking-normal"> Tipo de periodo</label>
                            <input className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-sky-300 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="Tipo de periodo" value={tipoPeriodo} onChange={(e) => setTipoPeriodo(e.target.value)} />
                        </div>

                        <div>
                            <label className="text-gray-500 text-sm font-bold leading-tight tracking-normal"> Selecciona el nivel</label>
                            {loadingNiveles ? (
                                <p>Cargando niveles...</p>
                            ): (
                                <select className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-sky-300 font-normal w-full h-10 flex items-center pl-3 pr-8 text-sm border-gray-300 rounded border"
                                    value={idNivel}
                                    onChange={(e)=> setIdNivel(e.target.value)}
                                >
                                
                                <option value=""> Seleccione un nivel</option>
                                {niveles.map(
                                    (nivel)=> (
                                        <option key={nivel.idNivel} value={nivel.idNivel}>
                                            {nivel.nivelAcademico}
                                        </option>
                                    )
                                )}
                                </select>
                            )}
                            
                        </div>   
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

export default ModalModificarPeriodos;
