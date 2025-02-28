import { useContext, useEffect, useState } from 'react'
import { SidebarContext } from '../context/SidebarContext'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/menu/Sidebar'

import styles from './SalaDeEstudos.module.css'
import Table from '../components/table/Table'
import ResumoDeReserva from '../components/table/ResumoDeReserva'

function SalaDeEstudos() {

    const { isSidebarOpen } = useContext(SidebarContext)
    const [isLoadingRooms, setIsLoadingRooms ] = useState(true)
    const [rooms, setRooms ] = useState([])
    const [hours, setHours] = useState([])  
    const [selectedReserve, setSelectedReserve] = useState()
    const [user, setUser] = useState()
    const [error, setError] = useState()
    const navigate = useNavigate()

    useEffect(() => {

        const userToken = JSON.parse(localStorage.getItem('user_token'))
        if (userToken)
            setUser(userToken)

        async function getHours() {
            try {
                const response = await fetch('http://localhost:3333/time', {
                    method: 'GET',
                    headers: {
                        'content_type': 'application/json'
                    }
                })

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'Erro ao buscar os horários')
                }

                const data = await response.json()
                setHours(data)

            } catch (e) {
                console.error(e)
            }
        }

        async function getRooms() {
            try {
                const response = await fetch('http://localhost:3333/room', {
                    method: 'GET',
                    headers: {
                        'content_type': 'application/json'
                    }
                })

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'Erro ao buscar as salas');
                }

                const data = await response.json()
                setRooms(data)

            } catch (e) {
                console.error(e.message)
            } finally {
                setIsLoadingRooms(false)
            }
        }

        getRooms()
        getHours()

    }, [])

    // ALERTA DE GAMBIARRAS
    async function makeReservation() {

        if (!user) {
            alert('Faça login para reservar uma sala')
            navigate('/login')
        }

        // gambiarra da API do Yagho
        try {
            const objectEmail = { userEmail: user.email }
            const firstResponse = await fetch('http://localhost:3333/reserve', {
                method: 'POST',
                headers: {
                    'content-Type': 'application/json',
                    'authorization': `bearer ${user.token}`
                },
                body: JSON.stringify(objectEmail)
            });
    
            if (!firstResponse.ok) {
                const errorData = await firstResponse.json();
                throw new Error(errorData.error || 'Erro ao criar reserva');
            }

            const firstData = await firstResponse.json();
            console.log(firstData)

            // gambiarra minha por não ter criado um context API para formatar a string da data
            const reserveDay = selectedReserve.currentDate
            const day = String(reserveDay.getDate()).padStart(2, '0')
            const month = String(reserveDay.getMonth() + 1).padStart(2, '0')
            const year = reserveDay.getFullYear()
            const reserveDayFormatted = `${year}-${month}-${day}`

            const body = {
                reserveID: firstData.id,
                timeID: selectedReserve.hour.id,
                roomID: selectedReserve.room.id,
                reserveDay: reserveDayFormatted
            }
            console.log(body)
            const secondResponse = await fetch('http://localhost:3333/reserveroomtime', {
                method: 'POST',
                headers: {
                    'content-Type': 'application/json',
                    'authorization': `bearer ${user.token}`
                },
                body: JSON.stringify(body)
            });
    
            if (!secondResponse.ok) {
                const errorData = await secondResponse.json();
                throw new Error(errorData.Error || 'Erro ao criar reserva da sala');
            }

            const secondData = await secondResponse.json();
            alert(`Sala ${secondData.room.number} no horário das ${secondData.time.horaInicio} às ${secondData.time.horaFim} reserado com sucesso!`)
            window.location.reload()

        } catch (e) {
            console.error(e.message)
            setError(e.message)
        }
    }

    function cancelReservation() {

        if (error)
            setError()
        
        if (selectedReserve.reserva) {

            const reserveId = { id: selectedReserve.reserva.id }

            fetch(`http://localhost:3333/reserveroomtime`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json',
                    'authorization': `bearer ${user.token}`
                },
                body: JSON.stringify(reserveId)
            })
            .then(resp => resp.json)
            .then((data) => {
                alert('Reserva cancelada!')
                window.location.reload()
                return
            })
            .catch(err => console.log('Error: ', err.message))
        }

        setSelectedReserve()
    }

    return (
        <div className={styles.sala_de_estudos}>
            <h2>Sala de estudos disponíveis</h2>
            <Table
            hours={hours}
            rooms={rooms}
            isLoadingRooms={isLoadingRooms}
            handleSetSelectedReserve={setSelectedReserve}
            />
            <ResumoDeReserva
            hasSelectedReserve={selectedReserve}
            handleMakeReservation={makeReservation}
            handleCancelReservation={cancelReservation}
            error={error}
            />
            {isSidebarOpen && (
                <Sidebar />
            )}
        </div>
    )
}

export default SalaDeEstudos