import { useLayoutEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Inicio, Productos, DetalleProducto, Carrito, Contacto } from './pages'
import { Navbar, Footer } from './components'

function App() {
  const [isLightMode, setIsLightMode] = useState(() => {
    try {
      return window.localStorage.getItem('nexus-theme') === 'light'
    } catch {
      return false
    }
  })
  
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

  const toggleTheme = () => {
    setIsLightMode((enabled) => {
      const nextValue = !enabled

      try {
        window.localStorage.setItem('nexus-theme', nextValue ? 'light' : 'dark')
      } catch {
        // El tema sigue funcionando durante la sesión aunque no se pueda guardar la preferencia.
      }

      return nextValue
    })
  }

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = isLightMode ? 'light' : 'dark'
  }, [isLightMode])

  return (
    <BrowserRouter>
      <div className={`site-shell flex min-h-screen flex-col bg-gamer-bg${eyeRestMode ? ' eye-rest-mode' : ''}`}>
        <Navbar
          isLightMode={isLightMode}
          onToggleTheme={toggleTheme}
          eyeRestMode={eyeRestMode}
          onToggleEyeRestMode={toggleEyeRestMode}
        />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Inicio isLightMode={isLightMode} />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/producto/:id" element={<DetalleProducto />} />
            <Route path="/productos/:id" element={<DetalleProducto />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer isLightMode={isLightMode} />
      </div>
    </BrowserRouter>
  )
}

export default App
