import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import { precioARS } from '../utils/format'

function ProductoCard({ producto, onAddToCart }) {
  const sinStock = producto.stock === 0
  const pocasUnidades = producto.stock > 0 && producto.stock <= 3
  const [agregado, setAgregado] = useState(false)
  const timeoutRef = useRef(null)

  const precioFormateado = precioARS(producto.precio)

  useEffect(() => () => clearTimeout(timeoutRef.current), [])

  const manejarAgregarAlCarrito = () => {
    const resultado = onAddToCart(producto)
    if (resultado !== 'agregado') return

    setAgregado(true)
    clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => setAgregado(false), 1500)
  }

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-gamer-primary/20 bg-gamer-card shadow-lg shadow-black/10">
      <div className="relative aspect-[4/3] overflow-hidden bg-gamer-bg">
        <Link
          to={`/producto/${producto.id}`}
          tabIndex={-1}
          aria-hidden="true"
          className="block h-full"
        >
          <img
            src={producto.imagen}
            alt=""
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition duration-300 hover:scale-105"
          />
        </Link>
        {sinStock && (
          <span className="absolute right-3 top-3 rounded-full bg-red-500/90 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
            Sin Stock
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="flex-1">
          <p className="eyebrow mb-2">
            {producto.categoria}
          </p>
          <h3 className="card-title">
            <Link
              to={`/producto/${producto.id}`}
              className="rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gamer-accent"
            >
              {producto.nombre}
            </Link>
          </h3>
          <p className={`mt-3 text-sm font-medium ${sinStock ? 'text-red-400' : pocasUnidades ? 'text-amber-500' : 'text-gamer-textMain/70'}`}>
            {sinStock
              ? 'Agotado'
              : pocasUnidades
                ? `¡Últimas ${producto.stock} unidades!`
                : `${producto.stock} unidades disponibles`}
          </p>
        </div>

        <p className="price-display">{precioFormateado}</p>

        <div className="flex flex-col gap-2">
          <button
            type="button"
            disabled={sinStock}
            onClick={manejarAgregarAlCarrito}
            className={`primary-cta cursor-pointer rounded-lg px-4 py-2 text-white transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-40 ${
              agregado
                ? 'bg-green-500 hover:bg-green-500'
                : 'bg-gamer-primary hover:bg-gamer-primary/80'
            }`}
          >
            {agregado ? (
              <motion.span
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                aria-live="polite"
              >
                Agregado ✓
              </motion.span>
            ) : 'Agregar al carrito'}
          </button>
          <Link
            to={`/producto/${producto.id}`}
            className="primary-cta rounded-lg border border-gamer-accent px-4 py-2 text-center text-gamer-accent transition hover:bg-gamer-accent hover:text-gamer-bg"
          >
            Ver detalle
          </Link>
        </div>
      </div>
    </article>
  )
}

export default ProductoCard
