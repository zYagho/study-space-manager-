import styles from './Cell.module.css'

function Cell({ hours, roomNumber, reservas, currentDateDay }) {

    let reserva = null

    const getReserva = (hour) => {
        reserva = reservas.find((res) => res.room.number === roomNumber && res.time.horaInicio === hour.horaInicio)
        return reserva
    }

    function onSelectCell(hour) {
        alert(`Sala ${roomNumber} e horário ${hour.horaInicio} - ${hour.horaFim}`)
    }

    return (
        <>
            {hours.map((hour) => (
                <td key={hour.id} className={styles.cell} onClick={() => onSelectCell(hour)}>
                    {getReserva(hour) && (
                        <>{String(reserva.reserve.user.name).split(' ', 1)}</>
                    )}
                </td>
            ))}
        </>
    )
}

export default Cell