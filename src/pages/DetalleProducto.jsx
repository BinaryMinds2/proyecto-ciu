import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { Link, useParams } from 'react-router-dom'
import { productos } from '../data/productos'

function DetalleProducto({ onAddToCart }) {
  const { id } = useParams()
  const producto = productos.find((item) => item.id === Number(id))
  const [agregado, setAgregado] = useState(false)
  const timeoutRef = useRef(null)

  useEffect(() => () => clearTimeout(timeoutRef.current), [])

  if (!producto) {
    return (
      <section className="bg-gamer-bg px-4 py-16 text-gamer-textMain sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl rounded-2xl border border-gamer-primary/30 bg-gamer-card p-8 text-center">
          <h1 className="mb-4 text-3xl font-bold text-gamer-textMain">Producto no encontrado</h1>
          <p className="mb-6 text-gamer-textMain/70">
            No existe un producto con ese identificador. Volvé al catálogo para seguir explorando.
          </p>
          <Link
            to="/productos"
            className="inline-flex rounded-lg bg-gamer-primary px-5 py-3 font-semibold text-white transition hover:bg-gamer-primary/80"
          >
            Volver al catálogo
          </Link>
        </div>
      </section>
    )
  }

  const sinStock = producto.stock === 0
  const precioFormateado = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(producto.precio)

  const manejarAgregarAlCarrito = () => {
    onAddToCart(producto)
    setAgregado(true)
    clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => setAgregado(false), 1000)
  }

  return (
    <section className="bg-gamer-bg text-gamer-textMain">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-8 md:grid-cols-2">
        <div className="aspect-square overflow-hidden rounded-2xl border border-gamer-primary/30 bg-gamer-card p-4">
          <img
            src={producto.imagen}
            alt={producto.nombre}
            className="h-full w-full rounded-xl object-cover"
          />
        </div>

        <div className="flex flex-col items-start justify-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-gamer-accent">
            {producto.categoria}
          </p>
          <h1 className="mb-5 text-3xl font-bold text-gamer-textMain sm:text-4xl">
            {producto.nombre}
          </h1>
          <p className="mb-6 text-3xl font-bold text-gamer-accent">{precioFormateado}</p>
          <p className="mb-6 leading-relaxed text-gamer-textMain/75">{producto.descripcion}</p>
          <p className={`mb-8 font-semibold ${sinStock ? 'text-red-400' : 'text-gamer-textMain/80'}`}>
            {sinStock ? 'Producto agotado' : `${producto.stock} unidades disponibles`}
          </p>

          <div className="flex w-full flex-col gap-3 sm:flex-row">
            <button
              type="button"
              disabled={sinStock}
              onClick={manejarAgregarAlCarrito}
              className={`cursor-pointer rounded-lg px-5 py-3 font-semibold text-white transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-40 ${
                agregado
                  ? 'bg-green-500 hover:bg-green-500'
                  : 'bg-gamer-primary hover:bg-gamer-primary/80'
              }`}
            >
              {sinStock ? (
                'Sin stock'
              ) : agregado ? (
                <motion.span
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  aria-live="polite"
                >
                  ✓
                </motion.span>
              ) : (
                'Agregar al carrito'
              )}
            </button>
            <Link
              to="/productos"
              className="rounded-lg border border-gamer-accent px-5 py-3 text-center font-semibold text-gamer-accent transition hover:bg-gamer-accent hover:text-gamer-bg"
            >
              Volver al catálogo
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DetalleProducto