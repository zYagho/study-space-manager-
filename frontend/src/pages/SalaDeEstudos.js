import { useContext, useEffect, useState } from 'react'
import { SidebarContext } from '../context/SidebarContext'
import Sidebar from '../components/menu/Sidebar'

import styles from './SalaDeEstudos.module.css'
import Table from '../components/table/Table'
import SalasDoUsuario from '../components/table/SalasDoUsuario'

function SalaDeEstudos() {

    const { isSidebarOpen } = useContext(SidebarContext)
    const [isLoadingRooms, setIsLoadingRooms ] = useState(true)
    const [rooms, setRooms ] = useState([])

    // verificar se existe um token logado
    // verificar se o token ainda é válido
    // define o intervalo de horas
    const horaInicial = 7
    const horaFinal = 22
    const horaQtd = horaFinal - horaInicial
    const horas = []
    for (let i = 0; i < horaQtd; i++) {
        horas.push({ hora: horaInicial + i, minuto: 0 })
    }

    // quantidade de salas
    useEffect(() => {
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

    }, [])

    return (
        <div className={styles.sala_de_estudos}>
            <h2>Sala de estudos disponíveis</h2>
            <SalasDoUsuario />
            <Table horas={horas} rooms={rooms}/>
            {isSidebarOpen && (
                <Sidebar />
            )}
        </div>
    )
}

export default SalaDeEstudos