import { useLocation } from 'react-router-dom'
import UseAuth from '../hooks/UseAuth'

import styles from './Head.module.css'

function Head() {

    const location = useLocation()
    const { signed, user } = UseAuth()
    
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
                    <p>Olá, {user.userName}</p>
                ):(
                    <p>Fazer <a href="/login">login</a></p>
                )
            )}
        </header>
    )
}

export default Head