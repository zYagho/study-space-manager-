import styles from './Table.module.css'

import Cell from './Cell'
import SeletorDeDias from './SeletorDeDias'

import { useState, useEffect } from 'react'

function Table({ hours, rooms, isLoadingRooms }) {

    const [userEmail, setUserEmail] = useState('')
    
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
    const [ reservas, setReservas ] = useState([])
    let reserveDayFormatted = `${year}-${month}-${day}`

    useEffect(() => {

        async function getReservas() {
            try {
                const response = await fetch('http://localhost:3333/reserveroomtimes', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({ "reserveDay": [reserveDayFormatted]})
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

    }, [reserveDayFormatted])

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
                    <tr key={room.number}>
                        <>
                            {!isLoadingRooms ? (
                                <th className={styles.salas_row} scope='row'>Sala {room.number}</th>
                            ):(
                                <th className={styles.salas_row_loading}></th>
                            )}
                            <Cell
                            hours={hours}
                            roomNumber={room.number}
                            reservas={reservas}
                            userEmail={userEmail}
                            />
                        </>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default Table