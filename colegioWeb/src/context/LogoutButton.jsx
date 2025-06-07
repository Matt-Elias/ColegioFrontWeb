import { useContext } from "react";
import {AuthContext} from "../context/AuthContext";

const LogoutButton = () => {
    const { logout } = useContext(AuthContext);
    return(
        <Button onClick={logout}> Cerrar Sesion </Button>
    );
}

export default LogoutButton;
