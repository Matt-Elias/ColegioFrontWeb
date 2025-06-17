import { useState } from 'react';

function ModalAgregarMateria () {
    const [nombreMateria, setNombreMateria] = useState("");
    const [asginaciones, setAsignaciones] = useState("");
    const [profesor, setProfesor] = useState("");

    return(
        <>
        <div className="">
            <label>Nombre de la materia</label>
            <input type="text" placeholder='Nombre de la materia' value={nombreMateria} onChange={(e) => setNombreMateria(e.target.value)}/>

            <label>Asignaciones</label>
            <input type='text' placeholder='Asignaciones' value={asginaciones} onChange={()=> setAsignaciones(e.target.value) } />

            {/**En el select deberia ser un .map(item) para traer en listado todos los profesores */}
            <label>Seleccione un profesor</label>
            <select>
                <option value={profesor} onChange={(e) => setProfesor(e.target.value)}></option>
            </select>

        </div>
        </>
    );
    
}