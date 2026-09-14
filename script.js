const NODO_ANCHO = 180;
const NODO_ALTO = 70;

const mapa = document.getElementById("mapa");
const svgFlechas = document.getElementById("flechas");
const overlay = document.getElementById("overlay");
const popupTitulo = document.getElementById("popupTitulo");
const popupDescripcion = document.getElementById("popupDescripcion");
const popupImagen = document.getElementById("popupImagen");
const popupVideoContenedor = document.getElementById("popupVideoContenedor");
const cerrarPopup = document.getElementById("cerrarPopup");

const temasPorId = {};
temas.forEach((tema) => (temasPorId[tema.id] = tema));

// ---------- Dibujar los cuadrados ----------
temas.forEach((tema) => {
  const cuadrado = document.createElement("div");
  cuadrado.className = "tema";
  cuadrado.textContent = tema.titulo;
  cuadrado.style.left = tema.x + "px";
  cuadrado.style.top = tema.y + "px";
  cuadrado.tabIndex = 0;
  cuadrado.addEventListener("click", () => abrirPopup(tema.id));
  cuadrado.addEventListener("keydown", (evento) => {
    if (evento.key === "Enter" || evento.key === " ") {
      evento.preventDefault();
      abrirPopup(tema.id);
    }
  });
  mapa.appendChild(cuadrado);
});

// ---------- Dibujar las flechas ----------
svgFlechas.innerHTML = `
  <defs>
    <marker id="flecha" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
      <path d="M0,0 L10,5 L0,10 Z" fill="#7fa88f"></path>
    </marker>
  </defs>
`;

// Punto sobre el borde de un rectángulo, en la dirección de otro punto
function puntoEnBorde(centro, hacia) {
  const dx = hacia.x - centro.x;
  const dy = hacia.y - centro.y;
  if (dx === 0 && dy === 0) return centro;
  const escalaX = dx !== 0 ? (NODO_ANCHO / 2) / Math.abs(dx) : Infinity;
  const escalaY = dy !== 0 ? (NODO_ALTO / 2) / Math.abs(dy) : Infinity;
  const escala = Math.min(escalaX, escalaY);
  return { x: centro.x + dx * escala, y: centro.y + dy * escala };
}

function centroDe(tema) {
  return { x: tema.x + NODO_ANCHO / 2, y: tema.y + NODO_ALTO / 2 };
}

temas.forEach((tema) => {
  if (!tema.conexiones) return;
  const centroOrigen = centroDe(tema);

  tema.conexiones.forEach((idDestino) => {
    const destino = temasPorId[idDestino];
    if (!destino) return;
    const centroDestino = centroDe(destino);

    const inicio = puntoEnBorde(centroOrigen, centroDestino);
    const fin = puntoEnBorde(centroDestino, centroOrigen);

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", `M ${inicio.x} ${inicio.y} L ${fin.x} ${fin.y}`);
    path.setAttribute("marker-end", "url(#flecha)");
    svgFlechas.appendChild(path);
  });
});

// ajusta el tamaño del contenedor del mapa al contenido de temas.js
const anchoMaximo = Math.max(...temas.map((t) => t.x)) + NODO_ANCHO + 40;
const altoMaximo = Math.max(...temas.map((t) => t.y)) + NODO_ALTO + 40;
mapa.style.width = anchoMaximo + "px";
mapa.style.height = altoMaximo + "px";

// ---------- Popup ----------
function abrirPopup(id) {
  const tema = temasPorId[id];

  popupTitulo.textContent = tema.titulo;
  popupDescripcion.textContent = tema.descripcion;

  if (tema.imagen) {
    popupImagen.src = tema.imagen;
    popupImagen.alt = tema.titulo;
    popupImagen.classList.add("visible");
  } else {
    popupImagen.classList.remove("visible");
    popupImagen.src = "";
  }

  popupVideoContenedor.innerHTML = "";
  if (tema.video) {
    const iframe = document.createElement("iframe");
    iframe.src = tema.video;
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

// ---------- Menú lateral: marcar el enlace activo ----------
const enlacesMenu = document.querySelectorAll(".enlace-menu");

enlacesMenu.forEach((enlace) => {
  enlace.addEventListener("click", () => {
    enlacesMenu.forEach((el) => el.classList.remove("activo"));
    enlace.classList.add("activo");
  });
});
