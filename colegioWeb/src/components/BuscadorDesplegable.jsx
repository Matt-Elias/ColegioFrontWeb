import { useState, useRef } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { TiDeleteOutline } from 'react-icons/ti';

const BuscadorDesplegable = () => {

    const [estaAbierto, setEstaAbierto] = useState(false);
    const [valorSeleccionado, setValorSeleccionado] = useState('');
    const [buscarTermino, setBuscarTermino] = useState('');
    const selectRef = useRef(null);
    
        const opciones = [
            'Grupo 1',
        'Grupo 2',
        'Grupo 3',
        'Grupo 4',
        'Grupo 5'
        ];
    
        const filtrarOpciones = opciones.filter(opcion => 
            opcion.toLowerCase().includes(buscarTermino.toLowerCase())
        ); 
        
        const manejarOpcionClick = (opcion) => {
            setValorSeleccionado(opcion);
            setBuscarTermino(opcion);
            setEstaAbierto(false);
        }
    
        const limpiarSeleccion = () => {
            setValorSeleccionado('');
            setBuscarTermino('');
            setEstaAbierto(false);
        }
    
        const desplegable = () => {
            setEstaAbierto(!estaAbierto);
        }

    return(
        <div>
            <h1>Materias</h1>
    
            <div>
                    <label className="text-gray-500 text-sm font-bold leading-tight tracking-normal">
                        Selecciona un grupo
                    </label>
    
                    <div className="relative mb-5 mt-2" ref={selectRef}>
    
                        <div className="h-10 bg-white flex items-center border border-gray-300 rounded w-full pl-3 pr-2 text-sm text-gray-600 focus-within:border-sky-300">
                            <input type="text" value={buscarTermino}
                                onChange={(e) => {
                                    setBuscarTermino(e.target.value);
                                    setEstaAbierto(true);
                                }}
                                placeholder="Buscar..."
                                className="flex-grow outline-none text-gray-600"
                                onFocus={() => setEstaAbierto(true)} />
    
                            {buscarTermino && (
                                <button className="ml-2 text-gray-400 hover:text-gray-600 focus:outline-none" onClick={limpiarSeleccion}>
                                    <TiDeleteOutline className="w-5 h-5" />
                                </button>
                            )}
    
                            <button className="ml-2 text-gray-400 hover:text-gray-600 focus:outline-none" onClick={desplegable}>
                                {estaAbierto ? (
                                    <IoIosArrowUp className="w-5 h-5" />
                                ): (
                                    <IoIosArrowDown className="w-5 h-5" />
                                )}
                            </button>
                        </div>
    
                        {estaAbierto && (
                            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg max-h-60 overflow-y-auto">
                                {filtrarOpciones.length > 0 ? (
                                    <div className="py-1">
                                        {filtrarOpciones.map((opcion, index)=>(
                                            <div key={index} onClick={()=> manejarOpcionClick(opcion)} 
                                                className={`cursor-pointer px-3 py-2 text-sm text-gray-600 hover:bg-blue-600 hover:text-white ${
                                                    valorSeleccionado === opcion ? 'bg-gray-100 font-medium' : ''
                                                }`} > {opcion}
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                     <div className="px-3 py-2 text-sm text-gray-500">
                                        No se encontraron resultados
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
            </div>
    
        </div>
    );
}