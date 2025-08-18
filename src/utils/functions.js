
export const formatDate = (fechaStr)=>{
    const formatted = new Date(fechaStr).toLocaleDateString("es-MX", {
        timeZone: "America/Mexico_City",
    });
    // 1. Separar la fecha
    const [dia, mes, anio] = formatted.split("/");
    
    // 2. Crear el objeto Date (ojo: los meses en JS van de 0 a 11)
    const fecha = new Date(anio, mes - 1, dia);
    
    // 3. Formatear con Intl.DateTimeFormat
    const formateador = new Intl.DateTimeFormat("es-MX", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
    
    return formateador.format(fecha);
}


export const formatedCardDate = (fecha)=>{
    return new Date(fecha).toLocaleDateString("es-MX", {
  timeZone: "America/Mexico_City",
});
}