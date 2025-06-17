import { useState } from "react";

function ModalAgregarGrado () {
    const [gradoGrupo, setGradoGrupo] = useState("");
    const [nivel, setNivel] = useState("");
    
    return(
        <>
        <div className="">
            <label>Grado y grupo: </label>
            <input placeholder="Grado y grupo" value={gradoGrupo} onChange={(e) => setGradoGrupo(e.target.value)} />
            
            {/**En el select deberia ser un .map(item) para traer en listado todos los niveles */}
            <label>Seleccione un nivel</label>
            <select>
                <option value={nivel} onChange={(e) => setNivel(e.target.value)}></option>
            </select>
        
        </div>

        </>
    );
}

export default ModalAgregarGrado;
