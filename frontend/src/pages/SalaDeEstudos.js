import { useContext, useEffect, useState } from 'react'
import { SidebarContext } from '../context/SidebarContext'
import Sidebar from '../components/menu/Sidebar'

import styles from './SalaDeEstudos.module.css'
import Table from '../components/table/Table'
import SalasDoUsuario from '../components/table/SalasDoUsuario'
import ResumoDeReserva from '../components/table/ResumoDeReserva'

function SalaDeEstudos() {

    const { isSidebarOpen } = useContext(SidebarContext)
    const [isLoadingRooms, setIsLoadingRooms ] = useState(true)
    const [isLoadingHours, setIsLoadingHours] = useState(true)
    const [rooms, setRooms ] = useState([])
    const [hours, setHours] = useState([])

    // TESTE reservas
    const reservas = [
        { dateDay: 24, roomIndex: 0, hourIndex: 0},
        { dateDay: 24, roomIndex: 0, hourIndex: 1},
        { dateDay: 24, roomIndex: 0, hourIndex: 2},
        { dateDay: 24, roomIndex: 0, hourIndex: 3},
        { dateDay: 24, roomIndex: 0, hourIndex: 4},
        { dateDay: 24, roomIndex: 1, hourIndex: 5},
        { dateDay: 24, roomIndex: 1, hourIndex: 6},
        { dateDay: 24, roomIndex: 1, hourIndex: 7},
        { dateDay: 25, roomIndex: 3, hourIndex: 5},
        { dateDay: 25, roomIndex: 3, hourIndex: 6},
        { dateDay: 25, roomIndex: 3, hourIndex: 7},
    ] 

    // verificar se existe um token logado
    // verificar se o token ainda é válido    

    useEffect(() => {
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
            } finally {
                setIsLoadingHours(false)
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

    return (
        <div className={styles.sala_de_estudos}>
            <SalasDoUsuario />
            <h2>Sala de estudos disponíveis</h2>
            <Table hours={hours} rooms={rooms} isLoadingRooms={isLoadingRooms} />
            <ResumoDeReserva />
            {isSidebarOpen && (
                <Sidebar />
            )}
        </div>
    )
}

export default SalaDeEstudos