import { createContext, useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const ClimaContext = createContext();

const ClimaProvider = ({children})=>{

    // *Estado para visualizar el modal del entrada
    const [verModal, setVerModal] = useState(true);

    // *Estado para animar la salida del modal
    const [transicionModal, setTransicionModal] = useState(false);

    // *Estado que guarda el valor que se escribe en el input
    const [valorBusqueda, setValorBusqueda] = useState('');

    // *Estado del clima del día
    const [climaActual, setClimaActual] = useState({
        temp: '',
        fecha: '',
        nubes: {},
        lluvia: ''
    });

    // *Estado del clima en la ciudad buscada
    const [datosClima, setDatosClima] = useState({
        ciudad: '',
        codigo: '',
        datos: []
    });

    // *Estado para viusalizar los datos del dia
    const [pronosticos, setPronosticos] = useState(0);

    // *Estado de ciudades guardadas en la app
    const [ciudadesGuardadas, setCiudadesGuardadas] = useState(
        localStorage.getItem('ciudades') ? JSON.parse(localStorage.getItem('ciudades')) : []
    );

    // *Estado para guardar ciudad favorita
    const [favorita, setFavorita] = useState(null);


    // *Eliminar ciudad
    const eliminarCiudad = id =>{

        Swal.fire({
            title: 'Deseas eliminar la ciudad?',
            text: "Este cambio no se puede revertir!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Si, eliminar!'
        }).then((result) => {
            if (result.isConfirmed) {

                const ciudadesActualizadas = ciudadesGuardadas.filter(ciudadGuardada => ciudadGuardada.id !== id);

                setCiudadesGuardadas(ciudadesActualizadas);

                return Swal.fire(
                    'Eliminada!',
                    'La ciudad ha sido eliminada.',
                    'success'
                )
            }
        });
    }

    // *Efect para realizar la animación
    useEffect(()=>{

        if(transicionModal){
            setTimeout(()=>{
                setVerModal(false);
            }, 500);
        }

    }, [transicionModal]);
    
    // *Función para buscar una ciudad
    const buscarCiudad = async e =>{
        e.preventDefault();

        const busqueda = valorBusqueda.split(', ');
        
        if(busqueda.length != 2){
            return Swal.fire({
                icon: 'info',
                title: 'Busca el clima de tu ciudad',
                text: 'Ejemplo: Ecatepec, Mexico',
            });
        }

        try {
            const ciudad = busqueda[0].replace(/\s+/g, '+');
            const pais = busqueda[1].replace(/\s+/g, '+');

            const urlActual = `https://api.weatherbit.io/v2.0/current?city=${ciudad},${pais}&lang=es&key=${import.meta.env.VITE_API_KEY}`

            const urlPronosticos =`https://api.weatherbit.io/v2.0/forecast/daily?city=${ciudad},${pais}&lang=es&key=${import.meta.env.VITE_API_KEY}`

            const [actual, pronostico] = await Promise.all([
                axios(urlActual),
                axios(urlPronosticos)
            ]);

            if(actual.status == 204){
                return Swal.fire({
                    icon: 'error',
                    title: 'No se encontro la ciudad solicitada',
                    html: 
                        '<p>No utilices acentos</p>'+
                        '<p>Puedes intentar con el código del país deseado</p>'+
                        '<p>Ejemplo: Madrid, ES</p>',
                    footer: '<a href="http://utils.mucattu.com/iso_3166-1.html" target="_blank">Obten el código del páis</a>'
                });
            }

            const {data: {data: clima}} = actual;
            const {data: pronosticos} = pronostico;

            setClimaActual({
                temp: clima[0].temp,
                fecha: clima[0].ob_time,
                nubes: clima[0].weather,
                lluvia: clima[0].precip
            });

            setDatosClima({
                ciudad: pronosticos.city_name,
                codigo: pronosticos.country_code,
                datos: pronosticos.data
            });

            setTransicionModal(true);

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <ClimaContext.Provider
            value={{
                verModal,
                transicionModal,
                valorBusqueda,
                setValorBusqueda,
                buscarCiudad,
                datosClima,
                climaActual,
                pronosticos,
                setPronosticos,
                ciudadesGuardadas,
                setCiudadesGuardadas,
                setFavorita,
                favorita,
                eliminarCiudad
            }}
        >
            {children}
        </ClimaContext.Provider>
    )
}

export {
    ClimaProvider
}

export default ClimaContext;