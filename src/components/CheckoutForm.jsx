import { useState } from 'react'
import { Link } from 'react-router-dom'
import nexusSymbol from '../assets/nexus-symbol.png'

const entregas = ['Envío a domicilio', 'Retiro en sucursal', 'Punto de entrega']
const pagos = [
  'Tarjeta de crédito / débito',
  'Transferencia bancaria',
  'Mercado Pago',
  'Pago al recibir',
]

const formularioInicial = {
  nombre: '',
  email: '',
  telefono: '',
  direccion: '',
  entrega: '',
  pago: '',
  mensaje: '',
  numeroTarjeta: '',
  vencimiento: '',
  cvv: '',
}

const precioARS = (importe) =>
  new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(importe)

function validar(formulario, carrito) {
  const erroresNuevos = {}
  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!formulario.nombre.trim()) erroresNuevos.nombre = 'Ingresá tu nombre y apellido.'
  if (!formulario.email.trim()) {
    erroresNuevos.email = 'Ingresá tu email.'
  } else if (!emailValido.test(formulario.email)) {
    erroresNuevos.email = 'Ingresá un email válido.'
  }
  if (!formulario.telefono.trim()) erroresNuevos.telefono = 'Ingresá tu teléfono.'
  if (!formulario.direccion.trim()) erroresNuevos.direccion = 'Ingresá tu dirección o localidad.'
  if (!formulario.entrega) erroresNuevos.entrega = 'Elegí un método de entrega.'
  if (!formulario.pago) erroresNuevos.pago = 'Elegí un método de pago.'
  if (
    formulario.pago === 'Pago al recibir' &&
    !['Envío a domicilio', 'Retiro en sucursal'].includes(formulario.entrega)
  ) {
    erroresNuevos.pago = 'El pago al recibir no está disponible para ese método de entrega.'
  }
  if (formulario.pago === pagos[0]) {
    if (!/^\d{16}$/.test(formulario.numeroTarjeta)) {
      erroresNuevos.numeroTarjeta = 'Ingresá los 16 dígitos de la tarjeta.'
    }
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formulario.vencimiento)) {
      erroresNuevos.vencimiento = 'Usá el formato MM/AA.'
    }
    if (!/^\d{3,4}$/.test(formulario.cvv)) {
      erroresNuevos.cvv = 'Ingresá 3 o 4 dígitos.'
    }
  }
  if (carrito.length === 0) erroresNuevos.carrito = 'Tu carrito está vacío.'

  return erroresNuevos
}

function CheckoutForm({ cart = [], onClearCart, onPurchaseConfirmed }) {
  const [formulario, setFormulario] = useState(formularioInicial)
  const [errores, setErrores] = useState({})
  const [tocados, setTocados] = useState({})
  const [intentoEnvio, setIntentoEnvio] = useState(false)
  const [pedidoFinalizado, setPedidoFinalizado] = useState(null)
  const carritoValido = Array.isArray(cart) ? cart : []
  const carritoEstaVacio = carritoValido.length === 0 && !pedidoFinalizado
  const articulosPedido = pedidoFinalizado?.cart || carritoValido
  const subtotal = articulosPedido.reduce(
    (total, producto) => total + producto.precio * producto.cantidad,
    0,
  )
  const pagoAlRecibirDisponible = ['Envío a domicilio', 'Retiro en sucursal'].includes(
    formulario.entrega,
  )

  const mostrarError = (campo) => Boolean(
    errores[campo] && (tocados[campo] || intentoEnvio),
  )
  const pagoResumen = pedidoFinalizado?.pago || formulario.pago

  const actualizarCampo = (evento) => {
    const { name, value } = evento.target
    const actualizado = { ...formulario, [name]: value }
    setFormulario(actualizado)
    setErrores((anteriores) => ({
      ...anteriores,
      [name]: validar(actualizado, carritoValido)[name],
    }))
  }

  const actualizarTarjeta = (evento) => {
    const { name, value } = evento.target
    const digitos = value.replace(/\D/g, '')
    let valor = digitos
    if (name === 'numeroTarjeta') valor = digitos.slice(0, 16)
    if (name === 'cvv') valor = digitos.slice(0, 4)
    if (name === 'vencimiento') {
      const mesYAnio = digitos.slice(0, 4)
      valor = mesYAnio.length > 2 ? `${mesYAnio.slice(0, 2)}/${mesYAnio.slice(2)}` : mesYAnio
    }

    const actualizado = { ...formulario, [name]: valor }
    setFormulario(actualizado)
    setErrores((anteriores) => ({
      ...anteriores,
      [name]: validar(actualizado, carritoValido)[name],
    }))
  }

  const tocarCampo = (campo) => {
    setTocados((actuales) => ({ ...actuales, [campo]: true }))
    setErrores((actuales) => ({
      ...actuales,
      [campo]: validar(formulario, carritoValido)[campo],
    }))
  }

  const seleccionarEntrega = (entrega) => {
    const pagoActualizado =
      entrega === 'Punto de entrega' && formulario.pago === 'Pago al recibir' ? '' : formulario.pago
    const actualizado = { ...formulario, entrega, pago: pagoActualizado }
    setFormulario(actualizado)
    setTocados((actuales) => ({ ...actuales, entrega: true }))
    setErrores((actuales) => ({
      ...actuales,
      entrega: undefined,
      pago: validar(actualizado, carritoValido).pago,
    }))
  }

  const seleccionarPago = (pago) => {
    const actualizado = { ...formulario, pago }
    setFormulario(actualizado)
    setTocados((actuales) => ({ ...actuales, pago: true }))
    setErrores((actuales) => ({ ...actuales, pago: validar(actualizado, carritoValido).pago }))
  }

  const enviarPedido = (evento) => {
    evento.preventDefault()
    setIntentoEnvio(true)
    const erroresNuevos = validar(formulario, carritoValido)
    setErrores(erroresNuevos)
    setTocados({
      nombre: true,
      email: true,
      telefono: true,
      direccion: true,
      entrega: true,
      pago: true,
      numeroTarjeta: true,
      vencimiento: true,
      cvv: true,
    })

    if (Object.keys(erroresNuevos).length > 0) return

    const pedido = {
      nombre: formulario.nombre.trim(),
      pago: formulario.pago,
      entrega: formulario.entrega,
      cart: carritoValido.map((producto) => ({ ...producto })),
    }
    setPedidoFinalizado(pedido)
    setFormulario(formularioInicial)
    setErrores({})
    setTocados({})
    setIntentoEnvio(false)
    onClearCart?.()
    onPurchaseConfirmed?.(`¡Gracias por tu compra, ${pedido.nombre}!`)
  }

  const campo = (nombre, etiqueta, tipo = 'text', placeholder = '') => (
    <div className="checkout-field" key={nombre}>
      <label htmlFor={`checkout-${nombre}`}>{etiqueta}</label>
      <input
        id={`checkout-${nombre}`}
        name={nombre}
        type={tipo}
        value={formulario[nombre]}
        onChange={actualizarCampo}
        onBlur={() => tocarCampo(nombre)}
        placeholder={placeholder}
        aria-invalid={mostrarError(nombre)}
        aria-describedby={mostrarError(nombre) ? `checkout-${nombre}-error` : undefined}
      />
      {mostrarError(nombre) && (
        <p className="checkout-error" id={`checkout-${nombre}-error`}>
          {errores[nombre]}
        </p>
      )}
    </div>
  )

  return (
    <section className="checkout-page" aria-labelledby="checkout-title">
      <header className="checkout-header">
        <div>
          <p className="checkout-eyebrow">Nexus Gaming Store</p>
          <h1 className="checkout-title" id="checkout-title">Finalizar pedido</h1>
        </div>
        <Link className="checkout-back" to="/carrito">← Volver al carrito</Link>
      </header>

      <form className="checkout-layout" onSubmit={enviarPedido} noValidate>
        {pedidoFinalizado ? (
          <section className="checkout-confirmation" role="status" aria-live="polite">
            <img src={nexusSymbol} alt="Logo de Nexus Gaming" />
            <p className="checkout-eyebrow">Pedido confirmado</p>
            <h2>¡Gracias por tu compra, {pedidoFinalizado.nombre}!</h2>
            <p>Preparamos el resumen de tu pedido y te contactaremos para coordinar la entrega.</p>
            <dl>
              <div><dt>Método de entrega</dt><dd>{pedidoFinalizado.entrega}</dd></div>
              <div><dt>Método de pago</dt><dd>{pedidoFinalizado.pago}</dd></div>
              <div><dt>Total</dt><dd>{precioARS(subtotal)}</dd></div>
            </dl>
            <Link to="/productos">Seguir explorando productos</Link>
          </section>
        ) : (
          <>
            <section className="checkout-panel checkout-customer" aria-labelledby="checkout-customer">
              <h2 className="checkout-section-title" id="checkout-customer">
                <span>1</span> Tus datos
              </h2>
              <div className="checkout-customer-fields">
                {campo('nombre', 'Nombre y apellido *', 'text', 'Ej. Diego Gómez')}
                {campo('email', 'Email *', 'email', 'tuemail@ejemplo.com')}
                {campo('telefono', 'Teléfono *', 'tel', 'Ej. 11 1234-5678')}
                {campo('direccion', 'Dirección o localidad *', 'text', 'Ej. CABA')}
                <div className="checkout-field checkout-field--message">
                  <label htmlFor="checkout-mensaje">Mensaje o aclaración (opcional)</label>
                  <textarea
                    id="checkout-mensaje"
                    name="mensaje"
                    value={formulario.mensaje}
                    onChange={actualizarCampo}
                    placeholder="Indicaciones para tu pedido"
                  />
                </div>
              </div>
            </section>

            <section className="checkout-panel checkout-methods" aria-labelledby="checkout-delivery">
              <fieldset className="checkout-fieldset">
                <legend className="checkout-section-title" id="checkout-delivery">
                  <span>2</span> Método de entrega
                </legend>
                <div className="checkout-delivery-options">
                  {entregas.map((entrega) => (
                    <label
                      className={`checkout-option${formulario.entrega === entrega ? ' is-selected' : ''}`}
                      key={entrega}
                    >
                      <input
                        type="radio"
                        name="entrega"
                        value={entrega}
                        checked={formulario.entrega === entrega}
                        onChange={() => seleccionarEntrega(entrega)}
                        onBlur={() => tocarCampo('entrega')}
                        aria-invalid={mostrarError('entrega')}
                        aria-describedby={mostrarError('entrega') ? 'checkout-entrega-error' : undefined}
                      />
                      <span>{entrega}</span>
                    </label>
                  ))}
                </div>
                {mostrarError('entrega') && (
                  <p className="checkout-error" id="checkout-entrega-error">{errores.entrega}</p>
                )}
              </fieldset>

              <fieldset className="checkout-fieldset">
                <legend className="checkout-section-title">
                  <span>3</span> Método de pago *
                </legend>
                <div className="checkout-payment-options">
                  {pagos.map((pago) => {
                    const deshabilitado = pago === 'Pago al recibir' && !pagoAlRecibirDisponible
                    return (
                      <label
                        className={`checkout-option${formulario.pago === pago ? ' is-selected' : ''}${deshabilitado ? ' is-disabled' : ''}`}
                        key={pago}
                      >
                        <input
                          type="radio"
                          name="pago"
                          value={pago}
                          checked={formulario.pago === pago}
                          disabled={deshabilitado}
                          onChange={() => seleccionarPago(pago)}
                          onBlur={() => tocarCampo('pago')}
                          aria-invalid={mostrarError('pago')}
                          aria-describedby={mostrarError('pago') ? 'checkout-pago-error' : undefined}
                        />
                        <span>{pago}</span>
                        {deshabilitado && <small>No disponible para este método de entrega</small>}
                      </label>
                    )
                  })}
                </div>
                {mostrarError('pago') && (
                  <p className="checkout-error" id="checkout-pago-error">{errores.pago}</p>
                )}
              </fieldset>

              {formulario.pago === pagos[0] && (
                <div className="checkout-card-fields">
                  <p className="checkout-simulation">
                    Simulación: no se procesa ni se guarda ningún pago real.
                  </p>
                  <div className="checkout-card-number">
                    <label htmlFor="checkout-numeroTarjeta">Número de tarjeta</label>
                    <input
                      id="checkout-numeroTarjeta"
                      name="numeroTarjeta"
                      type="text"
                      inputMode="numeric"
                      autoComplete="off"
                      value={formulario.numeroTarjeta}
                      onChange={actualizarTarjeta}
                      onBlur={() => tocarCampo('numeroTarjeta')}
                      placeholder="16 dígitos"
                      aria-invalid={mostrarError('numeroTarjeta')}
                      aria-describedby={mostrarError('numeroTarjeta') ? 'checkout-numeroTarjeta-error' : undefined}
                    />
                    {mostrarError('numeroTarjeta') && <p className="checkout-error" id="checkout-numeroTarjeta-error">{errores.numeroTarjeta}</p>}
                  </div>
                  <div className="checkout-card-short">
                    <label htmlFor="checkout-vencimiento">Vencimiento (MM/AA)</label>
                    <input
                      id="checkout-vencimiento"
                      name="vencimiento"
                      type="text"
                      inputMode="numeric"
                      autoComplete="off"
                      value={formulario.vencimiento}
                      onChange={actualizarTarjeta}
                      onBlur={() => tocarCampo('vencimiento')}
                      placeholder="MM/AA"
                      aria-invalid={mostrarError('vencimiento')}
                      aria-describedby={mostrarError('vencimiento') ? 'checkout-vencimiento-error' : undefined}
                    />
                    {mostrarError('vencimiento') && <p className="checkout-error" id="checkout-vencimiento-error">{errores.vencimiento}</p>}
                  </div>
                  <div className="checkout-card-short">
                    <label htmlFor="checkout-cvv">CVV</label>
                    <input
                      id="checkout-cvv"
                      name="cvv"
                      type="text"
                      inputMode="numeric"
                      autoComplete="off"
                      value={formulario.cvv}
                      onChange={actualizarTarjeta}
                      onBlur={() => tocarCampo('cvv')}
                      placeholder="3 o 4 dígitos"
                      aria-invalid={mostrarError('cvv')}
                      aria-describedby={mostrarError('cvv') ? 'checkout-cvv-error' : undefined}
                    />
                    {mostrarError('cvv') && <p className="checkout-error" id="checkout-cvv-error">{errores.cvv}</p>}
                  </div>
                </div>
              )}
            </section>
          </>
        )}

        <aside className="checkout-summary" aria-labelledby="checkout-summary">
          <h2 id="checkout-summary">Resumen del pedido</h2>
          {carritoEstaVacio && (
            <p className="checkout-notice" role="status">
              Tu carrito está vacío. <Link to="/productos">Explorá los productos</Link> antes de confirmar.
            </p>
          )}
          <div className="checkout-items">
            {articulosPedido.map((producto) => (
              <article className="checkout-item" key={producto.id}>
                <img src={producto.imagen} alt="" />
                <div>
                  <h3>{producto.nombre}</h3>
                  <p>Cantidad: {producto.cantidad}</p>
                </div>
                <strong>{precioARS(producto.precio * producto.cantidad)}</strong>
              </article>
            ))}
            {articulosPedido.length === 0 && <p className="checkout-empty">Todavía no hay productos.</p>}
          </div>
          <dl className="checkout-totals">
            <div><dt>Subtotal</dt><dd>{precioARS(subtotal)}</dd></div>
            <div><dt>Envío</dt><dd>A coordinar</dd></div>
            {pagoResumen && <div><dt>Pago</dt><dd>{pagoResumen}</dd></div>}
            <div className="checkout-total"><dt>Total</dt><dd>{precioARS(subtotal)}</dd></div>
          </dl>
          {!pedidoFinalizado && (
            <button className="checkout-submit" type="submit" disabled={carritoEstaVacio}>
              Confirmar pedido
            </button>
          )}
        </aside>
      </form>
    </section>
  )
}

export default CheckoutForm
