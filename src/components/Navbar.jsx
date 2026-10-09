import { useState } from 'react'
import { Link } from 'react-router-dom'

const navLinks = [
  { label: 'Inicio', to: '/' },
  { label: 'Productos', to: '/productos' },
  { label: 'Contacto', to: '/contacto' },
]

function Navbar({ cartCount = 0 }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const itemCount = Math.max(0, Number(cartCount) || 0)

  return (
    <header className="sticky top-0 z-50 border-b border-gamer-primary/20 bg-gamer-bg/95 shadow-[0_8px_30px_rgba(127,82,255,0.08)] backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link
          to="/"
          aria-label="Nexus Gaming, inicio"
          className="group flex items-center gap-3"
          onClick={() => setMenuOpen(false)}
        >
          <span className="grid size-10 place-items-center rounded border border-gamer-primary/50 bg-gamer-card text-lg font-black text-gamer-primary shadow-[0_0_18px_rgba(127,82,255,0.25)] transition group-hover:shadow-[0_0_24px_rgba(127,82,255,0.45)]">
            N
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-black tracking-[0.14em] text-gamer-textMain">
              NEXUS
            </span>
            <span className="block text-[0.65rem] font-semibold tracking-[0.24em] text-gamer-accent">
              GAMING
            </span>
          </span>
        </Link>

        <nav aria-label="Navegación principal" className="hidden items-center gap-8 md:flex">
          {navLinks.map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              className="text-sm font-medium text-gamer-textMain/75 transition hover:text-gamer-accent"
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/carrito"
            aria-label={`Carrito, ${itemCount} ${itemCount === 1 ? 'producto' : 'productos'}`}
            className="relative grid size-10 place-items-center rounded border border-gamer-accent/25 bg-gamer-card text-gamer-accent transition hover:border-gamer-accent/70 hover:shadow-[0_0_18px_rgba(0,240,255,0.2)]"
          >
            <svg aria-hidden="true" className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 4h2l2.2 11.1a2 2 0 0 0 2 1.6h8.9a2 2 0 0 0 2-1.6L22 8H6" />
              <circle cx="10" cy="20" r="1" />
              <circle cx="18" cy="20" r="1" />
            </svg>
            <span className="absolute -right-2 -top-2 grid min-h-5 min-w-5 place-items-center rounded-full border border-gamer-bg bg-gamer-primary px-1 text-[0.65rem] font-bold leading-none text-white shadow-[0_0_10px_rgba(127,82,255,0.55)]">
              {itemCount > 99 ? '99+' : itemCount}
            </span>
          </Link>

          <button
            type="button"
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
            className="grid size-10 place-items-center rounded border border-gamer-primary/30 bg-gamer-card text-gamer-textMain transition hover:border-gamer-primary md:hidden"
          >
            <svg aria-hidden="true" className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {menuOpen ? <path d="m6 6 12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Navegación móvil"
          className="border-t border-gamer-primary/20 bg-gamer-card px-4 py-3 md:hidden"
        >
          <div className="mx-auto flex max-w-7xl flex-col">
            {[...navLinks.slice(0, 2), { label: 'Carrito', to: '/carrito' }, navLinks[2]].map(
              ({ label, to }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setMenuOpen(false)}
                  className="border-b border-gamer-textMain/10 py-3 text-sm font-medium text-gamer-textMain/85 last:border-0 hover:text-gamer-accent"
                >
                  {label}
                  {to === '/carrito' && (
                    <span className="ml-2 text-xs text-gamer-accent">({itemCount})</span>
                  )}
                </Link>
              ),
            )}
          </div>
        </nav>
      )}
    </header>
  )
}

export default Navbar