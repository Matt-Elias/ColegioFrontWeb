import React, { useState, useEffect } from "react";

const Periodos = () => {

    return(
        <div>
            <h1>Periodos</h1>

            <table>
                <thead>
                    <tr>
                        <td> Calificaciones </td>
                        <td> Asistencia </td>
                        <td> Tareas </td>
                        <td> Proyectos </td>
                        <td> Tipo de periodo </td>
                        <td> Nivel </td>
                        <td> Acciones </td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                        <td> <button>Editar</button> </td>
                        <td> <button>Eliminar</button> </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Periodos;