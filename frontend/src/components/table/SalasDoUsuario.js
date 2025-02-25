import styles from './SalasDoUsuario.module.css'

function SalasDoUsuario({ title, dateDay, room, hour }) {
    return (
        <div className={styles.salas_do_usuario}>
            <h3>{title}</h3>
            <ol className={styles.lista_dias}>
                <li>{dateDay} 
                    <ul>
                        <li>
                            <ul className={styles.lista_salas} type="circle">
                                <p>{room}:</p>
                                <li>{hour}</li>
                                <li>{hour}</li>
                            </ul>
                        </li>
                        <li>
                            <ul className={styles.lista_salas}>
                                <p>{room}:</p>
                                <li>{hour}</li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li>Terça 25/02/2025
                    <ul>
                        <li>
                            <ul className={styles.lista_salas}>
                                <p>Sala 3:</p>
                                <li>intervalo</li>
                                <li>intervalo</li>
                                <li>intervalo</li>
                            </ul>
                        </li>
                        <li>
                            <ul className={styles.lista_salas}>
                                <p>Sala 4:</p>
                                <li>intervalo</li>
                                <li>intervalo</li>
                            </ul>
                        </li>
                    </ul>
                </li>
            </ol>
        </div>
    )
}

export default SalasDoUsuario