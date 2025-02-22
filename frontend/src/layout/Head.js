import { useLocation } from 'react-router-dom'

import styles from './Head.module.css'

function Head() {

    const logedUser = JSON.parse(localStorage.getItem('user_token'))
    const location = useLocation()
    
    const isLoginOrRegister = () => {
        if (location.pathname === '/login' || location.pathname === '/register')
            return true
        return false
    }

    return (
        <header className={styles.header}>
            <h1>Salas de Estudos</h1>
            {!isLoginOrRegister() && (
                logedUser ? (
                    <p>Olá, {logedUser.name}</p>
                ):(
                    <p>Fazer <a href="/login">login</a></p>
                )
            )}
        </header>
    )
}

export default Head