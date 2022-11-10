import styled from "@emotion/styled";

import useClima from "../hooks/useClima";

const Formulario = styled.form`
    display: flex;
    align-items: center;
    position: relative;
    width: 100%;
`

const InputTexto = styled.input`
    width: 100%;
    height: 30px;
    border: none;
    outline: none;
    color: #505050;
    padding: 20px 10px;
    border-radius: 40px;

    &:focus{
        background: #f7f7f7;
    }
`

const BotonBuscar = styled.button`
    width: 30px;
    height: 30px;
    border: none;
    border-radius: 50%;
    background: #f7f7f7;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    position: absolute;
    right: 0;
    top: calc(50% - (30px / 2));
`

const Buscador = () => {

    const {valorBusqueda, setValorBusqueda, buscarCiudad} = useClima();

    return (
        <Formulario
            onSubmit={buscarCiudad}
        >
            <InputTexto
                type="text"
                name="ciudad"
                placeholder="Buscar ciudad..."
                onChange={e => setValorBusqueda(e.target.value)}
                value={valorBusqueda}
            />
            <BotonBuscar 
                type="submit"
            >
                <i className='bx bx-current-location'></i>
            </BotonBuscar>
        </Formulario>
    )
}

export default Buscador