import { useState } from "react";
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { modificarEventos } from "../../services/eventos";

function ModalModificarEvento ({evento, cerrar, recargar}) {
    const [titulo, setTitulo] = useState(evento?.title || "");
    const [descripcion, setDescripcion] = useState(evento?.descripcion || "");
    const [colorEtiqueta, setColorEtiqueta] = useState(evento?.color || "#3b82f6");
    const [idUsuario, setIdUsuario] = useState(1);

    // Convierte las fechas del evento a dayjs con la zona horaria correcta
    const [fechaSeleccionada, setFechaSeleccionada] = useState(
        evento?.start ? dayjs(evento.start).tz("America/Mexico_City") : dayjs()
    );

    const [horaInicio, setHoraInicio] = useState(
        evento?.start ? dayjs(evento.start).tz("America/Mexico_City") : dayjs().hour(9).minute(0)
    );
    
    const [horaFin, setHoraFin] = useState(
        evento?.end ? dayjs(evento.end).tz("America/Mexico_City") : dayjs().hour(10).minute(0)
    );
    const guardar = async () => {
        try {
            const fechaInicio = dayjs(fechaSeleccionada)
                .hour(horaInicio.hour())
                .minute(horaInicio.minute())
                .tz("America/Mexico_City", true);
            
            const fechaFin = dayjs(fechaSeleccionada)
                .hour(horaFin.hour())
                .minute(horaFin.minute())
                .tz("America/Mexico_City", true);

            if (!titulo.trim()) {
                alert("El título es requerido");
                return;
            }

            if (fechaFin.isBefore(fechaInicio)) {
                alert("La fecha de fin no puede ser anterior a la de inicio");
                return;
            }

            await modificarEventos({
                idEvento: evento.id,
                titulo,
                descripcion,
                colorEtiqueta,
                idUsuario,
                fechaInicio: fechaInicio.toISOString(),
                fechaFin: fechaFin.toISOString()
            });

            recargar();
            cerrar();
        } catch (error) {
            console.error("Error al modificar evento:", error);
            alert("Ocurrió un error al modificar el evento");   
        }
    }

    const cancelar = () => {
        cerrar();
    }

    return(
        <>
        <div className="px-8 py-6 whitespace-nowrap  transition ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0">
            <div className="container mx-auto w-11/12 md:w-2/3 max-w-lg">
                <div className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
                    <h3 className="text-gray-600 font-lg font-bold tracking-normal leading-tight mb-4"> Modificar Evento</h3>

                    <label className="text-gray-500 text-sm font-bold leading-tight tracking-normal">Añadir Titulo</label>
                    <input type="text" className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-sky-300 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="Titulo" value={titulo} onChange={(e) => setTitulo(e.target.value)} />

                    <div className="mb-3">
                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
                            <DemoContainer components={['DatePicker', 'MobileTimePicker', 'MobileTimePicker']}>
                                <DatePicker
                                label="Seleccionar Fecha"
                                value={fechaSeleccionada}
                                onChange={(newValue) => setFechaSeleccionada(newValue)}
                                slotProps={{textField: {
                                    variant: "outlined", 
                                    size: "small", 
                                    fullWidth: true, 
                                    sx: {
                                        fontSize: '0.875rem', // 14px
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '8px',
                                        },
                                        '& .MuiInputLabel-root': {
                                            fontWeight: 500,
                                            color: '#6B7280', // gray-500 de Tailwind
                                        },
                                    } 
                                }}}
                                />

                                <DemoItem label="Hora Inicio">
                                    <MobileTimePicker 
                                        value={horaInicio}
                                        onChange={(newValue) => setHoraInicio(newValue)}
                                        slotProps={{
                                            textField: {
                                                variant: "outlined", 
                                                size: "small", 
                                                fullWidth: true, 
                                                sx: {
                                                    fontSize: '0.875rem',
                                                    '& .MuiOutlinedInput-root': { borderRadius: '8px' },
                                                    '& .MuiInputLabel-root': {
                                                        fontWeight: 500,
                                                        color: '#6B7280',
                                                    },
                                                } 
                                            }
                                        }}  
                                    />
                                </DemoItem>

                                <DemoItem label="Hora de fin">
                                    <MobileTimePicker 
                                        value={horaFin}
                                        onChange={(newValue) => setHoraFin(newValue)}
                                        slotProps={{
                                            textField: {
                                                variant: "outlined", 
                                                size: "small", 
                                                fullWidth: true, 
                                                sx: {
                                                    fontSize: '0.875rem',
                                                    '& .MuiOutlinedInput-root': { borderRadius: '8px' },
                                                    '& .MuiInputLabel-root': {
                                                        fontWeight: 500,
                                                        color: '#6B7280',
                                                    },
                                                } 
                                            }
                                        }}
                                    />
                                </DemoItem>

                            </DemoContainer>
                        </LocalizationProvider>
                    </div>

                    <div className="mb-2">
                        <label className="block text-gray-500 text-sm font-bold mb-1">Descripción</label>
                        <textarea
                            placeholder="Escribe algo..."
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                            className="w-full text-gray-600 focus:outline-none focus:border focus:border-sky-300 font-normal p-3 text-sm border-gray-300 rounded border resize-none h-24"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-500 text-sm font-bold mb-2">Color del evento</label>
                        <div className="flex items-center">
                            <input
                                type="color"
                                value={colorEtiqueta}
                                onChange={(e) => setColorEtiqueta(e.target.value)}
                                className="w-20 h-10 p-0 border border-gray-300 rounded cursor-pointer mr-3"
                            />
                            <span className="text-sm text-gray-600">{colorEtiqueta}</span>
                        </div>
                    </div>

                    <button className="ml-0 rounded-md bg-green-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-300"
                        onClick={guardar}> Guardar 
                    </button>

                    <button className="ml-6 rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-300"
                        onClick={cancelar}> Cancelar 
                    </button>

                </div>
            </div>
        </div>
        
        </>
    );
}

export default ModalModificarEvento;    
