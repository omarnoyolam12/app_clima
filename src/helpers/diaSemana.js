const diaSemana = fecha=>{
    
    let dia;
    const fechaNueva = new Date(fecha);

    // *Arreglas el desface de la zona horaria
    fechaNueva.setMinutes(fechaNueva.getMinutes() + fechaNueva.getTimezoneOffset());


    switch(fechaNueva.getDay()){
        case 0: dia = 'Domingo' 
            break;
        case 1: dia = 'Lunes' 
            break;
        case 2: dia = 'Martes' 
            break;
        case 3: dia = 'Miércoles' 
            break;
        case 4: dia = 'Jueves' 
            break;
        case 5: dia = 'Viernes' 
            break;
        case 6: dia = 'Sábado' 
            break;
        default: break;
    }

    return dia
}

export default diaSemana;