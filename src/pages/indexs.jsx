import { Link } from 'react-router-dom'
import bannerImage from '../assets/banner.png'
import bannerImageLight from '../assets/banner-light.jpg'

function Inicio({ isLightMode = false }) {
  return (
    <section className="relative isolate flex-1 overflow-hidden bg-gamer-bg">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-1/2 size-96 -translate-y-1/2 rounded-full bg-gamer-primary/15 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-6 px-4 py-4 sm:px-6 md:min-h-[calc(100svh-22rem)] md:grid-cols-2 md:gap-8 md:py-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-gamer-accent sm:text-sm">
            Nexus Gaming
          </p>
          <h1 className="home-title text-3xl font-bold leading-tight tracking-tight text-gamer-textMain sm:text-4xl">
            Equipate con la mejor tecnología{' '}
            <span className="text-gamer-primary">gaming</span>
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-6 text-gamer-textMuted sm:text-base sm:leading-7">
            En Nexus Gaming ofrecemos componentes y periféricos de alto rendimiento
            para llevar tu experiencia de juego al siguiente nivel.
          </p>
          <Link
            to="/productos"
            className="mt-6 inline-flex items-center gap-3 rounded-lg border border-gamer-primary bg-gamer-primary px-5 py-2.5 text-sm font-bold text-white shadow-[0_0_24px_rgba(127,82,255,0.3)] transition duration-300 hover:-translate-y-0.5 hover:scale-105 hover:border-gamer-accent hover:bg-gamer-primary/90 hover:shadow-[0_0_30px_rgba(127,82,255,0.5)] active:scale-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gamer-accent"
          >
            Ver catálogo
            <span aria-hidden="true">→</span>
          </Link>
          <ul
            aria-label="Beneficios de la tienda"
            className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs text-gamer-textMuted sm:text-sm"
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

        <div className="relative mx-auto flex w-full max-w-2xl items-center justify-center">
          <div
            aria-hidden="true"
            className="absolute inset-8 rounded-full bg-gamer-primary/20 blur-3xl"
          />
          <img
            src={isLightMode ? bannerImageLight : bannerImage}
            alt="Teclado, mouse y tarjeta gráfica gamer con iluminación violeta y celeste"
            className="relative aspect-video w-full rounded-2xl border border-gamer-primary/25 object-cover shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
          />
        </div>
      </div>
    </section>
  )
}

export default Inicio