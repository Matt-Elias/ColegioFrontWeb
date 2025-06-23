import { useEffect, useState, useRef, useMemo } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { TiDeleteOutline } from "react-icons/ti";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";

import {crearUsuario} from "../../services/usuarios";
import {consultarGrados} from "../../services/grados";
import {subirImagenCloudinary} from "../../services/cloudinary";

function ModalAgregarUEstudiante ({cerrar, recargar}) {
    const [nombreCompleto, setNombreCompleto] = useState("");
    const [correoElectronico, setCorreoElectronico] = useState("");
    const [contrasena, setContrasena] = useState("");

    const [matricula, setMatricula] = useState("");
    const [tipo, setTipo] = useState("Principal");

    const [gradosGrupos, setGradosGrupos] = useState([]);
    const [idGradoGrupo, setIdGradoGrupo] = useState("");
    const [loadingGrados, setLoadingGrados] = useState(true);

    const [archivoCargado, setArchivoCargado] = useState(false);

    const [estaAbierto, setEstaAbierto] = useState(false);
    const [valorSeleccionado, setValorSeleccionado] = useState("");
    const [buscarTermino, setBuscarTermino] = useState("");
    const selectRef = useRef(null);

    const [esVisible, setEsVisible] = useState(false);
    const toogleVisibilidad = () => setEsVisible((prev) => !prev);

    useEffect(()=>{
        const cargarGradosGrupos = async () => {
            try {
                const response = await consultarGrados();
                console.log("Datos recibidos de la API: ", response);

                if (Array.isArray(response)) {
                    setGradosGrupos(response);
                } else if (response && Array.isArray(response.data)) {
                    setGradosGrupos(response.data);
                } else {
                    console.error("La respuesta no es un array: ", response);
                    setGradosGrupos([]);
                }

                setLoadingGrados(false);
            } catch (error) {
                console.log("Error cargando grados y grupos: ", error);
                setGradosGrupos([]);
                setLoadingGrados(false);
            }
        };

        cargarGradosGrupos();
    }, []);

    const manejarCambioArchivo = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setArchivoCargado(true);
        }
    };

    const eliminarArchivo = () => {
        setArchivoCargado(false);
        document.getElementById('input').value = ""; // limpia el input
    };

    const filtrarOpciones = useMemo(()=>{
        if (!Array.isArray(gradosGrupos)) return [];

        return gradosGrupos.filter(item  => {
            if (!item || !item.gradoGrupo) return false;

            const grupo = String(item.gradoGrupo).toLowerCase();
            const termino = buscarTermino.toLowerCase();
            
            return grupo.includes(termino);
        });
    }, [gradosGrupos, buscarTermino]);
        
    const manejarOpcionClick = (opcion) => {
        if (!opcion || !opcion.gradoGrupo) return;
        setValorSeleccionado(opcion.gradoGrupo);
        setBuscarTermino(opcion.gradoGrupo);
        setIdGradoGrupo(opcion.idGradoGrupo || "");
        setEstaAbierto(false);
    }
    
    const limpiarSeleccion = () => {
        setValorSeleccionado('');
        setBuscarTermino('');
        setEstaAbierto(false);
    }
    
    const desplegable = () => {
        setEstaAbierto(!estaAbierto);
    }

    useEffect(()=>{
        const manejarClickFuera = (event) => {
            if (selectRef.current && !selectRef.current.contains(event.target)) {
                setEstaAbierto(false);
            }
        };

        document.addEventListener("mousedown", manejarClickFuera);    
        return () => {
            document.removeEventListener("mousedown", manejarClickFuera);
        };
    }, []);

    const guardar = async () => {
        try {
            let urlImagen = "";
            
            if (archivoCargado) {
                const input = document.getElementById('input');
                if (input.files.length > 0) {
                    urlImagen = await subirImagenCloudinary(input.files[0]);
                }
            }

            const usuarioData = {
                nombreCompleto: nombreCompleto,
                correoElectronico: correoElectronico,
                tipoUsuario: "Estudiante",
                contrasena: contrasena,
                urlImagen: urlImagen,
                estudiante: {
                    matricula: matricula,
                    tipo: tipo,
                    gradoGrupo: {
                        idGradoGrupo: idGradoGrupo
                    }
                }                
            };

            await crearUsuario(usuarioData);
            cerrar();
            recargar();
        } catch (error) {
            console.error("Error al guardar el estudiante: ", error);
        }
    };

    const cancelar = async () =>{
        cerrar();
    }

    return (
        <>
            <div className="px-8 py-6 whitespace-nowrap  transition ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0">
                <div className="container mx-auto w-11/12 md:w-3/5 max-w-2xl">
                    <div className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
                        <h3 className="text-gray-600 font-lg font-bold tracking-normal leading-tight mb-4"> Agregar estudiante</h3>

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
                                <input className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-sky-300 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="Tipo de usuario" value="Estudiante" disabled readOnly />
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
                                <label className="text-gray-500 text-sm font-bold leading-tight tracking-normal"> Matricula</label>
                                <input className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-sky-300 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="Matricula" value={matricula} onChange={(e) => setMatricula(e.target.value)} />
                            </div>

                            <div>
                                <label className="text-gray-500 text-sm font-bold leading-tight tracking-normal"> Selecciona el tipo</label>
                                <select className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-sky-300 font-normal w-full h-10 flex items-center pl-3 pr-8 text-sm border-gray-300 rounded border"
                                    value={tipo} onChange={(e) => setTipo(e.target.value)} >
                                    <option>Principal</option>
                                    <option>Alterno</option>
                                </select>
                            </div>
                            
                            <div>
                                <label className="text-gray-500 text-sm font-bold leading-tight tracking-normal"> Selecciona un grupo</label>
                                
                                <div className="relative mb-5 mt-2" ref={selectRef}>
                                    <div className="h-10 bg-white flex items-center border border-gray-300 rounded w-full pl-3 pr-2 text-sm text-gray-600 focus-within:border-sky-300">
                                        <input type="text" value={buscarTermino}
                                            onChange={(e) => {
                                                setBuscarTermino(e.target.value);
                                                setEstaAbierto(true);
                                            }}
                                            placeholder={loadingGrados ? "Cargando opciones": "Buscar grupo"}
                                            className="flex-grow outline-none text-gray-600"
                                            onFocus={() => setEstaAbierto(true)} 
                                            disabled={loadingGrados}
                                            />
                
                                        {buscarTermino && (
                                            <button className="ml-2 text-gray-400 hover:text-gray-600 focus:outline-none " onClick={limpiarSeleccion}>
                                                <TiDeleteOutline className="w-5 h-5 text-red-400" />
                                            </button>
                                        )}
                
                                        <button className="ml-2 text-gray-400 hover:text-gray-600 focus:outline-none " onClick={desplegable} disabled={loadingGrados}>
                                            {estaAbierto ? (
                                                <IoIosArrowUp className="w-4 h-4 text-gray-700" />
                                            ): (
                                                <IoIosArrowDown className="w-4 h-4 text-gray-700" />
                                            )}
                                        </button>
                                    </div>
                
                                    {estaAbierto && !loadingGrados && (
                                        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg max-h-60 overflow-y-auto">
                                            {filtrarOpciones.length > 0 ? (
                                                <div className="py-1">
                                                    {filtrarOpciones.map((opcion, index)=> {
                                                        if (!opcion || !opcion.gradoGrupo) return null;

                                                        return(
                                                            <div key={opcion.idGradoGrupo || index} onClick={()=> manejarOpcionClick(opcion)} 
                                                                className={`cursor-pointer px-3 py-2 text-sm text-gray-600 hover:bg-blue-600 hover:text-white ${
                                                                    valorSeleccionado === opcion.gradoGrupo ? 'bg-gray-100 font-medium' : ''
                                                                }`} > {opcion.gradoGrupo}
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            ) : (
                                                <div className="px-3 py-2 text-sm text-gray-500">
                                                    {gradosGrupos.length === 0 ? 
                                                        "No hay grupos disponibles" : 
                                                        "No se encontraron resultados"}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className="text-gray-500 text-sm font-bold leading-tight tracking-normal"> Agrega una imagen</label>
                                
                                <div className="mb-5 mt-2 flex items-center space-x-4">   
                                    <label className="flex items-center justify-center w-full h-10 px-3 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
                                        <AiOutlineCloudUpload className="w-6 h-6 text-blue-500" />
                                        <span className={`${archivoCargado ? 'text-green-600' : 'text-gray-500'} text-sm font-bold leading-tight tracking-normal`}>
                                            {archivoCargado ? 'Archivo cargado' : 'Subir archivo'}
                                        </span>
                                        <input type="file" name="file_upload" className="hidden" accept="image/png,image/jpeg" id="input" onChange={manejarCambioArchivo} />
                                    </label>

                                    <button className="ml-0 rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-300" onClick={eliminarArchivo} >
                                        <MdOutlineDeleteOutline className="w-4 h-4" />
                                    </button>
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

export default ModalAgregarUEstudiante;
