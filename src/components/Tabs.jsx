import { useState } from "react";
import styled from "@emotion/styled";

const Navegacion = styled.nav`
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 40px;

    p{
        color: #d1d1d1;
        font-size: 24px;
        padding: 10px;
        cursor: pointer;
        transition: all .2s ease-in-out;

        &.activo{
            font-weight: 500;
            color: #4c5cbb;
            border-bottom: 2px solid #4c5cbb;
        }
    }
`

const Tabs = ({visualizar, setVisualizar}) => {

    return (
        <Navegacion>
            <p 
                className={visualizar == 1 ? 'activo' : ''}
                data-tab='1'
                onClick={e => setVisualizar(e.target.dataset.tab)}
            >
                Tiempo
            </p>
            <p 
                className={visualizar == 2 ? 'activo' : ''}
                data-tab='2'
                onClick={e => setVisualizar(e.target.dataset.tab)}
            >
                Ciudades Guardadas
            </p>
        </Navegacion>
    )
}

export default Tabs