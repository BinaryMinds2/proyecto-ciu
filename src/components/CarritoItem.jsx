const precioARS = (importe) =>
  new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(importe)

function CarritoItem({ item, onUpdateQuantity, onRemoveProduct }) {
  return (
    <article
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
            <span className="min-w-8 text-center font-semibold">{item.cantidad}</span>
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
            onClick={() => onRemoveProduct(item.id)}
            className="secondary-copy font-semibold text-red-400 transition hover:text-red-300"
          >
            Quitar
          </button>
        </div>
      </div>
      <div className="self-center sm:text-right">
        <span className="small-label block font-medium text-gamer-textMuted">Subtotal</span>
        <span className="price-display">
          {precioARS(item.precio * item.cantidad)}
        </span>
      </div>
    </article>
  )
}

export default CarritoItem
