import { Link } from 'react-router-dom'

function ProductoNoEncontrado() {
  return (
    <section className="page-container page-top page-bottom bg-gamer-bg text-gamer-textMain">
      <div className="mx-auto max-w-2xl rounded-2xl border border-gamer-primary/30 bg-gamer-card p-8 text-center shadow-[0_0_32px_rgb(var(--gamer-primary)/0.12)]">
        <p className="eyebrow">Catálogo</p>
        <h1 className="page-title mb-4">¡Ups! Producto no encontrado</h1>
        <p className="body-copy mb-6 text-gamer-textMuted">
          No existe un producto con ese identificador. Volvé al catálogo para seguir explorando.
        </p>
        <Link
          to="/productos"
          className="primary-cta inline-flex rounded-lg bg-gamer-primary px-5 py-3 text-white transition hover:bg-gamer-primary/80"
        >
          Volver al catálogo
        </Link>
      </div>
    </section>
  )
}

export default ProductoNoEncontrado
