import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import Input from '../components/form/Input'
import SubmitButton from '../components/form/SubmitButton'
import UseAuth from '../hooks/UseAuth'

import styles from './Login.module.css'

function Login() {

    const { login } = UseAuth()
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    function submit(e) {
        e.preventDefault()
        
        if (!email || !password) {
            setError('Preencha todos os campos')
            return
        }
    
        const result = login(email, password)

        if (result) {
            setError(result)
            return
        }

        navigate('/')
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