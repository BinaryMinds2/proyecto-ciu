export const productos = [
  {
    id: 1,
    nombre: "Teclado Mecánico RGB 65%",
    categoria: "Periféricos",
    precio: 45000,
    imagen: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?q=80&w=600&auto=format&fit=crop",
    descripcion: "Teclado mecánico compacto con switches red, iluminación RGB personalizable y estructura de aluminio.",
    caracteristicas: [
      "Formato compacto del 65%",
      "Switches mecánicos red",
      "Iluminación RGB personalizable",
      "Estructura de aluminio"
    ],
    stock: 12
  },
  {
    id: 2,
    nombre: "Mouse Inalámbrico Pro Gamer",
    categoria: "Periféricos",
    precio: 28000,
    imagen: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=600&auto=format&fit=crop",
    descripcion: "Sensor óptico de alta precisión, diseño ultraligero y conectividad de ultra baja latencia.",
    caracteristicas: [
      "Sensor óptico de alta precisión",
      "Diseño ultraligero",
      "Conectividad inalámbrica",
      "Conexión de ultra baja latencia"
    ],
    stock: 8,
    destacado: true
  },
  {
    id: 3,
    nombre: "Auriculares Surround 7.1",
    categoria: "Periféricos",
    precio: 35000,
    imagen: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=600&auto=format&fit=crop",
    descripcion: "Sonido envolvente posicional, almohadillas de memoria viscoelástica y micrófono con cancelación de ruido.",
    caracteristicas: [
      "Sonido envolvente 7.1",
      "Audio posicional",
      "Almohadillas de memoria viscoelástica",
      "Micrófono con cancelación de ruido"
    ],
    stock: 0 // Sin stock para probar validación
  },
  {
    id: 4,
    nombre: "Micrófono de Streaming USB",
    categoria: "Periféricos",
    precio: 52000,
    imagen: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=600&auto=format&fit=crop",
    descripcion: "Patrón polar cardioide, control de ganancia directo y soporte antivibración incluido.",
    caracteristicas: [
      "Conexión USB",
      "Patrón polar cardioide",
      "Control de ganancia directo",
      "Soporte antivibración incluido"
    ],
    stock: 5
  },
  {
    id: 5,
    nombre: "Placa de Video RTX Serie",
    categoria: "Hardware",
    precio: 480000,
    imagen: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=600&auto=format&fit=crop",
    descripcion: "Potencia gráfica extrema con trazado de rayos avanzado y DLSS para gaming en 4K.",
    caracteristicas: [
      "Serie RTX",
      "Trazado de rayos avanzado",
      "Tecnología DLSS",
      "Diseñada para gaming en 4K"
    ],
    stock: 3
  },
  {
    id: 6,
    nombre: "Memoria RAM 16GB DDR4",
    categoria: "Hardware",
    precio: 32000,
    imagen: "https://images.unsplash.com/photo-1562976540-1e02c5144c5c?q=80&w=600&auto=format&fit=crop",
    descripcion: "Módulo de alto rendimiento con disipador térmico de perfil bajo y soporte XMP.",
    caracteristicas: [
      "Capacidad de 16 GB",
      "Memoria DDR4",
      "Disipador térmico de perfil bajo",
      "Soporte XMP"
    ],
    stock: 15,
    destacado: true
  },
  {
    id: 7,
    nombre: "SSD M.2 NVMe 1TB",
    categoria: "Hardware",
    precio: 65000,
    imagen: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?q=80&w=600&auto=format&fit=crop",
    descripcion: "Velocidades de lectura de hasta 3500 MB/s para reducir los tiempos de carga al mínimo.",
    caracteristicas: [
      "Capacidad de 1 TB",
      "Formato M.2",
      "Interfaz NVMe",
      "Velocidad de lectura de hasta 3500 MB/s"
    ],
    stock: 0 // Sin stock
  },
  {
    id: 8,
    nombre: "Cooler CPU por Aire RGB",
    categoria: "Hardware",
    precio: 24000,
    imagen: "https://images.unsplash.com/photo-1610438235354-a6ae5528385c?q=80&w=600&auto=format&fit=crop",
    descripcion: "Disipador de alta eficiencia con heatpipes de cobre y ventilador silencioso de 120mm.",
    caracteristicas: [
      "Refrigeración por aire para CPU",
      "Iluminación RGB",
      "Heatpipes de cobre",
      "Ventilador silencioso de 120 mm"
    ],
    stock: 7
  },
  {
    id: 9,
    nombre: "Silla Ergonómica Gamer Cyber",
    categoria: "Setup",
    precio: 195000,
    imagen: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?q=80&w=600&auto=format&fit=crop",
    descripcion: "Reclinable 180°, almohadones lumbares y cervicales ajustables, reposabrazos 4D.",
    caracteristicas: [
      "Respaldo reclinable hasta 180°",
      "Almohadón lumbar ajustable",
      "Almohadón cervical ajustable",
      "Reposabrazos 4D"
    ],
    stock: 4
  },
  {
    id: 10,
    nombre: "Mousepad XXL con Iluminación LED",
    categoria: "Setup",
    precio: 15000,
    imagen: "https://images.unsplash.com/photo-1616440347437-b1c73416efc2?q=80&w=600&auto=format&fit=crop",
    descripcion: "Superficie de tela microtexturizada optimizada para sensores láser y ópticos, bordes RGB.",
    caracteristicas: [
      "Formato XXL",
      "Superficie de tela microtexturizada",
      "Compatible con sensores láser y ópticos",
      "Iluminación LED RGB en los bordes"
    ],
    stock: 20,
    destacado: true
  },
  {
    id: 11,
    nombre: "Brazo Articulado para Monitor",
    categoria: "Setup",
    precio: 38000,
    imagen: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=600&auto=format&fit=crop",
    descripcion: "Soporte de pistón a gas compatible con pantallas de 17 a 32 pulgadas y gestión de cables.",
    caracteristicas: [
      "Brazo articulado con pistón a gas",
      "Compatible con monitores de 17 a 32 pulgadas",
      "Sistema de gestión de cables"
    ],
    stock: 6
  },
  {
    id: 12,
    nombre: "Tira de Luces LED Smart RGB",
    categoria: "Setup",
    precio: 18000,
    imagen: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600&auto=format&fit=crop",
    descripcion: "Iluminación ambiental sincronizable por aplicación y control remoto para tu escritorio.",
    caracteristicas: [
      "Iluminación LED RGB",
      "Sincronización mediante aplicación",
      "Control remoto",
      "Diseñada para iluminación ambiental"
    ],
    stock: 10
  }, {
  id: 13,
  nombre: "Procesador AMD Ryzen 7 7800X3D",
  precio: 620000,
  categoria: "Hardware",
  stock: 8,
  imagen: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800&auto=format&fit=crop&q=60",
  descripcion: "El rey indiscutido del gaming. Arquitectura Zen 4 con tecnología 3D V-Cache para un rendimiento extremo en cuadros por segundo.",
  caracteristicas: [
    "8 núcleos y 16 hilos a 4.2 GHz (Boost 5.0 GHz)",
    "96 MB de caché L3 3D V-Cache",
    "Socket AM5 compatible con DDR5",
    "Consumo eficiente de 120W TDP"
  ]
},
{
  id: 14,
  nombre: "Placa de Video AMD Radeon RX 7900 XTX 24GB",
  precio: 1350000,
  categoria: "Hardware",
  stock: 3,
  imagen: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800&auto=format&fit=crop&q=60",
  descripcion: "Potencia gráfica bruta para juegos en 4K nativo con 24 GB de memoria VRAM GDDR6 y arquitectura RDNA 3.",
  caracteristicas: [
    "24 GB GDDR6 a 384-bit",
    "Arquitectura RDNA 3 con Chiplets",
    "Soporte DisplayPort 2.1 de nueva generación",
    "Consumo: 355W (Fuente recomendada 800W)"
  ]
},
{
  id: 15,
  nombre: "Memoria RAM Corsair Vengeance RGB DDR5 32GB (2x16GB) 6000MHz",
  precio: 185000,
  categoria: "Hardware",
  stock: 12,
  destacado: true,
  imagen: "https://images.unsplash.com/photo-1562976540-1502c2145186?w=800&auto=format&fit=crop&q=60",
  descripcion: "Velocidades ultra rápidas y perfiles EXPO/XMP 3.0 con iluminación RGB dinámica direccionable por software.",
  caracteristicas: [
    "Capacidad: 32 GB (Kit dual channel 2x16GB)",
    "Frecuencia: 6000 MHz CL30",
    "Disipador de aluminio anodizado",
    "Optimizado para plataformas Intel y AMD DDR5"
  ]
},
{
  id: 16,
  nombre: "SSD M.2 NVMe Samsung 990 Pro 2TB PCIe 4.0",
  precio: 240000,
  categoria: "Hardware",
  stock: 15,
  imagen: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=800&auto=format&fit=crop&q=60",
  descripcion: "Unidad de estado sólido de alto rendimiento para tiempos de carga inexistentes en juegos y edición pesada.",
  caracteristicas: [
    "Velocidad de lectura: hasta 7450 MB/s",
    "Velocidad de escritura: hasta 6900 MB/s",
    "Formato M.2 2280 PCIe Gen 4 x4",
    "Controlador térmico de níquel para enfriamiento efectivo"
  ]
},
{
  id: 17,
  nombre: "Fuente de Alimentación ASUS ROG Thor 1000W Platinum II",
  precio: 410000,
  categoria: "Hardware",
  stock: 4,
  imagen: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=800&auto=format&fit=crop&q=60",
  descripcion: "La fuente modular más silenciosa y eficiente de su clase, con pantalla OLED incorporada para monitoreo de consumo en vivo.",
  caracteristicas: [
    "Certificación 80 Plus Platinum",
    "Pantalla OLED integrada con lectura de vatios",
    "Diseño 100% modular con cables mallados",
    "Soporte PCIe 5.0 con conector de 16 pines incluido"
  ]
},
{
  id: 18,
  nombre: "Gabinete Lian Li O11 Dynamic EVO XL RGB",
  precio: 310000,
  categoria: "Hardware",
  stock: 6,
  imagen: "https://images.unsplash.com/photo-1547082299-de196ea013d6?w=800&auto=format&fit=crop&q=60",
  descripcion: "Gabinete modular de vidrio templado dual con espacio ilimitado para refrigeración líquida custom y placas de gran tamaño.",
  caracteristicas: [
    "Paneles de cristal templado sin pilar frontal",
    "Soporte para radiadores de hasta 420mm simultáneos",
    "Bandeja de mother reconfigurable e invertible",
    "Tira LED ARGB integrada en el panel frontal"
  ]
}
];



  