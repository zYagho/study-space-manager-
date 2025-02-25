import styles from './Table.module.css'

import { useState, useEffect } from 'react'

import SeletorDeDias from './SeletorDeDias'
import Cell from './Cell'


function Table({ hours, rooms, isLoadingRooms }) {

    const [userEmail, setUserEmail] = useState('')
    const [selectedReserve, setSelectedReserve] = useState()
    const [reservas, setReservas] = useState([])

    // Define o dia
    const weekDays = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado']
    const [currentDate, setCurrentDate] = useState(new Date())

    const day = String(currentDate.getDate()).padStart(2, '0')
    const month = String(currentDate.getMonth() + 1).padStart(2, '0')
    const year = currentDate.getFullYear()
    const currentDateFormatted = `${day}/${month}/${year}`

    function alternateDays(direction) {
        const newDate = new Date(currentDate)
        newDate.setDate(currentDate.getDate() + direction)
        setCurrentDate(newDate)
    }

    // Lista as reservas
    let dateFormatToRequestReservas = `${year}-${month}-${day}`

    useEffect(() => {

        async function getReservas() {
            try {
                const response = await fetch('http://localhost:3333/reserveroomtimes', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({ "reserveDay": [dateFormatToRequestReservas]})
                })

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'Erro ao buscar as reservas')
                }

                const data = await response.json()
                setReservas(data)

            } catch (err) {
                console.error(err)
            }
        }

        getReservas()

        const currentUser = localStorage.getItem('user_token')
        if (currentUser)
            setUserEmail(JSON.parse(currentUser).email)

    }, [dateFormatToRequestReservas])

    if (selectedReserve)
        console.log(`Reserva selecionad ${selectedReserve.room.number}, ${selectedReserve.hour.horaInicio}, ${selectedReserve.currentDateDay}`)

    return (
        <table className={styles.table}>
            <caption>
                <SeletorDeDias
                alternateDays={alternateDays}
                weekDays={weekDays}
                currentDateFormatted={currentDateFormatted}
                currentDate={currentDate}
                />
            </caption>
            <thead>
                <tr>
                    <th scope='col'>Horários</th>
                    {hours.map((h) => (
                        <th key={h.id} cope='col'>{h.horaInicio} - {h.horaFim}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {rooms.map((room) => (
                    <tr key={room.id}>
                        <>
                            {!isLoadingRooms ? (
                                <th key={`${room.id}${room.number}`} className={styles.salas_row} scope='row'>Sala {room.number}</th>
                            ):(
                                <th key={`${room.id}${room.number}`} className={styles.salas_row_loading}></th>
                            )}
                            <>
                                {hours.map((hour) => {
                                    return (
                                        <Cell
                                        key={`${room.id}${hour.id}`}
                                        room={room}
                                        hour={hour}
                                        reservas={reservas}
                                        userEmail={userEmail}
                                        handleSetSelectedReserve={setSelectedReserve}
                                        currentDateDay={currentDate.getDate()}
                                        />
                                    )
                                })}
                            </>
                        </>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default Table