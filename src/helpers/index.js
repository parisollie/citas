
export const formatearFecha = fecha => {
    //Vid 100 
    //Vid 112
    const nuevaFecha = new Date(fecha)
    const opciones = {
        weekday: 'long',
        year: 'numeric', 
        month: 'long',
        day: 'numeric'
    }

    //Vid 100, ponemos la fecha en español.
    return nuevaFecha.toLocaleDateString('es-ES', opciones)
}