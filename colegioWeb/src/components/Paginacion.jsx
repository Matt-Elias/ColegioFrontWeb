import { FaLongArrowAltLeft } from "react-icons/fa";
import { FaLongArrowAltRight } from "react-icons/fa";

export const Paginacion = ({ paginaActual, totalPaginas, cambiarPagina, itemsPorPagina, cambiarItemsPorPagina }) => {
  return (
    <div className="flex items-center justify-between mt-4">
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">Items por página:</span>
        <select 
          className="py-1 text-gray-600 focus:outline-none focus:border focus:border-sky-300 font-normal text-sm border-gray-300 rounded border"
          value={itemsPorPagina}
          onChange={(e) => cambiarItemsPorPagina(Number(e.target.value))}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>
      
      <div className="flex items-center gap-4">
        <button
          onClick={() => cambiarPagina(paginaActual - 1)}
          disabled={paginaActual === 1}
          className={`p-2 rounded-md ${paginaActual === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
        >
          <FaLongArrowAltLeft />
        </button>
        
        <span className="text-sm text-gray-600">
          Página {paginaActual} de {totalPaginas}
        </span>
        
        <button
          onClick={() => cambiarPagina(paginaActual + 1)}
          disabled={paginaActual === totalPaginas}
          className={`p-2 rounded-md ${paginaActual === totalPaginas ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
        >
          <FaLongArrowAltRight />
        </button>
      </div>
    </div>
  );
};

