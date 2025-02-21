import { useLocation } from 'react-router-dom'

import styles from './Head.module.css'

function Head({ signed }) {

    const location = useLocation()
    
    const isLoginOrRegister = () => {
        if (location.pathname == '/login' || location.pathname == '/register')
            return true
        return false
    }

    return (
        <header className={styles.header}>
            <h1>Salas de Estudos</h1>
            {!isLoginOrRegister() && (
                signed ? (
                    <p>Olá, fulano de tal</p>
                ):(
                    <p>Fazer <a href="/login">login</a></p>
                )
            )}
        </header>
    )
}

export default Head