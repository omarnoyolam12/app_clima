import { useEffect, useState} from "react";
import styled from "@emotion/styled";
import useClima from "../hooks/useClima";

import formatearFecha from "../helpers/formatearFecha";

const Contenedor = styled.div`
    margin-top: 30px;
    font-family: 'Roboto', sans-serif;
`

const Figure = styled.figure`
    width: 180px;
    height: 180px;
    margin: 0 auto;
`

const Temperatura = styled.p`
    font-weight: 300;
    margin: 30px 0;
    font-size: 62px;
    color: #4c5cbb;
    text-align: center;
`

const Fecha = styled.p`
    color: #666666;
    border-bottom: 1px solid #c5c5c5;
    padding-bottom: 20px;
`

const Weather = styled.div`
    margin-top: 20px;
    display: flex;
    align-items: center;
    gap: 20px;
`

const Datos = styled.p`
    color: #666666;
`

const TiempoActual = () => {

    // *Extraer datos del clima
    const {climaActual} = useClima();

    // *Datos actuales del clima
    const {temp, fecha, nubes, lluvia} = climaActual;

    // *Día de hoy
    const [diaSemana, setDiaSemana] = useState('');

    // *Función para recuperar el día de la semana
    useEffect(()=>{
        const diaSemana = ()=>{
            const fechaA = fecha.split(' ')[0];
            const nuevoDia = new Date(fechaA);

            const hoy = formatearFecha(nuevoDia);
            setDiaSemana(hoy);
        }

        diaSemana();
    }, [climaActual]);

    return (
        <Contenedor>
            <Figure>
                <img src={`/iconos/${nubes.icon}.svg`} alt={nubes.description} />
            </Figure>
            <Temperatura>{temp}<sup>°C</sup></Temperatura>
            <Fecha>{diaSemana}</Fecha>

            <Weather>
                <i className='bx bxs-cloud' ></i>
                <Datos>{climaActual.nubes.description}</Datos>
            </Weather>
            <Weather>
                <i className='bx bx-cloud-rain'></i>
                <Datos>Lluvia: {climaActual.lluvia}%</Datos>
            </Weather>
        </Contenedor>
    )
}

export default TiempoActual