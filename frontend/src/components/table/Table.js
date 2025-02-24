import styles from './Table.module.css'

import Cell from './Cell'
import SeletorDeDias from './SeletorDeDias'

import { useState, useEffect } from 'react'

function Table({ hours, rooms, isLoadingRooms }) {

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

    // TODO get Reservas from backend
    const [ reservas, setReservas ] = useState([])

    useEffect(() => {

        const userToken = JSON.parse(localStorage.getItem('user_token')).token
        const reserveDayFormatted = { reserveDay: `${year}-${month}-${day}` }

        async function getReservas() {
            try {
                const response = fetch('http://localhost:3333/reserveroomtime', {
                    method: 'GET',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(reserveDayFormatted)
                })

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'Erro ao buscar as reservas')
                }

                const data = await response.json()
                setReservas(data)

            } catch (err) {
                console.log(err)
            }
        }

        getReservas()

    }, [])


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
                            currentDateDay={currentDate.getDate()}
                            />
                        </>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default Table