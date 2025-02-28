import styles from './ResumoDeReserva.module.css'
import SalasDoUsuario from './SalasDoUsuario'

function ResumoDeReserva({ hasSelectedReserve, handleMakeReservation, error, handleCancelReservation }) {

    return (
        <div className={styles.resumo}>
            {hasSelectedReserve ? (
                <>
                    <SalasDoUsuario
                    room={`Sala ${hasSelectedReserve.room.number}`}
                    hour={`${hasSelectedReserve.hour.horaInicio} - ${hasSelectedReserve.hour.horaFim}`}
                    />
                    <p className={styles.error}>{error}</p>
                    <div className={styles.buttons}>
                        <button className={styles.btn_cancelar} onClick={handleCancelReservation}>Cancelar</button>
                        <button className={styles.btn_reservar} onClick={handleMakeReservation}>Reservar</button>
                    </div>
                </>
            ):(
                <p>Selecione os horários de uma sala para reservar</p>
            )}
        </div>
    )
}

export default ResumoDeReserva