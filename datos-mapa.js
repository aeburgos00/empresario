/*
// Árbol de contenidos del Mapa Conceptual.
// Es una estructura jerárquica: cada nodo puede tener "hijos" (un array de
// nodos con la misma forma). El dibujo en pantalla se genera solo, en base
// a esta jerarquía (no hace falta indicar posiciones x/y a mano).
//
// Campos de cada nodo:
//   id:          identificador único (obligatorio)
//   titulo:      texto que aparece en el cuadrado y en el popup (obligatorio)
//   descripcion: texto que se muestra en el popup (obligatorio)
//   imagen:      URL de una imagen para el popup (opcional)
//   video:       URL "embed" de YouTube para el popup (opcional)
//   hijos:       array de nodos hijos (opcional, se omite en los nodos hoja)

const arbolMapa = {
  id: "sociedades",
  titulo: "Sociedades: Parte General",
  descripcion:"",
  hijos: [
    {
      id: "constitucion-registro",
      titulo: "Constitución y Registro",
      descripcion:"",
      hijos: [
        {
          id: "constitucion-sociedad",
          titulo: "Constitución de la Sociedad",
          descripcion:"",
          hijos: [
            {
              id: "acto-constitutivo",
              titulo: "Acto Constitutivo",
              descripcion: "El acto constitutivo es el acto jurídico mediante el cual se crea la sociedad. Por lo tanto, podemos decir que la sociedad existe desde el momento del acto constitutivo (Art. 142 CCCN). Este acto, tiene diferentes caracteres y elementos.",
              hijos: [
                {
                  id: "elementos",
                  titulo: "Elementos",
                  descripcion:"",
                  hijos: [
                    {
                      id: "generales",
                      titulo: "Generales",
                      descripcion: "El contrato de sociedad como todo contrato, presenta los siguientes elementos:<br><strong>- Consentimiento:</strong> En este caso, se trata del acuerdo de voluntades de los socios.<br><strong>- Capacidad:</strong> En este caso, hablamos de capacidad para constituir sociedades (Sección V Ley 19.550).<br><strong>- Objeto.</strong> La actividad que va a desarrollar la actividad, precisa y determinada en el contrato. Responde a la pregunta “Qué?”.<br><strong>- Causa:</strong> Se trata de la finalidad. Responde a la pregunta “Para qué?”.<br><strong>- Forma:</strong> Este contrato puede realizarse por instrumento público o privado, salvo en aquellos casos donde la ley exija formas específicas."
                    },
                    {
                      id: "especificos",
                      titulo: "Específicos",
                      descripcion: "Son aquellos elementos que caracterizan al contrato de sociedad, y que surgen del Art. 1 de la Ley 19.550 (reformada por la Ley 26.994) y son:<br><strong>- Pluralidad de socios:</strong> Salvo el caso de las Sociedades Unipersonales.<br><strong>- Organización:</strong> (Obligaciones de los socios, órganos y funciones de cada órgano, distribución de ganancias, forma de adoptar ciertas decisiones, etc.).<br><strong>- Tipicidad:</strong> La sociedad que se va a constituir debe ser uno de los tipos contemplados en la Ley.<br><strong>- Aportes:</strong> Pueden ser obligaciones de dar o de hacer valuadas en dinero. La sumatoria de todos los aportes efectuados por los socios es lo que se denomina “capital social”.<br><strong>- Fin Societario:</strong> Siempre será la producción o intercambio de bienes o servicios).<br><strong>- Participación en los beneficios y soporte de las perdidas:</strong> Si la actividad realizada da ganancias, estas serán repartidas entre los socios, de la misma manera que si arroja perdidas también deberán soportarla todos los socios.<br><strong>- Affectio Societatis:</strong> Según Nissen, la affectio societatis consiste en la “predisposición de los integrantes de la sociedad de actuar en forma coordinada para obtener el fin perseguido con la constitución de la misma, postergando los intereses personales en aras del beneficio común”. Puede existir en mayor o en menor medida."
                    },
                    {
                      id: "esenciales-no-tipificantes",
                      titulo: "Esenciales no Tipificantes",
                      descripcion: "Los encontramos en el art. 11 de la Ley 19.550 y son:<br>- Datos de los socios (ya sea persona humana o jurídica).<br>- La razón social o la denominación, y el domicilio de la sociedad.<br>- Su objeto, que debe ser preciso y determinado.<br>- El capital social, que deberá ser expresado en moneda argentina, y la mención del aporte de cada socio.<br>- El plazo de duración, que debe ser determinado.<br>- La organización de la administración, de su fiscalización y de las reuniones de socios.<br>- Las reglas para distribuir las utilidades y soportar las pérdidas.<br>- Los derechos y obligaciones de los socios entre sí y respecto de terceros.<br>- Las cláusulas atinentes al funcionamiento, disolución y liquidación de la sociedad."
                    }
                  ]
                },
                {
                  id: "caracteres",
                  titulo: "Caracteres",
                  descripcion: "Cuando se trata de una sociedad de dos o mas socios, el contrato presenta los siguientes caracteres:<br>- Plurilateral<br>- Consensual<br>- Conmutativo<br>- Oneroso<br>- De ejecución continuada<br>- De organización"
                },
                {
                  id: "naturaleza-juridica",
                  titulo: "Naturaleza Jurídica",
                  descripcion: "A lo largo del tiempo se han desarrollado diferentes teorías respecto de la naturaleza jurídica del acto constitutivo. Entre las diferentes teorías podemos mencionar, por ejemplo, la teoría del contrato bilateral, la teoría del acto, la teoría de acto y la teoría de la institución.",
                  hijos: [
                    {
                      id: "contrato-plurilateral",
                      titulo: "Contrato Plurilateral de Organización",
                      descripcion: "Se trata de la teoría adoptada por nuestra Ley General de Sociedades 19.550. Es un contrato plurilateral, ya que las partes pueden ser más de dos* y es de organización, ya que en él quedan reglamentadas las relaciones entre los socios y las normas internas de la sociedad. En esta teoría, los socios tienen intereses particulares, pero se yuxtaponen. El interés yuxtapuesto forma un interés social superior.<br><br>* Ver declaración unilateral de voluntad."
                    },
                    {
                      id: "declaracion-unilateral",
                      titulo: "Declaración Unilateral de Voluntad",
                      descripcion: "Con la reforma de la ley 26.994 se incorporó la figura de las Sociedad Unipersonales. Respecto a este tipo de sociedades, se entiende que la naturaleza jurídica del acto constitutivo es una declaración unilateral de voluntad (Art. 1800 CCCN)."
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: "registro-sociedades",
          titulo: "Registro de Sociedades",
          descripcion: "ARTICULO 5º — <strong>El acto constitutivo, su modificación y el reglamento</strong>, si lo hubiese, se inscribirán en el <strong>Registro Público</strong> del domicilio social y en el Registro que corresponda al asiento de cada sucursal, incluyendo la dirección donde se instalan a los fines del artículo 11, inciso 2.<br><br>La inscripción se dispondrá previa ratificación de los otorgantes, excepto cuando se extienda por instrumento público o las firmas sean autenticadas por escribano público u otro funcionario competente.<br><br>Publicidad en la documentación.<br>Las sociedades harán constar en la documentación que de ellas emane, la dirección de su sede y los datos que identifiquen su inscripción en el Registro.",
          hijos: [
            {
              id: "publicidad-especial",
              titulo: "Publicidad Especial",
              descripcion: "La Ley 19.550 estipula en su art. 10 un requisito especial para las Sociedades por Acciones y las SRL: Antes de inscribir el contrato en el Registro Público, debe publicarse un edicto (por un día) en el Boletín Oficial. Este debe contener un extracto o “resumen” del contrato constitutivo. Todas aquellas modificaciones que se realicen posteriormente en el contrato social, también deben publicarse en el Boletín Oficial por medio de edictos."
            },
            {
              id: "plazo",
              titulo: "Plazo",
              descripcion: "Se tiene 20 días desde el acto constitutivo para presentarse en el Registro Público y 30 días para completar el trámite (Art. 6 Ley 19.550).",
              hijos: [
                {
                  id: "inscripcion-tardia",
                  titulo: "Inscripción Tardía",
                  descripcion: "Solo se dispondrá si no existiere oposición de parte interesada (Art. 6 Ley 19.550 segundo párrafo)."
                }
              ]
            },
            {
              id: "funcion",
              titulo: "Función",
              descripcion: "La función de la inscripción es la de dar publicidad y hacer oponibles los actos a terceros (efecto constitutivo)."
            },
            {
              id: "efectos",
              titulo: "Efectos",
              descripcion: "La sociedad solo se considera regularmente constituida con su inscripción en el Registro Público de Comercio (Art. 7 de Ley 19.550).<br>Por cada sociedad registrada se conforma un legajo individual de carácter público, el cual puede ser consultado libremente por cualquier interesado."
            },
            {
              id: "control-previo",
              titulo: "Control Previo de Legalidad",
              descripcion: "Consiste en un examen administrativo previo de legalidad y funcionamiento regular. La autoridad de contralor verifica que el contrato o estatuto cumpla con todas las exigencias imperativas de la ley antes de conceder la toma de razón o inscripción."
            },
            {
              id: "seccion-iv",
              titulo: "Sección IV",
              descripcion: "La omisión de la inscripción registral no causa la nulidad ni la disolución de la sociedad; el ente conserva personalidad jurídica, pero queda regido únicamente por las pautas de la Sección IV del Capítulo I de la LGS aplicable a sociedades informales, atípicas o no inscriptas."
            }
          ]
        }
      ]
    }
  ]
};
*/

/*************************************/

// ============================================================================
//  MAPA CONCEPTUAL - datos y distribución
// ============================================================================
//
// Este mapa está en MODO MANUAL: cada nodo dice dónde va (x, y), cuánto mide
// (ancho, alto) y cómo se conecta con su padre (conector). Las coordenadas
// están medidas sobre la imagen de referencia; "escalaMapa" las reduce a todas
// juntas (0.8 = 80%). Si querés el mapa más grande o más chico, cambiá ese número.
//
// Campos de cada nodo:
//   id:          identificador único (obligatorio)
//   titulo:      texto del cuadrado y del popup (obligatorio)
//   descripcion: texto del popup. Admite HTML simple:
//                  <br> = salto de línea      <strong>texto</strong> = negrita
//   x, y:        posición de la esquina superior izquierda del cuadrado
//   ancho, alto: tamaño del cuadrado
//   conector:    cómo se une al padre (ver abajo). Por defecto "recta"
//   imagen:      URL de una imagen para el popup (opcional)
//   video:       URL "embed" de YouTube para el popup (opcional)
//   hijos:       array de nodos hijos (opcional)
//
// Tipos de conector (van en el HIJO, describen su unión con el padre):
//   "recta"     línea recta de borde a borde
//   "vertical"  línea vertical directa, de la base del padre al techo del hijo
//   "bus"       barra tipo organigrama: baja, corre en horizontal y vuelve a bajar
//               ({ tipo: "bus", y: 442 } fija la altura de la barra)
//   "lateral"   línea horizontal entre dos cuadrados que están a la misma altura
//   "codo"      sale del costado del padre, corre en horizontal y baja al hijo
//   "tronco"    baja desde el centro del padre y sale de costado hasta el hijo
//   "llave"     corchete por el costado ({ tipo: "llave", x: 783 } fija su posición;
//               con desde: "abajo" nace del tronco del padre a la altura "y")
//   "ninguno"   sin línea
//
// (Si el nodo raíz NO tiene "x", el mapa se acomoda solo: en ese caso se usan
//  "lado" y "disposicion" en vez de coordenadas.)

const escalaMapa = 0.8;

const PENDIENTE = "Descripción pendiente de completar.";

const arbolMapa = {
  id: "sociedades",
  titulo: "Sociedades Parte General",
  descripcion: "Introducción general al régimen societario: el punto de partida del que se desprenden la constitución y el registro de las sociedades.",
  x: 631, y: 0, ancho: 235, alto: 58,
  hijos: [
    {
      id: "constitucion-registro",
      titulo: "Constitución y Registro",
      descripcion: "Eje que agrupa todo lo referido a cómo nace una sociedad y cómo se la inscribe frente a terceros.",
      x: 631, y: 90, ancho: 235, alto: 64,
      conector: "vertical",
      hijos: [

        // ------------------------- Rama izquierda -------------------------
        {
          id: "constitucion-sociedad",
          titulo: "Constitución de la Sociedad",
          descripcion: "El proceso y los requisitos necesarios para que una sociedad quede formalmente constituida.",
          x: 261, y: 139, ancho: 235, alto: 58,
          conector: "codo",
          hijos: [
            {
              id: "acto-constitutivo",
              titulo: "Acto Constitutivo",
              descripcion: "El acto constitutivo es el acto jurídico mediante el cual se crea la sociedad. Por lo tanto, podemos decir que la sociedad existe desde el momento del acto constitutivo (Art. 142 CCCN). Este acto, tiene diferentes caracteres y elementos.",
              x: 157, y: 252, ancho: 206, alto: 58,
              conector: "bus",
              hijos: [
                {
                  id: "elementos",
                  titulo: "Elementos",
                  descripcion: "",
                  x: 52, y: 337, ancho: 175, alto: 36,
                  conector: "bus",
                  hijos: [
                    {
                      id: "generales",
                      titulo: "Generales",
                      descripcion: "Elementos comunes a todo contrato (consentimiento, capacidad, objeto y causa).",
                      x: -15, y: 456, ancho: 134, alto: 47,
                      conector: "bus"
                    },
                    {
                      id: "esenciales-no-tipificantes",
                      titulo: "Esenciales no tipificantes",
                      descripcion: "Elementos que deben estar presentes en toda sociedad pero que no sirven para distinguir un tipo societario de otro.",
                      x: 157, y: 451, ancho: 174, alto: 63,
                      conector: "bus"
                    },
                    {
                      id: "especificos",
                      titulo: "Específicos",
                      descripcion: "Elementos propios del contrato de sociedad: pluralidad de partes, tipicidad, organización, aportes y participación en resultados.",
                      x: 59, y: 544, ancho: 160, alto: 58,
                      conector: "vertical"
                    }
                  ]
                },
                {
                  id: "caracteres",
                  titulo: "Caracteres",
                  descripcion: "Cuando se trata de una sociedad de dos o mas socios, el contratopresenta los siguientes caracteres:<br>- Plurilateral<br>- Consensual<br>- Conmutativo<br>- Oneroso<br>- De ejecución continuada<br>- De organización",
                  x: 261, y: 337, ancho: 175, alto: 36,
                  conector: "bus"
                },
                {
                  id: "naturaleza-juridica",
                  titulo: "Naturaleza Jurídica",
                  descripcion: "A lo largo del tiempo se han desarrollado diferentes teorías respecto de la naturaleza jurídica del acto constitutivo. Entre las diferentes teorías podemos mencionar, por ejemplo, la teoría del contrato bilateral, la teoría del acto y la teoría de la institución.",
                  x: 420, y: 252, ancho: 160, alto: 58,
                  conector: "lateral",
                  hijos: [
                    {
                      id: "contrato-plurilateral",
                      titulo: "Contrato Plurilateral de Organización",
                      descripcion: "Se trata de la teoría adoptada por nuestra Ley General de Sociedades 19.550. Es un contrato plurilateral, ya que las partes pueden ser más de dos* y es de organización, ya que en él quedan reglamentadas las relaciones entre los socios y las normas internas de la sociedad. En esta teoría, los socios tienen intereses particulares, pero se yuxtaponen. El interés yuxtapuesto forma un interés social superior.<br><br>* Ver declaración unilateral de voluntad. ",
                      x: 304, y: 580, ancho: 175, alto: 92,
                      conector: "bus"
                    },
                    {
                      id: "declaracion-unilateral",
                      titulo: "Declaración Unilateral de Voluntad",
                      descripcion: "Con la reforma de la ley 26.994 se incorporó la figura de las Sociedad Unipersonales. Respecto a este tipo de sociedades, se entiende que la naturaleza jurídica del acto constitutivo es una declaración unilateral de voluntad (Art. 1800 CCCN).",
                      x: 514, y: 580, ancho: 175, alto: 92,
                      conector: "bus"
                    }
                  ]
                }
              ]
            }
          ]
        },

        // ------------------------- Rama derecha -------------------------
        {
          id: "registro-sociedades",
          titulo: "Registro de las Sociedades",
          descripcion: "La inscripción de la sociedad ante el organismo de registro correspondiente y sus efectos frente a terceros.",
          x: 973, y: 139, ancho: 235, alto: 58,
          conector: "codo",
          hijos: [
            {
              id: "seccion-iv",
              titulo: "Sección IV",
              descripcion: PENDIENTE,
              x: 1267, y: 139, ancho: 115, alto: 62,
              conector: "lateral"
            },

            // Jurisprudencia (a la izquierda del tronco) con su fallo y sus tres puntos
            {
              id: "jurisprudencia-registro",
              titulo: "Jurisprudencia",
              descripcion: "Jurisprudencia vinculada al registro de las sociedades.<br><br>" + PENDIENTE,
              x: 831, y: 216, ancho: 205, alto: 58,
              conector: "tronco",
              hijos: [
                {
                  id: "caso-gomez",
                  titulo: '"Gómez, Roberto Carlos c. Transportes Luján SH y otros s. Despido"',
                  descripcion: "Fallo: <strong>Gómez, Roberto Carlos c. Transportes Luján SH y otros s. Despido</strong>.<br><br>" + PENDIENTE,
                  x: 803, y: 292, ancho: 247, alto: 125,
                  conector: "vertical",
                  hijos: [
                    {
                      id: "hechos-gomez",
                      titulo: "Hechos",
                      descripcion: "Hechos del caso.<br><br>" + PENDIENTE,
                      x: 635, y: 240, ancho: 127, alto: 57,
                      conector: { tipo: "llave", x: 783 }
                    },
                    {
                      id: "art-lgs-gomez",
                      titulo: "Art. LGS",
                      descripcion: "Artículos de la Ley General de Sociedades aplicados en el caso.<br><br>" + PENDIENTE,
                      x: 634, y: 326, ancho: 128, alto: 57,
                      conector: { tipo: "llave", x: 783 }
                    },
                    {
                      id: "resolucion-gomez",
                      titulo: "Resolución",
                      descripcion: "Resolución del caso.<br><br>" + PENDIENTE,
                      x: 620, y: 422, ancho: 145, alto: 57,
                      conector: { tipo: "llave", x: 783 }
                    }
                  ]
                }
              ]
            },

            // Efectos / Función / Plazo (llave a la derecha, nace del tronco)
            {
              id: "efectos",
              titulo: "Efectos",
              descripcion: "Las consecuencias que produce la inscripción registral de la sociedad.",
              x: 1264, y: 241, ancho: 116, alto: 54,
              conector: { tipo: "llave", desde: "abajo", x: 1238, y: 216 }
            },
            {
              id: "funcion",
              titulo: "Función",
              descripcion: "El rol que cumple la publicidad registral: dar a conocer la existencia y los datos de la sociedad.",
              x: 1264, y: 336, ancho: 116, alto: 54,
              conector: { tipo: "llave", desde: "abajo", x: 1238, y: 216 }
            },
            {
              id: "plazo",
              titulo: "Plazo",
              descripcion: "El tiempo dentro del cual debe presentarse la sociedad para su inscripción.",
              x: 1264, y: 431, ancho: 116, alto: 54,
              conector: { tipo: "llave", desde: "abajo", x: 1238, y: 216 },
              hijos: [
                {
                  id: "inscripcion-tardia",
                  titulo: "Inscripción Tardía",
                  descripcion: "Consecuencias de inscribir la sociedad fuera del plazo previsto.",
                  x: 1250, y: 534, ancho: 150, alto: 68,
                  conector: "vertical"
                }
              ]
            },

            // Control previo de legalidad (con Jurisprudencia y su fallo) y Publicidad especial
            {
              id: "control-previo",
              titulo: "Control Previo de Legalidad",
              descripcion: "La revisión que realiza el organismo de contralor antes de inscribir la sociedad, verificando el cumplimiento de los requisitos legales.",
              x: 864, y: 457, ancho: 157, alto: 90,
              conector: { tipo: "bus", y: 442 },
              hijos: [
                {
                  id: "jurisprudencia-control",
                  titulo: "Jurisprudencia",
                  descripcion: "Jurisprudencia vinculada al control previo de legalidad.<br><br>" + PENDIENTE,
                  x: 840, y: 560, ancho: 205, alto: 58,
                  conector: "vertical",
                  hijos: [
                    {
                      id: "caso-inspeccion",
                      titulo: '"Inspección General de Justicia c. Varela Hermanos S.A. s. Organismos de Control"',
                      descripcion: "Fallo: <strong>Inspección General de Justicia c. Varela Hermanos S.A. s. Organismos de Control</strong>.<br><br>" + PENDIENTE,
                      x: 723, y: 625, ancho: 600, alto: 62,
                      conector: "vertical",
                      hijos: [
                        {
                          id: "resolucion-igj",
                          titulo: "Hechos",
                          descripcion: "Resolución del caso.<br><br>" + PENDIENTE,
                          x: 738, y: 701, ancho: 120, alto: 58,
                          conector: "vertical"
                        },
                        {
                          id: "art-lgs-igj",
                          titulo: "Art. LGS",
                          descripcion: "Artículos de la Ley General de Sociedades aplicados en el caso.<br><br>" + PENDIENTE,
                          x: 960, y: 701, ancho: 127, alto: 58,
                          conector: "vertical"
                        },
                        {
                          id: "hechos-igj",
                          titulo: "Resolución",
                          descripcion: "Resolución del caso.<br><br>" + PENDIENTE,
                          x: 1166, y: 701, ancho: 135, alto: 58,
                          conector: "vertical"
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              id: "publicidad-especial",
              titulo: "Publicidad Especial",
              descripcion: "El régimen de publicidad que exige la inscripción registral, para que la sociedad sea oponible a terceros.",
              x: 1060, y: 473, ancho: 160, alto: 64,
              conector: { tipo: "bus", y: 442 }
            }
          ]
        }
      ]
    }
  ]
};

