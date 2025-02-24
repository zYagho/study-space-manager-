import { useLocation, useNavigate } from 'react-router-dom'
import { useContext } from 'react';
import { RiArrowDownSFill } from "react-icons/ri";
import { SidebarContext } from '../context/SidebarContext';

import styles from './Head.module.css'

function Head() {

    const { toggleSidebar } = useContext(SidebarContext)
    const logedUser = JSON.parse(localStorage.getItem('user_token'))
    const location = useLocation()
    const navigate = useNavigate()
    console.log('verifica usuário')
    
    const isLoginOrRegister = () => {
        if (location.pathname === '/login' || location.pathname === '/register')
            return true
        return false
    }

    return (
        <header className={styles.header}>
            <h1 onClick={() => navigate('/')}>Salas de Estudos</h1>
            {!isLoginOrRegister() && (
                logedUser ? (
                    <div onClick={toggleSidebar} className={styles.perfil}>
                        <p>Olá, {logedUser.name}</p>
                        <div><RiArrowDownSFill /></div>
                    </div>
                ):(
                    <p>Fazer <a href="/login">login</a></p>
                )
            )}
        </header>
    )
}

export default Head