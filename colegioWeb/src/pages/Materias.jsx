import React, { useState } from "react";
import {adminLinks} from "../routers/links";
//import {useAuth} from "";

const Materias = () => {
    const {user} = useAuth();
    const {data, loading, error} = useFetch("");

    return(
        <div>
            <h1>Materias </h1>
        </div>
    );
}

export default Materias;
