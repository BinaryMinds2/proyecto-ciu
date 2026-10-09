import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Inicio from './pages/indexs'
import Productos from './pages/productos'
import DetalleProductos from './pages/detalleProductos'
import Carrito from './pages/carrito'
import Contactos from './pages/contactos'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen flex-col bg-gamer-bg">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/productos/:id" element={<DetalleProductos />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/contacto" element={<Contactos />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
