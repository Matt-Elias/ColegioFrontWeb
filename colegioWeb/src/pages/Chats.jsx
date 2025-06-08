import React, { useState } from "react";
import {adminLinks} from "../routers/links";
//import {useAuth} from "";

const Chats = () => {
    const {user} = useAuth();
    const {data, loading, error} = useFetch("");

    return(
        <div>
            <h1>Chats</h1>
        </div>
    );
}

export default Chats;