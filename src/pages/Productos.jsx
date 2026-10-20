import { useMemo, useState } from 'react'
import { motion } from "motion/react"
import ProductoCard from '../components/ProductoCard'
import { productos } from '../data/productos'

const categorias = ['Todas', 'Periféricos', 'Hardware', 'Setup']
const productosPorPagina = 12

function Productos({ onAddToCart }) {
  const [busqueda, setBusqueda] = useState('')
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todas')
  const [soloConStock, setSoloConStock] = useState(false)
  const [ordenPrecio, setOrdenPrecio] = useState('sin-orden')
  const [pagina, setPagina] = useState(1)

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

  const contenedorGridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, 
      },
    },
  };

  const tarjetaVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" }
    },
  };

  const cantidadPaginas = Math.ceil(productosFiltrados.length / productosPorPagina)
  const indiceInicial = (pagina - 1) * productosPorPagina
  const productosPagina = productosFiltrados.slice(indiceInicial, indiceInicial + productosPorPagina)

  return (
    <section className="bg-gamer-bg px-4 py-12 text-gamer-textMain sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.25em] text-gamer-accent">
            Nexus Gaming Store
          </p>
          <h1 className="mb-4 text-4xl font-bold text-gamer-textMain sm:text-5xl">Todos los productos</h1>
          <p className="max-w-2xl text-gamer-textMain/70">
            Encontrá el equipamiento que necesitás para llevar tu setup al siguiente nivel.
          </p>
        </div>

        <div className="mb-10 rounded-xl border border-gamer-primary/20 bg-gamer-card p-5">
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1.5fr)_minmax(220px,1fr)]">
            <label className="flex flex-col gap-2 text-sm font-semibold text-gamer-textMain">
              Buscar por nombre
              <input
                type="search"
                value={busqueda}
                onChange={(event) => {
                  setBusqueda(event.target.value)
                  setPagina(1)
                }}
                placeholder="Ej. teclado, mouse..."
                className="rounded-lg border border-gamer-primary/30 bg-gamer-bg px-4 py-3 font-normal text-gamer-textMain outline-none transition placeholder:text-gamer-textMain/50 focus:border-gamer-accent focus:ring-2 focus:ring-gamer-accent/30"
              />
            </label>

            <label className="flex flex-col gap-2 text-sm font-semibold text-gamer-textMain">
              Ordenar por precio
              <select
                value={ordenPrecio}
                onChange={(event) => {
                  setOrdenPrecio(event.target.value)
                  setPagina(1)
                }}
                className="rounded-lg border border-gamer-primary/30 bg-gamer-bg px-4 py-3 font-normal text-gamer-textMain outline-none focus:border-gamer-accent focus:ring-2 focus:ring-gamer-accent/30"
              >
                <option value="sin-orden">Orden predeterminado</option>
                <option value="menor-mayor">Menor a mayor</option>
                <option value="mayor-menor">Mayor a menor</option>
              </select>
            </label>
          </div>

          <div className="mt-5 flex flex-col gap-5 border-t border-gamer-primary/20 pt-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2" aria-label="Filtrar por categoría">
              {categorias.map((categoria) => (
                <button
                  key={categoria}
                  type="button"
                  onClick={() => {
                    setCategoriaSeleccionada(categoria)
                    setPagina(1)
                  }}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    categoriaSeleccionada === categoria
                      ? 'bg-gamer-accent text-gamer-bg'
                      : 'border border-gamer-primary/30 text-gamer-textMain hover:border-gamer-accent hover:text-gamer-accent'
                  }`}
                >
                  {categoria}
                </button>
              ))}
            </div>

            <label className="flex cursor-pointer items-center gap-3 text-sm font-semibold text-gamer-textMain">
              <input
                type="checkbox"
                checked={soloConStock}
                onChange={(event) => {
                  setSoloConStock(event.target.checked)
                  setPagina(1)
                }}
                className="h-4 w-4 accent-gamer-accent"
              />
              Solo productos con stock disponible
            </label>
          </div>
        </div>

        <p className="mb-5 text-sm text-gamer-textMain/70" aria-live="polite">
          {productosFiltrados.length > 0
            ? `Mostrando ${indiceInicial + 1}–${Math.min(indiceInicial + productosPorPagina, productosFiltrados.length)} de ${productosFiltrados.length} productos`
            : '0 productos encontrados'}
        </p>

        {productosFiltrados.length > 0 ? (
          <motion.div 
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            variants={contenedorGridVariants}
            initial="hidden"
            animate="visible"
          >
            {productosPagina.map((producto) => (
              <motion.div
                key={producto.id}
                variants={tarjetaVariants}
                whileHover={{ 
                  y: -8, 
                  boxShadow: "0px 0px 20px rgba(127, 82, 255, 0.4)",
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.98 }}
                className="h-full rounded-2xl overflow-hidden bg-gamer-card border border-gamer-primary/20 hover:border-gamer-accent/60 transition-colors duration-300"
              >
                <ProductoCard
                  producto={producto}
                  onAddToCart={onAddToCart}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="rounded-xl border border-dashed border-gamer-primary/30 bg-gamer-card p-10 text-center"
          >
            <h2 className="text-xl font-bold text-gamer-textMain">No encontramos productos</h2>
            <p className="mt-2 text-gamer-textMain/70">Probá cambiar la búsqueda o los filtros seleccionados.</p>
          </motion.div>
        )}

        {cantidadPaginas > 1 && (
          <nav className="mt-10 flex items-center justify-center gap-2" aria-label="Paginación de productos">
            <button
              type="button"
              onClick={() => setPagina((paginaActual) => Math.max(1, paginaActual - 1))}
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
                onClick={() => setPagina(numeroPagina)}
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
              onClick={() => setPagina((paginaActual) => Math.min(cantidadPaginas, paginaActual + 1))}
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