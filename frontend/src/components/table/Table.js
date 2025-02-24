import styles from './Table.module.css'

import Cell from './Cell'
import SeletorDeDias from './SeletorDeDias'

function Table({ hours, rooms, isLoadingRooms, reservas }) {

    return (
        <table className={styles.table}>
            <caption>
                <SeletorDeDias />
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
                {rooms.map((room, index) => (
                    <tr key={room.number}>
                        <>
                            {!isLoadingRooms ? (
                                <th className={styles.salas_row} scope='row'>Sala {room.number}</th>
                            ):(
                                <th className={styles.salas_row_loading}></th>
                            )}
                            <Cell hours={hours} roomIndex={index} reservas={reservas}/>
                        </>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default Table