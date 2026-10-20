import { Link } from 'react-router-dom'
import CarritoItem from '../components/CarritoItem'

const precioARS = (importe) =>
  new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(importe)

function Carrito({ cart, onUpdateQuantity, onRemoveProduct }) {
  const cantidadTotal = cart.reduce((total, item) => total + item.cantidad, 0)
  const total = cart.reduce((acumulado, item) => acumulado + item.precio * item.cantidad, 0)

  return (
    <section className="bg-gamer-bg px-4 py-12 text-gamer-textMain sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="mb-2 text-sm font-bold uppercase tracking-[0.25em] text-gamer-accent">
          Nexus Gaming Store
        </p>
        <h1 className="mb-3 text-4xl font-bold text-gamer-textMain sm:text-5xl">Tu carrito</h1>
        <p className="mb-8 text-gamer-textMain/70">
          {cantidadTotal} {cantidadTotal === 1 ? 'producto' : 'productos'} en tu compra.
        </p>

        {cart.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gamer-primary/30 bg-gamer-card p-10 text-center">
            <h2 className="text-2xl font-bold text-gamer-textMain">Tu carrito está vacío</h2>
            <p className="mt-2 text-gamer-textMain/70">
              Explorá el catálogo y agregá los productos que quieras comprar.
            </p>
            <Link
              to="/productos"
              className="mt-6 inline-flex rounded-lg bg-gamer-primary px-5 py-3 font-semibold text-white transition hover:bg-gamer-primary/80"
            >
              Ver productos
            </Link>
          </div>
        ) : (
          <>
            <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
              <div className="space-y-4">
                {cart.map((item) => (
                  <CarritoItem
                    key={item.id}
                    item={item}
                    onUpdateQuantity={onUpdateQuantity}
                    onRemoveProduct={onRemoveProduct}
                  />
                ))}
              </div>

              <aside className="rounded-xl border border-gamer-primary/20 bg-gamer-card p-5">
                <h2 className="mb-5 text-xl font-bold text-gamer-textMain">Resumen de compra</h2>
                <div className="flex justify-between gap-4 border-b border-gamer-textMain/10 pb-4 text-sm">
                  <span className="text-gamer-textMain/70">
                    Subtotal ({cantidadTotal} {cantidadTotal === 1 ? 'producto' : 'productos'})
                  </span>
                  <span>{precioARS(total)}</span>
                </div>
                <div className="flex justify-between gap-4 pt-4 text-lg font-bold">
                  <span>Total</span>
                  <span className="text-gamer-accent">{precioARS(total)}</span>
                </div>
                <p className="mt-3 text-xs text-gamer-textMain/60">
                  El total no incluye costos de envío.
                </p>
                <Link
                  to="/checkout"
                  className="mt-5 block rounded-lg bg-gamer-primary px-4 py-3 text-center font-bold text-white transition hover:bg-gamer-primary/80"
                >
                  Continuar con la compra
                </Link>
              </aside>
            </div>

          </>
        )}
      </div>
    </section>
  )
}

export default Carrito