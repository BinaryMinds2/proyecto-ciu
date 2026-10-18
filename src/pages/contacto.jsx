import { useState } from 'react'

const motivos = ['Producto', 'Garantía', 'Mi pedido', 'Otro']
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

function Contactos() {
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
        <p className="contacto-eyebrow">Nexus Gaming Store</p>
        <h1 id="contacto-title">Hablemos</h1>
        <p className="contacto-description">
          ¿Tenés dudas sobre un producto o tu pedido? Escribinos y te ayudamos a encontrar lo que necesitás.
        </p>

        <div className="contacto-cards">
          <article className="contacto-info-card">
            <span aria-hidden="true">◉</span>
            <div><h2>WhatsApp</h2><p>+54 9 11 1234-5678</p></div>
          </article>
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

export default Contactos
