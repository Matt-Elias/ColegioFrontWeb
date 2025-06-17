import 'react-big-calendar/lib/css/react-big-calendar.css';
import {Calendar , dayjsLocalizer} from "react-big-calendar";
import dayjs from "dayjs";

const Eventos = (props) => {
    const localizer = dayjsLocalizer(dayjs); 
    
    const events = [
        {
            start: dayjs('2025-06-18T12:00:00').toDate(),
            end: dayjs('2025-06-18T13:00:00').toDate(),
            title: "Evento 1"
        },
        {
            start: dayjs('2025-06-20T00:00:00').toDate(),
            end: dayjs('2025-06-21T00:00:00').toDate(),
            title: "Evento 1"
        }
    ];

    return(
        <div className="lg:flex lg:h-full lg:flex-col" >
            <Calendar
                localizer={localizer}
                events={events}
                /*views={["month", "week", "day"]}*/
            />

            <header className="flex items-center justify-between border-b border-gray-200 px-6 py-4 lg:flex-none">
                
                <h1 className="text-base font-semibold leading-6 text-gray-900">
                    <time dateTime="2025-06">Junio</time>
                </h1>
            
                <div className="flex items-center">
                    <div className="relative flex items-center rounded-md bg-white shadow-sm md:items-stretch">
                        
                        <button type="button" className="flex h-9 w-12 items-center justify-center rounded-l-md border-y border-l border-gray-300 pr-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pr-0 md:hover:bg-gray-50">
                            <span className="sr-only">Mes anterior</span>
                            <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clip-rule="evenodd" />
                            </svg>
                        </button>

                        <button type="button" className="hidden border-y border-gray-300 px-3.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 focus:relative md:block ">Hoy</button>
                        <span class="relative -mx-px h-5 w-px bg-gray-300 md:hidden"></span>

                        <button type="button" className="flex h-9 w-12 items-center justify-center rounded-r-md border-y border-r border-gray-300 pl-l text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pr-0 md:hover:bg-gray-50">
                            <span className="sr-only">Siguiente Mes</span>
                            <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
                            </svg>
                        </button>           
                    </div>
                    <div className="hidden md:ml-4 md:flex md:items-center">
                        <div className="relative">
                            <button type="button" class="flex items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" id="menu-button" aria-expanded="false" aria-haspopup="true">
                                Vista Mes
                                <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                                </svg>
                            </button>

                            <div class="absolute right-0 z-10 mt-3 w-36 origin-top-right overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-gray-300 ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                                <div class="py-1" role="none">
                                    <a href="#" class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-0">Vista Dia</a>
                                    <a href="#" class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-1">Vista Semana</a>
                                    <a href="#" class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-2">Vista Mes</a>
                                    <a href="#" class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-3">Vista Año</a>
                                </div>
                            </div>
                        </div>

                        <div class="ml-6 h-6 w-px bg-gray-300"></div>
                        <button type="button" class="ml-6 rounded-md bg-green-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-300">Agregar Evento</button>
                    </div>

                    <div className="relative ml-6 md:hidden">
                        <button type="button" class="-mx-2 flex items-center rounded-full border border-transparent p-2 text-gray-400 hover:text-gray-500" id="menu-0-button" aria-expanded="false" aria-haspopup="true">
                            <span className="sr-only">Abrir menu</span>
                            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path d="M3 10a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM8.5 10a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM15.5 8.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" />
                            </svg>

                        </button>
                    </div>
                </div>

            
            </header>
        </div>
    );
}

export default Eventos;
