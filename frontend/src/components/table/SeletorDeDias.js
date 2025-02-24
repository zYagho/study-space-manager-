import styles from './SeletorDeDias.module.css'

function SeletorDeDias() {
    return (
        <div className={styles.day_selector}>
            <p>Anterior</p>
            <h3>Segunda-feira 24/02/2025</h3>
            <p>Próximo</p>
        </div>
    )
}

export default SeletorDeDias