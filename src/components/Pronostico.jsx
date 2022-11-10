import styled from "@emotion/styled";
import useClima from "../hooks/useClima";

import diaSemana from "../helpers/diaSemana";

const Caja = styled.div`
    width: 100%;
    height: 130px;
    background: white;
    border-radius: 10px;
    text-align: center;
    padding: 10px;
    cursor: pointer;

    @media (max-width: 768px) {
        min-width: 90px;
    }

    .dia{
        color: #666666;
        font-size: 14px;
    }

    figure{
        width: 50px;
        height: 50px;
        margin: 10px auto;
    }

    .temp{

        margin-top: 15px;
        font-size: 14px;
        color: #4c5cbb;
        font-weight: 700;

        span{
            font-weight: 400;
            color: #666666;
        }
    }
`

const Pronostico = ({dia, posicion, maxTemp, minTemp, icono}) => {

    const {setPronosticos} = useClima();

    const diaElegido = e=>{
        
        let elemento = e.target;

        while(!elemento.classList.contains('caja')){
            elemento = elemento.parentNode;
        }

        setPronosticos(Number(elemento.dataset.posicion));
    }

    return (
        <Caja
            className="caja" 
            data-posicion={posicion}
            onClick={e => diaElegido(e)}
        >
            <p className="dia">{diaSemana(dia)}</p>
            <figure>
                <img src={`/iconos/${icono}.svg`} alt="" />
            </figure>
            <p className="temp">
                {maxTemp}/<span>{minTemp}</span>
            </p>
        </Caja>
    )
}

export default Pronostico