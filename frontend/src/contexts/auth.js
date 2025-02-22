import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState()

    useEffect(() => {
        const userToken = localStorage.getItem('user_token')
        const usersStorage = localStorage.getItem('users_db')

        // verifica se existe o token e o usuario quando a pagina for recarregada
        if (userToken && usersStorage) {
            // verifica se o email de ambos covalidam
            const hasUser = JSON.parse(usersStorage)?.filter((user) => user.email === JSON.parse(userToken).email)

            if (hasUser)
                setUser(hasUser[0])
        }
    }, [])

    const login = (email, password) => {
        const usersStorage = JSON.parse(localStorage.getItem('users_db'))
        const hasUser = usersStorage?.filter((user) => user.email === email)

        if (hasUser?.length) {
            if (hasUser[0].email === email && hasUser[0].password === password) {
                const token = Math.random().toString(36).substring(2) // cria um "token" para o user
                localStorage.setItem('user_token', JSON.stringify({ email, token }))
                const userName = hasUser[0].userName
                setUser({ userName, email, password })
                return;
            } else {
                return 'E-mail ou senha incorretos'
            }
        } else {
            return 'Usuário não cadastrado'
        }
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem('user_token')
    }

    return (
        <AuthContext.Provider value={{ user, signed: !!user, login, /*register,*/ logout }}>
            {children}
        </AuthContext.Provider>
    )
}