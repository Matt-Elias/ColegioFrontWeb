import React, { useState } from "react";
import {adminLinks} from "../routers/links";
//import {useAuth} from "";

const Grados = () => {
    const {user} = useAuth();
    const {data, loading, error} = useFetch("");

    return(
        <div>
            <h1>Grados y grupos</h1>
        </div>
    );
}

export default Grados;
