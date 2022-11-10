import styled from "@emotion/styled";

import Ciudad from "./Ciudad";
import useClima from "../hooks/useClima";

const Contenedor = styled.div`
    p{
        color: #5f69a1;
    }
`

const CiudadesGuardadas = () => {

    const {ciudadesGuardadas} = useClima();

    return (
        <Contenedor>
            {ciudadesGuardadas.length > 0 ? 
                <Ciudad/>
                :
                <p>No hay ciudades guardadas</p>
            }
        </Contenedor>
    )
}

export default CiudadesGuardadas