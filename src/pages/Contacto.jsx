import { useState } from 'react'

const motivos = ['Producto', 'Garantía', 'Mi pedido', 'Otro']
const whatsappHref = 'https://wa.me/5491112345678?text=Hola%20Nexus%20Gaming%2C%20quiero%20hacer%20una%20consulta.'
const formularioInicial = {
  nombre: '',
  email: '',
  telefono: '',
  localidad: '',
  mensaje: '',
}

function validar(formulario) {
  const erroresNuevos = {}

  if (!formulario.nombre.trim()) erroresNuevos.nombre = 'Ingresá tu nombre y apellido.'
  if (!formulario.email.trim()) {
    erroresNuevos.email = 'Ingresá tu email.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formulario.email)) {
    erroresNuevos.email = 'Ingresá un email válido.'
  }
  if (!formulario.telefono.trim()) erroresNuevos.telefono = 'Ingresá tu teléfono.'
  if (!formulario.localidad.trim()) erroresNuevos.localidad = 'Ingresá tu localidad.'
  if (!formulario.mensaje.trim()) {
    erroresNuevos.mensaje = 'Escribí tu consulta.'
  } else if (formulario.mensaje.length > 500) {
    erroresNuevos.mensaje = 'El mensaje no puede superar los 500 caracteres.'
  }

  return erroresNuevos
}

function Contacto() {
  const [formulario, setFormulario] = useState(formularioInicial)
  const [motivo, setMotivo] = useState('')
  const [errores, setErrores] = useState({})
  const [tocados, setTocados] = useState({})
  const [intentoEnvio, setIntentoEnvio] = useState(false)
  const [confirmacion, setConfirmacion] = useState('')

  const mostrarError = (campo) => Boolean(
    errores[campo] && (tocados[campo] || intentoEnvio),
  )

  const actualizarCampo = (evento) => {
    const { name, value } = evento.target
    const actualizado = { ...formulario, [name]: value }
    setFormulario(actualizado)
    setErrores((actuales) => ({ ...actuales, [name]: validar(actualizado)[name] }))
    setConfirmacion('')
  }

  const tocarCampo = (campo) => {
    setTocados((actuales) => ({ ...actuales, [campo]: true }))
    setErrores((actuales) => ({ ...actuales, [campo]: validar(formulario)[campo] }))
  }

  const enviarFormulario = (evento) => {
    evento.preventDefault()
    setIntentoEnvio(true)
    const erroresNuevos = validar(formulario)
    setErrores(erroresNuevos)

    if (Object.keys(erroresNuevos).length > 0) return

    setConfirmacion(`¡Gracias, ${formulario.nombre.trim()}! Recibimos tu consulta`)
    setFormulario(formularioInicial)
    setMotivo('')
    setErrores({})
    setTocados({})
    setIntentoEnvio(false)
  }

  const campo = (nombre, etiqueta, tipo, placeholder) => (
    <div className="contacto-field" key={nombre}>
      <label htmlFor={`contacto-${nombre}`}>{etiqueta}</label>
      <input
        id={`contacto-${nombre}`}
        name={nombre}
        type={tipo}
        value={formulario[nombre]}
        onChange={actualizarCampo}
        onBlur={() => tocarCampo(nombre)}
        placeholder={placeholder}
        aria-invalid={mostrarError(nombre)}
        aria-describedby={mostrarError(nombre) ? `contacto-${nombre}-error` : undefined}
      />
      {mostrarError(nombre) && (
        <p className="contacto-error" id={`contacto-${nombre}-error`}>{errores[nombre]}</p>
      )}
    </div>
  )

  return (
    <section className="contacto-page" aria-labelledby="contacto-title">
      <div className="contacto-intro">
        <p className="eyebrow">Nexus Gaming Store</p>
        <h1 className="page-title" id="contacto-title">Hablemos</h1>
        <p className="lead contacto-description">
          ¿Tenés dudas sobre un producto o tu pedido? Escribinos y te ayudamos a encontrar lo que necesitás.
        </p>

        <div className="contacto-cards">
          <a
            className="contacto-info-card contacto-whatsapp-card"
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            aria-label="Contactar a Nexus Gaming por WhatsApp"
          >
            <span className="contacto-whatsapp-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" role="img">
                <path d="M20.5 3.5A11.8 11.8 0 0 0 12.1 0C5.5 0 .1 5.4.1 12c0 2.1.6 4.2 1.7 6L0 24l6.1-1.8a12 12 0 0 0 6 1.6h.1c6.6 0 11.9-5.4 11.9-12 0-3.2-1.3-6.1-3.6-8.3Zm-8.4 18.3h-.1c-1.9 0-3.8-.5-5.4-1.5l-.4-.2-3.6 1.1 1.1-3.5-.2-.4A9.8 9.8 0 0 1 2 12C2 6.5 6.5 2 12.1 2c2.7 0 5.2 1 7.1 3 1.9 1.9 2.9 4.4 2.9 7.1 0 5.5-4.5 10-10 10Zm5.5-7.5c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-1.5-.7-2.5-1.3-3.5-3-.3-.5.3-.5.8-1.7.1-.2 0-.4-.1-.6-.1-.2-.7-1.7-1-2.3-.3-.6-.6-.5-.7-.5h-.6c-.2 0-.6.2-.9.5-.3.3-1.2 1.2-1.2 2.8s1.2 3.3 1.4 3.5c.2.2 2.3 3.5 5.6 4.9.8.3 1.4.5 1.8.6.8.3 1.6.2 2.2.1.7-.1 1.8-.7 2.1-1.4.3-.7.3-1.3.2-1.4-.1-.1-.3-.2-.6-.3Z" />
              </svg>
            </span>
            <div><h2>WhatsApp</h2><p>+54 9 11 1234-5678</p></div>
          </a>
          <article className="contacto-info-card">
            <span aria-hidden="true">✉</span>
            <div><h2>Email</h2><p>contactanos@nexusgaming.com</p></div>
          </article>
          <article className="contacto-info-card">
            <span aria-hidden="true">◷</span>
            <div><h2>Horarios</h2><p>Lunes a viernes, 9 a 18 hs. Calle Falsa 123</p></div>
          </article>
        </div>
      </div>

      <form className="contacto-form" onSubmit={enviarFormulario} noValidate>
        <fieldset className="contacto-motives">
          <legend>Motivo de consulta</legend>
          <div>
            {motivos.map((opcion) => (
              <button
                className={motivo === opcion ? 'is-selected' : ''}
                type="button"
                key={opcion}
                aria-pressed={motivo === opcion}
                onClick={() => setMotivo(opcion)}
              >
                {opcion}
              </button>
            ))}
          </div>
        </fieldset>

        <div className="contacto-fields">
          {campo('nombre', 'Nombre y apellido *', 'text', 'Ej. Diego Gómez')}
          {campo('email', 'Email *', 'email', 'tuemail@ejemplo.com')}
          {campo('telefono', 'Teléfono *', 'tel', 'Ej. 11 1234-5678')}
          {campo('localidad', 'Localidad *', 'text', 'Ej. CABA')}
        </div>

        <div className="contacto-field contacto-message">
          <label htmlFor="contacto-mensaje">Mensaje *</label>
          <textarea
            id="contacto-mensaje"
            name="mensaje"
            value={formulario.mensaje}
            onChange={actualizarCampo}
            onBlur={() => tocarCampo('mensaje')}
            maxLength={500}
            placeholder="Contanos cómo podemos ayudarte"
            aria-invalid={mostrarError('mensaje')}
            aria-describedby={[
              mostrarError('mensaje') ? 'contacto-mensaje-error' : '',
              'contacto-mensaje-counter',
            ].filter(Boolean).join(' ')}
          />
          <div className="contacto-message-meta">
            {mostrarError('mensaje') && (
              <p className="contacto-error" id="contacto-mensaje-error">{errores.mensaje}</p>
            )}
            <p id="contacto-mensaje-counter">{formulario.mensaje.length}/500 caracteres</p>
          </div>
        </div>

        <button className="contacto-submit" type="submit">Enviar consulta</button>
        {confirmacion && <p className="contacto-success" role="status">{confirmacion}</p>}
      </form>
    </section>
  )
}

export default Contacto
