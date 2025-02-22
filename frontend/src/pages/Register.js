import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import styles from './Register.module.css'

import Input from '../components/form/Input'
import SubmitButton from '../components/form/SubmitButton'
import UseAuth from '../hooks/UseAuth'

function Register() {

    const navigate = useNavigate()
    const { register } = UseAuth()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    // function submit(e) {
    //     e.preventDefault()
        
    //     if (!userName || !email || !password) {
    //         setError('Preencha todos os campos')
    //         return
    //     }

    //     const result = register(userName, email, password)

    //     if (result) {
    //         setError(result)
    //         return
    //     }

    //     alert('Usuário cadastrado com sucesso!')
    //     navigate('/login')
    // }

    async function submit(e) {
        e.preventDefault()

        const user = { name, email, password }
        console.log(user)

        try {
            const response = await fetch('http://localhost:3333/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });
      
            if (!response.ok) {
                throw new Error('Erro ao criar usuário');
            }
      
            const data = await response.json();
            console.log('Usuário criado:', data);

        } catch (error) {
            console.error('Erro:', error);
        }
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
                handleOnChange={(e) => setName(e.target.value)}/>
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
                <SubmitButton text='Cadastrar'/>
                <div className={styles.to_login}>
                    <p>Já tem cadastro? Faça o login <a href="/login">clicando aqui</a></p>
                </div>
            </form>
        </div>
    )
}

export default Register