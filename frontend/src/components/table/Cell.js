import { useEffect, useRef, useState } from 'react'
import styles from './Cell.module.css'

function Cell({ customKey, room, hour, reservas, userEmail, handleSetSelectedReserve, currentDate }) {

    const [selected, setSelected] = useState()
    const cellRef = useRef(null)
    let status = 'LIVRE'

    let reserva = reservas.find((res) => res.room.id === room.id && res.time.horaInicio === hour.horaInicio)

    if (reserva) {
        if (!reserva.status) {
            status = 'LIVRE'
            reserva = null
        }

        if (reserva.reserve.user.email === userEmail)
            status = 'SUA_RESERVA'
        else
            status = 'RESERVADO'
    } else {
        status = 'LIVRE'
    }

    function onSelect() {

        // checar se status está livre
        if (status !== 'LIVRE') {
            if (status === 'SUA_RESERVA') {
                handleSetSelectedReserve({ room, hour, currentDate, reserva })
                return
            } else if (status === 'RESERVADO'){
                alert('Esta sala e horário já foi reservado por outra pessoa')
                return
            }
            alert('Esta sala e horário estão bugados')
        }

        // checar dia atual
        const today = new Date()
        if (currentDate.getDate() < today.getDate()) {
            alert('Não há como reservar salas no passado')
            return
        }

        // checar hora atual

        handleSetSelectedReserve({ room, hour, currentDate, reserva: null })
        setSelected(true)
    }

    // Criado pelo Gemini - Descolorir a célula ao clicar fora dela
    useEffect(() => {
        function handleClickOutside(event) {
            if (cellRef.current && !cellRef.current.contains(event.target)) {
                setSelected(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [cellRef]);

    return (
        <td ref={cellRef} key={customKey} className={`${styles.cell} ${selected ? styles.SELECTED : styles[status]}`} onClick={onSelect}>
            {reserva && (
                <>{String(reserva.reserve.user.name).split(' ', 1)}</>
            )}
        </td>
    )
}

export default Cell