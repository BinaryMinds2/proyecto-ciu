import { useState } from 'react'
import './CheckoutForm.css'

const initialForm = {
  nombre: '',
  email: '',
  telefono: '',
  direccion: '',
  entrega: 'Retiro en local',
  mensaje: '',
}

function CheckoutForm({ cart = [], onClearCart, onPurchaseConfirmed }) {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [confirmation, setConfirmation] = useState('')
  const cartIsEmpty = !Array.isArray(cart) || cart.length === 0

  // Actualiza cualquier campo usando su atributo name.
  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((currentForm) => ({ ...currentForm, [name]: value }))
    setErrors((currentErrors) => ({ ...currentErrors, [name]: '' }))
    setConfirmation('')
  }

  // Devuelve los errores encontrados en los campos obligatorios.
  const validate = () => {
    const newErrors = {}

    if (!form.nombre.trim()) newErrors.nombre = 'Ingresá tu nombre y apellido.'
    if (!form.email.trim()) {
      newErrors.email = 'Ingresá tu email.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Ingresá un email válido.'
    }
    if (!form.telefono.trim()) newErrors.telefono = 'Ingresá tu teléfono.'
    if (!form.direccion.trim()) newErrors.direccion = 'Ingresá tu dirección o localidad.'

    return newErrors
  }

  // Valida el formulario y confirma la compra si no hay errores.
  const handleSubmit = (e) => {
    e.preventDefault()
    setConfirmation('')

    if (cartIsEmpty) return

    const newErrors = validate()
    setErrors(newErrors)

    if (Object.keys(newErrors).length > 0) return

    const mensaje = `¡Gracias por tu compra, ${form.nombre.trim()}! Te contactaremos pronto.`
    setConfirmation(mensaje)
    setForm(initialForm)
    setErrors({})
    onClearCart()
    onPurchaseConfirmed?.(mensaje)
  }

  return (
    <section className="checkout">
      <h1 className="checkout__title">Finalizar compra</h1>

      {cartIsEmpty && (
        <p className="checkout__notice" role="status">
          Tu carrito está vacío. Agregá productos antes de confirmar la compra.
        </p>
      )}

      {confirmation && (
        <p className="checkout__success" role="status">
          {confirmation}
        </p>
      )}

      <form className="checkout__form" onSubmit={handleSubmit} noValidate>
        <div className="checkout__field">
          <label htmlFor="checkout-nombre">Nombre y apellido *</label>
          <input
            id="checkout-nombre"
            name="nombre"
            type="text"
            value={form.nombre}
            onChange={handleChange}
            aria-invalid={Boolean(errors.nombre)}
            aria-describedby={errors.nombre ? 'checkout-nombre-error' : undefined}
          />
          {errors.nombre && <p className="checkout__error" id="checkout-nombre-error">{errors.nombre}</p>}
        </div>

        <div className="checkout__field">
          <label htmlFor="checkout-email">Email *</label>
          <input
            id="checkout-email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'checkout-email-error' : undefined}
          />
          {errors.email && <p className="checkout__error" id="checkout-email-error">{errors.email}</p>}
        </div>

        <div className="checkout__field">
          <label htmlFor="checkout-telefono">Teléfono *</label>
          <input
            id="checkout-telefono"
            name="telefono"
            type="tel"
            value={form.telefono}
            onChange={handleChange}
            aria-invalid={Boolean(errors.telefono)}
            aria-describedby={errors.telefono ? 'checkout-telefono-error' : undefined}
          />
          {errors.telefono && <p className="checkout__error" id="checkout-telefono-error">{errors.telefono}</p>}
        </div>

        <div className="checkout__field">
          <label htmlFor="checkout-direccion">Dirección o localidad *</label>
          <input
            id="checkout-direccion"
            name="direccion"
            type="text"
            value={form.direccion}
            onChange={handleChange}
            aria-invalid={Boolean(errors.direccion)}
            aria-describedby={errors.direccion ? 'checkout-direccion-error' : undefined}
          />
          {errors.direccion && <p className="checkout__error" id="checkout-direccion-error">{errors.direccion}</p>}
        </div>

        <div className="checkout__field">
          <label htmlFor="checkout-entrega">Método de entrega</label>
          <select
            id="checkout-entrega"
            name="entrega"
            value={form.entrega}
            onChange={handleChange}
          >
            <option>Retiro en local</option>
            <option>Envío a domicilio</option>
          </select>
        </div>

        <div className="checkout__field">
          <label htmlFor="checkout-mensaje">Mensaje o aclaración (opcional)</label>
          <textarea
            id="checkout-mensaje"
            name="mensaje"
            rows="4"
            value={form.mensaje}
            onChange={handleChange}
          />
        </div>

        <button className="checkout__submit" type="submit" disabled={cartIsEmpty}>
          Confirmar compra
        </button>
      </form>
    </section>
  )
}

export default CheckoutForm
