/************* DIBUJO DE MAPA ************/

const NODO_ANCHO = 190;
const NODO_ALTO = 70;

// ---- Separaciones (podés ajustarlas para hacer el mapa más compacto o más aireado) ----
const ESPACIO_H = 26;         // entre hermanos que están en una fila
const ESPACIO_V = 60;         // entre un padre y su fila de hijos (abajo / arriba)
const ESPACIO_LATERAL = 60;   // entre un padre y su columna de hijos (izquierda / derecha)
const ESPACIO_COLUMNA = 16;   // entre hermanos apilados en vertical
const ESPACIO_LISTA = 24;     // entre un padre y el primer hijo de una lista
const SANGRIA_LISTA = 40;     // cuánto se corre hacia la derecha cada hijo de una lista
const TRONCO_LISTA = 20;      // posición de la línea vertical de una lista (desde el borde izquierdo del padre)
const MARGEN_MANUAL = 5;     // (modo manual) margen alrededor del mapa

const mapa = document.getElementById("mapa");
const popup = document.querySelector(".popup");
const svgFlechas = document.getElementById("flechas");
const overlay = document.getElementById("overlay");
const popupTitulo = document.getElementById("popupTitulo");
const popupDescripcion = document.getElementById("popupDescripcion");
const popupImagen = document.getElementById("popupImagen");
const popupVideoContenedor = document.getElementById("popupVideoContenedor");
const cerrarPopup = document.getElementById("cerrarPopup");

const nodosPorId = {};
const todosLosNodos = [];

// ---------- Modo de posicionamiento ----------
// Si el nodo raíz define "x", el mapa se arma en MODO MANUAL: cada nodo trae su
// posición (x, y) y tamaño (ancho, alto), y su tipo de conector.
// Si no, se usa el MODO AUTOMÁTICO (el árbol se acomoda solo con "lado"/"disposicion").
const MODO_MANUAL = typeof arbolMapa.x === "number";
const ESCALA_MANUAL = MODO_MANUAL && typeof escalaMapa === "number" ? escalaMapa : 1;
const px = (valor) => valor * ESCALA_MANUAL + MARGEN_MANUAL;

// ---------- 1) Calcular la posición (x, y) de cada nodo según el árbol ----------
//
// Cada nodo se acomoda respecto de su padre según su propiedad "lado":
//   "abajo" (por defecto), "arriba", "izquierda" o "derecha".
// Y un padre puede pedir "disposicion: 'lista'" para que sus hijos de abajo
// se apilen en vertical (con una línea troncal) en vez de ir en fila.

const LADOS = ["abajo", "arriba", "izquierda", "derecha"];

function ladoDe(nodo) {
  return LADOS.includes(nodo.lado) ? nodo.lado : "abajo";
}

// Acomoda hijos en una fila horizontal, centrada respecto del padre (asigna relX)
function colocarFila(hijos) {
  let cursor = 0;
  const centros = hijos.map((hijo) => {
    const x = cursor - hijo.caja.minX;
    cursor += hijo.caja.maxX - hijo.caja.minX + ESPACIO_H;
    hijo.relX = x;
    return x + NODO_ANCHO / 2;
  });
  const medio = (centros[0] + centros[centros.length - 1]) / 2;
  hijos.forEach((hijo) => (hijo.relX += NODO_ANCHO / 2 - medio));
}

// Acomoda hijos en una columna vertical, centrada respecto del padre (asigna relY)
function colocarColumna(hijos) {
  let cursor = 0;
  const centros = hijos.map((hijo) => {
    const y = cursor - hijo.caja.minY;
    cursor += hijo.caja.maxY - hijo.caja.minY + ESPACIO_COLUMNA;
    hijo.relY = y;
    return y + NODO_ALTO / 2;
  });
  const medio = (centros[0] + centros[centros.length - 1]) / 2;
  hijos.forEach((hijo) => (hijo.relY += NODO_ALTO / 2 - medio));
}

// Rectángulo que cubre a un grupo de hijos (con todos sus descendientes)
function extremosDe(hijos) {
  return {
    minX: Math.min(...hijos.map((h) => h.relX + h.caja.minX)),
    maxX: Math.max(...hijos.map((h) => h.relX + h.caja.maxX)),
    minY: Math.min(...hijos.map((h) => h.relY + h.caja.minY)),
    maxY: Math.max(...hijos.map((h) => h.relY + h.caja.maxY))
  };
}

// Calcula, para cada hijo, su posición relativa al padre (relX, relY).
// Devuelve la "caja" que ocupa el nodo junto con todo lo que cuelga de él,
// medida desde la esquina superior izquierda del propio nodo.
function calcularBloque(nodo) {
  const grupos = { abajo: [], arriba: [], izquierda: [], derecha: [] };

  (nodo.hijos || []).forEach((hijo) => {
    hijo.caja = calcularBloque(hijo);
    grupos[ladoDe(hijo)].push(hijo);
  });

  const caja = { minX: 0, minY: 0, maxX: NODO_ANCHO, maxY: NODO_ALTO };
  const ampliar = (e) => {
    caja.minX = Math.min(caja.minX, e.minX);
    caja.maxX = Math.max(caja.maxX, e.maxX);
    caja.minY = Math.min(caja.minY, e.minY);
    caja.maxY = Math.max(caja.maxY, e.maxY);
  };

  // Derecha: columna a la derecha del padre, a su misma altura
  if (grupos.derecha.length) {
    colocarColumna(grupos.derecha);
    const izq = Math.min(...grupos.derecha.map((h) => h.caja.minX));
    grupos.derecha.forEach((h) => (h.relX = NODO_ANCHO + ESPACIO_LATERAL - izq));
    ampliar(extremosDe(grupos.derecha));
  }

  // Izquierda: columna a la izquierda del padre, a su misma altura
  if (grupos.izquierda.length) {
    colocarColumna(grupos.izquierda);
    const der = Math.max(...grupos.izquierda.map((h) => h.caja.maxX));
    grupos.izquierda.forEach((h) => (h.relX = -ESPACIO_LATERAL - der));
    ampliar(extremosDe(grupos.izquierda));
  }

  // Abajo: en fila (por defecto) o apilados como lista
  if (grupos.abajo.length) {
    if (nodo.disposicion === "lista") {
      const izq = Math.min(...grupos.abajo.map((h) => h.caja.minX));
      let cursor = caja.maxY + ESPACIO_LISTA;
      grupos.abajo.forEach((h) => {
        h.relX = SANGRIA_LISTA - izq;
        h.relY = cursor - h.caja.minY;
        cursor += h.caja.maxY - h.caja.minY + ESPACIO_COLUMNA;
      });
    } else {
      colocarFila(grupos.abajo);
      const arr = Math.min(...grupos.abajo.map((h) => h.caja.minY));
      grupos.abajo.forEach((h) => (h.relY = caja.maxY + ESPACIO_V - arr));
    }
    ampliar(extremosDe(grupos.abajo));
  }

  // Arriba: fila por encima del padre
  if (grupos.arriba.length) {
    colocarFila(grupos.arriba);
    const abj = Math.max(...grupos.arriba.map((h) => h.caja.maxY));
    grupos.arriba.forEach((h) => (h.relY = caja.minY - ESPACIO_V - abj));
    ampliar(extremosDe(grupos.arriba));
  }

  return caja;
}

// Convierte las posiciones relativas en posiciones absolutas dentro del mapa
function asignarPosiciones(nodo, x, y) {
  nodo.x = x;
  nodo.y = y;
  nodo.w = NODO_ANCHO;
  nodo.h = NODO_ALTO;
  nodosPorId[nodo.id] = nodo;
  todosLosNodos.push(nodo);
  (nodo.hijos || []).forEach((hijo) => asignarPosiciones(hijo, x + hijo.relX, y + hijo.relY));
}

// Modo manual: toma x, y, ancho y alto de cada nodo (escalados por "escalaMapa")
function prepararManual(nodo) {
  nodo.w = (nodo.ancho ?? NODO_ANCHO) * ESCALA_MANUAL;
  nodo.h = (nodo.alto ?? NODO_ALTO) * ESCALA_MANUAL;
  nodo.x = px(nodo.x);
  nodo.y = px(nodo.y);
  nodosPorId[nodo.id] = nodo;
  todosLosNodos.push(nodo);
  (nodo.hijos || []).forEach(prepararManual);
}

if (MODO_MANUAL) {
  prepararManual(arbolMapa);
} else {
  const cajaRaiz = calcularBloque(arbolMapa);
  asignarPosiciones(arbolMapa, -cajaRaiz.minX, -cajaRaiz.minY);
}

// ---------- 2) Dibujar los cuadrados ----------
todosLosNodos.forEach((nodo) => {
  const cuadrado = document.createElement("div");
  cuadrado.className = "tema";
  cuadrado.textContent = nodo.titulo;
  cuadrado.style.left = nodo.x + "px";
  cuadrado.style.top = nodo.y + "px";
  if (MODO_MANUAL) {
    cuadrado.style.width = nodo.w + "px";
    cuadrado.style.height = nodo.h + "px";
    cuadrado.style.minHeight = "0";
  }
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
function trazar(d) {
  const linea = document.createElementNS("http://www.w3.org/2000/svg", "path");
  linea.setAttribute("d", d);
  linea.setAttribute("fill", "none");
  svgFlechas.appendChild(linea);
}

function centroDe(nodo) {
  return { x: nodo.x + nodo.w / 2, y: nodo.y + nodo.h / 2 };
}

// punto sobre el borde de un nodo, en dirección de otro punto
function puntoEnBorde(nodo, hacia) {
  const centro = centroDe(nodo);
  const dx = hacia.x - centro.x;
  const dy = hacia.y - centro.y;
  if (dx === 0 && dy === 0) return centro;
  const escalaX = dx !== 0 ? nodo.w / 2 / Math.abs(dx) : Infinity;
  const escalaY = dy !== 0 ? nodo.h / 2 / Math.abs(dy) : Infinity;
  const escala = Math.min(escalaX, escalaY);
  return { x: centro.x + dx * escala, y: centro.y + dy * escala };
}

// Línea recta de padre a hijo (filas de abajo / arriba)
function dibujarLineaRecta(padre, hijo) {
  const inicio = puntoEnBorde(padre, centroDe(hijo));
  const fin = puntoEnBorde(hijo, centroDe(padre));
  trazar(`M ${inicio.x} ${inicio.y} L ${fin.x} ${fin.y}`);
}

// Lista vertical: una línea troncal que baja del padre, con una rama a cada hijo
function dibujarLista(padre, hijos) {
  const xTronco = padre.x + TRONCO_LISTA;
  const yUltimo = hijos[hijos.length - 1].y + NODO_ALTO / 2;
  let d = `M ${xTronco} ${padre.y + NODO_ALTO} L ${xTronco} ${yUltimo}`;
  hijos.forEach((hijo) => {
    const y = hijo.y + NODO_ALTO / 2;
    d += ` M ${xTronco} ${y} L ${hijo.x} ${y}`;
  });
  trazar(d);
}

// Hijos a la izquierda o a la derecha: llave horizontal con una rama a cada hijo
function dibujarLlave(padre, hijos, lado) {
  const yPadre = padre.y + NODO_ALTO / 2;
  const xPadre = lado === "derecha" ? padre.x + NODO_ANCHO : padre.x;
  const xBordeHijo = (hijo) => (lado === "derecha" ? hijo.x : hijo.x + NODO_ANCHO);
  const xMedio = (xPadre + xBordeHijo(hijos[0])) / 2;
  const ys = hijos.map((hijo) => hijo.y + NODO_ALTO / 2);

  let d = `M ${xPadre} ${yPadre} L ${xMedio} ${yPadre}`;
  d += ` M ${xMedio} ${Math.min(yPadre, ...ys)} L ${xMedio} ${Math.max(yPadre, ...ys)}`;
  hijos.forEach((hijo, i) => {
    d += ` M ${xMedio} ${ys[i]} L ${xBordeHijo(hijo)} ${ys[i]}`;
  });
  trazar(d);
}

function conectar(padre) {
  const hijos = padre.hijos || [];
  const porLado = { abajo: [], arriba: [], izquierda: [], derecha: [] };
  hijos.forEach((hijo) => porLado[ladoDe(hijo)].push(hijo));

  if (padre.disposicion === "lista" && porLado.abajo.length) {
    dibujarLista(padre, porLado.abajo);
  } else {
    porLado.abajo.forEach((hijo) => dibujarLineaRecta(padre, hijo));
  }
  porLado.arriba.forEach((hijo) => dibujarLineaRecta(padre, hijo));
  if (porLado.derecha.length) dibujarLlave(padre, porLado.derecha, "derecha");
  if (porLado.izquierda.length) dibujarLlave(padre, porLado.izquierda, "izquierda");

  hijos.forEach(conectar);
}

// ---- Modo manual: cada hijo dice cómo se conecta con su padre en "conector" ----
//   "recta"    línea recta de borde a borde (por defecto)
//   "vertical" línea vertical directa, de la base del padre al techo del hijo
//   "bus"      barra tipo organigrama: baja, corre en horizontal y vuelve a bajar
//   "lateral"  línea horizontal entre los bordes de dos nodos a la misma altura
//   "codo"     sale del costado del padre, corre en horizontal y baja al hijo
//   "tronco"   baja desde el centro del padre y sale de costado hasta el hijo
//   "llave"    llave (corchete) entre el padre y el hijo, por el costado
//   "ninguno"  no dibuja línea
// Se puede escribir como texto ("bus") o como objeto con ajustes ({ tipo: "bus", y: 462 }).
function trazarConector(p, h, cfg, busPorDefecto) {
  const pcx = p.x + p.w / 2;
  const pcy = p.y + p.h / 2;
  const pabajo = p.y + p.h;
  const hcx = h.x + h.w / 2;
  const hcy = h.y + h.h / 2;
  const haciaDerecha = hcx > pcx;
  const bordePadre = haciaDerecha ? p.x + p.w : p.x;   // borde del padre que mira al hijo
  const bordeHijo = haciaDerecha ? h.x : h.x + h.w;    // borde del hijo que mira al padre

  switch (cfg.tipo) {
    case "ninguno":
      return;

    case "vertical": {
      const izq = Math.max(p.x, h.x);
      const der = Math.min(p.x + p.w, h.x + h.w);
      if (der <= izq) return dibujarLineaRecta(p, h);
      const x = (izq + der) / 2;
      return trazar(`M ${x} ${pabajo} L ${x} ${h.y}`);
    }

    case "bus": {
      const y = cfg.y !== undefined ? px(cfg.y) : busPorDefecto;
      return trazar(`M ${pcx} ${pabajo} L ${pcx} ${y} L ${hcx} ${y} L ${hcx} ${h.y}`);
    }

    case "lateral":
      return trazar(`M ${bordePadre} ${pcy} L ${bordeHijo} ${pcy}`);

    case "codo":
      return trazar(`M ${bordePadre} ${pcy} L ${hcx} ${pcy} L ${hcx} ${h.y}`);

    case "tronco":
      return trazar(`M ${pcx} ${pabajo} L ${pcx} ${hcy} L ${bordeHijo} ${hcy}`);

    case "llave": {
      if (cfg.desde === "abajo") {
        // la llave nace del tronco que baja del padre, a la altura "y"
        const yCodo = px(cfg.y);
        const xLlave = px(cfg.x);
        return trazar(
          `M ${pcx} ${pabajo} L ${pcx} ${yCodo} L ${xLlave} ${yCodo} L ${xLlave} ${hcy} L ${bordeHijo} ${hcy}`
        );
      }
      const xLlave = cfg.x !== undefined ? px(cfg.x) : (bordePadre + bordeHijo) / 2;
      return trazar(`M ${bordePadre} ${pcy} L ${xLlave} ${pcy} L ${xLlave} ${hcy} L ${bordeHijo} ${hcy}`);
    }

    default:
      return dibujarLineaRecta(p, h);
  }
}

function conectarManual(padre) {
  const hijos = padre.hijos || [];
  const configs = hijos.map((hijo) =>
    typeof hijo.conector === "string" ? { tipo: hijo.conector } : hijo.conector || { tipo: "recta" }
  );

  // altura por defecto de la barra compartida por los hijos de tipo "bus"
  const conBus = hijos.filter((hijo, i) => configs[i].tipo === "bus" && configs[i].y === undefined);
  const busPorDefecto = conBus.length
    ? (padre.y + padre.h + Math.min(...conBus.map((hijo) => hijo.y))) / 2
    : null;

  hijos.forEach((hijo, i) => {
    trazarConector(padre, hijo, configs[i], busPorDefecto);
    conectarManual(hijo);
  });
}

if (MODO_MANUAL) {
  conectarManual(arbolMapa);
} else {
  conectar(arbolMapa);
}

// ---------- 4) Tamaño real del árbol y escala para que entre sin scroll ----------
const margenFinal = MODO_MANUAL ? MARGEN_MANUAL : 20;
const anchoMaximo = Math.max(...todosLosNodos.map((n) => n.x + n.w)) + margenFinal;
const altoMaximo = Math.max(...todosLosNodos.map((n) => n.y + n.h)) + margenFinal;
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

  popup.classList.remove("nosotros");
  popup.style.backgroundImage = "";

  cerrarPopup.classList.remove("nosotros");

  popupImagen.classList.remove("visible");
  popupImagen.src = "";
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


/************* POPUP DE NOSOTROS ************/
function abrirPopupNosotros(img) {
  const srcImagen = "./imgs/avatares/" + img;
  
  popupTitulo.textContent = "";
  popupDescripcion.innerHTML = "";
  popupVideoContenedor.innerHTML = "";

  // Usar la imagen como fondo del popup
  popup.style.backgroundImage = `url("${srcImagen}")`;

  // Ocultar la imagen interna
  popupImagen.classList.remove("visible");
  popupImagen.src = "";

  // Aplicar estilo especial
  popup.classList.add("nosotros");

  // Cruz negra
  cerrarPopup.classList.add("nosotros");

  overlay.classList.add("activo");
}


