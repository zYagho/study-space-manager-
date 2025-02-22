import { useLocation } from 'react-router-dom'

import styles from './Head.module.css'
import UseAuth from '../hooks/UseAuth'

function Head(props) {

    const { signed, user } = UseAuth()
    const location = useLocation()
    
    const isLoginOrRegister = () => {
        if (location.pathname === '/login' || location.pathname === '/register')
            return true
        return false
    }

    console.log(`atualizando o Head. O user esta logado: ${signed} se sim, seu nome é ${signed ? user.userName : ''}`)

    return (
        <header className={styles.header}>
            <h1>Salas de Estudos {signed}</h1>
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