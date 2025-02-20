import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

import Head from './layout/Head'
import Footer from './layout/Footer'
import SalaDeEstudos from './pages/SalaDeEstudos'
import Container from './layout/Container'

function App() {
  return (
    <BrowserRouter>
      <Head />
      <Container customClass='min-height'>
        <Routes>
          <Route exact path='/' element={<SalaDeEstudos />}></Route>
        </Routes>
      </Container>
      <Footer />
    </BrowserRouter>
  )
}

export default App;
