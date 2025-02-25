import styles from './Row.module.css'

import { useState } from 'react'

function Row({ hours, roomNumber, reservas, userEmail }) {

    let status = 'LIVRE'

    const getReserva = (hour) => {
        const reserva = reservas.find((res) => res.room.number === roomNumber && res.time.horaInicio === hour.horaInicio)

        if (reserva) {
            
            if (!reserva.status) {
                status = 'LIVRE'
                return null
            }

            if (reserva.reserve.user.email === userEmail)
                status = 'SUA_RESERVA'
            else
                status = 'RESERVADO'
        } else {
            status = 'LIVRE'
        }

        return reserva
    }

    function onSelectCell(hour) {
        alert(`Sala ${roomNumber} e horário ${hour.horaInicio} - ${hour.horaFim}`)
    }

    return (
        <>
            {hours.map((hour) => {
                    const reserva = getReserva(hour)
                    return (
                            <td key={hour.id} className={`${styles.cell} ${styles[status]}`} onClick={() => onSelectCell(hour)}>
                                {reserva && (
                                    <>{String(reserva.reserve.user.name).split(' ', 1)}</>
                                )}
                            </td>
                    )
            })}
        </>
    )
}

export default Row