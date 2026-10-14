import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Inicio, Productos, DetalleProductos, Carrito, Contacto } from './pages'
import { Navbar, Footer } from './components'

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
            <Route path="/contacto" element={<Contacto />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
