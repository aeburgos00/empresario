const NODO_ANCHO = 190;
const NODO_ALTO = 70;
const ESPACIO_H = 26;   // separación horizontal entre nodos hermanos
const ESPACIO_V = 60;   // separación vertical entre niveles

const mapa = document.getElementById("mapa");
const svgFlechas = document.getElementById("flechas");
const overlay = document.getElementById("overlay");
const popupTitulo = document.getElementById("popupTitulo");
const popupDescripcion = document.getElementById("popupDescripcion");
const popupImagen = document.getElementById("popupImagen");
const popupVideoContenedor = document.getElementById("popupVideoContenedor");
const cerrarPopup = document.getElementById("cerrarPopup");

const nodosPorId = {};
const todosLosNodos = [];

// ---------- 1) Calcular la posición (x, y) de cada nodo según el árbol ----------
let cursorX = 0;

function calcularPosiciones(nodo, profundidad) {
  nodo.y = profundidad * (NODO_ALTO + ESPACIO_V);

  if (!nodo.hijos || nodo.hijos.length === 0) {
    nodo.x = cursorX;
    cursorX += NODO_ANCHO + ESPACIO_H;
  } else {
    nodo.hijos.forEach((hijo) => calcularPosiciones(hijo, profundidad + 1));
    const primero = nodo.hijos[0];
    const ultimo = nodo.hijos[nodo.hijos.length - 1];
    nodo.x = (primero.x + ultimo.x) / 2;
  }

  nodosPorId[nodo.id] = nodo;
  todosLosNodos.push(nodo);
}

calcularPosiciones(arbolMapa, 0);

// ---------- 2) Dibujar los cuadrados ----------
todosLosNodos.forEach((nodo) => {
  const cuadrado = document.createElement("div");
  cuadrado.className = "tema";
  cuadrado.textContent = nodo.titulo;
  cuadrado.style.left = nodo.x + "px";
  cuadrado.style.top = nodo.y + "px";
  cuadrado.tabIndex = 0;
  cuadrado.addEventListener("click", () => abrirPopup(nodo.id));
  cuadrado.addEventListener("keydown", (evento) => {
    if (evento.key === "Enter" || evento.key === " ") {
      evento.preventDefault();
      abrirPopup(nodo.id);
    }
  });
  mapa.appendChild(cuadrado);
});

// ---------- 3) Dibujar las líneas que conectan cada nodo con sus hijos ----------
function centroDe(nodo) {
  return { x: nodo.x + NODO_ANCHO / 2, y: nodo.y + NODO_ALTO / 2 };
}

// punto sobre el borde de un rectángulo, en dirección de otro punto
function puntoEnBorde(centro, hacia) {
  const dx = hacia.x - centro.x;
  const dy = hacia.y - centro.y;
  if (dx === 0 && dy === 0) return centro;
  const escalaX = dx !== 0 ? (NODO_ANCHO / 2) / Math.abs(dx) : Infinity;
  const escalaY = dy !== 0 ? (NODO_ALTO / 2) / Math.abs(dy) : Infinity;
  const escala = Math.min(escalaX, escalaY);
  return { x: centro.x + dx * escala, y: centro.y + dy * escala };
}

function dibujarLinea(nodoPadre, nodoHijo) {
  const centroPadre = centroDe(nodoPadre);
  const centroHijo = centroDe(nodoHijo);
  const inicio = puntoEnBorde(centroPadre, centroHijo);
  const fin = puntoEnBorde(centroHijo, centroPadre);

  const linea = document.createElementNS("http://www.w3.org/2000/svg", "path");
  linea.setAttribute("d", `M ${inicio.x} ${inicio.y} L ${fin.x} ${fin.y}`);
  svgFlechas.appendChild(linea);
}

function recorrerYConectar(nodo) {
  if (!nodo.hijos) return;
  nodo.hijos.forEach((hijo) => {
    dibujarLinea(nodo, hijo);
    recorrerYConectar(hijo);
  });
}

recorrerYConectar(arbolMapa);

// ---------- 4) Ajustar el tamaño del contenedor del mapa ----------
const anchoMaximo = Math.max(...todosLosNodos.map((n) => n.x)) + NODO_ANCHO + 20;
const altoMaximo = Math.max(...todosLosNodos.map((n) => n.y)) + NODO_ALTO + 20;
mapa.style.width = anchoMaximo + "px";
mapa.style.height = altoMaximo + "px";

const contenedorMapa = document.querySelector(".mapa-scroll");

function ajustarEscalaMapa() {
  const anchoDisponible = contenedorMapa.clientWidth;
  const altoDisponible = window.innerHeight - contenedorMapa.getBoundingClientRect().top - 30;

  // nunca agranda más allá del tamaño real (máximo 1), solo achica si no entra
  const escala = Math.min(1, anchoDisponible / anchoMaximo, altoDisponible / altoMaximo);

  mapa.style.transform = `scale(${escala})`;
  contenedorMapa.style.height = altoMaximo * escala + "px";
}

ajustarEscalaMapa();

let temporizadorResize;
window.addEventListener("resize", () => {
  clearTimeout(temporizadorResize);
  temporizadorResize = setTimeout(ajustarEscalaMapa, 150);
});


// ---------- Popup ----------
function abrirPopup(id) {
  const nodo = nodosPorId[id];

  popupTitulo.textContent = nodo.titulo;
  popupDescripcion.innerHTML = nodo.descripcion;

  if (nodo.imagen) {
    popupImagen.src = nodo.imagen;
    popupImagen.alt = nodo.titulo;
    popupImagen.classList.add("visible");
  } else {
    popupImagen.classList.remove("visible");
    popupImagen.src = "";
  }

  popupVideoContenedor.innerHTML = "";
  if (nodo.video) {
    const iframe = document.createElement("iframe");
    iframe.src = nodo.video;
    iframe.allowFullscreen = true;
    popupVideoContenedor.appendChild(iframe);
  }

  overlay.classList.add("activo");
}

function cerrarModal() {
  overlay.classList.remove("activo");
}

cerrarPopup.addEventListener("click", cerrarModal);

overlay.addEventListener("click", (evento) => {
  if (evento.target === overlay) cerrarModal();
});

document.addEventListener("keydown", (evento) => {
  if (evento.key === "Escape") cerrarModal();
});

// ---------- Navegación del sidebar: mostrar una página a la vez ----------
const enlacesMenu = document.querySelectorAll(".enlace-menu");
const paginas = document.querySelectorAll(".pagina");

enlacesMenu.forEach((enlace) => {
  enlace.addEventListener("click", (evento) => {
    evento.preventDefault();
    const idPagina = enlace.dataset.pagina;

    paginas.forEach((pagina) => pagina.classList.remove("activa"));
    document.getElementById(idPagina).classList.add("activa");

    enlacesMenu.forEach((el) => el.classList.remove("activo"));
    enlace.classList.add("activo");

        // al volver a la página del mapa, recalcula la escala (el tamaño
    // disponible pudo cambiar mientras la página estaba oculta)
    if (idPagina === "pagina-mapa") ajustarEscalaMapa();

  });
});
