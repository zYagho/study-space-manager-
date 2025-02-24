import PropTypes from 'prop-types'

import styles from './Cell.module.css'

function Cell({ hours, room }) {

    return (
        <>
            {hours.map((h) => (
                <td key={h.id} className={styles.cell} onClick={() => alert(`Sala ${room.number} e horário ${h.horaInicio} - ${h.horaFim}`)}>{/* espaço para clicar */}</td>
            ))}
        </>
    )
}

Cell.propTypes = {
    horas: PropTypes.array
}

export default Cell