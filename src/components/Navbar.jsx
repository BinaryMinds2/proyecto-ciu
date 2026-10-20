import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import nexusSymbol from '../assets/nexus-symbol.png'
import nexusSymbolLight from '../assets/nexus-symbol-light.png'

const navLinks = [
  { label: 'Inicio', to: '/' },
  { label: 'Productos', to: '/productos' },
  { label: 'Contacto', to: '/contacto' },
  { label: 'Nosotros', to: '/nosotros' },
]

function Navbar({
  cartCount = 0,
  isLightMode = false,
  onToggleTheme,
  eyeRestMode = false,
  onToggleEyeRestMode,
  hideCart = false,
}) {
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()
  const itemCount = Math.max(0, Number(cartCount) || 0)
  const isCartPage = pathname === '/carrito'
  const mostrarCarrito = !hideCart && pathname !== '/checkout'

  useEffect(() => {
    const cerrarConEscape = (evento) => {
      if (evento.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', cerrarConEscape)
    return () => window.removeEventListener('keydown', cerrarConEscape)
  }, [])

  const enlaceActivo = (to) =>
    to === '/productos'
      ? pathname === '/productos' ||
        pathname.startsWith('/producto/') ||
        pathname.startsWith('/productos/')
      : pathname === to

  return (
    <header className="sticky top-0 z-50 border-b border-gamer-primary/20 bg-gamer-bg/95 shadow-[0_8px_30px_rgba(127,82,255,0.08)] backdrop-blur">
      <div className="mx-auto grid max-w-7xl grid-cols-[1fr_auto] items-center px-4 py-3 sm:px-6 md:grid-cols-[1fr_auto_1fr] lg:px-8">
        <Link
          to="/"
          aria-label="Nexus Gaming, inicio"
          className="group flex items-center gap-3 justify-self-start"
          onClick={() => setMenuOpen(false)}
        >
          <img
            src={isLightMode ? nexusSymbolLight : nexusSymbol}
            alt=""
            aria-hidden="true"
            className="size-10 rounded-xl border border-gamer-primary/50 object-cover shadow-[0_0_18px_rgba(127,82,255,0.25)] transition group-hover:shadow-[0_0_24px_rgba(127,82,255,0.45)]"
          />
          <span className="leading-tight">
            <span className="font-display block text-sm font-bold tracking-[0.14em] text-gamer-textMain">
              NEXUS
            </span>
            <span className="font-display block text-xs font-bold tracking-[0.24em] text-gamer-accent">
              GAMING
            </span>
          </span>
        </Link>

        <nav
          aria-label="Navegación principal"
          className="hidden items-center justify-self-center gap-8 md:flex"
        >
          {navLinks.map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              aria-current={enlaceActivo(to) ? 'page' : undefined}
              className={`relative py-2 text-sm font-medium transition-colors after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:origin-left after:scale-x-0 after:bg-gamer-accent after:transition-transform hover:text-gamer-accent hover:after:scale-x-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gamer-accent ${
                enlaceActivo(to)
                  ? 'text-gamer-accent after:scale-x-100'
                  : 'text-gamer-textMain/75'
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="col-start-2 flex items-center justify-self-end gap-3 md:col-start-3">
          <button
            type="button"
            aria-label={isLightMode ? 'Activar modo oscuro' : 'Activar modo claro'}
            aria-pressed={isLightMode}
            title={isLightMode ? 'Activar modo oscuro' : 'Activar modo claro'}
            onClick={onToggleTheme}
            className="grid size-10 place-items-center rounded-xl border border-gamer-primary/30 bg-gamer-card text-gamer-accent transition hover:border-gamer-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gamer-accent"
          >
            {isLightMode ? (
              <svg
                aria-hidden="true"
                className="size-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6.5 6.5 0 0 0 8.268 8.268c.344-.215.825-.003.803.401" />
              </svg>
            ) : (
              <svg
                aria-hidden="true"
                className="size-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
              </svg>
            )}
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              role="switch"
              aria-checked={eyeRestMode}
              aria-label={
                eyeRestMode
                  ? 'Desactivar modo descanso visual'
                  : 'Activar modo descanso visual'
              }
              title={eyeRestMode ? 'Desactivar modo descanso visual' : 'Activar modo descanso visual'}
              onClick={onToggleEyeRestMode}
              className={`eye-rest-toggle relative h-7 w-12 rounded-full border p-0.5 transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gamer-accent ${
                eyeRestMode
                  ? 'border-amber-200/60 bg-amber-100/30'
                  : 'border-gamer-accent/30 bg-gamer-card'
              }`}
            >
              <span
                aria-hidden="true"
                className={`grid size-5 place-items-center rounded-full shadow transition-transform ${
                  eyeRestMode
                    ? 'translate-x-5 bg-amber-100 text-amber-900'
                    : 'translate-x-0 bg-gamer-accent text-gamer-bg'
                }`}
              >
                <svg
                  className="size-3"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </span>
            </button>
            <span className="hidden text-xs font-semibold text-gamer-textMuted md:inline">
              Descanso visual
            </span>
          </div>

          {mostrarCarrito && <Link
            to="/carrito"
            aria-label={`Carrito, ${itemCount} ${itemCount === 1 ? 'producto' : 'productos'}`}
            aria-current={isCartPage ? 'page' : undefined}
            className={`group relative grid size-10 place-items-center rounded-xl border transition hover:shadow-[0_0_18px_rgba(0,240,255,0.25)] ${
              isCartPage
                ? 'border-gamer-accent/70 bg-gamer-accent/10 text-gamer-accent'
                : 'border-gamer-accent/25 bg-gamer-card text-gamer-accent hover:border-gamer-accent/70'
            }`}
          >
            <svg
              aria-hidden="true"
              className="size-5 transition-transform group-hover:scale-110"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 4h2l2.2 11.1a2 2 0 0 0 2 1.6h8.9a2 2 0 0 0 2-1.6L22 8H6" />
              <circle cx="10" cy="20" r="1" />
              <circle cx="18" cy="20" r="1" />
            </svg>
            <span
              key={itemCount}
              className={`cart-count-pop absolute -right-2 -top-2 grid min-h-5 min-w-5 place-items-center rounded-full border border-gamer-bg bg-gamer-primary px-1 text-xs font-bold leading-none text-white shadow-[0_0_10px_rgba(127,82,255,0.55)] ${
                itemCount > 0 ? 'scale-100' : 'scale-90'
              }`}
            >
              {itemCount > 99 ? '99+' : itemCount}
            </span>
          </Link>}

          <button
            type="button"
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
            className="grid size-10 place-items-center rounded-xl border border-gamer-primary/30 bg-gamer-card text-gamer-textMain transition hover:border-gamer-primary md:hidden"
          >
            <svg
              aria-hidden="true"
              className="size-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              {menuOpen ? (
                <path d="m6 6 12 12M18 6 6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
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
            {[...navLinks.slice(0, 2), { label: 'Carrito', to: '/carrito' }, ...navLinks.slice(2)].map(
              ({ label, to }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setMenuOpen(false)}
                  aria-current={enlaceActivo(to) || (to === '/carrito' && isCartPage) ? 'page' : undefined}
                  className={`flex items-center justify-between border-b border-gamer-textMain/10 py-3 text-sm font-medium transition-colors last:border-0 hover:text-gamer-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gamer-accent ${
                    enlaceActivo(to) || (to === '/carrito' && isCartPage)
                      ? 'text-gamer-accent'
                      : 'text-gamer-textMain/85'
                  }`}
                >
                  <span>{label}</span>
                  {to === '/carrito' && itemCount > 0 && (
                    <span className="rounded-full border border-gamer-accent/30 bg-gamer-primary/30 px-2 py-0.5 text-xs font-bold text-gamer-accent">
                      {itemCount > 99 ? '99+' : itemCount}
                    </span>
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
