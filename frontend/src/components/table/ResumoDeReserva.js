import styles from './ResumoDeReserva.module.css'

function ResumoDeReserva() {

    const isSelect = true

    return (
        <div>
            {isSelect ? (
                <div>
                    <p>Dia tal</p>
                    <p>Sala tal</p>
                    <p>Reservar</p>
                    <p>Cancelar</p>
                </div>
            ):(
                <p>Selecione os horários de uma sala para reservar</p>
            )}
        </div>
    )
}

export default ResumoDeReserva