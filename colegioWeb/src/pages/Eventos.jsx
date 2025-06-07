import React, { useState } from "react";
import { useFetch } from "../services/useFetch";
import {adminLinks} from "../routers/links";
import {useAuth} from "";

const Eventos = () => {
    const {user} = useAuth();
    const {data, loading, error} = useFetch("");

    return(
        <div>
            <h1>Eventos</h1>
        </div>
    );
}

export default Eventos;
