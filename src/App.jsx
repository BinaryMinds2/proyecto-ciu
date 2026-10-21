import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useLocation, useParams } from 'react-router-dom'
import { Inicio, Productos, DetalleProducto, Carrito, Contacto, Nosotros } from './pages'
import { FormularioCompra, Navbar, Footer, Toast } from './components'
import { productos } from './data/productos'

function RedireccionProducto() {
  const { id } = useParams()
  return <Navigate to={`/producto/${id}`} replace />
}

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
  vaciarCarrito,
  toast,
  cerrarToast,
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

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])

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
          <Route
            path="/"
            element={<Inicio isLightMode={isLightMode} onAddToCart={agregarAlCarrito} />}
          />
          <Route path="/productos" element={<Productos onAddToCart={agregarAlCarrito} />} />
          <Route
            path="/producto/:id"
            element={<DetalleProducto key={pathname} onAddToCart={agregarAlCarrito} />}
          />
          <Route path="/productos/:id" element={<RedireccionProducto />} />
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
          <Route path="/checkout" element={<FormularioCompra cart={cart} onClearCart={vaciarCarrito} />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      {!esCheckout && <Footer isLightMode={isLightMode} />}
      <Toast toast={toast} onClose={cerrarToast} />
    </div>
  )
}

function App() {
  const [cart, setCart] = useState(leerCarrito)
  // Mantiene sincronizados los clics sucesivos antes del siguiente render de React.
  const cartRef = useRef(cart)
  const [toast, setToast] = useState(null)
  const toastIdRef = useRef(0)
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

  const mostrarToast = (mensaje, tipo = 'exito', accion) => {
    toastIdRef.current += 1
    setToast({ id: toastIdRef.current, mensaje, tipo, accion })
  }

  const agregarAlCarrito = (producto, cantidad = 1) => {
    if (producto.stock < 1) return 'sin-stock'

    if (!Number.isInteger(cantidad) || cantidad < 1) return 'maximo'

    const carritoActual = cartRef.current
    const productoExistente = carritoActual.find((item) => item.id === producto.id)
    const cantidadExistente = productoExistente?.cantidad ?? 0
    const cantidadDisponible = Math.max(0, producto.stock - cantidadExistente)
    const cantidadAAgregar = Math.min(cantidad, cantidadDisponible)

    if (cantidadAAgregar === 0) {
      mostrarToast(`Ya tenés el máximo disponible de ${producto.nombre}`, 'aviso')
      return 'maximo'
    }

    const carritoActualizado = productoExistente
      ? carritoActual.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + cantidadAAgregar }
            : item,
        )
      : [...carritoActual, { ...producto, cantidad: cantidadAAgregar }]
    cartRef.current = carritoActualizado

    // La actualización funcional vuelve a comprobar el stock ante clics rápidos.
    setCart((carritoPrevio) => {
      const existente = carritoPrevio.find((item) => item.id === producto.id)
      const cantidadQuePuedeAgregar = Math.max(0, producto.stock - (existente?.cantidad ?? 0))
      const agregar = Math.min(cantidad, cantidadQuePuedeAgregar)

      if (agregar === 0) return carritoPrevio

      return existente
        ? carritoPrevio.map((item) =>
            item.id === producto.id ? { ...item, cantidad: item.cantidad + agregar } : item,
          )
        : [...carritoPrevio, { ...producto, cantidad: agregar }]
    })

    const resultado = cantidadAAgregar < cantidad ? 'maximo' : 'agregado'
    if (resultado === 'agregado') {
      mostrarToast(`Agregaste ${producto.nombre} al carrito`, 'exito', {
        label: 'Ver carrito',
        to: '/carrito',
      })
    } else {
      mostrarToast(`Ya tenés el máximo disponible de ${producto.nombre}`, 'aviso')
    }

    return resultado
  }

  const actualizarCantidad = (productoId, cantidad) => {
    cartRef.current = cartRef.current.map((item) =>
      item.id === productoId
        ? { ...item, cantidad: Math.max(1, Math.min(cantidad, item.stock)) }
        : item,
    )
    setCart((carritoActual) =>
      carritoActual.map((item) =>
        item.id === productoId
          ? { ...item, cantidad: Math.max(1, Math.min(cantidad, item.stock)) }
          : item,
      ),
    )
  }

  const eliminarDelCarrito = (productoId) => {
    const indice = cartRef.current.findIndex((item) => item.id === productoId)
    if (indice < 0) return

    const productoQuitado = cartRef.current[indice]
    cartRef.current = cartRef.current.filter((item) => item.id !== productoId)
    setCart((carritoActual) => carritoActual.filter((item) => item.id !== productoId))

    mostrarToast(`Quitaste ${productoQuitado.nombre}`, 'aviso', {
      label: 'Deshacer',
      onClick: () => {
        if (cartRef.current.some((item) => item.id === productoId)) return

        const carritoRestaurado = [...cartRef.current]
        carritoRestaurado.splice(indice, 0, productoQuitado)
        cartRef.current = carritoRestaurado
        setCart((carritoActual) => {
          if (carritoActual.some((item) => item.id === productoId)) return carritoActual
          const carritoActualizado = [...carritoActual]
          carritoActualizado.splice(indice, 0, productoQuitado)
          return carritoActualizado
        })
      },
    })
  }

  const vaciarCarrito = () => {
    cartRef.current = []
    setCart([])
  }

  const cerrarToast = useCallback(() => {
    setToast(null)
  }, [])

  const cantidadProductos = cart.reduce((total, item) => total + item.cantidad, 0)

  return (
    <BrowserRouter>
      <InterfazAplicacion
        cart={cart}
        vaciarCarrito={vaciarCarrito}
        toast={toast}
        cerrarToast={cerrarToast}
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
