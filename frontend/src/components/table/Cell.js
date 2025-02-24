import PropTypes from 'prop-types'

import styles from './Cell.module.css'

function Cell({ hours, room }) {

    function onCellClick(hour) {
        alert(`Sala ${room.number} e horário ${hour.horaInicio} - ${hour.horaFim}`)
    }

    return (
        <>
            {hours.map((h) => (
                <td key={h.id} className={styles.cell} onClick={() => onCellClick(h)}>{/* espaço para clicar */}</td>
            ))}
        </>
    )
}

Cell.propTypes = {
    horas: PropTypes.array
}

export default Cell