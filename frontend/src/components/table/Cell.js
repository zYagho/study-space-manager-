import styles from './Cell.module.css'

function Cell({ hours, roomIndex, reservas, currentDateDay }) {

    let reserva = null

    const getReserva = (hourIndex) => {
        reserva = reservas.find((res) => res.roomIndex === roomIndex && res.hourIndex === hourIndex && res.dateDay === currentDateDay)
        return reserva
    }

    function onSelectCell(hour) {
        alert(`Sala ${roomIndex} e horário ${hour.horaInicio} - ${hour.horaFim}`)
    }

    return (
        <>
            {hours.map((hour, index) => (
                <td key={hour.id} className={styles.cell} onClick={() => onSelectCell(hour)}>
                    {getReserva(index) && (
                        <>Reservado</>
                    )}
                </td>
            ))}
        </>
    )
}

export default Cell