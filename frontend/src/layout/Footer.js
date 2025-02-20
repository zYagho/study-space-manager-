import { FaGithub } from 'react-icons/fa'
import { GoLaw } from 'react-icons/go'

import styles from './Footer.module.css'

function Footer() {
    return (
        <footer className={styles.footer}>
            <p> &copy; {new Date().getFullYear()} Study Space Manager. Todos os direitos reservados.</p>
            <p className={styles.links}>
                <div>
                    <FaGithub /><a href='https://github.com/zyagho'>Repositório do projeto</a>
                </div> |
                <div>
                    <GoLaw /><a href='https://opensource.org/license/mit'>MIT License</a>
                </div>
            </p>
        </footer>
    )
}

export default Footer