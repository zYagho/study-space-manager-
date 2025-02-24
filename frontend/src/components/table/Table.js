import styles from './Table.module.css'

import Cell from './Cell'

function Table({ hours, rooms, isLoadingRooms }) {

    return (
        <table className={styles.table}>
            <caption>
                <div className={styles.day_selector}>
                    <p>Anterior</p>
                    <h3>Segunda-feira 24/02/2025</h3>
                    <p>Próximo</p>
                </div>
            </caption>
            <thead>
                <tr>
                    <th scope='col'>Horários</th>
                    {hours.map((h) => (
                        <th key={h.id} cope='col'>{h.horaInicio} - {h.horaFim}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {rooms.map((room) => (
                    <tr key={room.number}>
                        <>
                            {!isLoadingRooms ? (
                                <th className={styles.salas_row} scope='row'>Sala {room.number}</th>
                            ):(
                                <th className={styles.salas_row_loading}></th>
                            )}
                            <Cell hours={hours} room={room} />
                        </>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default Table