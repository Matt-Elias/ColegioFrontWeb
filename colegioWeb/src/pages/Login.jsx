import React, { useState } from "react";
import { useFetch } from "../services/useFetch";
import {adminLinks} from "../routers/links";
import {useAuth} from "";

const Login = () => {
    const {user} = useAuth();
    const {data, loading, error} = useFetch("");

    return(
        <div>
            
        </div>
    );
}

export default Login;

