import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Input from '../components/form/Input'
import SubmitButton from '../components/form/SubmitButton'

import styles from './Login.module.css'

function Login() {

    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    async function submit(e) {
        e.preventDefault()

        if (!email || !password) {
            setError('Preencha todos os campos')
            return
        }

        const loginDatas = { email, password }

        try {
            const response = await fetch('http://localhost:3333/session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginDatas),
            });
      
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Erro ao fazer login');
            }
      
            const data = await response.json();
            localStorage.setItem('user_token', JSON.stringify(data)) // salva o token

            console.log(data)
            alert(`Usuário ${data.name} logado com sucesso!`)
            navigate('/')
      
        } catch (e) {
            console.error(e.message)
            setError(e.message)
        }
    }

    return (
        <div className={styles.login} onSubmit={submit}>
            <h3>Faça seu Login</h3>
            <form>
                <Input
                name='email'
                text='e-mail'
                type='text'
                placeholder='Digite seu e-mail'
                handleOnChange={(e) => [setEmail(e.target.value), setError('')]}/>
                <Input
                name='password'
                text='password'
                type='password'
                placeholder='Digite sua senha'
                handleOnChange={(e) => [setPassword(e.target.value), setError('')]}/>
                <p>{error}</p>
                <SubmitButton text='Entrar'/>
                <div className={styles.no_register}>
                    <p>Não tem cadastro? <a href="/register">Clique aqui</a></p>
                </div>
            </form>
        </div>
    )
}

export default Login