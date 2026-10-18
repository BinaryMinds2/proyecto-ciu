import { useEffect, useLayoutEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { Inicio, Productos, DetalleProducto, Carrito, Contacto } from './pages'
import { CheckoutForm, Navbar, Footer } from './components'
import { productos } from './data/productos'

function leerCarrito() {
  try {
    const carritoGuardado = JSON.parse(window.localStorage.getItem('nexus-cart') || '[]')

    if (!Array.isArray(carritoGuardado)) {
      throw new Error('El formato guardado no es una lista de productos.')
    }

    return carritoGuardado.flatMap((item) => {
      const producto = productos.find((actual) => actual.id === Number(item?.id))
      const cantidad = Number(item?.cantidad)

      if (!producto || !Number.isInteger(cantidad) || cantidad < 1 || producto.stock < 1) {
        return []
      }

      return [{ ...producto, cantidad: Math.min(cantidad, producto.stock) }]
    })
  } catch (error) {
    console.error('No se pudo leer el carrito guardado.', error)
    return []
  }
}

function InterfazAplicacion({
  cart,
  setCart,
  isLightMode,
  toggleTheme,
  eyeRestMode,
  toggleEyeRestMode,
  agregarAlCarrito,
  actualizarCantidad,
  eliminarDelCarrito,
  cantidadProductos,
}) {
  const { pathname } = useLocation()
  const esCheckout = pathname === '/checkout'

  return (
    <div className={`site-shell flex min-h-screen flex-col bg-gamer-bg${eyeRestMode ? ' eye-rest-mode' : ''}`}>
      <Navbar
        cartCount={cantidadProductos}
        isLightMode={isLightMode}
        onToggleTheme={toggleTheme}
        eyeRestMode={eyeRestMode}
        onToggleEyeRestMode={toggleEyeRestMode}
        hideCart={esCheckout}
      />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Inicio isLightMode={isLightMode} />} />
          <Route path="/productos" element={<Productos onAddToCart={agregarAlCarrito} />} />
          <Route
            path="/producto/:id"
            element={<DetalleProducto onAddToCart={agregarAlCarrito} />}
          />
          <Route
            path="/productos/:id"
            element={<DetalleProducto onAddToCart={agregarAlCarrito} />}
          />
          <Route
            path="/carrito"
            element={
              <Carrito
                cart={cart}
                onUpdateQuantity={actualizarCantidad}
                onRemoveProduct={eliminarDelCarrito}
              />
            }
          />
          <Route
            path="/checkout"
            element={<CheckoutForm cart={cart} onClearCart={() => setCart([])} />}
          />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      {!esCheckout && <Footer isLightMode={isLightMode} />}
    </div>
  )
}

function App() {
  const [cart, setCart] = useState(leerCarrito)
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

  useEffect(() => {
    try {
      window.localStorage.setItem('nexus-cart', JSON.stringify(cart))
    } catch (error) {
      console.error('No se pudo guardar el carrito.', error)
    }
  }, [cart])

  const agregarAlCarrito = (producto) => {
    setCart((carritoActual) => {
      const productoExistente = carritoActual.find((item) => item.id === producto.id)

      if (producto.stock < 1 || productoExistente?.cantidad >= producto.stock) {
        return carritoActual
      }

      if (productoExistente) {
        return carritoActual.map((item) =>
          item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item,
        )
      }

      return [...carritoActual, { ...producto, cantidad: 1 }]
    })
  }

  const actualizarCantidad = (productoId, cantidad) => {
    setCart((carritoActual) =>
      carritoActual.map((item) =>
        item.id === productoId
          ? { ...item, cantidad: Math.max(1, Math.min(cantidad, item.stock)) }
          : item,
      ),
    )
  }

  const eliminarDelCarrito = (productoId) => {
    setCart((carritoActual) => carritoActual.filter((item) => item.id !== productoId))
  }

  const cantidadProductos = cart.reduce((total, item) => total + item.cantidad, 0)

  return (
    <BrowserRouter>
      <InterfazAplicacion
        cart={cart}
        setCart={setCart}
        isLightMode={isLightMode}
        toggleTheme={toggleTheme}
        eyeRestMode={eyeRestMode}
        toggleEyeRestMode={toggleEyeRestMode}
        agregarAlCarrito={agregarAlCarrito}
        actualizarCantidad={actualizarCantidad}
        eliminarDelCarrito={eliminarDelCarrito}
        cantidadProductos={cantidadProductos}
      />
    </BrowserRouter>
  )
}

export default App
