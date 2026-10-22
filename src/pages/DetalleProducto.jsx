import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Link, useParams } from 'react-router-dom'
import { ProductoCard, ProductoNoEncontrado } from '../components'
import { productos } from '../data/productos'
import { precioARS } from '../utils/format'

function DetalleProducto({ onAddToCart, favoriteIds, onToggleFavorite }) {
  const { id } = useParams()
  const producto = productos.find((item) => item.id === Number(id))
  const [cantidad, setCantidad] = useState(1)
  const [agregado, setAgregado] = useState(false)
  const timeoutRef = useRef(null)

  useEffect(() => () => clearTimeout(timeoutRef.current), [])

  if (!producto) {
    return <ProductoNoEncontrado />
  }

  const sinStock = producto.stock === 0
  const isFavorite = favoriteIds.includes(producto.id)
  const precioFormateado = precioARS(producto.precio)
  const productosRelacionados = productos
    .filter((item) => item.id !== producto.id && item.categoria === producto.categoria)
    .sort((a, b) => Number(b.stock > 0) - Number(a.stock > 0))
    .slice(0, 3)

  const manejarAgregarAlCarrito = () => {
    const resultado = onAddToCart(producto, cantidad)
    if (resultado !== 'agregado') return

    setAgregado(true)
    clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => setAgregado(false), 1500)
  }

  return (
    <section className="detail-page bg-gamer-bg pb-28 text-gamer-textMain lg:pb-8">
      <div className="page-container page-top">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-gamer-textMuted">
            <li><Link to="/" className="hover:text-gamer-accent">Inicio</Link></li>
            <li aria-hidden="true">/</li>
            <li>
              <Link to="/productos" className="hover:text-gamer-accent">Productos</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link
                to={`/productos?${new URLSearchParams({ categoria: producto.categoria })}`}
                className="hover:text-gamer-accent"
              >
                {producto.categoria}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="font-semibold text-gamer-textMain">
              {producto.nombre}
            </li>
          </ol>
        </nav>

        <div className="grid min-w-0 grid-cols-1 gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
        <div className="mx-auto aspect-[16/10] max-h-[420px] w-full max-w-3xl overflow-hidden rounded-2xl border border-gamer-primary/30 bg-gamer-card p-2 max-[359px]:-mx-4 max-[359px]:w-[calc(100%+2rem)] max-[359px]:p-0.5 sm:p-4 lg:aspect-[4/3]">
          <img
            src={producto.imagen}
            alt={producto.nombre}
            loading="lazy"
            decoding="async"
            className="h-full w-full rounded-xl object-cover"
          />
        </div>

        <div className="flex min-w-0 flex-col items-start lg:justify-center">
          <p className="eyebrow">
            {producto.categoria}
          </p>
          <h1 className="page-title mb-5">
            {producto.nombre}
          </h1>
          <p className="price-display mb-6">{precioFormateado}</p>
          <p className="body-copy mb-6 leading-relaxed text-gamer-textMuted">{producto.descripcion}</p>
          <p className={`mb-8 font-semibold ${sinStock ? 'text-red-400' : 'text-gamer-textMain/80'}`}>
            {sinStock ? 'Producto agotado' : `${producto.stock} unidades disponibles`}
          </p>

          <div className="mb-3 flex items-center gap-3">
            <span className="font-semibold">Cantidad</span>
            <div className="inline-flex items-center rounded-lg border border-gamer-primary/30">
              <button
                type="button"
                aria-label={`Disminuir cantidad de ${producto.nombre}`}
                disabled={sinStock || cantidad <= 1}
                onClick={() => setCantidad((actual) => Math.max(1, actual - 1))}
                className="font-display px-3 py-2 text-lg font-bold text-gamer-accent disabled:cursor-not-allowed disabled:opacity-40"
              >
                −
              </button>
              <span className="inline-flex min-w-10 justify-center overflow-hidden text-center font-semibold" aria-live="polite">
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={cantidad}
                    className="inline-block w-full"
                    initial={{ y: 15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -15, opacity: 0 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                  >
                    {cantidad}
                  </motion.span>
                </AnimatePresence>
              </span>
              <button
                type="button"
                aria-label={`Aumentar cantidad de ${producto.nombre}`}
                disabled={sinStock || cantidad >= producto.stock}
                onClick={() => setCantidad((actual) => Math.min(producto.stock, actual + 1))}
                className="font-display px-3 py-2 text-lg font-bold text-gamer-accent disabled:cursor-not-allowed disabled:opacity-40"
              >
                +
              </button>
            </div>
          </div>

          <div className="mt-4 flex w-full flex-col flex-wrap gap-3 min-[560px]:flex-row">
            <button
              type="button"
              aria-label={`${isFavorite ? 'Quitar' : 'Agregar'} ${producto.nombre} ${isFavorite ? 'de' : 'a'} favoritos`}
              aria-pressed={isFavorite}
              onClick={() => onToggleFavorite(producto.id)}
              className="primary-cta rounded-lg border border-gamer-accent px-5 py-3 text-center text-gamer-accent transition hover:bg-gamer-accent hover:text-gamer-bg"
            >
              {isFavorite ? '♥ En favoritos' : '♡ Agregar a favoritos'}
            </button>
            <button
              type="button"
              disabled={sinStock}
              onClick={manejarAgregarAlCarrito}
              className={`primary-cta cursor-pointer whitespace-nowrap rounded-lg px-5 py-3 text-white transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-40 ${
                agregado
                  ? 'bg-green-500 hover:bg-green-500'
                  : 'bg-gamer-primary hover:bg-gamer-primary/80'
              }`}
            >
              {sinStock ? 'Sin stock' : agregado ? (
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
              to="/productos"
              className="primary-cta rounded-lg border border-gamer-accent px-5 py-3 text-center text-gamer-accent transition hover:bg-gamer-accent hover:text-gamer-bg"
            >
              Volver al catálogo
            </Link>
          </div>
          {producto.caracteristicas?.length > 0 && (
            <div className="mb-6 mt-6 w-full">
              <h2 className="section-title mb-3">Características</h2>
              <ul className="secondary-copy grid grid-cols-1 gap-3 text-gamer-textMuted lg:grid-cols-2">
                {producto.caracteristicas.map((caracteristica) => (
                  <li key={caracteristica} className="flex items-start gap-2">
                    <svg
                      aria-hidden="true"
                      className="mt-0.5 size-4 shrink-0 text-gamer-accent"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m5 12 4 4L19 6" />
                    </svg>
                    {caracteristica}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="secondary-copy mt-5 flex flex-wrap gap-x-6 gap-y-2 border-t border-gamer-primary/20 pt-4 text-gamer-textMuted">
            <span>Envíos a todo el país</span>
            <span>Garantía oficial</span>
          </div>
        </div>
      </div>
      </div>

      {productosRelacionados.length > 0 && (
        <div className="page-container pt-8">
          <h2 className="mb-6 text-2xl font-bold text-gamer-textMain">También te puede interesar</h2>
          <div className="grid gap-6 lg:grid-cols-3">
            {productosRelacionados.map((relacionado) => (
              <ProductoCard
                key={relacionado.id}
                producto={relacionado}
                onAddToCart={onAddToCart}
                isFavorite={favoriteIds.includes(relacionado.id)}
                onToggleFavorite={onToggleFavorite}
              />
            ))}
          </div>
        </div>
      )}

      <div className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-4 border-t border-gamer-primary/25 bg-gamer-card/95 px-4 py-3 shadow-xl backdrop-blur lg:hidden">
        <p className="text-lg font-bold text-gamer-accent">{precioFormateado}</p>
        <button
          type="button"
          disabled={sinStock}
          onClick={manejarAgregarAlCarrito}
          className={`rounded-lg px-4 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40 ${
            agregado ? 'bg-green-500' : 'bg-gamer-primary'
          }`}
        >
          {sinStock ? 'Sin stock' : agregado ? 'Agregado ✓' : 'Agregar al carrito'}
        </button>
      </div>
    </section>
  )
}

export default DetalleProducto