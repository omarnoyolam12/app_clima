import { useState } from "react";
import styled from "@emotion/styled";

import Tiempo from "./Tiempo";
import CiudadesGuardadas from "./CiudadesGuardadas";

import Tabs from "./Tabs";

const Contenedor = styled.div`
    grid-column: 3/8;
    background: #f2f2f2;
    padding: 40px;

    @media (max-width: 1100px) {
        grid-column: 1/2;
        overflow: hidden;
    }
`

const DatosCiudad = () => {

    const [visualizar, setVisualizar] = useState(1);

    return (
        <Contenedor>
            <Tabs visualizar={visualizar} setVisualizar={setVisualizar}/>

            {visualizar == 1 ? <Tiempo/> : <CiudadesGuardadas/>}
        </Contenedor>
    )
}

export default DatosCiudad