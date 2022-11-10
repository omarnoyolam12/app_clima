import { useEffect } from "react";
import styled from "@emotion/styled";
import Swal from "sweetalert2";
import useClima from "../hooks/useClima";
import ciudad from "../img/ciudad.jpg";
import generarID from "../helpers/generarId";

const Contenedor = styled.figure`
    margin-top: 20px;
    width: 100%;
    height: 100px;
    border-radius: 20px;
    overflow: hidden;
    position: relative;
    background-image: linear-gradient(to top, #fbc2eba0 0%, #a6c1eea0 100%), url(${ciudad});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    transition: all .3s ease-in-out;

    div{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;

        p{
            font-weight: 700;
        }
    }

    .addCiudad{
        background: #4c5cbb;
        z-index: 1;
        gap: 10px;
        opacity: 0;
        cursor: pointer;
        transition: all .3s ease-in-out;
        position: absolute;
        left: 0;
        top: 0;

        i{
            font-size: 24px;
        }
    }

    &:hover{

        .addCiudad{
            opacity: 1;
        }
    }
`

const GuardadCiudad = () => {

    const {datosClima, ciudadesGuardadas, setCiudadesGuardadas} = useClima();
    const {ciudad, codigo} = datosClima;

    // *Guardar en local Storage
    useEffect(()=>{
        localStorage.setItem('ciudades', JSON.stringify(ciudadesGuardadas) ?? []);
    }, [ciudadesGuardadas]);

    const guardarCiudad = ()=>{

        // *Evitar Guardar una ciudad 2 veces
        const existeCiudad = ciudadesGuardadas.filter(ciudadGuardada => ciudadGuardada.ciudad == ciudad);

        if(existeCiudad.length > 0){
            return Swal.fire({
                icon: 'info',
                text: 'La ciudad ha sido añadida anteriormente'
            });
        }

        const ciudadNueva = {
            ciudad,
            codigo,
            id: generarID()
        }

        setCiudadesGuardadas([...ciudadesGuardadas, ciudadNueva]);

        return Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Ciudad Guardada Correctamente',
            showConfirmButton: false,
            timer: 3000
        });
    }

    return (
        <Contenedor>
            <div className="addCiudad" onClick={guardarCiudad}>
                <i className='bx bxs-add-to-queue' ></i>
                <p>
                    Guardar Ciudad
                </p>
            </div>

            <div>
                <p>{ciudad}</p>
            </div>
        </Contenedor>
    )
}

export default GuardadCiudad