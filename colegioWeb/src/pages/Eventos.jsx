import 'react-big-calendar/lib/css/react-big-calendar.css';
import React, { useState, useEffect } from "react";
import { consultarEventos } from '../services/eventos';
import ModalAgregarEvento from "../components/Eventos/ModalAgregarEvento";
import ModalModificarEvento from "../components/Eventos/ModalModificarEvento";
import Sidebar from "../components/Sidebar";

import {Calendar , dateFnsLocalizer} from "react-big-calendar";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import dayjs from "dayjs";
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import es from 'date-fns/locale/es';
import utc from "dayjs/plugin/utc"; // Plugin UTC (incluido en dayjs)
import timezone from "dayjs/plugin/timezone"; // Plugin Timezone (incluido en dayjs)

dayjs.locale("es");
// Extiende Day.js con los plugins
dayjs.extend(utc);
dayjs.extend(timezone);

// Establece la zona horaria de CDMX
dayjs.tz.setDefault("America/Mexico_City");

// Ejemplo de uso:
const fechaCDMX = dayjs().tz("America/Mexico_City").format("DD/MM/YYYY HH:mm:ss");
console.log(fechaCDMX); // Mostrará la hora actual en CDMX

const Eventos = (props) => {
    const [eventos, setEventos] = useState([]);
    const [modalAgregar, setModalAgregar] = useState(false);
    const [modalEditar, setModalEditar] = useState(false);
    const [error, setError] = useState();
    const [eventoSeleccionado, setEventoSeleccionado] = useState(null);
    const [currentDate, setCurrentDate] = useState(new Date());

    const cargarEventos = async () => {
        try {   
            const response = await consultarEventos();
            const data = response.result || response;

            if (!Array.isArray(data)) {
                throw new Error(`Formato inesperado: ${JSON.stringify(response)}`);
            }

            const eventosFormateados = data.map(evento => ({
                id: evento.idEvento,
                title: evento.titulo,
                start: dayjs(evento.fechaInicio).tz("America/Mexico_City").toDate(), // Ajusta a CDMX
                end: dayjs(evento.fechaFin).tz("America/Mexico_City").toDate(),     // Ajusta a CDMX
                descripcion: evento.descripcion,
                color: evento.color_etiqueta || "#FFFFFF",
                allDay: dayjs(evento.fechaInicio).isSame(evento.fechaFin, 'day') // Evento de todo el día si comienza y termina el mismo día 
            })); 

            setEventos(eventosFormateados);
            setError(null);
        } catch (error) {
            console.error("Error cargando eventos:", error);
            setError("Error al cargar eventos");
            setEventos([]);
        }
    }

    useEffect(()=>{
        cargarEventos();
    }, []);

    const localizer = dateFnsLocalizer ({
        format,
        parse,
        startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }), // lunes
        getDay,
        locales: { es },
    });

    const manejarSelectEvento = (event) => {
        setEventoSeleccionado(event);
        setModalEditar(true);
    }

    // Navegación entre meses
    const prevMonth = () => {
        setCurrentDate(dayjs(currentDate).subtract(1, 'month').toDate());
    };

    const nextMonth = () => {
        setCurrentDate(dayjs(currentDate).add(1, 'month').toDate());
    };

    // Función para volver al mes actual
    const currentMonth = () => {
        setCurrentDate(new Date());
    };

    const getMonthName = (date) => {
        const monthNames = [
        "Enero", "Febrero", "Marzo",
        "Abril", "Mayo", "Junio", 
        "Julio", "Agosto", "Septiembre",
        "Octubre", "Noviembre", "Diciembre"
        ];
        return monthNames[date.getMonth()];
    };

    function darkenColor(hex, amount = 20) {
        // Convierte HEX a RGB, oscurece y vuelve a HEX
        // Implementación completa disponible si la necesitas
        return hex; // Simplificado para el ejemplo
    }

    function getContrastColor(hex) {
        if (!hex) return "#000000";
        hex = hex.replace(/^#/, '');
        
        // Convierte a RGB
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        
        // Calcula el brillo (fórmula de luminosidad)
        const brightness = (r * 299 + g * 587 + b * 114) / 1000;
        
        // Devuelve negro para fondos claros, blanco para fondos oscuros
        return brightness > 128 ? "#000000" : "#FFFFFF";
    }

    return(
        <div className="lg:flex lg:h-full lg:flex-col ml-12 p-4">
            <Sidebar/>
        {/* Encabezado superior */}
            <header className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                <h1 className="text-base font-semibold leading-6 text-gray-900">
                    <time dateTime={dayjs(currentDate).format('YYYY-MM')}>
                        {getMonthName(currentDate).charAt(0).toUpperCase() + 
                         getMonthName(currentDate).slice(1)}
                    </time>
                </h1>

                {/* Botones de navegación */}
                <div className="flex items-center space-x-2">
                    <button type="button" className="rounded-md border border-gray-300 bg-white px-3 py-1 text-sm text-gray-700 hover:bg-gray-50" onClick={prevMonth}>Anterior</button>
                    <button type="button" className="rounded-md border border-gray-300 bg-white px-3 py-1 text-sm text-gray-700 hover:bg-gray-50" onClick={currentMonth}>Actual</button>
                    <button type="button" className="rounded-md border border-gray-300 bg-white px-3 py-1 text-sm text-gray-700 hover:bg-gray-50" onClick={nextMonth}>Siguiente</button>

                    {/* Botón agregar evento */}
                    <button type="button" className="rounded-md bg-green-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600"
                        onClick={
                            () => setModalAgregar(true)
                        }> Agregar Evento 
                    </button>
                </div>
            </header>

            {/* Calendario (ocupa el resto del espacio) */}
            <main className="flex-1 overflow-y-auto p-4">
                <Calendar
                    localizer={localizer}
                    culture='es'
                    events={eventos}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 600 }}
                    toolbar={false}
                    onSelectEvent={manejarSelectEvento}
                    date={currentDate}
                    onNavigate={(date)=> setCurrentDate(date)}
                    messages={{
                        today: "Hoy",
                        previous: "Atrás",
                        next: "Siguiente",
                        month: "Mes",
                        week: "Semana",
                        day: "Día",
                        agenda: "Agenda",
                        date: "Fecha",
                        time: "Hora",
                        event: "Evento",
                        noEventsInRange: "No hay eventos en este rango.",
                    }}
                    components={{
                        event: ({ event }) => (
                        <div 
                            className="px-2 py-1 rounded text-xs font-medium cursor-pointer"
                            style={{ 
                                backgroundColor: event.colorEtiqueta,
                                color: '#ffffff',
                                border: `1px solid ${darkenColor(event.colorEtiqueta)}`,
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                            }}
                            title={`${event.title}\n${event.descripcion || 'Sin descripción'}`}
                        >
                            {event.title}
                        </div>
                        )
                    }}
                />
            </main>
            
            {modalAgregar && (
                <ModalAgregarEvento 
                    cerrar={()=> setModalAgregar(false)}
                    recargar={cargarEventos}
                />
            )}

            {modalEditar && (
                <ModalModificarEvento 
                    evento={eventoSeleccionado}
                    cerrar={()=> setModalEditar(false)}
                    recargar={cargarEventos}
                />
            )}

        </div>
    );
}

export default Eventos;
