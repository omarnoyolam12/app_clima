import styled from "@emotion/styled";

import Buscador from "./Buscador";
import TiempoActual from "./TiempoActual";
import GuardadCiudad from "./GuardadCiudad";

const Contenedor = styled.div`
    grid-column: 1/3;
    padding: 40px;

    @media (max-width: 1100px) {
        grid-column: 1/2;
    }
`

const BarraPrincipal = () => {



    return (
        <Contenedor>
            <Buscador/>
            <TiempoActual/>
            <GuardadCiudad/>
        </Contenedor>
    )
}

export default BarraPrincipal
