import { useState, useEffect, useRef, useMemo } from 'react';
import { TiDeleteOutline } from "react-icons/ti";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { consultarUsuarios } from '../../services/usuarios';
import { modificarMateria } from "../../services/materias";

function ModalModificarMateria ({materia, cerrar, recargar}) {
    const [nombreMateria, setNombreMateria] = useState(materia?.nombreMateria || "");
    const [asignaciones, setAsignaciones] = useState(materia?.asignaciones || "");

    const [profesores, setProfesores] = useState([]);
    const [idProfesor, setIdProfesor] = useState(materia.idProfesor || "");
    const [loadingProfesores, setLoadingProfesores] = useState(true);

    const [estaAbierto, setEstaAbierto] = useState(false);
    const [valorSeleccionado, setValorSeleccionado] = useState("");
    const [buscarTermino, setBuscarTermino] = useState("");
    const selectRef = useRef(null);  
    const [error, setError] = useState({});
    
    useEffect(()=>{
        const cargarUsuarioProfesor = async () => {
            try {
                if (!materia) return;

                const response = await consultarUsuarios();
                const data = Array.isArray(response) ? response : (response?.data || []);

                const profesoresFiltrados = data.filter(u => 
                    u?.tipoUsuario?.toLowerCase() === "profesor"
                );

                setProfesores(profesoresFiltrados);

                if (materia?.profesor?.idProfesor) {
                    const profesorId = materia.profesor.idProfesor;
                    const profesorVinculado = profesoresFiltrados.find(
                        e => e.idUsuario === profesorId
                    );

                    if (profesorVinculado) {
                        const texto = `${profesorVinculado.nombreCompleto}`;
                        setValorSeleccionado(texto);
                        setBuscarTermino(texto);
                        setIdProfesor(profesorVinculado.idUsuario);

                        console.log("Profesor vinculado encontrado:", profesorVinculado);
                    } else {
                        console.log("Profesor no encontrado en la lista filtrada con ID:", profesorId);
                    }
                } else {
                    console.log("El la materia no esta vinculada con un profesor");
                }

                setLoadingProfesores(false);
            } catch (error) {
                console.log("Error cargando los usuarios profesores", error);
                setLoadingProfesores(false);
            }
        }
        
        cargarUsuarioProfesor();
    }, [materia]);    
    
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
        //if (!opcion) return;
        setValorSeleccionado(`${opcion.nombreCompleto}`);
        setBuscarTermino(`${opcion.nombreCompleto}`);
        setIdProfesor(opcion.idUsuario);
        setEstaAbierto(false);

        setError(prev => ({ ...prev, idProfesor: undefined }));
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
        let newErrors = {};

        if (nombreMateria.trim() === "") {
            newErrors.nombreMateria = "El nombre de la materia es obligatorio ";
        }

        if (asignaciones.trim() === "") {
            newErrors.asignaciones = "La asignacion es obligatoria";
        }

        if (idProfesor === "") {
            newErrors.idProfesor = "Falta seleccionar una opción";
        }

        if (Object.keys(newErrors).length > 0) {
            setError(newErrors);
            return;
        }

        try {
            const materiaData = {
                idMateria: materia.idMateria,
                nombreMateria: nombreMateria,
                asignaciones: asignaciones,
                profesor: {
                    idProfesor: idProfesor
                }
            }

            setError({});
            await modificarMateria(materiaData);
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
                        <h3 className="text-gray-600 font-lg font-bold tracking-normal leading-tight mb-4"> Modificar materia</h3>

                        <div>
                            <label className="text-gray-500 text-sm font-bold leading-tight tracking-normal"> Nombre de la materia</label>
                            <input className= {`mb-2 mt-2 text-gray-600 focus:outline-none focus:border focus:border-sky-300 font-normal w-full h-10 flex items-center pl-3 text-sm rounded border ${ error.nombreMateria ? "border-red-500" : "border-gray-300" }`} placeholder="Nombre de la materia" value={nombreMateria} onChange={(e) => { setNombreMateria(e.target.value); if (e.target.value.trim() !== "") { setError(prev => ({ ...prev, nombreMateria: undefined })); }  } } />
                            <p className="text-red-500 text-xs mb-4">{error.nombreMateria}</p>
                        </div>

                        <div>
                            <label className="text-gray-500 text-sm font-bold leading-tight tracking-normal"> Asignaciones</label>
                            <input className= {`mb-2 mt-2 text-gray-600 focus:outline-none focus:border focus:border-sky-300 font-normal w-full h-10 flex items-center pl-3 text-sm rounded border ${ error.asignaciones ? "border-red-500" : "border-gray-300" }`} placeholder="Asignaciones" value={asignaciones} onChange={(e) => { setAsignaciones(e.target.value); if (e.target.value.trim() !== "") { setError(prev => ({ ...prev, asignaciones: undefined })); }  } } />
                            <p className="text-red-500 text-xs mb-4">{error.asignaciones}</p>
                        </div>

                        <div>
                        <label className="text-gray-500 text-sm font-bold leading-tight tracking-normal"> Selecciona un profesor</label>
                                
                        <div className="relative mb-5 mt-2" ref={selectRef}>
                            <div className= {`mb-2 mt-2 text-gray-600 focus:outline-none focus:border focus:border-sky-300 font-normal w-full h-10 flex items-center pl-3 text-sm rounded border ${ error.idProfesor ? "border-red-500" : "border-gray-300" }`} >
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

                        {error.idProfesor && ( <p className="text-red-500 text-xs mb-4">{error.idProfesor}</p> )}
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

export default ModalModificarMateria;
