import { useMemo, useRef } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { useSearchParams } from 'react-router-dom'
import ProductoCard from '../components/ProductoCard'
import { productos } from '../data/productos'

const categorias = ['Todas', ...new Set(productos.map((producto) => producto.categoria))]
const productosPorPagina = 12
const ordenesValidos = ['sin-orden', 'menor-mayor', 'mayor-menor']

function Productos({ onAddToCart, favoriteIds, onToggleFavorite }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const resultadosRef = useRef(null)
  const categoriaURL = searchParams.get('categoria')
  const categoriaSeleccionada = categorias.includes(categoriaURL) ? categoriaURL : 'Todas'
  const busqueda = searchParams.get('q') ?? ''
  const ordenURL = searchParams.get('orden')
  const ordenPrecio = ordenesValidos.includes(ordenURL) ? ordenURL : 'sin-orden'
  const soloConStock = searchParams.get('stock') === 'true'
  const paginaURL = searchParams.get('pagina')
  const paginaSolicitada =
    paginaURL && /^[1-9]\d*$/.test(paginaURL) ? Number(paginaURL) : 1

  const crearParametrosFiltrados = () => {
    const parametros = new URLSearchParams()
    if (categoriaSeleccionada !== 'Todas') {
      parametros.set('categoria', categoriaSeleccionada)
    }
    if (busqueda.trim()) parametros.set('q', busqueda)
    if (ordenPrecio !== 'sin-orden') parametros.set('orden', ordenPrecio)
    if (soloConStock) parametros.set('stock', 'true')
    return parametros
  }

  const actualizarFiltro = (nombre, valor, replace = false) => {
    const parametros = crearParametrosFiltrados()

    const valorPorDefecto = {
      categoria: 'Todas',
      q: '',
      orden: 'sin-orden',
      stock: 'false',
    }[nombre]

    if (!valor || valor === valorPorDefecto) {
      parametros.delete(nombre)
    } else {
      parametros.set(nombre, valor)
    }
    setSearchParams(parametros, { replace })
  }

  const cambiarPagina = (nuevaPagina) => {
    const parametros = crearParametrosFiltrados()
    if (nuevaPagina === 1) {
      parametros.delete('pagina')
    } else {
      parametros.set('pagina', String(nuevaPagina))
    }
    setSearchParams(parametros)
    resultadosRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const productosFiltrados = useMemo(() => {
    const textoBuscado = busqueda.trim().toLowerCase()
    const resultado = productos.filter((producto) => {
      const coincideNombre = producto.nombre.toLowerCase().includes(textoBuscado)
      const coincideCategoria =
        categoriaSeleccionada === 'Todas' || producto.categoria === categoriaSeleccionada
      const coincideStock = !soloConStock || producto.stock > 0

      return coincideNombre && coincideCategoria && coincideStock
    })

    if (ordenPrecio === 'menor-mayor') {
      return [...resultado].sort((a, b) => a.precio - b.precio)
    }

    if (ordenPrecio === 'mayor-menor') {
      return [...resultado].sort((a, b) => b.precio - a.precio)
    }

    return resultado
  }, [busqueda, categoriaSeleccionada, ordenPrecio, soloConStock])

  const cantidadPaginas = Math.ceil(productosFiltrados.length / productosPorPagina)
  const pagina =
    paginaSolicitada <= Math.max(1, cantidadPaginas) ? paginaSolicitada : 1
  const indiceInicial = (pagina - 1) * productosPorPagina
  const productosPagina = productosFiltrados.slice(
    indiceInicial,
    indiceInicial + productosPorPagina,
  )
  const hayFiltrosActivos =
    categoriaSeleccionada !== 'Todas' ||
    Boolean(busqueda.trim()) ||
    ordenPrecio !== 'sin-orden' ||
    soloConStock
  const limpiarFiltros = () => setSearchParams(new URLSearchParams(), { replace: true })

  return (
    <section className="page-top page-bottom bg-gamer-bg text-gamer-textMain">
      <div className="page-container">
        <div className="mb-7">
          <p className="eyebrow">
            Nexus Gaming Store
          </p>
          <h1 className="page-title mb-4">
            {categoriaSeleccionada === 'Todas' ? 'Todos los productos' : categoriaSeleccionada}
          </h1>
          <p className="lead max-w-2xl">
            Encontrá el equipamiento que necesitás para llevar tu setup al siguiente nivel.
          </p>
        </div>

        <div className="mb-7 rounded-xl border border-gamer-primary/20 bg-gamer-card p-4 sm:p-5">
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1.5fr)_minmax(220px,1fr)_auto] lg:items-end">
            <label className="secondary-copy flex flex-col gap-2 font-semibold text-gamer-textMain">
              Buscar por nombre
              <input
                type="search"
                value={busqueda}
                onChange={(event) => actualizarFiltro('q', event.target.value, true)}
                placeholder="Ej. teclado, mouse..."
                className="rounded-lg border border-gamer-primary/30 bg-gamer-bg px-4 py-3 font-normal text-gamer-textMain outline-none transition placeholder:text-gamer-textMain/50 focus:border-gamer-accent focus:ring-2 focus:ring-gamer-accent/30"
              />
            </label>

            <label className="secondary-copy flex flex-col gap-2 font-semibold text-gamer-textMain">
              Ordenar por precio
              <select
                value={ordenPrecio}
                onChange={(event) => actualizarFiltro('orden', event.target.value)}
                className="rounded-lg border border-gamer-primary/30 bg-gamer-bg px-4 py-3 font-normal text-gamer-textMain outline-none focus:border-gamer-accent focus:ring-2 focus:ring-gamer-accent/30"
              >
                <option value="sin-orden">Orden predeterminado</option>
                <option value="menor-mayor">Menor a mayor</option>
                <option value="mayor-menor">Mayor a menor</option>
              </select>
            </label>

          </div>

          <div className="mt-4 flex flex-col gap-4 border-t border-gamer-primary/20 pt-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filtrar por categoría">
              {categorias.map((categoria) => (
                <button
                  key={categoria}
                  type="button"
                  aria-pressed={categoriaSeleccionada === categoria}
                  onClick={() => actualizarFiltro(
                    'categoria',
                    categoria === 'Todas' ? '' : categoria,
                  )}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    categoriaSeleccionada === categoria
                      ? 'bg-gamer-accent text-gamer-bg'
                      : 'border border-gamer-primary/30 text-gamer-textMain hover:border-gamer-accent hover:text-gamer-accent'
                  }`}
                >
                  {categoria}
                </button>
              ))}
              <label className="secondary-copy flex cursor-pointer items-center gap-2 font-semibold text-gamer-textMain sm:ml-auto">
                <input
                  type="checkbox"
                  checked={soloConStock}
                  onChange={(event) =>
                    actualizarFiltro('stock', String(event.target.checked))
                  }
                  className="h-4 w-4 shrink-0 accent-gamer-accent"
                />
                Solo con stock
              </label>
            </div>
            {hayFiltrosActivos && (
              <button
                type="button"
                onClick={limpiarFiltros}
                className="self-start text-sm font-semibold text-gamer-accent underline underline-offset-4 sm:self-center"
              >
                Limpiar filtros
              </button>
            )}
          </div>
        </div>

        <p
          ref={resultadosRef}
          className="secondary-copy mb-5 scroll-mt-24 text-gamer-textMuted"
          aria-live="polite"
        >
          {productosFiltrados.length > 0
            ? `Mostrando ${indiceInicial + 1}–${Math.min(indiceInicial + productosPorPagina, productosFiltrados.length)} de ${productosFiltrados.length} productos`
            : '0 productos encontrados'}
        </p>

        {productosFiltrados.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
            <AnimatePresence mode="popLayout">
              {productosPagina.map((producto, indice) => (
                <motion.div
                  key={producto.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.3, ease: 'easeOut', delay: indice * 0.03 },
                  }}
                  exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.15 } }}
                  transition={{ layout: { type: 'spring', stiffness: 350, damping: 30 } }}
                  whileHover={{
                    y: -8,
                    boxShadow: '0px 0px 20px rgba(127, 82, 255, 0.4)',
                    transition: { duration: 0.2 },
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="h-full rounded-xl"
                >
                  <ProductoCard
                    producto={producto}
                    onAddToCart={onAddToCart}
                    isFavorite={favoriteIds.includes(producto.id)}
                    onToggleFavorite={onToggleFavorite}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="rounded-xl border border-dashed border-gamer-primary/30 bg-gamer-card p-10 text-center"
          >
            <h2 className="section-title">No encontramos productos</h2>
            <p className="body-copy mt-2 text-gamer-textMuted">Probá cambiar la búsqueda o los filtros seleccionados.</p>
            <button
              type="button"
              onClick={limpiarFiltros}
              className="primary-cta mt-5 rounded-lg bg-gamer-primary px-4 py-2 text-sm text-white transition hover:bg-gamer-primary/80"
            >
              Limpiar filtros
            </button>
          </motion.div>
        )}

        {cantidadPaginas > 1 && (
          <nav className="mt-10 flex items-center justify-center gap-2" aria-label="Paginación de productos">
            <button
              type="button"
              onClick={() => cambiarPagina(Math.max(1, pagina - 1))}
              disabled={pagina === 1}
              aria-label="Ir a la página anterior"
              className="h-10 rounded-lg border border-gamer-primary/30 px-3 text-sm font-semibold text-gamer-textMain transition hover:border-gamer-accent hover:text-gamer-accent disabled:cursor-not-allowed disabled:opacity-40 sm:px-4"
            >
              <span className="sm:hidden" aria-hidden="true">‹</span>
              <span className="hidden sm:inline">Anterior</span>
            </button>
            {Array.from({ length: cantidadPaginas }, (_, indice) => indice + 1).map((numeroPagina) => (
              <button
                key={numeroPagina}
                type="button"
                onClick={() => cambiarPagina(numeroPagina)}
                aria-label={`Ir a la página ${numeroPagina}`}
                aria-current={pagina === numeroPagina ? 'page' : undefined}
                className={`h-10 min-w-10 rounded-lg px-3 text-sm font-semibold transition ${
                  pagina === numeroPagina
                    ? 'bg-gamer-accent text-gamer-bg'
                    : 'border border-gamer-primary/30 text-gamer-textMain hover:border-gamer-accent hover:text-gamer-accent'
                }`}
              >
                {numeroPagina}
              </button>
            ))}
            <button
              type="button"
              onClick={() => cambiarPagina(Math.min(cantidadPaginas, pagina + 1))}
              disabled={pagina === cantidadPaginas}
              aria-label="Ir a la página siguiente"
              className="h-10 rounded-lg border border-gamer-primary/30 px-3 text-sm font-semibold text-gamer-textMain transition hover:border-gamer-accent hover:text-gamer-accent disabled:cursor-not-allowed disabled:opacity-40 sm:px-4"
            >
              <span className="sm:hidden" aria-hidden="true">›</span>
              <span className="hidden sm:inline">Siguiente</span>
            </button>
          </nav>
        )}
      </div>
    </section>
  )
}

export default Productos