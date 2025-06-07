import { useContext } from "react";
import { Navigate } from "react-router-dom";
import {AuthContext} from "../context/AuthContext";

const ProtectedRoute = ({children, requiredRole}) => {
    const {user} = useContext(AuthContext);

    if(!user || !user.token) {
        return <Navigate to="/login" replace/>;
    }

    //Este fragmento va a cambiar
    if (requiredRole && user.role !== `ROLE_${requiredRole.toUpperCase()}`) {
        return <Navigate to="/login" replace/>; 
    }

    return children;
}

export default ProtectedRoute;

