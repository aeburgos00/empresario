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
