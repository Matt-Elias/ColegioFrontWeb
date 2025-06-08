import { createContext, useState, useContext } from "react";
export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error ("useAuth debe usarse dentro de un AuthProvider");
    }
    return context;
}

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");

        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");
        const correoElectronico = localStorage.getItem("correoElectronico");
        const idUsuario = localStorage.getItem("idUsuario");

        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            console.log("Inicializando estado de usuario desde localStorage:", parsedUser);
            return parsedUser;
        }

        return token && role ? { token, role, correoElectronico, idUsuario }: null;
    });

    const login = (userData, navigate) => {
        console.log("Guardando usuario en localStorage:", userData); // <-- Agregado

        /*localStorage.setItem('user', JSON.stringify({
            token: userData.token,
            correoElectronico: userData.correoElectronico,
            idUsuario: userData.idUsuario,
            role: userData.role || 'user' // si es que tienes roles
        }));*/

        if (!userData.token) {
            console.error("Token no recibido!");
            return;
        }

        localStorage.setItem("token", userData.token);
        localStorage.setItem("role", userData.role);
        localStorage.setItem("correoElectronico", userData.correoElectronico);
        localStorage.setItem("idUsuario", userData.idUsuario);

        setUser({
            token: userData.token,
            role: userData.role,
            correoElectronico: userData.correoElectronico,
            idUsuario: userData.idUsuario
        });

         // Redirección FORZADA (opcional)
        setTimeout(() => {
            navigate('/eventos', { replace: true });
        }, 100);
        //if (navigate) navigate('/');
    }

    const logout = (navigate) => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("correoElectronico");
        localStorage.removeItem("idUsuario");
        setUser(null);
        if (navigate) navigate('/login');
    }

    return (
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    );

}
