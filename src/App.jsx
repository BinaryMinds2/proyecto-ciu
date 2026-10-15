import { useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Inicio, Productos, DetalleProductos, Carrito, Contacto } from './pages'
import { Navbar, Footer } from './components'

function App() {
  const [eyeRestMode, setEyeRestMode] = useState(() => {
    try {
      return window.localStorage.getItem('nexus-eye-rest-mode') === 'true'
    } catch {
      return false
    }
  })

  const toggleEyeRestMode = () => {
    setEyeRestMode((enabled) => {
      const nextValue = !enabled

      try {
        window.localStorage.setItem('nexus-eye-rest-mode', String(nextValue))
      } catch {
        // El modo sigue funcionando durante la sesión aunque el navegador no permita guardar preferencias.
      }

      return nextValue
    })
  }

  return (
    <BrowserRouter>
      <div className={`site-shell flex min-h-screen flex-col bg-gamer-bg${eyeRestMode ? ' eye-rest-mode' : ''}`}>
        <Navbar eyeRestMode={eyeRestMode} onToggleEyeRestMode={toggleEyeRestMode} />
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
