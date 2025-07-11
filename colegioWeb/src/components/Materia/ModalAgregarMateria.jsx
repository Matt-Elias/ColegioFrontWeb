import { useState, useEffect, useRef, useMemo } from 'react';
import { TiDeleteOutline } from "react-icons/ti";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { crearMateria} from "../../services/materias";
import { consultarUsuarios } from '../../services/usuarios';

function ModalAgregarMateria ({cerrar, recargar}) {
    const [nombreMateria, setNombreMateria] = useState("");
    const [asignaciones, setAsignaciones] = useState("");

    const [profesores, setProfesores] = useState([]);
    const [idProfesor, setIdProfesor] = useState("");
    const [loadingProfesores, setLoadingProfesores] = useState(true);

    const [estaAbierto, setEstaAbierto] = useState(false);
    const [valorSeleccionado, setValorSeleccionado] = useState("");
    const [buscarTermino, setBuscarTermino] = useState("");
    const selectRef = useRef(null);

    useEffect(()=>{
        const cargarUsuarioProfesor = async () => {
            try {
                const response = await consultarUsuarios();
                console.log("Datos recibidos de la API materias: ", response);

                const data = Array.isArray(response) ? response : (response?.data || []);

                const profesoresFiltrados = data.filter(usuario => {
                    if (!usuario) return false;

                    const tipo = usuario.tipoUsuario?.toLowerCase().trim();
                    return tipo === "profesor";
                });

                console.log("Profesores: ",profesoresFiltrados );
                setProfesores(profesoresFiltrados);
                setLoadingProfesores(false);
            } catch (error) {
                console.log("Error cargando los usuarios estudiantes", error);
                setProfesores([]);
                setLoadingProfesores(false);
            }
        }
        
        cargarUsuarioProfesor();
    }, []);

    const filtrarOpciones = useMemo(()=> {
        if (!Array.isArray(profesores)) return [];
        
        return profesores.filter(item => {
            if (!item) return false;

            const textoBusqueda = `${item.nombreCompleto}`.toLowerCase();
            const termino = buscarTermino.toLowerCase();

            return textoBusqueda.includes(termino);

        });
    }, [profesores, buscarTermino]);
        
    const manejarOpcionClick = (opcion) => {
        if (!opcion) return;

        setValorSeleccionado(`${opcion.nombreCompleto}`);
        setBuscarTermino(`${opcion.nombreCompleto}`);
        setIdProfesor(opcion.idUsuario);
        setEstaAbierto(false);
    }
    
    const limpiarSeleccion = () => {
        setValorSeleccionado('');
        setBuscarTermino('');
        setIdProfesor('');
        setEstaAbierto(false);
    }
    
    const desplegable = () => {
        setEstaAbierto(!estaAbierto);
    }

    const guardar = async () => {
        try {
            const materiaData = {
                nombreMateria: nombreMateria,
                asignaciones: asignaciones,
                profesor: {
                    idProfesor: idProfesor
                }
            }

            await crearMateria(materiaData);
            cerrar();
            recargar();
        } catch (error) {
            console.error("Error al guardar el padre: ", error);
            alert("Ocurrio un error al guardar. Verifica la consola con mas detalles.");
        }
    }

    const cancelar = async () =>{
        cerrar();
    }

    return(
        <>
        <div className="px-8 py-6 whitespace-nowrap  transition ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0">
            <div className="container mx-auto w-11/12 md:w-2/3 max-w-lg">
                <div className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
                    
                    <h3 className="text-gray-600 font-lg font-bold tracking-normal leading-tight mb-4"> Agregar materia</h3>
                    
                    <label className="text-gray-500 text-sm font-bold leading-tight tracking-normal"> Nombre de la materia</label>
                    <input className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-sky-300 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="Nombre de la materia" value={nombreMateria} onChange={(e) => setNombreMateria(e.target.value)} />

                    <label className="text-gray-500 text-sm font-bold leading-tight tracking-normal"> Asignaciones</label>
                    <input className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-sky-300 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="Asignaciones" value={asignaciones} onChange={(e) => setAsignaciones(e.target.value)} />

                    <div>
                        <label className="text-gray-500 text-sm font-bold leading-tight tracking-normal"> Selecciona un grupo</label>
                                
                        <div className="relative mb-5 mt-2" ref={selectRef}>
                            <div className="h-10 bg-white flex items-center border border-gray-300 rounded w-full pl-3 pr-2 text-sm text-gray-600 focus-within:border-sky-300">
                                <input type="text" value={buscarTermino}
                                    onChange={(e) => {
                                        setBuscarTermino(e.target.value);
                                        setEstaAbierto(true);
                                    }}
                                    placeholder={loadingProfesores ? "Cargando opciones": "Buscar profesor"}
                                    className="flex-grow outline-none text-gray-600"
                                    onFocus={() => setEstaAbierto(true)} 
                                    disabled={loadingProfesores}
                                    />
                
                                {buscarTermino && (
                                    <button className="ml-2 text-gray-400 hover:text-gray-600 focus:outline-none" onClick={limpiarSeleccion}>
                                        <TiDeleteOutline className="w-5 h-5 text-red-400" />
                                    </button>
                                )}
                
                                <button className="ml-2 text-gray-400 hover:text-gray-600 focus:outline-none" onClick={desplegable} disabled={loadingProfesores}>
                                    {estaAbierto ? (
                                        <IoIosArrowUp className="w-4 h-4 text-gray-700" />
                                    ): (
                                        <IoIosArrowDown className="w-4 h-4 text-gray-700" />
                                    )}
                                </button>
                            </div>
                
                            {estaAbierto && !loadingProfesores && (
                                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg max-h-60 overflow-y-auto">
                                    {filtrarOpciones.length > 0 ? (
                                        <div className="py-1">
                                            {filtrarOpciones.map((opcion, index)=> {
                                                if (!opcion) return null;

                                                return(
                                                    <div key={opcion.idUsuario || index} onClick={()=> manejarOpcionClick(opcion)} 
                                                        className={`cursor-pointer px-3 py-2 text-sm text-gray-600 hover:bg-blue-600 hover:text-white ${
                                                            valorSeleccionado === opcion.nombreCompleto ? 'bg-gray-100 font-medium' : ''
                                                        }`} > {opcion.nombreCompleto}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    ) : (
                                        <div className="px-3 py-2 text-sm text-gray-500">
                                            {profesores.length === 0 ? 
                                                "No hay grupos disponibles" : 
                                                "No se encontraron resultados"}
                                        </div>
                                    )}
                                </div>
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

export default ModalAgregarMateria;
