import { useEffect, useState, useRef } from "react";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { IoMdDownload } from "react-icons/io";
import ColegioFondo from "../../img/ColegioFondo.png";
import LogoUsuario from "../../img/LogoUsuario2.png";
import {consultarGrados} from "../../services/grados";

import { PDFDownloadLink } from '@react-pdf/renderer';
import CodigoPdf from "../pdf/CodigoPdf";
import QRGenerator from "../CodigoQR/QRGenerator";

function ModalVerUEstudiante ({usuario, cerrar}) {
    const [nombreCompleto, setNombreCompleto] = useState(usuario?.nombreCompleto || "");
    const [correoElectronico, setCorreoElectronico] = useState(usuario?.correoElectronico || "");
    const [contrasena, setContrasena] = useState(usuario?.contrasena || "");

    const [idEstudiante, setIdEstudiante] = useState(usuario?.estudiante?.idEstudiante || "");
    const [matricula, setMatricula] = useState(usuario?.estudiante?.matricula || "");
    const [grupoActual, setGrupoActual] = useState("");
    const [urlImagen, setUrlImagen] = useState(usuario?.urlImagen || "");

    const [esVisible, setEsVisible] = useState(false);
    const toogleVisibilidad = () => setEsVisible((prev) => !prev);

    const [qrImage, setQrImage] = useState('');
    const qrRef = useRef();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        const cargarGradosGrupos = async () => {
            try {    
                if (usuario?.estudiante?.gradoGrupo?.idGradoGrupo) {
                    const response = await consultarGrados();
                    
                    const grupos = Array.isArray(response) ? response : (response?.data || []);
                    console.log("Todos los grupos:", grupos); // Para depuración
                    console.log("ID buscado:", usuario.estudiante.gradoGrupo.idGradoGrupo); // Para depuración
                    
                    const grupo = grupos.find(g => g.idGradoGrupo === usuario.estudiante.gradoGrupo.idGradoGrupo);
                
                    if (grupo){
                        console.log("Grupo encontrado:", grupo); // Para depuración
                        setGrupoActual(grupo.gradoGrupo);
                    } else {
                        console.log("No se encontró el grupo"); // Para depuración
                        setGrupoActual("Grupo no encontrado");
                    }
                } else {
                    setGrupoActual("No tiene grupo asignado");
                }
            } catch (error) {
                console.log("Error cargando grados y grupos: ", error);
                setGrupoActual("Error al cargar grupo");
            }
        };

        cargarGradosGrupos();
    }, [usuario]);

    const estudianteData = {
        nombreCompleto: nombreCompleto,
        correoElectronico: correoElectronico,
        urlImagen: urlImagen,
        estudiante: {
            idEstudiante: idEstudiante,
            matricula: matricula,
            tipo: usuario?.estudiante?.tipo || "",
            gradoGrupo: {
                idGradoGrupo: grupoActual
            }
        }
    };

    useEffect(() => {
        setIsClient(true); // Marca que estamos en el cliente
    }, []);
        
    useEffect(() => {
    const generateQR = async () => {
        if (qrRef.current) {
        try {
            const imageData = await qrRef.current.getQRAsImage();
            setQrImage(imageData);
        } catch (error) {
            console.error("Error generating QR:", error);
            // Opcional: puedes mostrar un mensaje al usuario aquí
        }
        }
    };
    
    // Agregamos un pequeño delay para asegurar que el componente esté montado
    const timer = setTimeout(generateQR, 50);
    return () => clearTimeout(timer);
    }, [estudianteData]);

    const salir = async () =>{
        cerrar();
    }

    return (
        <>
            <div className="px-8 py-6 whitespace-nowrap  transition ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0">
                <div className="container mx-auto w-11/12 md:w-3/5 max-w-2xl">
                    <div className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400" >

                        <div className="rounded-t h-32 overflow-hidden">
                            <img className="object-cover object-top w-full" src={ColegioFondo} />
                        </div>
                        
                        <div className="mx-auto w-32 h-32 relative -mt-16 border-3 border-white rounded-full overflow-hidden">
                            <img 
                                className="object-cover object-center h-32" 
                                src={urlImagen || LogoUsuario} 
                                onError={(e) => {
                                    // Esto maneja casos donde la URL existe pero la imagen no se puede cargar
                                    e.target.src = LogoUsuario;
                                }}
                                alt="Foto de perfil" 
                            />
                        </div>
                        
                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-gray-500 text-sm font-bold leading-tight tracking-normal"> Nombre completo</label>
                                <input className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-sky-300 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" value={nombreCompleto} onChange={(e) => setNombreCompleto(e.target.value)} disabled readOnly />
                            </div>

                            <div>
                                <label className="text-gray-500 text-sm font-bold leading-tight tracking-normal"> Correo electronico</label>
                                <input type="email" className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-sky-300 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" value={correoElectronico} onChange={(e) => setCorreoElectronico(e.target.value)} disabled readOnly />
                            </div>
                            
                            <div>
                                <label className="text-gray-500 text-sm font-bold leading-tight tracking-normal"> Tipo de usuario</label>
                                <input className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-sky-300 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" value="Estudiante" disabled readOnly />
                            </div>

                            <div>
                                <label className="text-gray-500 text-sm font-bold leading-tight tracking-normal"> Contraseña</label>
                                <div className="relative">
                                    <input type={esVisible ? "text": "password"} className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-sky-300 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" value={contrasena} onChange={(e) => setContrasena(e.target.value)} disabled readOnly />
                            
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
                                <input className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-sky-300 font-normal w-full h-10 flex items-center pl-3 pr-8 text-sm border-gray-300 rounded border" value={matricula} onChange={(e) => setMatricula(e.target.value)} disabled readOnly />
                            </div>

                            <div>
                                <label className="text-gray-500 text-sm font-bold leading-tight tracking-normal"> Tipo</label>
                                <input className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-sky-300 font-normal w-full h-10 flex items-center pl-3 pr-8 text-sm border-gray-300 rounded border" value={usuario?.estudiante?.tipo || "Principal"} disabled readOnly />
                            </div>

                            <div>
                                <label className="text-gray-500 text-sm font-bold leading-tight tracking-normal">Grupo actual</label>
                                <input
                                    className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-sky-300 font-normal w-full h-10 flex items-center pl-3 pr-8 text-sm border-gray-300 rounded border"
                                    value={grupoActual || "Cargando grupo..."}
                                    readOnly
                                    disabled
                                />
                            </div>

                            <div>
                                <QRGenerator ref={qrRef} estudianteData={estudianteData} />

                                <label className="text-gray-500 text-sm font-bold leading-tight tracking-normal">Codigo QR</label>
                                <div className="mb-5 mt-2 flex items-center space-x-4">
                                
                                    {/* Botón para descargar PDF */}
                                    {isClient && qrImage && (
                                        <PDFDownloadLink 
                                            document={<CodigoPdf estudianteData={estudianteData} qrImage={qrImage} />} 
                                            fileName={`credencial_${matricula}.pdf`}
                                        >
                                            {({ loading }) => (
                                            <button className="flex items-center justify-center w-full h-10 px-3 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
                                                <IoMdDownload className="w-6 h-6 text-gray-500"/>
                                                <span className={`text-gray-500 text-sm font-bold leading-tight tracking-normal`}>
                                                {loading ? 'Generando PDF...' : 'Descargar Credencial'}
                                                </span>
                                            </button>
                                            )}
                                        </PDFDownloadLink>
                                    )}
                                </div>
                            </div>

                        </div>

                        <button className="ml-0 rounded-md bg-gray-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-300"
                            onClick={salir}> Volver 
                        </button>

                    </div>

                </div>
            </div>
        </>
    );   
}

export default ModalVerUEstudiante;
