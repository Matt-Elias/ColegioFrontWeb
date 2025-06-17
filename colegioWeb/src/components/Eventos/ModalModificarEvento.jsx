import { useState } from "react";

function ModalModificarEvento () {
    const [titulo, setTitulo] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [colorEtiqueta, setColorEtiqueta] = useState("");
    const [idUsuario, setIdUsuario] = useState();

    const guardar = () => {}

    const cancelar = () => {}

    return(
        <>
        <div className="">
            <h3>Agregar Evento</h3>
            <label>Titulo</label>
            <input placeholder="Titulo" value={titulo} onChange={(e) => setTitulo (e.target.value)}/> 
            
            <label>Descripcion</label>
            <input placeholder="Descripcion" value={descripcion} onChange={(e) => setDescripcion (e.target.value)}/>
            
            <label>Color de etiqueta</label>
            <input placeholder="Color de etiqueta" value={colorEtiqueta} onChange={(e) => setColorEtiqueta (e.target.value)}/>

            <button onClick={guardar}> Guardar </button>
            <button onClick={cancelar}> Cancelar </button>
        </div>
        
        </>
    );
}

export default ModalModificarEvento;
