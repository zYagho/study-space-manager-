import styles from './ResumoDeReserva.module.css'
import SalasDoUsuario from './SalasDoUsuario'

function ResumoDeReserva() {

    const isSelect = true

    return (
        <div className={styles.resumo}>
            {isSelect ? (
                <SalasDoUsuario
                title='Resumo'
                dateDay='segunda 24/02/2025'
                room='Sala 3'
                hour='10:00 - 11:00'
                />
            ):(
                <p>Selecione os horários de uma sala para reservar</p>
            )}
            <div className={styles.buttons}>
                <button className={styles.btn_cancelar}>Cancelar</button>
                <button className={styles.btn_reservar}>Reservar</button>
            </div>
        </div>
    )
}

export default ResumoDeReserva