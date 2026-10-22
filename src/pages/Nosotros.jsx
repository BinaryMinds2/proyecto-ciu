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
    <section className="page-top page-bottom bg-gamer-bg text-gamer-textMain">
      <div className="page-container">
        <header className="mb-10 text-left">
          <p className="eyebrow">
            Nexus Gaming Store
          </p>
          <h1 className="page-title mb-4">Sobre Nexus Gaming</h1>
          <p className="lead">
            Somos un equipo apasionado por la tecnología y los videojuegos. Creamos Nexus
            Gaming para acercar equipamiento confiable a quienes quieren disfrutar y
            desarrollar su propio espacio de juego.
          </p>
          <p className="lead">
            Queremos que encontrar los componentes adecuados sea simple. Por eso reunimos
            productos seleccionados y acompañamos cada compra con información clara y
            atención personalizada.
          </p>
        </header>

        <section className="mb-12" aria-labelledby="nosotros-categorias">
          <h2 id="nosotros-categorias" className="section-title mb-5">
            Qué ofrecemos
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
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
          <div className="grid gap-4 sm:grid-cols-3">
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

        <section className="nosotros-location" aria-labelledby="nosotros-location-title">
          <div className="nosotros-location-copy">
            <p className="eyebrow">Encontranos</p>
            <h2 id="nosotros-location-title" className="section-title">
              Nuestra oficina
            </h2>
            <p className="body-copy text-gamer-textMuted">
              Estamos cerca de la comunidad gamer, en una ubicación estratégica de la ciudad.
              La dirección es ilustrativa y representa nuestro punto de atención.
            </p>
            <address className="nosotros-location-address">
              <strong>Avenida Corrientes 1234</strong>
              <span>San Nicolás, CABA</span>
              <span>Buenos Aires, Argentina</span>
            </address>
            <a
              className="nosotros-location-link"
              href="https://www.google.com/maps/search/?api=1&query=Avenida%20Corrientes%201234%2C%20Buenos%20Aires%2C%20Argentina"
              target="_blank"
              rel="noreferrer"
            >
              Ver en Google Maps <span aria-hidden="true">↗</span>
            </a>
          </div>
          <div className="nosotros-map-frame">
            <iframe
              title="Ubicación de la oficina de Nexus Gaming en Buenos Aires"
              src="https://www.google.com/maps?q=Avenida%20Corrientes%201234%2C%20Buenos%20Aires%2C%20Argentina&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
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
