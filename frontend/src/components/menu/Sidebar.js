import styles from './Sidebar.module.css'

function Sidebar() {

    function logout() {
        alert('Logout do usuário')
    }

    return (
        <div className={styles.sidebar}>
            <h3>Menu</h3>
            <ul>
                <li onClick={logout} >Sair</li>
            </ul>
        </div>
    )
}

export default Sidebar