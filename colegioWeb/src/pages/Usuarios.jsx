import React, { useState } from "react";
import {adminLinks} from "../routers/links";
//import {useAuth} from "";

const Usuarios = () => {
    const {user} = useAuth();
    const {data, loading, error} = useFetch("");

    return(
        <div>
            <h1>Usuarios</h1>
        </div>
    );
}

export default Usuarios;

