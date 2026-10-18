import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { Link } from 'react-router-dom'

function ProductoCard({ producto, onAddToCart }) {
  const sinStock = producto.stock === 0
  const [agregado, setAgregado] = useState(false)
  const timeoutRef = useRef(null)

  const precioFormateado = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(producto.precio)

  useEffect(() => () => clearTimeout(timeoutRef.current), [])

  const manejarAgregarAlCarrito = () => {
    onAddToCart(producto)
    setAgregado(true)
    clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => setAgregado(false), 1000)
  }

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-gamer-primary/20 bg-gamer-card shadow-lg shadow-black/10">
      <div className="relative aspect-[4/3] overflow-hidden bg-gamer-bg">
        <img
          src={producto.imagen}
          alt={producto.nombre}
          className="h-full w-full object-cover transition duration-300 hover:scale-105"
        />
        {sinStock && (
          <span className="absolute right-3 top-3 rounded-full bg-red-500/90 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
            Sin Stock
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="flex-1">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gamer-accent">
            {producto.categoria}
          </p>
          <h2 className="text-lg font-bold text-gamer-textMain">{producto.nombre}</h2>
          <p className={`mt-3 text-sm font-medium ${sinStock ? 'text-red-400' : 'text-gamer-textMain/70'}`}>
            {sinStock ? 'Agotado' : `${producto.stock} unidades disponibles`}
          </p>
        </div>

        <p className="text-2xl font-bold text-gamer-accent">{precioFormateado}</p>

        <div className="flex flex-col gap-2">
          <button
            type="button"
            disabled={sinStock}
            onClick={manejarAgregarAlCarrito}
            className={`cursor-pointer rounded-lg px-4 py-2 font-semibold text-white transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-40 ${
              agregado
                ? 'bg-green-500 hover:bg-green-500'
                : 'bg-gamer-primary hover:bg-gamer-primary/80'
            }`}
          >
            {agregado ? (
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
            to={`/producto/${producto.id}`}
            className="rounded-lg border border-gamer-accent px-4 py-2 text-center font-semibold text-gamer-accent transition hover:bg-gamer-accent hover:text-gamer-bg"
          >
            Ver detalle
          </Link>
        </div>
      </div>
    </article>
  )
}

export default ProductoCard
