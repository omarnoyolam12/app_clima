import styled from "@emotion/styled";
import useClima from "../hooks/useClima";

import Buscador from "./Buscador";

const Contenedor = styled.div`
    width: 100%;
    height: 100vh;
    background: #f2f2f2;
    position: relative;
    font-family: 'Roboto', sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 5%;
    transition: all .3s ease-in-out;
`

const Wave = styled.div`
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 0;
`

const Svg = styled.svg`
    width: 100%;
    height: 100%;
`
const Path = styled.path`
    stroke: none;
    fill: white;
    filter: drop-shadow(1px 1px 2px #0000007a);
`

const Modal = styled.div`
    z-index: 1;
    text-align: center;
`

const H2 = styled.h2`
    font-size: 42px;
    font-weight: 400;
    color: #4c5cbb;
`

const Parrafo = styled.p`
    color: #666666;
    font-weight: 300;
`

const Caja = styled.div`
    margin-top: 20px;
`


const ModalInicio = () => {

    const {transicionModal} = useClima();

    return (
        <Contenedor className={transicionModal && 'ocultarContenedor'}>
            <Wave><Svg viewBox="0 0 500 150" preserveAspectRatio="none"><Path d="M213.60,-1.45 C292.61,33.06 292.61,117.94 213.60,151.48 L500.00,150.00 L500.00,0.00 Z"></Path></Svg>
            </Wave>
            <Modal>
                <H2>App Clima</H2>

                <Caja>
                    <Parrafo>Busca tu ciudad y conoce el pronostico del tiempo.</Parrafo>
                    <Parrafo>Obten 6 días con los datos más relevantes.</Parrafo>
                </Caja>

                <Caja>
                    <Buscador/>
                </Caja>
            </Modal>
        </Contenedor>
    )
}

export default ModalInicio