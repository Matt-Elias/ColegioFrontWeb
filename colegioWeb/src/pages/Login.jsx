import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import Logo from "../img/LogoColegio.png";
import { IoIosClose } from "react-icons/io";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";

const Login = () => {
    const [credentials, setCredentials] = useState({
        correoElectronico: '',
        contrasena: ''
    });
    
    const [error, setError] = useState('');
    const { login: authLogin } = useAuth();
    const navigate = useNavigate();
    const [esVisible, setEsVisible] = useState(false);

    const handleChange = (e) => {
        setCredentials({
        ...credentials,
        [e.target.name]: e.target.value
        });
    };

    const toogleVisibilidad = () => setEsVisible((prev) => !prev); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const result = await login(credentials);
            console.log("Respuesta completa del login:", result);

            if (result.success) {

                if (!result.data.token || !result.data.idUsuario) {
                    throw new Error("Datos de autenticación incompletos");
                }
                authLogin(result.data, navigate);
        
            } else {
                //setError(result.message);
                setError("El correo o la contraseña son incorrectos");
            }

        } catch (err) {
            setError(err.message);
            console.error("Error completo:", err); // Depuracion
        }
    };

    return (
    <div className="login-container bg-sky-950 flex h-screen items-center justify-center p-4">
      
        <div className="w-full max-w-md">
            <div className="bg-sky-800 shadow-md rounded-md p-8">

                <img className="mx-auto h-28 w-auto" src={Logo}/>
                <h2 className="mt-2 text-center text-3xl font-bold tracking-tight text-white"> Bienvenido </h2>

                <form class="space-y-6 mt-4 " onSubmit={handleSubmit} >
                    <div>
                        <label class="block text-sm font-medium text-white">Correo electronico</label>
                        <div class="mt-1">
                            <input id= "correoElectronico" name="correoElectronico" type="email" autoComplete="email" required
                                className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm text-white"
                                value={credentials.correoElectronico} onChange={handleChange} />
                        </div>
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-white">Contraseña</label>
                        <div className="mt-1 relative">
                            <input id="contrasena" name="contrasena" type={esVisible ? "text" : "password"} autoComplete="current-password" required className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm text-white" value={credentials.contrasena} onChange={handleChange} />
                            <button 
                                type="button"
                                onClick={toogleVisibilidad}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-300 hover:text-white focus:outline-none"
                            >
                                {esVisible ? <IoMdEyeOff size={20} /> : <IoMdEye size={20} />}
                            </button>
                        </div>
                    </div>

                    <div>
                        <button type="submit"
                            className="flex w-full justify-center rounded-md border border-transparent bg-sky-400 py-2 px-4 text-sm text-white shadow-sm hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-sky-400
                            focus:ring-offset-2"
                            >
                                Iniciar Sesion
                        </button>
                    </div>

                </form>

                {error && (
                    <div className="flex justify-between items-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 my-2 rounded" role="alert">
                        <span className="block sm:inline pl-2">
                            <strong className="font-bold">Error</strong>
                            {error === "El correo o la contraseña son incorrectos" 
                                ? " El correo o la contraseña son incorrectos"
                                : ` ${error}`}
                        </span>
                        <button 
                            type="button"
                            onClick={() => setError('')}
                            className="text-red-700 hover:text-red-900 focus:outline-none"
                        >
                            <IoIosClose size={24} />
                        </button>
                    </div>
                )}

            </div>
        </div>
    </div>
  ) ;
}

export default Login;

