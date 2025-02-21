import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

import Head from './layout/Head'
import Footer from './layout/Footer'
import SalaDeEstudos from './pages/SalaDeEstudos'
import Container from './layout/Container'
import Login from './pages/Login'
import Register from './pages/Register'
import { AuthProvider } from './contexts/auth'
import UseAuth from './hooks/UseAuth'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Head signed={checkIfSigned()}/>
        <Container customClass='min-height'>
          <Routes>
            <Route exact path='/' element={<SalaDeEstudos />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/register' element={<Register />}></Route>
          </Routes>
        </Container>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  )
}

function checkIfSigned() {
  const { signed } = UseAuth()

  return signed ? true : false
}

export default App;
