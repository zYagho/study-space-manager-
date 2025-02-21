import { useState } from 'react'

import styles from './Register.module.css'

import Input from '../components/form/Input'
import SubmitButton from '../components/form/SubmitButton'

function Register() {

    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function submit(e) {
        e.preventDefault()
        console.log('cadastrado o usuario: ', userName, email, password)
    }

    return (
        <div className={styles.register} onSubmit={submit}>
            <h3>Faça seu cadastro</h3>
            <form>
                <Input
                name='userName'
                text='seu nome completo'
                type='text'
                placeholder='Digite seu nome completo'
                handleOnChange={(e) => setUserName(e.target.value)}/>
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
                <p>Já tem cadastro? Faça o login <a href="/login">clicando aqui</a></p>
                <SubmitButton text='Cadastrar'/>
            </form>
        </div>
    )
}

export default Register