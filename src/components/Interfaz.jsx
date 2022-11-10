import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import useClima from "../hooks/useClima";

import BarraPrincipal from "./BarraPrincipal";
import DatosCiudad from "./DatosCiudad";

const ContenedorApp = styled.div`
    font-family: 'Roboto', sans-serif;
    width: 100%;
    height: 100vh;
    background: #C9CCD3;
    background-image: linear-gradient(-180deg, rgba(255,255,255,0.50) 0%, rgba(0,0,0,0.50) 100%);
    background-blend-mode: lighten;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all .3s ease-in-out;

    @media (max-width: 1100px) {
        display: block;
        padding: 40px 0;
        min-height: 100vh;
        height: auto;
    }
`

const Display = styled.div`
    width: 90%;
    max-width: 1200px;
    height: 720px;
    background: white;
    border-radius: 40px;
    overflow: hidden;
    display: grid;
    grid-template-columns: repeat(7, 1fr);

    @media (max-width: 1100px) {
        margin: 0 auto;
        grid-template-columns: repeat(1, 1fr);
        height: auto;
    }
`

const Interfaz = () => {

    const [entrada, setEntrada] = useState(false);

    useEffect(()=>{
        setEntrada(true);
    }, []);

    return (
        <ContenedorApp className={entrada && `verContenedor`}>
            <Display>
                <BarraPrincipal></BarraPrincipal>
                <DatosCiudad></DatosCiudad>
            </Display>
        </ContenedorApp>
    )
}

export default Interfaz