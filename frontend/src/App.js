import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

import Head from './layout/Head'
import Footer from './layout/Footer'
import SalaDeEstudos from './pages/SalaDeEstudos'

function App() {
  return (
    <BrowserRouter>
      <Head />
      <Routes>
        <Route exact path='/sala-de-estudos' element={<SalaDeEstudos />}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App;
