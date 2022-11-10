import styled from "@emotion/styled";

import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';

import useClima from "../hooks/useClima";
import Pronostico from "./Pronostico";

import solSale from "../img/sol-sale.svg"
import solEntra from "../img/sol-entra.svg"

import obtenerHora from "../helpers/obtenerHora";
import porcentajeUV from "../helpers/indexUV";
import formatearFecha from "../helpers/formatearFecha";

const Contenedor = styled.div`
    width: 100%;
`

const Dias = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 10px;

    @media (max-width: 768px) {
        width: 100%;
        display: flex;
        overflow-x: auto;

        &::-webkit-scrollbar{
            opacity: 1;
            height: 5px;
        }

        &::-webkit-scrollbar-thumb{
            background: #666666;
            border-radius: 10px;
        }
    }
`

const Datos = styled.div`

    margin-top: 40px;
    
    h3{
        font-size: 24px;
        color: #5f69a1;
        font-weight: 400;
    }
`

const ContenedorInfo = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-top: 20px;

    @media (max-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
    }
    
    @media (max-width: 530px) {
        grid-template-columns: repeat(1, 1fr);
    }
`

const Cajas = styled.div`
    width: 100%;
    height: 160px;
    background: white;
    border-radius: 10px;
    padding: 20px;

    .grafica{
        margin: 10px auto;
        width: 80%;

        @media (max-width: 530px) {
            max-width: 170px;
        }
    }

    .info{
        font-size: 14px;
        color: #979797;
    }

    .numero{
        margin-top: 20px;
        font-size: 42px;
        color: #383838;

        span{
            font-size: 24px;
        }
    }

    .descrip{
        margin-top: 10px;
        display: flex;
        gap: 10px;
        align-items: center;

        p{
            color: #383838;
        }

        figure{
            width: 24px;
            height: 24px;
        }
    }

    .sol{

        margin-top: 20px;
        display: flex;
        align-items: center;
        gap: 10px;

        figure{
            width: 32px;
            height: 32px;
        }

        p{
            color: #383838;
        }
    }
`

const Tiempo = () => {

    const {datosClima, pronosticos} = useClima();
    const {datos} = datosClima;

    return (
        <Contenedor>
            <Dias>
                {datos.map((pronostico, index)=>(
                    <Pronostico
                        key={pronostico.datetime}
                        dia={pronostico.datetime}
                        posicion={index}
                        maxTemp={pronostico.max_temp}
                        minTemp={pronostico.min_temp}
                        icono={pronostico.weather.icon}
                    />
                ))}
            </Dias>

            <Datos>
                <h3>Datos {formatearFecha(datos[pronosticos].valid_date)}</h3>

                <ContenedorInfo>
                    <Cajas>
                        <p className="info">Indice UV</p>
                        <div className="grafica">
                            <CircularProgressbar 
                                value={porcentajeUV(datos[pronosticos].uv)} 
                                text={datos[pronosticos].uv}
                                circleRatio={.5}
                                styles={buildStyles({
                                    rotation: 0.75,
                                    textColor: '#383838',
                                    pathColor: '#ffc404',
                                })}
                            />
                        </div>
                        
                    </Cajas>

                    <Cajas>
                        <p className="info">Viento</p>
                        <p className="numero">
                            {datos[pronosticos].wind_spd}<span>m/s</span>
                        </p>
                        <div className="descrip">
                            <i className='bx bxs-compass'></i>
                            <p>{datos[pronosticos].wind_cdir_full}</p>
                        </div>
                    </Cajas>

                    <Cajas>
                        <p className="info">Amanecer y atardecer</p>
                        <div className="sol">
                            <figure>
                                <img src={solSale} alt="Salida sol" />
                            </figure>
                            <p>{obtenerHora(datos[pronosticos].sunrise_ts)} hrs.</p>
                        </div>
                        <div className="sol">
                            <figure>
                                <img src={solEntra} alt="Puesta sol" />
                            </figure>
                            <p>{obtenerHora(datos[pronosticos].sunset_ts)} hrs.</p>
                        </div>
                    </Cajas>

                    <Cajas>
                        <p className="info">Humedad</p>
                        <p className="numero">
                            {datos[pronosticos].rh}<span>%</span>
                        </p>
                    </Cajas>

                    <Cajas>
                        <p className="info">Visibilidad</p>
                        <p className="numero">
                            {datos[pronosticos].rh}<span>km</span>
                        </p>
                    </Cajas>

                    <Cajas>
                        <p className="info">Probabilidad de Lluvia</p>
                        <p className="numero">
                            {datos[pronosticos].pop}<span>%</span>
                        </p>
                        <div className="descrip">
                            <figure>
                                <img src={`/iconos/${datos[pronosticos].weather.icon}.svg`} alt="icono nube" />
                            </figure>
                            <p>{datos[pronosticos].weather.description}</p>
                        </div>
                    </Cajas>
                </ContenedorInfo>
            </Datos>
        </Contenedor>
    )
}

export default Tiempo