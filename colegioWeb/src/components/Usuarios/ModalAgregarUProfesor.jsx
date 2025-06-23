import { useState, useEffect, useRef, useMemo } from "react";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { crearUsuario } from "../../services/usuarios";

function ModalAgregarUProfesor ({cerrar, recargar}) {
    const [nombreCompleto, setNombreCompleto] = useState("");
    const [correoElectronico, setCorreoElectronico] = useState("");
    const [contrasena, setContrasena] = useState("");

    const [esVisible, setEsVisible] = useState(false);
    const toogleVisibilidad = () => setEsVisible((prev) => !prev);

    const guardar = async () => {
        try {
            const usuarioData = {
                nombreCompleto: nombreCompleto,
                correoElectronico: correoElectronico,
                tipoUsuario: "Profesor",
                contrasena: contrasena,
                urlImagen: "",
            };

            await crearUsuario(usuarioData);
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

    return (
        <>
            <div className="px-8 py-6 whitespace-nowrap  transition ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0">
                <div className="container mx-auto w-11/12 md:w-3/5 max-w-2xl">
                    <div className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
                        <h3 className="text-gray-600 font-lg font-bold tracking-normal leading-tight mb-4"> Agregar profesor</h3>

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
                                <input className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-sky-300 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="Tipo de usuario" value="Profesor" disabled readOnly />
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

export default ModalAgregarUProfesor;
