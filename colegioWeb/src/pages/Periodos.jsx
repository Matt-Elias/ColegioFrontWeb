import React, { useState } from "react";
import {adminLinks} from "../routers/links";
//import {useAuth} from "";

const Periodos = () => {
    const {user} = useAuth();
    const {data, loading, error} = useFetch("");

    return(
        <div>
            <h1>Periodos</h1>
        </div>
    );
}

export default Periodos;