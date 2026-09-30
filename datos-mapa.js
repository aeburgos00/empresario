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
  descripcion: "",
  x: 631, y: 0, ancho: 235, alto: 58,
  hijos: [
    {
      id: "constitucion-registro",
      titulo: "Constitución y Registro",
      descripcion: "",
      x: 631, y: 90, ancho: 235, alto: 64,
      conector: "vertical",
      hijos: [

        // ------------------------- Rama izquierda -------------------------
        {
          id: "constitucion-sociedad",
          titulo: "Constitución de la Sociedad",
          descripcion: "",
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
                      descripcion: "El contrato de sociedad como todo contrato, presenta los siguientes elementos:<br><strong>- Consentimiento:</strong> En este caso, se trata del acuerdo de voluntades de los socios.<br><strong>- Capacidad:</strong> En este caso, hablamos de capacidad para constituir sociedades (Sección V Ley 19.550).<br><strong>- Objeto.</strong> La actividad que va a desarrollar la actividad, precisa y determinada en el contrato. Responde a la pregunta “Qué?”.<br><strong>- Causa:</strong> Se trata de la finalidad. Responde a la pregunta “Para qué?”.<br><strong>- Forma:</strong> Este contrato puede realizarse por instrumento público o privado, salvo en aquellos casos donde la ley exija formas específicas.",
                      x: -15, y: 456, ancho: 134, alto: 47,
                      conector: "bus"
                    },
                    {
                      id: "esenciales-no-tipificantes",
                      titulo: "Esenciales no tipificantes",
                      descripcion: "Los encontramos en el art. 11 de la Ley 19.550 y son:<br>- Datos de los socios (ya sea persona humana o jurídica).<br>- La razón social o la denominación, y el domicilio de la sociedad.<br>- Su objeto, que debe ser preciso y determinado.<br>- El capital social, que deberá ser expresado en moneda argentina, y la mención del aporte de cada socio.<br>- El plazo de duración, que debe ser determinado.<br>- La organización de la administración, de su fiscalización y de las reuniones de socios.<br>- Las reglas para distribuir las utilidades y soportar las pérdidas.<br>- Los derechos y obligaciones de los socios entre sí y respecto de terceros.<br>- Las cláusulas atinentes al funcionamiento, disolución y liquidación de la sociedad.",
                      x: 157, y: 451, ancho: 174, alto: 63,
                      conector: "bus"
                    },
                    {
                      id: "especificos",
                      titulo: "Específicos",
                      descripcion: "Son aquellos elementos que caracterizan al contrato de sociedad, y que surgen del Art. 1 de la Ley 19.550 (reformada por la Ley 26.994) y son:<br><strong>- Pluralidad de socios:</strong> Salvo el caso de las Sociedades Unipersonales.<br><strong>- Organización:</strong> (Obligaciones de los socios, órganos y funciones de cada órgano, distribución de ganancias, forma de adoptar ciertas decisiones, etc.).<br><strong>- Tipicidad:</strong> La sociedad que se va a constituir debe ser uno de los tipos contemplados en la Ley.<br><strong>- Aportes:</strong> Pueden ser obligaciones de dar o de hacer valuadas en dinero. La sumatoria de todos los aportes efectuados por los socios es lo que se denomina “capital social”.<br><strong>- Fin Societario:</strong> Siempre será la producción o intercambio de bienes o servicios).<br><strong>- Participación en los beneficios y soporte de las perdidas:</strong> Si la actividad realizada da ganancias, estas serán repartidas entre los socios, de la misma manera que si arroja perdidas también deberán soportarla todos los socios.<br><strong>- Affectio Societatis:</strong> Según Nissen, la affectio societatis consiste en la “predisposición de los integrantes de la sociedad de actuar en forma coordinada para obtener el fin perseguido con la constitución de la misma, postergando los intereses personales en aras del beneficio común”. Puede existir en mayor o en menor medida.",
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
                      descripcion: "Se trata de la teoría adoptada por nuestra Ley General de Sociedades 19.550. Es un contrato plurilateral, ya que las partes pueden ser más de dos* y es de organización, ya que en él quedan reglamentadas las relaciones entre los socios y las normas internas de la sociedad. En esta teoría, los socios tienen intereses particulares, pero se yuxtaponen. El interés yuxtapuesto forma un interés social superior.<br><br>* Ver declaración unilateral de voluntad.",
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
          descripcion: "ARTICULO 5º — <strong>El acto constitutivo, su modificación y el reglamento</strong>, si lo hubiese, se inscribirán en el <strong>Registro Público</strong> del domicilio social y en el Registro que corresponda al asiento de cada sucursal, incluyendo la dirección donde se instalan a los fines del artículo 11, inciso 2.<br><br>La inscripción se dispondrá previa ratificación de los otorgantes, excepto cuando se extienda por instrumento público o las firmas sean autenticadas por escribano público u otro funcionario competente.<br><br>Publicidad en la documentación.<br>Las sociedades harán constar en la documentación que de ellas emane, la dirección de su sede y los datos que identifiquen su inscripción en el Registro.",
          x: 973, y: 139, ancho: 235, alto: 58,
          conector: "codo",
          hijos: [
            {
              id: "seccion-iv",
              titulo: "Sección IV",
              descripcion: "La omisión de la inscripción registral no causa la nulidad ni la disolución de la sociedad; el ente conserva personalidad jurídica, pero queda regido únicamente por las pautas de la Sección IV del Capítulo I de la LGS aplicable a sociedades informales, atípicas o no inscriptas.",
              x: 1267, y: 139, ancho: 115, alto: 62,
              conector: "lateral"
            },

            // Jurisprudencia (a la izquierda del tronco) con su fallo y sus tres puntos
            {
              id: "jurisprudencia-registro",
              titulo: "Jurisprudencia",
              descripcion:"",
              x: 831, y: 216, ancho: 205, alto: 58,
              conector: "tronco",
              hijos: [
                {
                  id: "caso-gomez",
                  titulo: '"Gómez, Roberto Carlos c. Transportes Luján SH y otros s. Despido"',
                  descripcion: "Fallo: <strong>Gómez, Roberto Carlos c. Transportes Luján SH y otros s. Despido</strong>.<br><br>",
                  x: 803, y: 292, ancho: 247, alto: 125,
                  conector: "vertical",
                  hijos: [
                    {
                      id: "hechos-gomez",
                      titulo: "Hechos",
                      descripcion: "Un trabajador promovió demanda laboral contra una sociedad de hecho no inscripta en el Registro Público y demandó de manera solidaria e ilimitada a los integrantes de la misma. Los socios adujeron que la falta de inscripción registral no les impedía invocar las limitaciones de responsabilidad previstas en los contratos particulares celebrados entre ellos.",
                      x: 635, y: 240, ancho: 127, alto: 57,
                      conector: { tipo: "llave", x: 783 }
                    },
                    {
                      id: "art-lgs-gomez",
                      titulo: "Art. LGS",
                      descripcion: "Se relaciona con los efectos de la omisión de la inscripción registral y el régimen de responsabilidad de las sociedades no inscriptas en el marco de la Sección IV de la LGS (Arts. 21 a 26).",
                      x: 634, y: 326, ancho: 128, alto: 57,
                      conector: { tipo: "llave", x: 783 }
                    },
                    {
                      id: "resolucion-gomez",
                      titulo: "Resolución",
                      descripcion: "La Justicia hizo lugar a la demanda condenando solidariamente a todos los integrantes de la sociedad no inscripta. Se estableció que las cláusulas contractuales internas que limiten la responsabilidad o estipulen la división de deudas resultan inoponibles a terceros mientras la sociedad no haya completado su inscripción constitutiva en el Registro Público correspondiente.",
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
              descripcion: "La sociedad solo se considera regularmente constituida con su inscripción en el Registro Público de Comercio (Art. 7 de Ley 19.550).<br>Por cada sociedad registrada se conforma un legajo individual de carácter público, el cual puede ser consultado libremente por cualquier interesado.",
              x: 1264, y: 241, ancho: 116, alto: 54,
              conector: { tipo: "llave", desde: "abajo", x: 1238, y: 216 }
            },
            {
              id: "funcion",
              titulo: "Función",
              descripcion: "La función de la inscripción es la de dar publicidad y hacer oponibles los actos a terceros (efecto constitutivo).",
              x: 1264, y: 336, ancho: 116, alto: 54,
              conector: { tipo: "llave", desde: "abajo", x: 1238, y: 216 }
            },
            {
              id: "plazo",
              titulo: "Plazo",
              descripcion: "Se tiene 20 días desde el acto constitutivo para presentarse en el Registro Público y 30 días para completar el trámite (Art. 6 Ley 19.550).",
              x: 1264, y: 431, ancho: 116, alto: 54,
              conector: { tipo: "llave", desde: "abajo", x: 1238, y: 216 },
              hijos: [
                {
                  id: "inscripcion-tardia",
                  titulo: "Inscripción Tardía",
                  descripcion: "Solo se dispondrá si no existiere oposición de parte interesada (Art. 6 Ley 19.550 segundo párrafo).",
                  x: 1250, y: 534, ancho: 150, alto: 68,
                  conector: "vertical"
                }
              ]
            },

            // Control previo de legalidad (con Jurisprudencia y su fallo) y Publicidad especial
            {
              id: "control-previo",
              titulo: "Control Previo de Legalidad",
              descripcion: "Consiste en un examen administrativo previo de legalidad y funcionamiento regular. La autoridad de contralor verifica que el contrato o estatuto cumpla con todas las exigencias imperativas de la ley antes de conceder la toma de razón o inscripción.",
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
                      descripcion: "Fallo: <strong>Inspección General de Justicia c. Varela Hermanos S.A. s. Organismos de Control</strong>.<br><br>",
                      x: 723, y: 625, ancho: 600, alto: 62,
                      conector: "vertical",
                      hijos: [
                        {
                          id: "resolucion-igj",
                          titulo: "Hechos",
                          descripcion: "La Inspección General de Justicia (IGJ) rechazó la inscripción del estatuto de una sociedad en proceso de constitución debido a que su objeto social era extremadamente amplio y discontinuo, conteniendo actividades heterogéneas que no guardaban relación lógica ni proporcionalidad con el capital social mínimo suscripto por los socios. La sociedad apeló la resolución administrativa sosteniendo que la autonomía de la voluntad le permitía abarcar múltiples rubros.",
                          x: 738, y: 701, ancho: 120, alto: 58,
                          conector: "vertical"
                        },
                        {
                          id: "art-lgs-igj",
                          titulo: "Art. LGS",
                          descripcion: "Se vincula directamente con el control previo de legalidad ejercido por la autoridad registral sobre el objeto social (debe ser preciso y determinado) y la adecuación del capital social (Art. 11, inc. 3 y 4 de la LGS).",
                          x: 960, y: 701, ancho: 127, alto: 58,
                          conector: "vertical"
                        },
                        {
                          id: "hechos-igj",
                          titulo: "Resolución",
                          descripcion: "La Cámara confirmó la resolución de la IGJ y rechazó la inscripción del acto constitutivo. El tribunal determinó que el principio de precisión del objeto social busca proteger tanto a los terceros contratantes como a los propios socios, imposibilitando la inscripción de estatutos con objetos omnicomprensivos o desproporcionados respecto del capital inicial",
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
              descripcion: "La Ley 19.550 estipula en su art. 10 un requisito especial para las Sociedades por Acciones y las SRL: Antes de inscribir el contrato en el Registro Público, debe publicarse un edicto (por un día) en el Boletín Oficial. Este debe contener un extracto o “resumen” del contrato constitutivo. Todas aquellas modificaciones que se realicen posteriormente en el contrato social, también deben publicarse en el Boletín Oficial por medio de edictos.",
              x: 1060, y: 473, ancho: 160, alto: 64,
              conector: { tipo: "bus", y: 442 }
            }
          ]
        }
      ]
    }
  ]
};

