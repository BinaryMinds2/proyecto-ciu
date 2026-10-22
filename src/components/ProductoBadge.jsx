const estilosPorEtiqueta = {
  Nuevo: 'border-gamer-accent/70 bg-gamer-bg/90 text-gamer-accent shadow-[0_0_14px_rgb(var(--gamer-accent)/0.35)]',
  Oferta: 'border-fuchsia-400/70 bg-fuchsia-950/90 text-fuchsia-200 shadow-[0_0_14px_rgb(232_121_249/0.35)]',
  'Más vendido': 'border-amber-300/70 bg-amber-950/90 text-amber-200 shadow-[0_0_14px_rgb(252_211_77/0.35)]',
}

function ProductoBadge({ etiqueta, className = 'left-3 top-3' }) {
  if (etiqueta === '') return null

  const estilo = estilosPorEtiqueta[etiqueta] || 'border-gamer-primary/70 bg-gamer-bg/90 text-gamer-textMain'

  return (
    <span className={`absolute ${className} rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wide backdrop-blur-sm ${estilo}`}>
      {etiqueta}
    </span>
  )
}

export default ProductoBadge
