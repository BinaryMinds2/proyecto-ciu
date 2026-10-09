import { Link } from 'react-router-dom'

const quickLinks = [
  { label: 'Inicio', to: '/' },
  { label: 'Productos', to: '/productos' },
  { label: 'Carrito', to: '/carrito' },
  { label: 'Contacto', to: '/contacto' },
]

const socialLinks = [
  { label: 'Instagram', href: 'https://instagram.com/nexusgaming' },
  { label: 'Twitch', href: 'https://twitch.tv/nexusgaming' },
  { label: 'Discord', href: 'https://discord.com' },
]

function Footer() {
  return (
    <footer className="border-t border-gamer-accent/20 bg-gamer-bg text-gamer-textMain">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3 lg:px-8">
        <div className="max-w-sm">
          <Link to="/" className="inline-flex items-center gap-3" aria-label="Nexus Gaming, inicio">
            <span className="grid size-10 place-items-center rounded border border-gamer-primary/50 bg-gamer-card font-black text-gamer-primary">
              N
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
          <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3">
            {quickLinks.map(({ label, to }) => (
              <li key={to}>
                <Link to={to} className="text-sm text-gamer-textMain/70 transition hover:text-gamer-primary">
                  {label}
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
            {socialLinks.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-gamer-textMain/70 transition hover:text-gamer-primary"
                >
                  {label}
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