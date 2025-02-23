import { useContext } from 'react'
import Sidebar from '../components/menu/Sidebar'
import { SidebarContext } from '../context/SidebarContext'

import styles from './SalaDeEstudos.module.css'

function SalaDeEstudos() {

    const { isSidebarOpen } = useContext(SidebarContext)

    return (
        <div className={styles.sala_de_estudos}>
            <h3>Sala de estudos disponíveis</h3>
            {isSidebarOpen && (
                <Sidebar />
            )}
        </div>
    )
}

export default SalaDeEstudos