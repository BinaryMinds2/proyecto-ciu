# Nexus Gaming

Tienda online de tecnología y productos gamer desarrollada con React. La
aplicación permite explorar un catálogo de hardware, periféricos y artículos
para setup, buscar y filtrar productos, cambiar la apariencia de la interfaz y
completar un formulario de compra simulada.

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

- Página de inicio con identidad visual de Nexus Gaming, banner y acceso al
  catálogo.
- Catálogo de 30 productos ficticios organizados en tarjetas con imagen,
  categoría, precio, descripción y disponibilidad.
- Búsqueda de productos por nombre.
- Filtros por categoría y disponibilidad de stock.
- Ordenamiento por precio, de menor a mayor o de mayor a menor.
- Paginación de 12 productos por página, que se reinicia al cambiar la búsqueda
  o los filtros.
- Página de detalle por producto, con imagen, descripción, precio, categoría,
  disponibilidad y acción para agregarlo al carrito.
- Carrito persistente con cantidades, subtotales, total, controles para
  aumentar o disminuir unidades y opción para quitar productos.
- Flujo de checkout simulado con datos de contacto, entrega y método de pago,
  validación de campos y resumen del pedido.
- Indicador del carrito actualizado en la navegación.
- Formulario de contacto con validación y confirmación en pantalla.
- Modo claro/oscuro y modo de descanso visual.
- Diseño adaptable a pantallas de celular, tablet y escritorio.

## Tecnologías

| Área | Tecnología |
| --- | --- |
| Interfaz | React 19 |
| Lenguaje | JavaScript con módulos ES |
| Enrutamiento | React Router 7 |
| Estilos | Tailwind CSS 4 y CSS |
| Animaciones | Motion |
| Herramienta de desarrollo y build | Vite 8 |
| Calidad de código | ESLint |
| Imágenes de productos | Unsplash |

El catálogo se carga desde un array local de objetos. La aplicación no requiere
una API ni una base de datos para iniciarse. Algunas imágenes de productos y
las tipografías se obtienen de servicios externos, por lo que necesitan
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
| `/` | Inicio | Presentación de la tienda y enlace al catálogo. |
| `/productos` | Productos | Catálogo, filtros, ordenamiento y paginación. |
| `/producto/:id` | Detalle | Detalle dinámico del producto seleccionado. |
| `/productos/:id` | Detalle | Ruta alternativa para el mismo detalle dinámico. |
| `/carrito` | Carrito | Productos, cantidades, subtotales y resumen del pedido. |
| `/checkout` | Checkout | Formulario para completar y confirmar una compra simulada. |
| `/contacto` | Contacto | Formulario de contacto con validaciones y confirmación. |

La navegación se implementa con React Router DOM. Las rutas no reconocidas
redirigen a la página de inicio.

## Flujo de compra

1. Explorá el catálogo y usá la búsqueda, los filtros o el ordenamiento para
   encontrar productos.
2. Abrí el detalle para consultar la imagen, descripción, categoría, precio y
   disponibilidad. Desde el catálogo o el detalle podés agregar al carrito los
   productos que tengan stock.
3. En el carrito podés revisar el precio unitario y subtotal de cada artículo,
   cambiar cantidades dentro del stock disponible o quitar productos. El
   resumen actualiza la cantidad de unidades y el total.
4. Seleccioná **Continuar con la compra** para ir a `/checkout`. Completá tus
   datos de contacto y elegí método de entrega y pago.
5. Confirmá el pedido para ver el resumen y el mensaje de confirmación. Al
   finalizar, el carrito se vacía.

El checkout ofrece envío a domicilio, retiro en sucursal o punto de entrega.
Los medios de pago son tarjeta, transferencia bancaria, Mercado Pago o pago al
recibir; esta última opción no está disponible para punto de entrega. La opción
de tarjeta solo valida datos de ejemplo en el navegador: no se realiza ni se
guarda ninguna transacción.

## Catálogo y datos

Los productos se definen en `src/data/productos.js`. Cada objeto incluye
identificador, nombre, categoría, precio, imagen, descripción y stock; algunos
productos también incluyen características técnicas.

En la página de productos se puede:

1. Buscar por texto incluido en el nombre.
2. Filtrar por las categorías disponibles en la interfaz: **Todas**,
   **Periféricos**, **Hardware** y **Setup**.
3. Mostrar únicamente productos con stock disponible.
4. Ordenar el resultado por precio ascendente o descendente.
5. Recorrer los resultados en páginas de hasta 12 productos.

Los filtros y el ordenamiento se aplican antes de paginar los resultados. Los
productos sin stock se identifican visualmente y no se pueden agregar al
carrito. La página de detalle también valida el identificador de la ruta y
ofrece un enlace al catálogo cuando el producto no existe.

El carrito se administra en el estado de React de la aplicación. Agregar un
producto existente incrementa su cantidad; no se permite superar el stock
disponible. La cantidad se mantiene al menos en una unidad mientras el producto
permanece en el carrito; para quitarlo se usa la acción correspondiente.

## Persistencia local

La aplicación utiliza `localStorage` del navegador para guardar el estado
entre recargas:

| Clave | Contenido |
| --- | --- |
| `nexus-cart` | Array JSON de productos agregados, con su cantidad. Se restaura al iniciar la aplicación. |
| `nexus-theme` | Preferencia de tema: `light` o `dark`. |
| `nexus-eye-rest-mode` | Preferencia del modo de descanso visual (`true` o `false`). |

Estos datos se guardan únicamente en el navegador y no se sincronizan entre
dispositivos ni se envían a un servidor. Al restaurar el carrito, se comprueba
que los productos sigan existiendo y que las cantidades sean válidas para el
stock actual. Si el navegador bloquea el acceso al almacenamiento local, las
preferencias visuales siguen funcionando durante la sesión, pero no se
conservan al volver a cargar la página.

## Diseño y accesibilidad

- Estética gamer con paleta violeta y cian, superficies diferenciadas y
  tipografías Plus Jakarta Sans y Chakra Petch.
- Tema claro y oscuro, con colores definidos mediante variables CSS.
- Layouts y controles adaptables a distintos anchos de pantalla.
- Navegación móvil desplegable.
- Etiquetas accesibles para navegación, controles de paginación y estados del
  formulario.
- Estados visuales para foco, disponibilidad y controles deshabilitados.

## Estructura del proyecto

```text
.
├── public/                   # Archivos públicos servidos por Vite
├── src/
│   ├── assets/               # Logos, símbolos y banners de la marca
│   ├── components/
│   │   ├── CheckoutForm.jsx  # Formulario y resumen del checkout simulado
│   │   ├── Footer.jsx        # Pie de página y enlaces
│   │   ├── Navbar.jsx        # Navegación, tema y accesos principales
│   │   └── ProductoCard.jsx  # Tarjeta de producto y acción de carrito
│   ├── data/
│   │   └── productos.js      # Catálogo de productos de ejemplo
│   ├── pages/
│   │   ├── indexs.jsx        # Página de inicio
│   │   ├── productos.jsx     # Catálogo, filtros y paginación
│   │   ├── DetalleProducto.jsx # Detalle de un producto
│   │   ├── carrito.jsx       # Carrito y gestión de cantidades
│   │   └── contacto.jsx      # Formulario de contacto
│   ├── App.jsx               # Rutas y estado global de carrito y apariencia
│   ├── App.css               # Estilos complementarios
│   ├── index.css             # Estilos base y variables de tema
│   └── main.jsx              # Punto de entrada de React
├── index.html                # Documento HTML base
├── package.json              # Dependencias y scripts npm
├── tailwind.config.cjs        # Colores de la identidad visual
└── vite.config.js            # Configuración de Vite y plugins
```

## Scripts disponibles

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Inicia el servidor de desarrollo de Vite. |
| `npm run build` | Genera la versión de producción en `dist/`. |
| `npm run preview` | Sirve localmente la versión generada en `dist/`. |
| `npm run lint` | Ejecuta ESLint sobre el proyecto. |

## Alcance actual

El catálogo, sus filtros, ordenamiento y paginación, las vistas de detalle y
carrito, la persistencia local, el checkout y el formulario de contacto están
implementados. Es una experiencia de compra simulada: los datos y la
confirmación del pedido no se envían a un servidor, no se crea una orden real y
no se procesan pagos. Los datos del formulario y de tarjeta se utilizan solo
para validar y mostrar la confirmación en la sesión.

## Integrantes

Grupo: Binary Minds

- Diego Goso
- Augusto Morán
- Analía Rossotti
- Lucas Sayago
- Cristian Signorini

## Deploy

INSERTAR URL
