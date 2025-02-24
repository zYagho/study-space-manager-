import { useState } from 'react'

import styles from './SeletorDeDias.module.css'

function SeletorDeDias() {

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

    return (
        <div className={styles.day_selector}>
            <p onClick={() => alternateDays(-1)} >Anterior</p>
            <h3>{weekDays[currentDate.getDay()]} {currentDateFormatted}</h3>
            <p onClick={() => alternateDays(1)} >Próximo</p>
        </div>
    )
}

export default SeletorDeDias