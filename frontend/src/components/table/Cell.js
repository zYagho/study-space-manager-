import styles from './Cell.module.css'

function Cell({ hours, roomNumber, reservas, currentDateDay }) {

    let reserva = null

    const getReserva = (hour) => {
        reserva = reservas.find((res) => {
            return res.room.number === roomNumber && res.horaInicio === hour.horaInicio && res.dateDay === currentDateDay
        })
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
                        <>Reservado</>
                    )}
                </td>
            ))}
        </>
    )
}

export default Cell