import useClima from "../hooks/useClima";
import styled from "@emotion/styled";

const Caja = styled.div`
    width: 100%;
    height: 140px;
    border-radius: 10px;
    background: white;
    overflow: hidden;
    box-shadow: 4px 5px 11px -3px rgba(0,0,0,0.2);
    position: relative;

    i{
        position: absolute;
        font-size: 24px;
        cursor: pointer;

        &.bx-star, &.bxs-star{
            right: 10px;
            top: 10px;
            color: #a4b2ff;
        }

        &.bxs-trash{
            right: 10px;
            top: 40px;
            color: #ffa7a7;
        }
        
    }

    .superior{
        display: flex;
        align-items: center;
        gap: 20px;

        figure{
            width: 100px;
            height: 100px;
            padding: 20px;
            background: #cfd7ff;
            border-radius: 10px;
        }

        .ciudad{

            p{
                color: #666666; 
            }

            .temperatura{
                p{
                    font-size: 32px;

                    sup{
                        color: #4c5cbb;
                        font-size: 18px;
                    }
                }
            }

            .lugar{
                
                .zona{
                    font-weight: 300;
                }
            }
        }
    }

    .inferior{
        margin-top: 10px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        
        p{
            color: #666666;
            font-weight: 300;
        }
    }
`

const Widget = ({temperatura, zona, humedad, viento, velocidad, icono, ciudad, posicion, id}) => {

    const {favorita, setFavorita, eliminarCiudad} = useClima();

    return (
        <Caja>
            <div className="superior">
                <figure>
                    <img src={`/iconos/${icono}.svg`} alt="" />
                </figure>

                <div className="ciudad">
                    <div className="temperatura">
                        <p>{temperatura}<sup>°C</sup> </p>
                    </div>

                    <div className="lugar">
                        <p>{ciudad}</p>
                        <p className="zona">{zona}</p>
                    </div>
                </div>
                
            </div>

            <div className="inferior">
                <p>Humedad {humedad}%</p>
                <p>{viento}</p>
                <p>{velocidad.toFixed(2)}m/s</p>
            </div>

            <i 
                className={`bx ${favorita == posicion ? 'bxs-star' : 'bx-star'}`}
                data-posicion={posicion}
                onClick={e => setFavorita(Number(e.target.dataset.posicion))}
            ></i>

            <i 
                className='bx bxs-trash'
                data-id={id}
                onClick={() => eliminarCiudad(id)}
            ></i>
        </Caja>
    )
}

export default Widget