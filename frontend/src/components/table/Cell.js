import PropTypes from 'prop-types'

import styles from './Cell.module.css'

function Cell({ hours, roomIndex, reservas }) {

    function onCellClick(hour) {
        alert(`Sala ${roomIndex} e horário ${hour.horaInicio} - ${hour.horaFim}`)
    }

    let reserva = null
    const getReserva = (hourIndex) => {
        // TODO verificar data
        reserva = reservas.find((res) => res.roomIndex == roomIndex && res.hourIndex == hourIndex)
        return reserva
    }

    return (
        <>
            {hours.map((hour, index) => (
                <td key={hour.id} className={styles.cell} onClick={() => onCellClick(hour)}>
                    {getReserva(index) && (
                        <>Reservado</>
                    )}
                </td>
            ))}
        </>
    )
}

Cell.propTypes = {
    horas: PropTypes.array
}

export default Cell