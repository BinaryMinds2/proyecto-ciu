import { Link } from 'react-router-dom'
import { productos } from '../data/productos'

const categorias = [...new Set(productos.map((producto) => producto.categoria))]

const motivosParaElegirnos = [
  {
    titulo: 'Envíos a todo el país',
    descripcion: 'Recibí tu compra donde estés, con opciones de entrega para cada necesidad.',
  },
  {
    titulo: 'Garantía oficial',
    descripcion: 'Elegimos productos con respaldo para que puedas comprar con tranquilidad.',
  },
  {
    titulo: 'Atención cercana',
    descripcion: 'Nuestro equipo está disponible para ayudarte antes y después de tu compra.',
  },
]

function Nosotros() {
  return (
    <section className="bg-gamer-bg px-4 py-12 text-gamer-textMain sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <header className="mb-10 max-w-3xl">
          <p className="eyebrow mb-2">
            Nexus Gaming Store
          </p>
          <h1 className="page-title mb-4">Sobre Nexus Gaming</h1>
          <p className="lead">
            Somos un equipo apasionado por la tecnología y los videojuegos. Creamos Nexus
            Gaming para acercar equipamiento confiable a quienes quieren disfrutar y
            desarrollar su propio espacio de juego.
          </p>
          <p className="body-copy mt-4 text-gamer-textMuted">
            Queremos que encontrar los componentes adecuados sea simple. Por eso reunimos
            productos seleccionados y acompañamos cada compra con información clara y
            atención personalizada.
          </p>
        </header>

        <section className="mb-12" aria-labelledby="nosotros-categorias">
          <h2 id="nosotros-categorias" className="section-title mb-5">
            Qué ofrecemos
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categorias.map((categoria) => (
              <Link
                key={categoria}
                to={`/productos?${new URLSearchParams({ categoria })}`}
                className="rounded-xl border border-gamer-primary/25 bg-gamer-card p-5 font-semibold text-gamer-textMain transition hover:border-gamer-accent/60 hover:text-gamer-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gamer-accent"
              >
                <span>{categoria}</span>
                <span className="float-right text-gamer-accent" aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-10" aria-labelledby="nosotros-motivos">
          <h2 id="nosotros-motivos" className="section-title mb-5">
            Por qué elegir Nexus
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {motivosParaElegirnos.map(({ titulo, descripcion }) => (
              <article
                key={titulo}
                className="rounded-xl border border-gamer-primary/20 bg-gamer-card p-5"
              >
                <h3 className="card-title mb-2 text-gamer-accent">{titulo}</h3>
                <p className="secondary-copy text-gamer-textMuted">{descripcion}</p>
              </article>
            ))}
          </div>
        </section>

        <Link
          to="/productos"
          className="primary-cta inline-flex items-center gap-2 rounded-lg bg-gamer-primary px-5 py-3 text-white transition hover:bg-gamer-primary/80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gamer-accent"
        >
          Ver catálogo
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  )
}

export default Nosotros
