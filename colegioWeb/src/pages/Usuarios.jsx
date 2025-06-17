import React, { useState } from "react";
import HeadlessDemo  from "../components/Sidebar";

const Usuarios = () => {

    return(
        <div>
            <HeadlessDemo />
            <h1>Usuarios</h1>

            <table>
                <thead>
                    <tr>
                        <th>Nombre completo</th>
                        <th>Correo electronico</th>
                        <th>tipo de usuario</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td> <button>Editar</button> </td>
                        <td> <button>Eliminar</button> </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Usuarios;

