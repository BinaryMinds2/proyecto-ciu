import { useEffect } from 'react'
import { Link } from 'react-router-dom'

function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return undefined

    const timeout = window.setTimeout(onClose, 3000)
    return () => window.clearTimeout(timeout)
  }, [toast, onClose])

  if (!toast) return null

  const esAviso = toast.tipo === 'aviso'

  return (
    <div
      key={toast.id}
      role="status"
      aria-live="polite"
      className={`fixed bottom-4 left-1/2 z-[60] flex w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 items-center gap-3 rounded-xl border p-4 shadow-xl sm:left-auto sm:right-4 sm:translate-x-0 ${
        esAviso
          ? 'border-amber-400/40 bg-gamer-card text-amber-500'
          : 'border-gamer-accent/40 bg-gamer-card text-gamer-textMain'
      }`}
    >
      <p className="secondary-copy min-w-0 flex-1 font-semibold">{toast.mensaje}</p>
      {toast.accion && (
        toast.accion.to ? (
          <Link
            to={toast.accion.to}
            onClick={onClose}
            className="secondary-copy shrink-0 font-bold text-gamer-accent underline underline-offset-4"
          >
            {toast.accion.label}
          </Link>
        ) : (
          <button
            type="button"
            onClick={() => {
              toast.accion.onClick?.()
              onClose()
            }}
            className="secondary-copy shrink-0 font-bold text-gamer-accent underline underline-offset-4"
          >
            {toast.accion.label}
          </button>
        )
      )}
      <button
        type="button"
        aria-label="Cerrar notificación"
        onClick={onClose}
        className="grid size-7 shrink-0 place-items-center rounded-lg text-gamer-textMain/70 hover:bg-gamer-textMain/10"
      >
        <span aria-hidden="true">×</span>
      </button>
    </div>
  )
}

export default Toast
