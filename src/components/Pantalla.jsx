import useClima from "../hooks/useClima";

import ModalInicio from "./ModalInicio";
import Interfaz from "./Interfaz";
import { useEffect } from "react";



const Pantalla = () => {

    const {verModal} = useClima();

    return (
        <>
            {verModal ? <ModalInicio/> : <Interfaz/> }
        </>
    )
}

export default Pantalla