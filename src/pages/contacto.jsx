import { useState } from 'react'

const formularioInicial = {
  nombre: '',
  email: '',
  telefono: '',
  direccion: '',
  entrega: 'Envío a domicilio',
  mensaje: '',
}

function Contactos() {
  const [formulario, setFormulario] = useState(formularioInicial)
  const [errores, setErrores] = useState({})
  const [confirmacion, setConfirmacion] = useState('')

  const actualizarCampo = (event) => {
    const { name, value } = event.target
    setFormulario((datosActuales) => ({ ...datosActuales, [name]: value }))
    setErrores((erroresActuales) => ({ ...erroresActuales, [name]: '' }))
    setConfirmacion('')
  }

  const validarFormulario = () => {
    const nuevosErrores = {}
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!formulario.nombre.trim()) nuevosErrores.nombre = 'Ingresá tu nombre y apellido.'
    if (!formulario.email.trim()) {
      nuevosErrores.email = 'Ingresá tu email.'
    } else if (!emailValido.test(formulario.email)) {
      nuevosErrores.email = 'Ingresá un email válido.'
    }
    if (!formulario.telefono.trim()) nuevosErrores.telefono = 'Ingresá tu teléfono.'
    if (!formulario.direccion.trim()) nuevosErrores.direccion = 'Ingresá una dirección o localidad.'

    return nuevosErrores
  }

  const enviarFormulario = (event) => {
    event.preventDefault()
    const nuevosErrores = validarFormulario()
    setErrores(nuevosErrores)
    setConfirmacion('')

    if (Object.keys(nuevosErrores).length > 0) return

    let carrito
    try {
      carrito = JSON.parse(window.localStorage.getItem('nexus-cart') || '[]')
    } catch {
      setConfirmacion('No se pudo leer el carrito. Volvé a cargar la página e intentá nuevamente.')
      return
    }

    if (!Array.isArray(carrito) || carrito.length === 0) {
      setConfirmacion('Agregá al menos un producto al carrito antes de confirmar la compra.')
      return
    }

    setConfirmacion('¡Gracias! Recibimos tus datos y nos pondremos en contacto pronto.')
    setFormulario(formularioInicial)
  }

  const campoClase =
    'rounded-lg border border-gamer-primary/30 bg-gamer-bg px-4 py-3 text-gamer-textMain outline-none transition placeholder:text-gamer-textMain/50 focus:border-gamer-accent focus:ring-2 focus:ring-gamer-accent/30'

  return (
    <section className="bg-gamer-bg px-4 py-12 text-gamer-textMain sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.25em] text-gamer-accent">
            Nexus Gaming Store
          </p>
          <h1 className="mb-3 text-4xl font-bold text-gamer-textMain sm:text-5xl">Contacto y compra</h1>
          <p className="text-gamer-textMain/70">
            Completá tus datos y te contactaremos para coordinar la entrega de tu pedido.
          </p>
        </div>

        <form
          onSubmit={enviarFormulario}
          noValidate
          className="space-y-6 rounded-xl border border-gamer-primary/20 bg-gamer-card p-5 shadow-lg shadow-black/10 sm:p-8"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm font-semibold">
              Nombre y apellido *
              <input
                name="nombre"
                value={formulario.nombre}
                onChange={actualizarCampo}
                className={campoClase}
                placeholder="Ej. Diego Gómez"
                aria-invalid={Boolean(errores.nombre)}
                aria-describedby={errores.nombre ? 'error-nombre' : undefined}
              />
              {errores.nombre && <span id="error-nombre" className="text-sm font-normal text-red-400">{errores.nombre}</span>}
            </label>

            <label className="flex flex-col gap-2 text-sm font-semibold">
              Email *
              <input
                type="email"
                name="email"
                value={formulario.email}
                onChange={actualizarCampo}
                className={campoClase}
                placeholder="tuemail@ejemplo.com"
                aria-invalid={Boolean(errores.email)}
                aria-describedby={errores.email ? 'error-email' : undefined}
              />
              {errores.email && <span id="error-email" className="text-sm font-normal text-red-400">{errores.email}</span>}
            </label>

            <label className="flex flex-col gap-2 text-sm font-semibold">
              Teléfono *
              <input
                type="tel"
                name="telefono"
                value={formulario.telefono}
                onChange={actualizarCampo}
                className={campoClase}
                placeholder="Ej. 11 1234-5678"
                aria-invalid={Boolean(errores.telefono)}
                aria-describedby={errores.telefono ? 'error-telefono' : undefined}
              />
              {errores.telefono && <span id="error-telefono" className="text-sm font-normal text-red-400">{errores.telefono}</span>}
            </label>

            <label className="flex flex-col gap-2 text-sm font-semibold">
              Método de entrega *
              <select name="entrega" value={formulario.entrega} onChange={actualizarCampo} className={campoClase}>
                <option>Envío a domicilio</option>
                <option>Retiro en sucursal</option>
              </select>
            </label>
          </div>

          <label className="flex flex-col gap-2 text-sm font-semibold">
            Dirección o localidad *
            <input
              name="direccion"
              value={formulario.direccion}
              onChange={actualizarCampo}
              className={campoClase}
              placeholder="Ej. Av. Corrientes 1234, CABA"
              aria-invalid={Boolean(errores.direccion)}
              aria-describedby={errores.direccion ? 'error-direccion' : undefined}
            />
            {errores.direccion && <span id="error-direccion" className="text-sm font-normal text-red-400">{errores.direccion}</span>}
          </label>

          <label className="flex flex-col gap-2 text-sm font-semibold">
            Mensaje o aclaración <span className="font-normal text-gamer-textMain/60">(opcional)</span>
            <textarea
              name="mensaje"
              value={formulario.mensaje}
              onChange={actualizarCampo}
              className={`${campoClase} min-h-32 resize-y`}
              placeholder="¿Querés dejarnos alguna indicación?"
            />
          </label>

          <button
            type="submit"
            className="w-full rounded-lg bg-gamer-primary px-5 py-3 font-bold text-white transition hover:bg-gamer-primary/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gamer-accent"
          >
            Confirmar compra
          </button>

          {confirmacion && (
            <p
              role="status"
              className={`rounded-lg border px-4 py-3 text-sm ${
                confirmacion.startsWith('¡Gracias')
                  ? 'border-green-400/40 bg-green-400/10 text-green-300'
                  : 'border-amber-400/40 bg-amber-400/10 text-amber-200'
              }`}
            >
              {confirmacion}
            </p>
          )}
        </form>
      </div>
    </section>
  )
}

export default Contactos