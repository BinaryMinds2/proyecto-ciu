import { Link } from 'react-router-dom'
import nexusWordmark from '../assets/nexus-wordmark.png'
import nexusWordmarkLight from '../assets/nexus-wordmark-light.jpg'
import { productos } from '../data/productos'

const categorias = [...new Set(productos.map((producto) => producto.categoria))]
const enlacesInformacion = [
  { label: 'Nosotros', to: '/nosotros' },
  { label: 'Contacto', to: '/contacto' },
]

const socialLinks = [
  {
    label: 'Instagram',
    href: 'https://instagram.com',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M3 7a4 4 0 0 1 4 -4h10a4 4 0 0 1 4 4v10a4 4 0 0 1 -4 4h-10a4 4 0 0 1 -4 -4l0 -10" />
        <path d="M8.5 12a3.5 3.5 0 1 0 7 0a3.5 3.5 0 0 0 -7 0" />
        <path d="M17 7v.01" />
      </svg>
    ),
  },
  {
    label: 'Discord',
    href: 'https://discord.com',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M8 12a1 1 0 1 0 2 0a1 1 0 0 0 -2 0" />
        <path d="M14 12a1 1 0 1 0 2 0a1 1 0 0 0 -2 0" />
        <path d="M15.5 17c0 1 1.5 3 2 3c1.5 0 2.833 -1.667 3.5 -3c.667 -1.667 .5 -5.833 -1.5 -11.5c-1.457 -1.015 -3 -1.34 -4.5 -1.5l-.972 1.923a11.913 11.913 0 0 0 -4.053 0l-.975 -1.923c-1.5 .16 -3.043 .485 -4.5 1.5c-2 5.667 -2.167 9.833 -1.5 11.5c.667 1.333 2 3 3.5 3c.5 0 2 -2 2 -3" />
        <path d="M7 16.5c3.5 1 6.5 1 10 0" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: 'https://facebook.com',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3" />
      </svg>
    ),
  },
]

function Footer({ isLightMode = false }) {
  return (
    <footer className="border-t border-gamer-accent/20 bg-gamer-bg text-gamer-textMain">
      <div className="mx-auto grid max-w-7xl items-start gap-8 px-4 py-8 sm:px-6 md:grid-cols-4 lg:px-8">
        
        {/* Logo y presentación de la tienda */}
        <div>
          <Link
            to="/"
            className="inline-flex items-center gap-3 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gamer-accent"
            aria-label="Nexus Gaming, inicio"
          >
            <img
              src={isLightMode ? nexusWordmarkLight : nexusWordmark}
              alt="Nexus Gaming"
              className="aspect-[7/4] w-40 rounded-lg object-cover shadow-[0_0_18px_rgba(127,82,255,0.16)]"
            />
          </Link>
          <p className="small-label mt-3 text-gamer-textMuted">
            Tu próximo nivel empieza con el equipo indicado.
          </p>
        </div>

        <div>
          <h2 className="eyebrow mb-3">
            Categorías
          </h2>
          <ul className="flex flex-col gap-2">
            {categorias.map((categoria) => (
              <li key={categoria}>
                <Link
                  to={`/productos?categoria=${encodeURIComponent(categoria)}`}
                  className="small-label font-medium text-gamer-textMuted transition-colors duration-200 hover:text-gamer-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gamer-accent"
                >
                  {categoria}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="eyebrow mb-3">
            Información
          </h2>
          <ul className="flex flex-col gap-2">
            {enlacesInformacion.map(({ label, to }) => (
              <li key={to}>
                <Link
                  to={to}
                  className="small-label font-medium text-gamer-textMuted transition-colors duration-200 hover:text-gamer-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gamer-accent"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:justify-self-end md:text-right">
          <h2 className="eyebrow mb-3">
            Comunidad
          </h2>
          <ul className="flex flex-wrap gap-3 md:justify-end">
            {socialLinks.map(({ label, href, icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Visitar ${label} de Nexus Gaming`}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-gamer-accent/30 bg-gamer-footer text-gamer-accent transition-all duration-300 hover:scale-110 hover:border-gamer-accent hover:text-cyan-300 hover:shadow-[0_0_12px_rgba(6,182,212,0.4)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gamer-accent"
                >
                  {icon}
                </a>
              </li>
            ))}
          </ul>
        </div>

      </div>

      <div className="small-label border-t border-gamer-textMain/10 px-4 py-4 text-center text-gamer-textMuted sm:px-6">
        © {new Date().getFullYear()} BINARY MINDS. Todos los derechos reservados.
      </div>
    </footer>
  )
}

export default Footer