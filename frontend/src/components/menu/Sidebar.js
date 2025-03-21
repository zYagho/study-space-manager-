import styles from './Sidebar.module.css'

function Sidebar() {

    function logout() {
        const logedUser = JSON.parse(localStorage.getItem('user_token'))
        localStorage.removeItem('user_token')
        alert(`Até mais, ${logedUser.name}`)
        window.location.reload()
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