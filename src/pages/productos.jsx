import { useMemo, useState } from 'react'
import ProductoCard from '../components/ProductoCard'
import { productos } from '../data/productos'

const categorias = ['Todas', 'Periféricos', 'Hardware', 'Setup']

function Productos() {
  const [busqueda, setBusqueda] = useState('')
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todas')
  const [soloConStock, setSoloConStock] = useState(false)
  const [ordenPrecio, setOrdenPrecio] = useState('sin-orden')

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
                onChange={(event) => setBusqueda(event.target.value)}
                placeholder="Ej. teclado, mouse..."
                className="rounded-lg border border-gamer-primary/30 bg-gamer-bg px-4 py-3 font-normal text-gamer-textMain outline-none transition placeholder:text-gamer-textMain/50 focus:border-gamer-accent focus:ring-2 focus:ring-gamer-accent/30"
              />
            </label>

            <label className="flex flex-col gap-2 text-sm font-semibold text-gamer-textMain">
              Ordenar por precio
              <select
                value={ordenPrecio}
                onChange={(event) => setOrdenPrecio(event.target.value)}
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
                  onClick={() => setCategoriaSeleccionada(categoria)}
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
                onChange={(event) => setSoloConStock(event.target.checked)}
                className="h-4 w-4 accent-gamer-accent"
              />
              Solo productos con stock disponible
            </label>
          </div>
        </div>

        <p className="mb-5 text-sm text-gamer-textMain/70">
          {productosFiltrados.length} {productosFiltrados.length === 1 ? 'producto encontrado' : 'productos encontrados'}
        </p>

        {productosFiltrados.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {productosFiltrados.map((producto) => (
              <ProductoCard key={producto.id} producto={producto} />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-gamer-primary/30 bg-gamer-card p-10 text-center">
            <h2 className="text-xl font-bold text-gamer-textMain">No encontramos productos</h2>
            <p className="mt-2 text-gamer-textMain/70">Probá cambiar la búsqueda o los filtros seleccionados.</p>
          </div>
        )}
      </div>
    </section>
  )
}

export default Productos