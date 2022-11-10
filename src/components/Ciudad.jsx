import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import axios from "axios";

import useClima from "../hooks/useClima";
import Widget from "./Widget";

const Contenedor = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;

    @media (max-width: 768px){
        grid-template-columns: repeat(1, 1fr);
    }
`

const Ciudad = () => {

    const {ciudadesGuardadas} = useClima();

    // *Estado para guardar las peticiones de las ciudades guardadas
    const [datosCiudades, setDatosCiudades] = useState([]);

    useEffect(()=>{

        const buscarCiudades = async ()=>{

            let noCiudades = ciudadesGuardadas.length;
            let indexCiudad = 0;
            let arregloCiudades = [];

            try {
                
                while(indexCiudad < noCiudades){

                    const lugar = ciudadesGuardadas[indexCiudad];
                    const {ciudad, codigo} = lugar;

                    const url = `http://api.weatherbit.io/v2.0/current?city=${ciudad}&country=${codigo}&lang=es&key=${import.meta.env.VITE_API_KEY}`;

                    const {data: {data: resultado}} = await axios(url);

                    resultado[0].id = ciudadesGuardadas[indexCiudad].id;

                    arregloCiudades = [...arregloCiudades, resultado[0]];
                    indexCiudad++;
                }
                
                setDatosCiudades(arregloCiudades);

            } catch (error) {
                console.log(error);
            }
        }

        buscarCiudades();

    }, [ciudadesGuardadas]);

    return (
        <Contenedor>
            {datosCiudades.map((ciudad, index) => (
                <Widget
                    key={ciudad.city_name}
                    temperatura={ciudad.temp}
                    zona={ciudad.timezone}
                    humedad={ciudad.rh}
                    viento={ciudad.wind_cdir_full}
                    velocidad={ciudad.wind_spd}
                    icono={ciudad.weather.icon}
                    ciudad={ciudad.city_name}
                    posicion={index}
                    id={ciudad.id}
                />
            ))}
        </Contenedor>
    )
}

export default Ciudad