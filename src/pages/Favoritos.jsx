import { Link } from 'react-router-dom'
import ProductoCard from '../components/ProductoCard'

function Favoritos({ productosFavoritos, onAddToCart, onToggleFavorite }) {
  return (
    <section className="page-top page-bottom bg-gamer-bg text-gamer-textMain">
      <div className="page-container">
        <p className="eyebrow">Nexus Gaming Store</p>
        <h1 className="page-title mb-4">Mis favoritos</h1>

        {productosFavoritos.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gamer-primary/30 bg-gamer-card p-10 text-center">
            <h2 className="section-title">Todavía no guardaste favoritos</h2>
            <p className="body-copy mt-2 text-gamer-textMuted">
              Explorá el catálogo y guardá los productos que quieras tener a mano.
            </p>
            <Link
              to="/productos"
              className="primary-cta mt-6 inline-flex rounded-lg bg-gamer-primary px-5 py-3 text-white transition hover:bg-gamer-primary/80"
            >
              Ver productos
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
            {productosFavoritos.map((producto) => (
              <ProductoCard
                key={producto.id}
                producto={producto}
                onAddToCart={onAddToCart}
                isFavorite
                onToggleFavorite={onToggleFavorite}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default Favoritos
