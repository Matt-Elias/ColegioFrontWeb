import { useState, useEffect, useRef, useMemo } from "react";
import { TiDeleteOutline } from "react-icons/ti";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";

import { modificarUsuario, consultarUsuarios } from "../../services/usuarios";

function ModalModificarUPadre ({usuario, cerrar, recargar}) {
    const [nombreCompleto, setNombreCompleto] = useState(usuario?.nombreCompleto || "");
    const [correoElectronico, setCorreoElectronico] = useState(usuario?.correoElectronico || "");
    const [contrasena, setContrasena] = useState(usuario?.contrasena || "");

    const [estudiantes, setEstudiantes] = useState([]);
    const [idEstudiante, setIdEstudiante] = useState(usuario?.estudiante?.idEstudiante || "");
    const [loadingEstudiantes, setLoadingEstudiantes] = useState(true);

    const [estaAbierto, setEstaAbierto] = useState(false);
    const [valorSeleccionado, setValorSeleccionado] = useState("");
    const [buscarTermino, setBuscarTermino] = useState("");
    const selectRef = useRef(null);

    const [esVisible, setEsVisible] = useState(false);
    const toogleVisibilidad = () => setEsVisible((prev) => !prev);

    useEffect(() => {   
    const cargarUsuarios = async () => {
        try {
            if (!usuario) return;
            
            const response = await consultarUsuarios();
            const data = Array.isArray(response) ? response : (response?.data || []);
            
            // 1. Filtrar estudiantes
            const estudiantesFiltrados = data.filter(u => 
                u?.tipoUsuario?.toLowerCase() === "estudiante"
            );

            setEstudiantes(estudiantesFiltrados);

            // 2. Obtener el estudiante vinculado desde usuario.padre.estudiante
            if (usuario?.padre?.estudiante) {
                const estudianteId = usuario.padre.estudiante.idEstudiante;
                const estudianteVinculado = estudiantesFiltrados.find(
                    e => e.estudiante?.idEstudiante === estudianteId
                );

                if (estudianteVinculado) {
                    const texto = `${estudianteVinculado.nombreCompleto} - ${estudianteVinculado.estudiante?.matricula || 'Sin matrícula'}`;
                    setValorSeleccionado(texto);
                    setBuscarTermino(texto);
                    setIdEstudiante(estudianteVinculado.idUsuario);
                    
                    console.log("Estudiante vinculado encontrado:", estudianteVinculado);
                } else {
                    console.log("Estudiante no encontrado en la lista filtrada con ID:", estudianteId);
                }
            } else {
                console.log("El padre no tiene estudiante vinculado en usuario.padre.estudiante");
            }

            setLoadingEstudiantes(false);
        } catch (error) {
            console.error("Error cargando datos:", error);
            setLoadingEstudiantes(false);
        }
    };

        cargarUsuarios();
    }, [usuario]);

    const filtrarOpciones = useMemo(()=>{
        if (!Array.isArray(estudiantes)) return [];
    
        return estudiantes.filter(item  => {
            if (!item || !item.estudiante) return false;
    
            const textoBusqueda = `${item.estudiante.matricula || ''} ${item.nombreCompleto || ''}`.toLowerCase();
            const termino = buscarTermino.toLowerCase();
                
            return textoBusqueda.includes(termino);
        });
    }, [estudiantes, buscarTermino]);

    const manejarOpcionClick = (opcion) => {
        if (!opcion || !opcion.estudiante) return;

        setValorSeleccionado(`${opcion.nombreCompleto} - ${opcion.estudiante.matricula}`);
        setBuscarTermino(`${opcion.nombreCompleto} - ${opcion.estudiante.matricula}`);
        setIdEstudiante(opcion.estudiante.idEstudiante);
        setEstaAbierto(false);
    }
    
    const limpiarSeleccion = () => {
        setValorSeleccionado("");
        setBuscarTermino("");
        setIdEstudiante("");
        setEstaAbierto(false);
    }
    
    const desplegable = () => {
        setEstaAbierto(!estaAbierto);
    }

    const guardar = async () => {
        try {
            const usuarioData = {
                idUsuario: usuario.idUsuario,
                nombreCompleto: nombreCompleto,
                correoElectronico: correoElectronico,
                tipoUsuario: "Padre",
                contrasena: contrasena,
                urlImagen: "",
                estudiante: idEstudiante ? {
                    idEstudiante
                } : null
            };

            await modificarUsuario(usuarioData);
            cerrar();
            recargar();
        } catch (error) {
            
        }
    }

    const cancelar = async () =>{
        cerrar();
    }

    return (
        <>
            <div className="px-8 py-6 whitespace-nowrap  transition ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0">
                <div className="container mx-auto w-11/12 md:w-3/5 max-w-2xl">
                    <div className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
                        <h3 className="text-gray-600 font-lg font-bold tracking-normal leading-tight mb-4"> Modificar padre</h3>
                    
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            <div>
                                <label className="text-gray-500 text-sm font-bold leading-tight tracking-normal"> Nombre completo</label>
                                <input className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-sky-300 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="Nombre completo" value={nombreCompleto} onChange={(e) => setNombreCompleto(e.target.value)} />
                            </div>

                            <div>
                                <label className="text-gray-500 text-sm font-bold leading-tight tracking-normal"> Correo electronico</label>
                                <input type="email" className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-sky-300 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="Correo electronico" value={correoElectronico} onChange={(e) => setCorreoElectronico(e.target.value)} />
                            </div>
                            
                            <div>
                                <label className="text-gray-500 text-sm font-bold leading-tight tracking-normal"> Tipo de usuario</label>
                                <input className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-sky-300 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="Tipo de usuario" value="Padre" disabled readOnly />
                            </div>

                            <div>
                                <label className="text-gray-500 text-sm font-bold leading-tight tracking-normal"> Contraseña</label>
                                    <div className="relative">
                                        <input type={esVisible ? "text": "password"} className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-sky-300 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="Contraseña" value={contrasena} onChange={(e) => setContrasena(e.target.value)} />
                            
                                        <button type="button" onClick={toogleVisibilidad} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-sky-500 focus:outline-none">
                                            {esVisible ? (
                                                <IoMdEyeOff size={20} />
                                            ): (
                                                <IoMdEye size={20} />
                                            )}
                                        </button>
                                    </div>
                            </div>

                            <div>
                                <label className="text-gray-500 text-sm font-bold leading-tight tracking-normal"> Selecciona un estudiante</label>

                                <div className="relative mb-5 mt-2" ref={selectRef}> 
                                    <div className="h-10 bg-white flex items-center border border-gray-300 rounded w-full pl-3 pr-2 text-sm text-gray-600 focus-within:border-sky-300">
                                        <input type="text" value={buscarTermino}
                                            onChange={(e) => {
                                                setBuscarTermino(e.target.value);
                                                setEstaAbierto(true);
                                            }}
                                            placeholder={loadingEstudiantes ? "Cargando opciones": "Buscar estudiante"}
                                            className="flex-grow outline-none text-gray-600"
                                            onFocus={() => setEstaAbierto(true)} 
                                            disabled={loadingEstudiantes}
                                            />
                                            
                                        {buscarTermino && (
                                            <button className="ml-2 text-gray-400 hover:text-gray-600 focus:outline-none" onClick={limpiarSeleccion}>
                                                <TiDeleteOutline className="w-5 h-5 text-red-400" />
                                            </button>
                                        )}
                                            
                                        <button className="ml-2 text-gray-400 hover:text-gray-600 focus:outline-none" onClick={desplegable} disabled={loadingEstudiantes}>
                                            {estaAbierto ? (
                                                    <IoIosArrowUp className="w-4 h-4 text-gray-700" />
                                            ): (
                                                    <IoIosArrowDown className="w-4 h-4 text-gray-700" />
                                            )}
                                        </button>
                                    </div>
                                            
                                    {estaAbierto && !loadingEstudiantes && (
                                        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg max-h-60 overflow-y-auto">
                                            {filtrarOpciones.map((opcion, index) => {
                                                const textoOpcion = `${opcion.nombreCompleto} - ${opcion.estudiante.matricula}`;
                                                return (
                                                    <div key={opcion.idUsuario || index} onClick={()=> manejarOpcionClick(opcion)} 
                                                        className={`cursor-pointer px-3 py-2 text-sm text-gray-600 hover:bg-blue-600 hover:text-white ${
                                                            valorSeleccionado === textoOpcion ? 'bg-gray-100 font-medium' : ''
                                                        }`}> 
                                                        {textoOpcion}
                                                    </div>
                                                );
                                            })}   
                                        </div>
                                    )}
                                </div>
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

export default ModalModificarUPadre;
