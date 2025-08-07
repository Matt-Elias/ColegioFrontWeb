import { useState } from "react";
//import { IoMdChatboxes } from "react-icons/io";
import { FaClipboardList } from "react-icons/fa";
import { MdEventNote } from "react-icons/md";
import { MdGroups } from "react-icons/md";
import { FaBookBookmark } from "react-icons/fa6";
import { SiHtmlacademy } from "react-icons/si";
import { IoTimerSharp } from "react-icons/io5";
import { FaUserCog } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import Logo from "../img/LogoColegio.png";
import { Link } from "react-router-dom";

function Sidebar () {
    const [expandir, setExpandir] = useState(false);

    return(
        <>
        <div className={`fixed left-0 top-0 h-full z-50 transition-all duration-300 ${expandir ? 'h-64' : 'w-12'}`}>
            <div className="flex flex-col h-full overflow-hidden text-white bg-sky-950 rounded-r">
                
                <a className="flex items-center justify-center w-full h-10 rounded transition-colors" >
                    <img src={Logo} className="w-10 h-10"/>
                </a>
           
                <div className="flex flex-col items-center mt-3 border-t border-gray-300">
                    <Link to="/eventos" className="flex items-center w-full p-3 rounded hover:bg-sky-600 hover:text-white transition-colors"
                        onClick={() => setExpandir(!expandir)}
                    >
                        <MdEventNote className="w-6 h-6" />    
                        {expandir && <span className="ml-4 whitespace-nowrap">Eventos</span>}
                    </Link>            

                    <Link to="/usuarios" className="flex items-center w-full p-3 rounded hover:bg-sky-600 hover:text-white transition-colors"
                        onClick={() => setExpandir(!expandir)}
                    >
                        <FaUserCog className="w-6 h-6" /> 
                        {expandir && <span className="ml-4 whitespace-nowrap">Usuarios</span>}
                    </Link>

                    <Link to="/periodos" className="flex items-center w-full p-3 rounded hover:bg-sky-600 hover:text-white transition-colors"
                        onClick={() => setExpandir(!expandir)}
                    >
                        <IoTimerSharp className="w-6 h-6" />
                        {expandir && <span className="ml-4 whitespace-nowrap">Periodos</span>}
                    </Link>

                    <Link to="/materia" className="flex items-center w-full p-3 rounded hover:bg-sky-600 hover:text-white transition-colors"
                        onClick={() => setExpandir(!expandir)}
                    >
                        <FaBookBookmark className="w-6 h-6" />
                        {expandir && <span className="ml-4 whitespace-nowrap">Materias</span>}
                    </Link>

                    <Link to="/nivel" className="flex items-center w-full p-3 rounded hover:bg-sky-600 hover:text-white transition-colors"
                        onClick={() => setExpandir(!expandir)}
                    >
                        <SiHtmlacademy className="w-6 h-6" />
                        {expandir && <span className="ml-4 whitespace-nowrap">Nivel academico</span>}
                    </Link>

                    <Link to="/grados" className="flex items-center w-full p-3 rounded hover:bg-sky-600 hover:text-white transition-colors"
                        onClick={() => setExpandir(!expandir)}
                    >
                        <MdGroups className="w-6 h-6" />
                        {expandir && <span className="ml-4 whitespace-nowrap">Grados y grupos</span>}
                    </Link>

                    <Link to="/listado" className="flex items-center w-full p-3 rounded hover:bg-sky-600 hover:text-white transition-colors"
                        onClick={() => setExpandir(!expandir)}
                    >
                        <FaClipboardList className="w-6 h-6" />
                        {expandir && <span className="ml-4 whitespace-nowrap">Asistencias</span>}
                    </Link>     

                    <Link to="/login" className="flex items-center w-full p-3 hover:bg-sky-600 hover:text-white transition-colors border-t border-gray-300"
                        onClick={() => setExpandir(!expandir)}
                    >
                        <BiLogOut className="w-6 h-6" />
                        {expandir && <span className="ml-4 whitespace-nowrap">Cerrar sesion</span>}
                    </Link> 

                </div>
            </div>

        </div>
        </>
    );
}

export default Sidebar;
