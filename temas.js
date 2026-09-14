// Lista de temas del mapa conceptual.
// Cada objeto es un nodo (cuadrado) del mapa.
//
// Campos:
//   id:          identificador único, se usa en "conexiones" (obligatorio)
//   titulo:      nombre que aparece en el cuadrado y en el popup (obligatorio)
//   descripcion: texto que se muestra en el popup (obligatorio)
//   x, y:        posición del cuadrado dentro del mapa, en píxeles (obligatorio)
//   conexiones:  array con los "id" de los nodos hacia los que apunta la flecha (opcional)
//   imagen:      URL de una imagen para el popup (opcional)
//   video:       URL "embed" de YouTube para el popup (opcional)

const temas = [
  {
    id: "variables",
    titulo: "Variables",
    descripcion: "Espacios de memoria identificados con un nombre, donde se guardan datos que pueden cambiar durante la ejecución de un programa.",
    x: 20,
    y: 20,
    conexiones: ["control", "estructuras-datos"]
  },
  {
    id: "control",
    titulo: "Estructuras de control",
    descripcion: "Instrucciones como if, else, while y for que permiten decidir qué camino sigue el programa o repetir tareas.",
    x: 300,
    y: 20,
    imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/If-Then-Else-Flowchart.svg/640px-If-Then-Else-Flowchart.svg.png",
    conexiones: ["funciones"]
  },
  {
    id: "funciones",
    titulo: "Funciones",
    descripcion: "Bloques de código reutilizables que reciben parámetros, realizan una tarea y pueden devolver un resultado.",
    x: 580,
    y: 20,
    conexiones: ["poo"]
  },
  {
    id: "poo",
    titulo: "Programación Orientada a Objetos",
    descripcion: "Paradigma que organiza el código en clases y objetos, usando conceptos como herencia, encapsulamiento y polimorfismo.",
    x: 580,
    y: 200,
    conexiones: ["bases-datos"]
  },
  {
    id: "estructuras-datos",
    titulo: "Estructuras de Datos",
    descripcion: "Formas de organizar y almacenar datos (listas, pilas, colas, árboles, etc.) para poder acceder y modificarlos de forma eficiente.",
    x: 20,
    y: 200,
    conexiones: ["algoritmos", "redes"]
  },
  {
    id: "algoritmos",
    titulo: "Algoritmos",
    descripcion: "Secuencias finitas de pasos, bien definidos, que resuelven un problema o realizan una tarea concreta.",
    x: 300,
    y: 200,
    conexiones: ["bases-datos"]
  },
  {
    id: "bases-datos",
    titulo: "Bases de Datos",
    descripcion: "Sistemas organizados para almacenar, consultar y modificar información de manera persistente.",
    x: 300,
    y: 380,
    video: "https://www.youtube.com/embed/HXV3zeQKqGY"
  },
  {
    id: "redes",
    titulo: "Redes",
    descripcion: "Conjuntos de dispositivos conectados entre sí que intercambian información siguiendo protocolos definidos.",
    x: 20,
    y: 380
  }
];
