import styles from './Register.module.css'

import Input from '../components/form/Input'
import SubmitButton from '../components/form/SubmitButton'

function Register() {
    return (
        <div className={styles.register}>
            <h3>Faça seu cadastro</h3>
            <form>
                <Input
                name='userName'
                text='seu nome completo'
                type='text'
                placeholder='Digite seu nome completo'
                />
                <Input
                name='email'
                text='e-mail'
                type='text'
                placeholder='Digite seu e-mail'
                />
                <Input
                name='password'
                text='password'
                type='password'
                placeholder='Digite sua senha'
                />
                <p>Já tem cadastro? Faça o login <a href="/login">clicando aqui</a></p>
                <SubmitButton text='Cadastrar'/>
            </form>
        </div>
    )
}

export default Register