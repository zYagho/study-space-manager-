import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Head from './layout/Head'
import Footer from './layout/Footer'
import SalaDeEstudos from './pages/SalaDeEstudos'
import Container from './layout/Container'
import Login from './pages/Login'
import Register from './pages/Register'
import { SidebarProvider } from './context/SidebarContext'

function App() {
  return (
    <SidebarProvider>
      <BrowserRouter>
        <Head />
        <Container customClass='min-height'>
          <Routes>
            <Route exact path='/' element={<SalaDeEstudos />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/register' element={<Register />}></Route>
          </Routes>
        </Container>
        <Footer />
      </BrowserRouter>
    </SidebarProvider>
  )
}

export default App;
