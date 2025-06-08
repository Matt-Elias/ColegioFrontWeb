import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import Logo from "../img/LogoColegio.png";

const Login = () => {
    const [credentials, setCredentials] = useState({
        correoElectronico: '',
        contrasena: ''
    });
    
    const [error, setError] = useState('');
    const { login: authLogin } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({
        ...credentials,
        [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const result = await login(credentials);
            console.log("Respuesta completa del login:", result);

            if (result.success) {
            // Asegúrate que result.data tenga la estructura correcta
                if (!result.data.token || !result.data.idUsuario) {
                    throw new Error("Datos de autenticación incompletos");
                }
                authLogin(result.data, navigate);
                /*authLogin({
                    token: result.data.token,
                    role: result.data.role,
                    correoElectronico: result.data.correoElectronico,
                    idUsuario: result.data.idUsuario
                }, navigate);*/
            } else {
            setError(result.message);
            }

            /*if (result.success && result.data && result.data.data) {
                authLogin(result.data.data, navigate);
            } else {
                setError(result.message || "Credenciales incorrectas");
                console.error("Error detallado:", result);
            }*/

        } catch (err) {
            //setError("Error en la conexión");
            setError(err.message);
            console.error("Error completo:", err); // ← Para depuración
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
                        <div className="mt-1">
                            <input id="contrasena" name="contrasena" type="password" autoComplete="password" required
                                className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm text-white"
                                value={credentials.contrasena} onChange={handleChange} />
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

            </div>
        </div>
    </div>
  ) ;
}

export default Login;

