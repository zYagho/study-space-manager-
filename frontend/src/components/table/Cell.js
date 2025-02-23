import PropTypes from 'prop-types'

import styles from './Cell.module.css'

function Cell({ horas }) {

    return (
        <>
            {horas.map((h) => (
                <td className={styles.cell}>{/* espaço para clicar */}</td>
            ))}
        </>
    )
}

Cell.propTypes = {
    horas: PropTypes.array
}

export default Cell