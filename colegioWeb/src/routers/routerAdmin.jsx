import {Routes, Route} from "react-router-dom";
import Usuarios from "../pages/Usuarios";
import Periodos from "../pages/Periodos";
import Nivel from "../pages/Nivel";
import Materias from "../pages/Materias";
import Grados from "../pages/Grados";
import Eventos from "../pages/Eventos";
import Chats from "../pages/Chats";

import Login from "../pages/Login";
import ProtectedRoute from "../context/ProtectedRoute";

export function routerAdmin (){
    return(
        <Routes>
            <Route path="/login" element={<Login/>}/>

            <Route path="/usuarios" element= {
                <ProtectedRoute requiredRole={"ADMINISTRADOR"}>
                    <Usuarios/>
                </ProtectedRoute>
            }/>

            <Route path="/periodos" element={
                <ProtectedRoute requiredRole={"ADMINISTRADOR"}>
                    <Periodos/>
                </ProtectedRoute>
            }/>

            <Route path="/nivel" element={
                <ProtectedRoute requiredRole={"ADMINISTRADOR"}>
                    <Nivel/>
                </ProtectedRoute>
            }/>

            <Route path="/materia" element={
                <ProtectedRoute requiredRole={"ADMINISTRADOR"}>
                    <Materias/>
                </ProtectedRoute>
            }/>

            <Route path="/grados" element={
                <ProtectedRoute requiredRole={"ADMINISTRADOR"}>
                    <Grados/>
                </ProtectedRoute>
            }/>

            <Route path="/eventos" element={
                <ProtectedRoute requiredRole={"ADMINISTRADOR"}>
                    <Eventos/>
                </ProtectedRoute>
            }/>

            <Route path="/chats" element={
                <ProtectedRoute requiredRole={"ADMINISTRADOR"}>
                    <Chats/>
                </ProtectedRoute>
            }/>

        </Routes>
    );
}

