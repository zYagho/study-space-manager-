import { useContext } from 'react'
import { SidebarContext } from '../context/SidebarContext'
import Sidebar from '../components/menu/Sidebar'

import styles from './SalaDeEstudos.module.css'
import Table from '../components/table/Table'
import SalasDoUsuario from '../components/table/SalasDoUsuario'

function SalaDeEstudos() {

    const { isSidebarOpen } = useContext(SidebarContext)

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
    const salaQtd = 8
    const salas = []
    for (let i = 1; i <= salaQtd; i++) {
        salas.push(`sala ${i}`)
    }

    return (
        <div className={styles.sala_de_estudos}>
            <h2>Sala de estudos disponíveis</h2>
            <SalasDoUsuario />
            <Table horas={horas} salas={salas}/>
            {isSidebarOpen && (
                <Sidebar />
            )}
        </div>
    )
}

export default SalaDeEstudos