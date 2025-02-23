import PropTypes from 'prop-types'

import styles from './Cell.module.css'

function Cell({ horas }) {

    return (
        <>
            {horas.map((h) => (
                <td key={h.hora} className={styles.cell}>{/* espaço para clicar */}</td>
            ))}
        </>
    )
}

Cell.propTypes = {
    horas: PropTypes.array
}

export default Cell