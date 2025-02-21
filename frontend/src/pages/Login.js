import { useState } from 'react'

import Input from '../components/form/Input'
import SubmitButton from '../components/form/SubmitButton'

import styles from './Login.module.css'

function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function submit(e) {
        e.preventDefault()
        console.log(email, password)
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
                handleOnChange={(e) => setEmail(e.target.value)}/>
                <Input
                name='password'
                text='password'
                type='password'
                placeholder='Digite sua senha'
                handleOnChange={(e) => setPassword(e.target.value)}/>
                <p>Não tem cadastro? <a href="/register">Clique aqui</a></p>
                <SubmitButton text='Entrar'/>
            </form>
        </div>
    )
}

export default Login