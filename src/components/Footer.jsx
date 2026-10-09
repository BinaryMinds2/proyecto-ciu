import { Link } from 'react-router-dom'

const quickLinks = [
  { label: 'Inicio', to: '/' },
  { label: 'Productos', to: '/productos' },
  { label: 'Carrito', to: '/carrito' },
  { label: 'Contacto', to: '/contacto' },
]

const socialLinks = [
  {
    label: 'Instagram',
    href: 'https://instagram.com/nexusgaming',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
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
        width="24"
        height="24"
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
    href: 'https://facebook.com/nexusgaming',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
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

function Footer() {
  return (
    <footer className="border-t border-gamer-accent/20 bg-gamer-bg text-gamer-textMain">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3 lg:px-8">
        <div className="max-w-sm">
          <Link to="/" className="inline-flex items-center gap-3" aria-label="Nexus Gaming, inicio">
            <span className="grid size-10 place-items-center rounded border border-gamer-primary/50 bg-gamer-card text-gamer-primary shadow-[0_0_14px_rgba(127,82,255,0.18)]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="size-6"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M6.636 5.636a9 9 0 0 1 13.397 .747l-5.619 5.617l5.619 5.617a9 9 0 1 1 -13.397 -11.981" />
                <path d="M11.5 7.5a1 1 0 1 0 2 0a1 1 0 0 0 -2 0" />
              </svg>
            </span>
            <span>
              <span className="block text-sm font-black tracking-[0.14em]">NEXUS</span>
              <span className="block text-[0.65rem] font-semibold tracking-[0.24em] text-gamer-accent">
                GAMING
              </span>
            </span>
          </Link>
          <p className="mt-4 text-sm leading-6 text-gamer-textMain/65">
            Tu próximo nivel empieza con el equipo indicado.
          </p>
        </div>

        <div>
          <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-gamer-accent">
            Enlaces rápidos
          </h2>
          <ul className="mt-4 grid grid-cols-2 gap-3">
            {quickLinks.map(({ label, to }) => (
              <li key={to}>
                <Link
                  to={to}
                  className="group flex items-center gap-2 rounded-lg border border-gamer-primary/40 bg-gamer-card px-3 py-2.5 text-sm font-medium text-gamer-textMain/80 transition-all duration-300 hover:border-gamer-accent hover:text-gamer-accent hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gamer-accent"
                >
                  <span
                    aria-hidden="true"
                    className="text-xs font-black text-gamer-primary transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-gamer-accent"
                  >
                    &gt;
                  </span>
                  <span>{label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-gamer-accent">
            Comunidad
          </h2>
          <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-3">
            {socialLinks.map(({ label, href, icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Visitar ${label} de Nexus Gaming`}
                  className="inline-flex text-gamer-accent transition-transform duration-200 hover:scale-110 hover:text-gamer-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gamer-accent"
                >
                  {icon}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-gamer-textMain/10 px-4 py-5 text-center text-xs text-gamer-textMain/50 sm:px-6">
        © {new Date().getFullYear()} Nexus Gaming. Proyecto académico para la materia de la facultad.
      </div>
    </footer>
  )
}

export default Footer