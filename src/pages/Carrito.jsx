import { Link } from 'react-router-dom'
import CarritoItem from '../components/CarritoItem'
import { precioARS } from '../utils/format'

function Carrito({ cart, onUpdateQuantity, onRemoveProduct }) {
  const cantidadTotal = cart.reduce((total, item) => total + item.cantidad, 0)
  const total = cart.reduce((acumulado, item) => acumulado + item.precio * item.cantidad, 0)

  return (
    <section className="bg-gamer-bg px-4 py-12 text-gamer-textMain sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="eyebrow mb-2">
          Nexus Gaming Store
        </p>
        <h1 className="page-title mb-3">Tu carrito</h1>
        <p className="lead mb-8">
          {cantidadTotal} {cantidadTotal === 1 ? 'producto' : 'productos'} en tu compra.
        </p>

        {cart.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gamer-primary/30 bg-gamer-card p-10 text-center">
            <h2 className="section-title">Tu carrito está vacío</h2>
            <p className="body-copy mt-2 text-gamer-textMuted">
              Explorá el catálogo y agregá los productos que quieras comprar.
            </p>
            <Link
              to="/productos"
              className="primary-cta mt-6 inline-flex rounded-lg bg-gamer-primary px-5 py-3 text-white transition hover:bg-gamer-primary/80"
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

              <aside className="rounded-xl border border-gamer-primary/20 bg-gamer-card p-5 lg:sticky lg:top-24">
                <h2 className="section-title mb-5">Resumen de compra</h2>
                <div className="secondary-copy flex justify-between gap-4 border-b border-gamer-textMain/10 pb-4">
                  <span className="text-gamer-textMuted">
                    Subtotal ({cantidadTotal} {cantidadTotal === 1 ? 'producto' : 'productos'})
                  </span>
                  <span>{precioARS(total)}</span>
                </div>
                <div className="price-display flex justify-between gap-4 pt-4">
                  <span>Total</span>
                  <span className="text-gamer-accent">{precioARS(total)}</span>
                </div>
                <p className="small-label mt-3 text-gamer-textMuted">
                  El total no incluye costos de envío.
                </p>
                <Link
                  to="/checkout"
                  className="primary-cta mt-5 block w-full rounded-lg bg-gamer-primary px-4 py-3 text-center text-white shadow-lg shadow-gamer-primary/20 transition hover:bg-gamer-primary/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gamer-accent"
                >
                  Continuar con la compra
                </Link>
                <Link
                  to="/productos"
                  className="secondary-copy mt-3 block text-center font-semibold text-gamer-accent underline underline-offset-4 hover:text-gamer-textMain"
                >
                  Seguir comprando
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