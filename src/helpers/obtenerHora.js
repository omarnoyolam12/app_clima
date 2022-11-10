const obtenerHora = fecha=>{
    
    const unix = fecha * 1000;
    const fechaNueva = new Date(unix);

    const hora = `${fechaNueva.getHours()}:${fechaNueva.getMinutes()}`;

    return hora;
}

export default obtenerHora;