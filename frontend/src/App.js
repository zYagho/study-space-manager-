import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

import Head from './layout/Head'
import Footer from './layout/Footer'
import SalaDeEstudos from './pages/SalaDeEstudos'
import Container from './layout/Container'
import Login from './pages/Login'

function App() {
  return (
    <BrowserRouter>
      <Head signed={checkIfSigned()}/>
      <Container customClass='min-height'>
        <Routes>
          <Route exact path='/' element={<SalaDeEstudos />}></Route>
          <Route path='/login' element={<Login />}></Route>
        </Routes>
      </Container>
      <Footer />
    </BrowserRouter>
  )
}

function checkIfSigned() {
  const signed = false

  return signed
}

export default App;
