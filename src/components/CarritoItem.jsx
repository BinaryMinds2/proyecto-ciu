import { AnimatePresence, motion } from 'motion/react'
import { precioARS } from '../utils/format'

function CarritoItem({ item, onUpdateQuantity, onRemoveProduct }) {
  return (
    <motion.article
      layout
      initial={false}
      exit={{ opacity: 0, x: 24 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="grid gap-4 rounded-xl border border-gamer-primary/20 bg-gamer-card p-4 shadow-lg shadow-black/10 sm:grid-cols-[7rem_minmax(0,1fr)_auto]"
    >
      <img
        src={item.imagen}
        alt={item.nombre}
        className="h-28 w-full rounded-lg object-cover sm:w-28"
      />
      <div className="flex flex-col justify-center gap-2">
        <h3 className="card-title">{item.nombre}</h3>
        <p className="secondary-copy text-gamer-textMuted">
          Precio unitario: {precioARS(item.precio)}
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <div
            className="inline-flex items-center rounded-lg border border-gamer-primary/30"
            aria-label={`Cantidad de ${item.nombre}`}
          >
            <button
              type="button"
              aria-label={`Disminuir cantidad de ${item.nombre}`}
              disabled={item.cantidad <= 1}
              onClick={() => onUpdateQuantity(item.id, item.cantidad - 1)}
              className="font-display px-3 py-1.5 text-lg font-bold text-gamer-accent disabled:cursor-not-allowed disabled:opacity-40"
            >
              −
            </button>
            <span className="inline-flex min-w-8 justify-center overflow-hidden text-center font-semibold">
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={item.cantidad}
                  className="inline-block w-full"
                  initial={{ y: 15, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -15, opacity: 0 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                >
                  {item.cantidad}
                </motion.span>
              </AnimatePresence>
            </span>
            <button
              type="button"
              aria-label={`Aumentar cantidad de ${item.nombre}`}
              disabled={item.cantidad >= item.stock}
              onClick={() => onUpdateQuantity(item.id, item.cantidad + 1)}
              className="font-display px-3 py-1.5 text-lg font-bold text-gamer-accent disabled:cursor-not-allowed disabled:opacity-40"
            >
              +
            </button>
          </div>
          {item.cantidad >= item.stock && (
            <span className="small-label font-medium text-gamer-textMuted">Máximo disponible</span>
          )}
          <button
            type="button"
            aria-label={`Quitar ${item.nombre} del carrito`}
            onClick={() => onRemoveProduct(item.id)}
            className="cursor-pointer rounded-full bg-red-500 p-1 transition-transform duration-200 hover:scale-[1.25] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400 mx-3"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M4 7l16 0" />
              <path d="M10 11l0 6" />
              <path d="M14 11l0 6" />
              <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
              <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
            </svg>
          </button>
        </div>
      </div>
      <div className="self-center sm:text-right">
        <span className="small-label block font-medium text-gamer-textMuted">Subtotal</span>
        <span className="price-display">
          {precioARS(item.precio * item.cantidad)}
        </span>
      </div>
    </motion.article>
  )
}

export default CarritoItem
