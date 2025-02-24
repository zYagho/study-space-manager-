import styles from './SalasDoUsuario.module.css'

function SalasDoUsuario() {
    return (
        <div className={styles.salas_do_usuario}>
            <h3>Suas salas</h3>
            <ol className={styles.lista_dias}>
                <li>Segunda 24/02/2025 
                    <ul>
                        <li>
                            <ul className={styles.lista_salas} type="circle">
                                <p>Sala 3:</p>
                                <li>intervalo</li>
                                <li>intervalo</li>
                            </ul>
                        </li>
                        <li>
                            <ul className={styles.lista_salas}>
                                <p>Sala 5:</p>
                                <li>intervalo</li>
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