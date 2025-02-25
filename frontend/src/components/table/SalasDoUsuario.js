import styles from './SalasDoUsuario.module.css'

function SalasDoUsuario({ room, hour }) {
    return (
        <div className={styles.salas_do_usuario}>
            <h3>{room}</h3>
            <h4>{hour}</h4>
        </div>
    )
}

export default SalasDoUsuario