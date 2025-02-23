import styles from './Table.module.css'

import Cell from './Cell'

function Table({ horas, rooms }) {

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
                    {
                        horas.map((h => (
                            <th key={h.hora} cope='col'>{String(h.hora).padStart(2, '0')}:{String(h.minuto).padStart(2, '0')}
                            -{String(h.hora + 1).padStart(2, '0')}:{String(h.minuto).padStart(2, '0')}</th>
                        )))
                    }
                </tr>
            </thead>
            <tbody>
                {rooms.map((room) => (
                    <tr key={room.number}>
                        <th className={styles.salas_row} scope='row'>Sala {room.number}</th>
                        <Cell horas={horas} />
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default Table