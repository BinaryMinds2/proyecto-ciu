import { Link } from 'react-router-dom'
import bannerImage from '../assets/banner.png'
import bannerImageLight from '../assets/banner-light.jpg'
import ProductoCard from '../components/ProductoCard'
import { productos } from '../data/productos'

const categorias = [...new Set(productos.map((producto) => producto.categoria))]
const productosDestacados = productos.filter((producto) => producto.destacado && producto.stock > 0)

function Inicio({
  isLightMode = false,
  onAddToCart,
  favoriteIds,
  onToggleFavorite,
}) {
  const categoriasRepresentadas = categorias
    .map((categoria) => ({
      categoria,
      producto: productos.find((producto) => producto.categoria === categoria && producto.stock > 0),
    }))
    .filter(({ producto }) => producto)

  return (
    <div className="bg-gamer-bg">
      <section className="relative isolate overflow-hidden bg-gamer-bg">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 top-1/2 size-96 -translate-y-1/2 rounded-full bg-gamer-primary/15 blur-3xl"
        />

        <div className="page-container page-top relative grid items-start gap-6 pb-8 lg:grid-cols-[1.05fr_1fr] lg:gap-12">
          <div className="max-w-2xl">
          <p className="eyebrow">
            Nexus Gaming
          </p>
          <h1 className="hero-title text-4xl sm:text-5xl xl:text-6xl">
            Equipate con la mejor tecnología{' '}
            <span className="text-gamer-primary">gaming</span>
          </h1>
          <p className="lead mt-4 max-w-xl">
            En Nexus Gaming ofrecemos componentes y periféricos de alto rendimiento
            para llevar tu experiencia de juego al siguiente nivel.
          </p>
          <Link
            to="/productos"
            className="primary-cta mt-6 inline-flex items-center gap-3 rounded-lg border border-gamer-primary bg-gamer-primary px-5 py-2.5 text-sm text-white shadow-[0_0_24px_rgba(127,82,255,0.3)] transition duration-300 hover:-translate-y-0.5 hover:scale-105 hover:border-gamer-accent hover:bg-gamer-primary/90 hover:shadow-[0_0_30px_rgba(127,82,255,0.5)] active:scale-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gamer-accent"
          >
            Ver catálogo
            <span aria-hidden="true">→</span>
          </Link>
          <ul
            aria-label="Beneficios de la tienda"
            className="secondary-copy mt-5 flex flex-wrap gap-x-5 gap-y-2 text-gamer-textMuted md:flex-nowrap"
          >
            <li className="inline-flex items-center gap-1.5">
              <svg aria-hidden="true" className="size-4 shrink-0 text-gamer-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 7h11v10H3zM14 10h4l3 3v4h-7z" />
                <circle cx="7.5" cy="18" r="1.5" />
                <circle cx="17.5" cy="18" r="1.5" />
              </svg>
              Envíos a todo el país
            </li>
            <li className="inline-flex items-center gap-1.5">
              <svg aria-hidden="true" className="size-4 shrink-0 text-gamer-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
              Garantía oficial
            </li>
            <li className="inline-flex items-center gap-1.5">
              <svg aria-hidden="true" className="size-4 shrink-0 text-gamer-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="5" width="20" height="14" rx="2" />
                <path d="M2 10h20M6 15h3" />
              </svg>
              Pagos seguros
            </li>
          </ul>
          </div>

          <div className="relative mx-auto flex w-full max-w-3xl items-center justify-center self-center max-[359px]:-mx-4 max-[359px]:w-[calc(100%+2rem)] lg:self-center">
            <div
              aria-hidden="true"
              className="absolute inset-8 rounded-full bg-gamer-primary/20 blur-3xl"
            />
            <img
              src={isLightMode ? bannerImageLight : bannerImage}
              alt="Teclado, mouse y tarjeta gráfica gamer con iluminación violeta y celeste"
              loading="lazy"
              decoding="async"
              className="relative aspect-video w-full rounded-2xl border border-gamer-primary/25 object-cover shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
            />
          </div>
        </div>
      </section>

      <section className="page-container page-section">
        <div className="mb-7">
          <p className="eyebrow">
            Encontrá lo que buscás
          </p>
          <h2 className="section-title">Explorá por categoría</h2>
        </div>
        <div className="grid gap-5 lg:grid-cols-3">
          {categoriasRepresentadas.map(({ categoria, producto }) => (
            <Link
              key={categoria}
              to={`/productos?${new URLSearchParams({ categoria })}`}
              className="group overflow-hidden rounded-xl border border-gamer-primary/20 bg-gamer-card transition hover:border-gamer-accent/60 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gamer-accent"
            >
              <img
                src={producto.imagen}
                alt={producto.nombre}
                loading="lazy"
                decoding="async"
                className="aspect-[16/9] w-full object-cover transition duration-300 group-hover:scale-[1.02]"
              />
              <div className="flex items-center justify-between gap-3 p-4">
                <div>
                  <h3 className="card-title">{categoria}</h3>
                </div>
                <span className="text-xl text-gamer-accent" aria-hidden="true">→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-gamer-primary/15 bg-gamer-card/40">
        <div className="page-container page-section">
          <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">
                Selección Nexus
              </p>
              <h2 className="section-title">Productos destacados</h2>
            </div>
            <Link
              to="/productos"
              className="secondary-copy font-semibold text-gamer-accent underline underline-offset-4 hover:text-gamer-textMain"
            >
              Ver todos los productos →
            </Link>
          </div>
          <div className="grid gap-6 lg:grid-cols-4">
            {productosDestacados.slice(0, 4).map((producto) => (
              <ProductoCard
                key={producto.id}
                producto={producto}
                onAddToCart={onAddToCart}
                isFavorite={favoriteIds.includes(producto.id)}
                onToggleFavorite={onToggleFavorite}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Inicio