# Nexus Gaming

Tienda online de tecnología y productos gamer desarrollada con React. Permite
explorar un catálogo de hardware, periféricos y artículos para setup, consultar
detalles, administrar un carrito y completar un flujo de compra simulado.

> Proyecto académico realizado para la materia Construcción de Interfaces de
> Usuario. No procesa pagos ni envía pedidos a un servidor.

## Índice

1. [Características](#características)
2. [Tecnologías](#tecnologías)
3. [Requisitos](#requisitos)
4. [Instalación y ejecución](#instalación-y-ejecución)
5. [Páginas y rutas](#páginas-y-rutas)
6. [Flujo de compra](#flujo-de-compra)
7. [Catálogo y datos](#catálogo-y-datos)
8. [Persistencia local](#persistencia-local)
9. [Diseño y accesibilidad](#diseño-y-accesibilidad)
10. [Estructura del proyecto](#estructura-del-proyecto)
11. [Scripts disponibles](#scripts-disponibles)
12. [Alcance actual](#alcance-actual)
13. [Integrantes](#integrantes)
14. [Deploy](#deploy)

## Características

- Inicio con banner, enlaces a categorías derivadas del catálogo y hasta cuatro
  productos destacados con acceso al detalle y acción para agregarlos.
- Catálogo con búsqueda, filtros por categoría y stock, ordenamiento por precio
  y paginación de 12 productos. Los filtros y la página actual se representan
  en los parámetros de la URL.
- Detalle de producto con breadcrumb, selector de cantidad limitado por stock,
  características disponibles y productos relacionados de la misma categoría.
- Carrito con cantidades, subtotales, total, controles de stock y opción
  **Deshacer** al quitar un artículo.
- Favoritos con acceso desde las tarjetas, el detalle y una página propia;
  se conservan en el navegador entre recargas.
- Checkout simulado con validación, opciones de entrega y pago, resumen del
  pedido plegable en pantallas de hasta 1099 px y confirmación en pantalla.
- Cupones de prueba aplicables en checkout: 10%, 25% o 75% según el subtotal.
- Páginas de Nosotros y Contacto; esta última incluye validación y confirmación
  local del formulario.
- Notificaciones toast para agregar o quitar productos y para informar límites
  de stock.
- Feedback visual temporal al agregar productos y aviso de unidades limitadas
  en las tarjetas de producto.
- Sistema de etiquetas dinámicas en productos (Nuevo, Oferta, Más vendido).
- Navbar adaptable, enlaces de categorías e información en el footer, tema claro
  y oscuro, y modo de descanso visual.
- Formato de precios en pesos argentinos, diseño adaptable y tipografías
  Chakra Petch y Plus Jakarta Sans con una escala tipográfica compartida.

## Tecnologías

| Área | Tecnología |
| --- | --- |
| Interfaz | React 19 |
| Lenguaje | JavaScript con módulos ES |
| Enrutamiento | React Router DOM 7 |
| Estilos | Tailwind CSS 4 y CSS |
| Animaciones | Motion |
| Herramienta de desarrollo y build | Vite 8 |
| Calidad de código | ESLint |
| Tipografías | Chakra Petch y Plus Jakarta Sans (Google Fonts) |
| Imágenes de productos | Archivos locales en `public/productos/` y recursos locales de marca |

El catálogo se carga desde un array local de objetos. La aplicación no requiere
una API ni una base de datos. Solo las tipografías de Google Fonts necesitan
conexión a Internet para cargarse.

## Requisitos

- Node.js compatible con Vite 8: versión 20.19 o superior, o 22.12 o superior.
- npm.
- Un navegador web moderno.

## Instalación y ejecución

Cloná el repositorio y entrá en la carpeta del proyecto:

```bash
git clone https://github.com/BinaryMinds2/proyecto-ciu.git
cd proyecto-ciu
```

Instalá las dependencias:

```bash
npm install
```

Iniciá el servidor de desarrollo:

```bash
npm run dev
```

Vite mostrará en la terminal la dirección local. Por defecto suele ser
`http://localhost:5173`.

Para generar y revisar una compilación de producción:

```bash
npm run build
npm run preview
```

No se requiere configurar variables de entorno.

## Páginas y rutas

| Ruta | Página | Descripción |
| --- | --- | --- |
| `/` | Inicio | Banner, categorías y productos destacados. |
| `/productos` | Productos | Catálogo con búsqueda, filtros, ordenamiento y paginación. |
| `/producto/:id` | Detalle | Información, cantidad, breadcrumb y productos relacionados. |
| `/productos/:id` | Redirección | Redirige al formato `/producto/:id`. |
| `/carrito` | Carrito | Artículos, cantidades y resumen de compra. |
| `/favoritos` | Favoritos | Productos guardados para consultar más tarde. |
| `/checkout` | Checkout | Formulario y confirmación de una compra simulada. |
| `/nosotros` | Nosotros | Presentación, categorías y motivos para elegir la tienda. |
| `/contacto` | Contacto | Canales de contacto y formulario con validación. |

La navegación se implementa con React Router DOM. Las rutas no reconocidas
redirigen a Inicio. El carrito y los favoritos tienen accesos directos en la
navegación.

## Flujo de compra

1. Explorá Inicio o el catálogo. En `/productos`, buscá por nombre, filtrá por
   categoría o disponibilidad, ordená por precio y navegá las páginas.
2. Los parámetros `categoria`, `q`, `orden`, `stock` y `pagina` reflejan los
   filtros y la paginación en la URL. Al cambiar un filtro, la página vuelve a
   la primera.
3. Agregá un producto con stock desde una tarjeta o su detalle. El toast ofrece
   un acceso al carrito. En el detalle podés elegir la cantidad disponible.
4. En el carrito podés cambiar cantidades, quitar productos y deshacer una
   eliminación desde el toast. El resumen muestra unidades y total.
5. Seleccioná **Continuar con la compra**, completá los datos requeridos,
   elegí entrega y pago, y confirmá para ver el resumen final. El carrito se
   vacía al confirmar.

El checkout ofrece envío a domicilio, retiro en sucursal o punto de entrega.
Solicita nombre, email, teléfono y dirección o localidad para todos los métodos
de entrega. Los medios de pago son tarjeta, transferencia bancaria, Mercado Pago
o pago al recibir; esta última opción no está disponible para punto de entrega.
La tarjeta solo valida datos ingresados en el navegador y estos no se guardan.
No se procesa ningún pago ni se envía una orden. Se puede aplicar un cupón de
prueba por pedido: `NEXUS10` descuenta 10% desde $50.000, `NEXUS25` descuenta
25% desde $300.000 y `NEXUS75` descuenta 75% desde $1.500.000. El descuento se
calcula sobre el subtotal de productos, no incluye el envío y no se acumula con
otro cupón.

## Catálogo y datos

Los productos se definen en `src/data/productos.js`. Cada producto incluye
identificador, nombre, categoría, precio, imagen, descripción y stock; algunos
también incluyen características técnicas o la marca `destacado`. Las
categorías se obtienen de esos datos y se reutilizan en Inicio, Nosotros y el
footer.

### Favoritos

Se pueden agregar o quitar productos como favoritos desde las tarjetas del
catálogo, Inicio, productos relacionados y la página de detalle. La ruta
`/favoritos` muestra los productos guardados y permite quitarlos o agregarlos al
carrito. Esta selección es independiente del carrito.

### Cupones de descuento

Los cupones de prueba se definen en `src/data/cupones.js`. Cada cupón contiene
un código, porcentaje de descuento y subtotal mínimo:

| Código | Descuento | Subtotal mínimo |
| --- | ---: | ---: |
| `NEXUS10` | 10% | $50.000 |
| `NEXUS25` | 25% | $300.000 |
| `NEXUS75` | 75% | $1.500.000 |

En el checkout se puede seleccionar un cupón disponible o ingresar su código.
Se permite aplicar uno por compra; el descuento se calcula sobre el subtotal de
los productos y se muestra en el resumen y en la confirmación. No se aplica al
envío. Como la compra es una simulación del lado del cliente, no hay validación
en un servidor ni control de uso único.

En la página de productos se puede:

1. Buscar por texto incluido en el nombre (`q`).
2. Filtrar por categoría (`categoria`) o mostrar solo productos disponibles
   (`stock=true`).
3. Ordenar por precio ascendente (`orden=menor-mayor`) o descendente
   (`orden=mayor-menor`).
4. Recorrer los resultados en páginas de hasta 12 productos (`pagina`).

Los filtros y el ordenamiento se aplican antes de paginar. Al modificar los
filtros se reinicia la página y los parámetros se conservan al navegar entre
páginas; los valores no válidos vuelven a sus valores predeterminados. Los
productos sin stock se identifican visualmente y no se pueden agregar. El
detalle valida el identificador y ofrece volver al catálogo si no encuentra
el producto.

El carrito se administra en el estado de React de la aplicación. Agregar un
producto existente incrementa su cantidad; no se permite superar el stock
disponible. La cantidad mínima es una unidad. Al quitar un producto, el toast
permite restaurarlo en su posición anterior mientras la notificación está
visible.

## Persistencia local

La aplicación utiliza `localStorage` del navegador para guardar el estado
entre recargas:

| Clave | Contenido |
| --- | --- |
| `nexus-cart` | Array JSON de productos agregados, con su cantidad. Se restaura al iniciar la aplicación. |
| `nexus-favorites` | Array JSON con los identificadores de los productos favoritos. |
| `nexus-theme` | Preferencia de tema: `light` o `dark`. |
| `nexus-eye-rest-mode` | Preferencia del modo de descanso visual (`true` o `false`). |

Estos datos se guardan únicamente en el navegador y no se sincronizan entre
dispositivos ni se envían a un servidor. Al restaurar el carrito, se comprueba
que los productos sigan existiendo y que las cantidades sean válidas para el
stock actual. Los favoritos se guardan como una lista de identificadores de
productos y se descartan los que ya no existen en el catálogo. Si el navegador
bloquea el acceso al almacenamiento local, el carrito y los favoritos siguen
funcionando durante la sesión, pero no se conservan al volver a cargar la
página. Las preferencias visuales también se limitan a la sesión; los filtros
y la página del catálogo se conservan en la URL, no en `localStorage`; los
toast son temporales.

## Diseño y accesibilidad

- Estética gamer con paleta violeta y cian, superficies diferenciadas y
  tipografía definida por dos familias: Chakra Petch para títulos, precios y
  acciones principales; Plus Jakarta Sans para el resto del contenido.
- Escala y clases tipográficas compartidas para rótulos, títulos de página y
  sección, tarjetas, introducciones y texto secundario.
- Tema claro y oscuro, con colores definidos mediante variables CSS.
- Layouts y controles adaptables; navegación móvil desplegable y resumen del
  checkout plegable en pantallas angostas.
- Etiquetas accesibles, breadcrumbs, estados de foco visibles, anuncios de
  cambios de carrito y notificaciones, y errores vinculados a sus campos.
- Estados visuales para disponibilidad de stock y controles deshabilitados.

## Estructura del proyecto

```text
.
├── public/                   # Archivos públicos servidos por Vite
│   └── productos/            # Imágenes locales de productos
├── src/
│   ├── assets/               # Logos, símbolos y banners de la marca
│   ├── components/
│   │   ├── CarritoItem.jsx       # Artículo y controles del carrito
│   │   ├── Footer.jsx            # Categorías, información y comunidad
│   │   ├── FormularioCompra.jsx  # Checkout y confirmación simulada
│   │   ├── Navbar.jsx            # Navegación, temas y accesos
│   │   ├── ProductoCard.jsx      # Tarjeta y acción de carrito
│   │   ├── ProductoNoEncontrado.jsx # Estado para producto no encontrado
│   │   ├── Toast.jsx             # Notificaciones y acciones
│   │   └── index.js              # Exportaciones de componentes
│   ├── data/
│   │   ├── cupones.js           # Cupones de descuento de prueba
│   │   └── productos.js          # Catálogo local de productos
│   ├── pages/
│   │   ├── Carrito.jsx           # Carrito y resumen
│   │   ├── Contacto.jsx          # Formulario de contacto
│   │   ├── DetalleProducto.jsx   # Detalle y recomendaciones
│   │   ├── Favoritos.jsx         # Productos guardados por el usuario
│   │   ├── Inicio.jsx            # Banner, categorías y destacados
│   │   ├── Nosotros.jsx          # Información de la tienda
│   │   ├── Productos.jsx         # Catálogo, filtros y paginación
│   │   └── index.js              # Exportaciones de páginas
│   ├── utils/
│   │   └── format.js             # Formato de precios en ARS
│   ├── App.jsx                   # Rutas, carrito, persistencia y apariencia
│   ├── index.css                 # Estilos, temas y escala tipográfica
│   └── main.jsx                  # Punto de entrada de React
├── index.html                    # Fuentes y documento HTML
├── package.json                  # Dependencias y scripts npm
├── tailwind.config.cjs           # Familias tipográficas y colores
└── vite.config.js                # Configuración de Vite y plugins
```

## Scripts disponibles

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Inicia el servidor de desarrollo de Vite. |
| `npm run build` | Genera la versión de producción en `dist/`. |
| `npm run preview` | Sirve localmente la versión generada en `dist/`. |
| `npm run lint` | Ejecuta ESLint sobre el proyecto. |

## Alcance actual

Las páginas, el catálogo local, la búsqueda, los filtros y la paginación en
URL, el carrito y los favoritos persistidos, el checkout y el formulario de
contacto están implementados en el cliente. La compra es una simulación: no se
envía el pedido a un servidor, no se genera una orden real y no se procesa
ningún pago. El formulario de contacto también muestra una confirmación local y
no envía los datos.

## Integrantes

Grupo: Binary Minds

- Diego Goso
- Augusto Morán
- Analía Rossotti
- Lucas Sayago
- Cristian Signorini

## Deploy

[Nexus Gaming](https://nexus-gaming-blond.vercel.app/)
