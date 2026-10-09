import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Inicio from './pages/indexs'
import Productos from './pages/productos'
import DetalleProductos from './pages/detalleProductos'
import Carrito from './pages/carrito'
import Contactos from './pages/contactos'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/productos/:id" element={<DetalleProductos />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/contacto" element={<Contactos />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
