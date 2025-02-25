import styles from './ResumoDeReserva.module.css'
import SalasDoUsuario from './SalasDoUsuario'

function ResumoDeReserva({ hasSelectedReserve }) {

    return (
        <div className={styles.resumo}>
            {hasSelectedReserve ? (
                <>
                    <SalasDoUsuario
                    room={`Sala ${hasSelectedReserve.room.number}`}
                    hour={`${hasSelectedReserve.hour.horaInicio} - ${hasSelectedReserve.hour.horaFim}`}
                    />
                    <div className={styles.buttons}>
                        <button className={styles.btn_cancelar}>Cancelar</button>
                        <button className={styles.btn_reservar}>Reservar</button>
                    </div>
                </>
            ):(
                <p>Selecione os horários de uma sala para reservar</p>
            )}
        </div>
    )
}

export default ResumoDeReserva