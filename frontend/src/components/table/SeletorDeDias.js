import styles from './SeletorDeDias.module.css'

function SeletorDeDias(props) {

    return (
        <div className={styles.day_selector}>
            <p onClick={() => props.alternateDays(-1)} >Anterior</p>
            <h3>{props.weekDays[props.currentDate.getDay()]} {props.currentDateFormatted}</h3>
            <p onClick={() => props.alternateDays(1)} >Próximo</p>
        </div>
    )
}

export default SeletorDeDias