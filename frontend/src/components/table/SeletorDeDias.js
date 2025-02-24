import styles from './SeletorDeDias.module.css'

function SeletorDeDias() {

    const currentDate = new Date()

    const day = String(currentDate.getDate()).padStart(2, '0')
    const month = String(currentDate.getMonth() + 1).padStart(2, '0')
    const year = currentDate.getFullYear()

    // Formata a data no formato "dd/MM/yyyy"
    const currentDateFormatted = `${day}/${month}/${year}`

    const weekDays = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado']

    return (
        <div className={styles.day_selector}>
            <p>Anterior</p>
            <h3>{weekDays[currentDate.getDay()]} {currentDateFormatted}</h3>
            <p>Próximo</p>
        </div>
    )
}

export default SeletorDeDias