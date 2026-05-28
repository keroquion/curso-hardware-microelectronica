export const module20 = {
  id: 20,
  title: "Atención Corporativa y Gestión Profesional de Taller",
  image: "images/industrial_production.png",
  objectives: [
    "Redactar contratos de SLA (Service Level Agreement) con tiempos de respuesta garantizados para clientes corporativos.",
    "Estructurar reportes técnicos profesionales en formato ejecutivo para departamentos de TI y gerencia.",
    "Calcular el costo real de una reparación y establecer precios que garanticen rentabilidad.",
    "Implementar protocolos de seguridad de datos para equipos corporativos con información confidencial.",
    "Diseñar una estrategia de marketing y fidelización de clientes para diferenciarse de la competencia."
  ],
  content: `
    <h3>1. Contratos de SLA (Service Level Agreement) con Empresas</h3>
    <p>Un SLA es el documento más importante en la relación con un cliente corporativo. Define expectativas, protege al técnico y da seguridad al cliente:</p>
    <ul>
      <li><strong>Niveles de Prioridad:</strong>
        <ul>
          <li>🔴 <strong>Crítico (P1):</strong> Equipo de directivo, servidor o estación de trabajo productiva. Respuesta en 4 horas, resolución en 24 horas.</li>
          <li>🟠 <strong>Alto (P2):</strong> Equipo de empleado con impacto en producción. Respuesta en 8 horas, resolución en 48 horas.</li>
          <li>🟡 <strong>Medio (P3):</strong> Falla parcial sin impacto crítico. Respuesta en 24 horas, resolución en 72 horas.</li>
          <li>🟢 <strong>Bajo (P4):</strong> Mantenimiento preventivo o mejoras. Programado con el cliente en horario conveniente.</li>
        </ul>
      </li>
      <li><strong>Cláusulas Críticas a Incluir:</strong>
        <ul>
          <li><em>Cobertura:</em> Qué fallas están incluidas (ej: hardware, software de sistema) y cuáles no (ej: daño físico por mal uso, virus, actualizaciones de terceros).</li>
          <li><em>Tiempo de respuesta vs. tiempo de resolución:</em> Son distintos. El técnico puede responder en 4 horas pero la resolución puede tomar 48 horas si hay que ordenar repuestos.</li>
          <li><em>Equipos de respaldo (loaner):</em> Si el equipo está en reparación por más de 48 horas, ¿el taller provee un equipo temporal?</li>
          <li><em>Confidencialidad (NDA):</em> Acuerdo de no divulgar información encontrada en los equipos del cliente.</li>
          <li><em>Penalidades:</em> Si el taller no cumple los tiempos, ¿cuál es la compensación?</li>
        </ul>
      </li>
    </ul>

    <h3>2. Redacción de Reportes Técnicos Profesionales</h3>
    <p>Un reporte técnico profesional diferencia a un taller serio de uno informal. El reporte es la evidencia de tu trabajo y protección legal ante reclamos:</p>
    <ul>
      <li><strong>Estructura del Reporte Técnico Completo:</strong>
        <ol>
          <li><strong>Encabezado:</strong> Logo del taller, número de ticket, fecha de recepción y fecha de entrega, técnico responsable.</li>
          <li><strong>Descripción del equipo:</strong> Marca, modelo, número de serie, número de activo del cliente.</li>
          <li><strong>Síntomas reportados por el cliente:</strong> Exactamente como lo describió el cliente, en sus palabras.</li>
          <li><strong>Diagnóstico técnico:</strong> Metodología seguida, mediciones realizadas, conclusión del problema raíz.</li>
          <li><strong>Intervención realizada:</strong> Componentes reemplazados con Part Number y número de serie del repuesto. Acciones de software realizadas.</li>
          <li><strong>Resultados de Pruebas QA:</strong> Lista de verificación firmada con resultados de cada prueba (stress test, batería, puertos, pantalla).</li>
          <li><strong>Recomendaciones:</strong> Acciones preventivas que el cliente debería tomar (ej: "Reemplazar pasta térmica en los próximos 6 meses", "La batería tiene 780 ciclos, considerar reemplazo").</li>
          <li><strong>Garantía de la reparación:</strong> Período cubierto y condiciones.</li>
        </ol>
      </li>
      <li><strong>Resumen Ejecutivo (para el Gerente):</strong> 1 página máximo. Sin tecnicismos. "El equipo presentó un fallo en el circuito de carga de batería que fue reparado. El equipo pasó todas las pruebas de calidad. Se recomienda actualizar el sistema operativo en los próximos 30 días."</li>
    </ul>

    <h3>3. Modelo de Precios y Rentabilidad del Servicio</h3>
    <p>El error más común de técnicos independientes es cobrar solo el costo del componente y olvidar el resto de los costos:</p>
    <ul>
      <li><strong>Fórmula de Precio Real:</strong>
        <br><code>Precio = Costo Componente + Mano de Obra + Overhead + Margen de Ganancia</code>
        <ul>
          <li><em>Costo Componente:</em> Lo que pagaste por el repuesto.</li>
          <li><em>Mano de Obra:</em> Horas técnico × tarifa por hora.</li>
          <li><em>Overhead:</em> Proporcional del alquiler, herramientas, electricidad, seguro.</li>
          <li><em>Margen:</em> Mínimo 30-40% sobre los costos totales para que el negocio sea sostenible.</li>
        </ul>
      </li>
      <li><strong>Servicios de Alta Rentabilidad:</strong>
        <ul>
          <li>🏆 Soldadura BGA (reballing GPU/CPU): Alta especialización, baja competencia local, cobrar 3-5× el costo del componente.</li>
          <li>🏆 Recuperación de datos: Urgencia del cliente + especialización = precios premium ($100-$500 USD).</li>
          <li>🏆 Mantenimiento preventivo corporativo bajo contrato: Ingresos recurrentes y predecibles.</li>
          <li>🏆 Limpieza térmica profesional: Bajo costo de insumos, gran volumen, cliente satisfecho.</li>
        </ul>
      </li>
      <li><strong>Servicios a evitar o limitar:</strong> Reparaciones de pantalla rota de bajo margen donde la competencia de precio es alta y el riesgo de daño durante instalación es elevado.</li>
    </ul>

    <h3>4. Seguridad de Datos en Equipos Corporativos</h3>
    <p>Recibir una laptop corporativa implica responsabilidades legales serias que el técnico debe conocer:</p>
    <ul>
      <li><strong>Formulario de Autorización de Acceso:</strong> Antes de acceder al sistema operativo del cliente, obtener firma del formulario que autoriza explícitamente al técnico a acceder a los datos necesarios para el diagnóstico.</li>
      <li><strong>Acuerdo de No Divulgación (NDA):</strong> Para clientes corporativos, ofrecer y firmar un NDA que prohíba compartir información encontrada en los equipos. Esto genera confianza y protege legalmente al taller.</li>
      <li><strong>Borrado Seguro de Discos:</strong>
        <ul>
          <li><em>Windows:</em> "Reset this PC" → "Remove everything" → "Remove files and clean the drive" (usa el método DoD de múltiples pasadas).</li>
          <li><em>SSD NVMe:</em> Usar el comando <code>nvme format /dev/nvme0</code> en Linux (secure erase a nivel de firmware) o el software del fabricante (Samsung Magician, Crucial Storage Executive).</li>
          <li><em>Borrado criptográfico:</em> En equipos con BitLocker, destruir la llave de cifrado hace el disco irrecuperable sin necesidad de sobrescribir datos.</li>
        </ul>
      </li>
    </ul>

    <h3>5. Marketing de Servicio Técnico y Fidelización de Clientes</h3>
    <p>La mejor reparación del mundo no genera negocio si el cliente no te encuentra ni te recuerda. El marketing técnico es una habilidad diferenciadora:</p>
    <ul>
      <li><strong>Google Business Profile:</strong> Crear y optimizar el perfil de Google My Business con fotos del taller, horarios, servicios detallados y responder activamente a reseñas. Un perfil con 50+ reseñas de 4.8★ en Google genera llamadas orgánicas constantes sin publicidad pagada.</li>
      <li><strong>Garantía como Diferenciador:</strong> Ofrecer 90 días de garantía en reparaciones (cuando la competencia no garantiza nada) es el argumento de ventas más poderoso para clientes corporativos y particulares exigentes.</li>
      <li><strong>Sistema de Seguimiento Post-Reparación:</strong>
        <ul>
          <li>Llamada de verificación a los 7 días: "¿El equipo funcionó correctamente? ¿Tiene alguna duda?"</li>
          <li>Encuesta de satisfacción breve por WhatsApp (3 preguntas).</li>
          <li>Recordatorio de mantenimiento preventivo a los 6 meses (limpieza de disipadores, actualización de sistema).</li>
        </ul>
      </li>
      <li><strong>Especializarse vs. Generalizar:</strong> Un taller conocido por ser "el mejor en MacBooks en la ciudad" cobra 2-3× más que un taller genérico. La especialización percibida justifica precios premium y atrae clientes de mayor poder adquisitivo.</li>
    </ul>
  `,
  glossary: [
    { term: "SLA (Service Level Agreement)", definition: "Acuerdo de nivel de servicio. Contrato formal entre proveedor de servicio técnico y cliente que define los tiempos de respuesta, cobertura, exclusiones y penalidades garantizados." },
    { term: "NDA (Non-Disclosure Agreement)", definition: "Acuerdo de confidencialidad. Contrato legal que prohíbe al técnico o taller revelar información encontrada en los equipos del cliente a terceros." },
    { term: "Overhead", definition: "Costos indirectos del negocio que no están asociados directamente a una reparación específica: alquiler, servicios públicos, depreciación de herramientas, seguros." },
    { term: "Secure Erase", definition: "Procedimiento de borrado de datos que destruye la información de forma irrecuperable, ya sea sobrescribiendo con múltiples pasadas de ceros y unos, o destruyendo la llave criptográfica en discos cifrados." },
    { term: "Loaner (Equipo de Respaldo)", definition: "Equipo temporal prestado por el taller al cliente corporativo mientras su laptop original está en proceso de reparación, para minimizar el impacto en la productividad." },
    { term: "Ticket de Soporte", definition: "Identificador único asignado a cada solicitud de servicio técnico. Permite rastrear el estado, historial y responsable de cada reparación en el sistema de gestión del taller." }
  ],
  quiz: [
    {
      question: "Un cliente corporativo llama a las 9am reportando que el laptop del director financiero no enciende. Según un SLA Tier 1 (P1 - Crítico), ¿cuál es el compromiso correcto del taller?",
      options: [
        "Atenderlo en la próxima semana cuando haya disponibilidad",
        "Responder al cliente en máximo 4 horas y resolver el problema en máximo 24 horas",
        "Pedir que el cliente traiga el equipo por sus propios medios",
        "El SLA no aplica para el director financiero, solo para usuarios de producción"
      ],
      answer: 1,
      explanation: "Un equipo de nivel directivo con impacto financiero califica como P1 (Crítico). Los SLA Tier 1 típicos en empresas de soporte profesional comprometen una respuesta en ≤4 horas y resolución completa en ≤24 horas, incluyendo desplazamiento del técnico si es necesario."
    },
    {
      question: "Un técnico cobra $15 USD por reemplazar un capacitor que costó $0.50. El cliente se queja de que es 'muy caro'. ¿Cuál es la justificación técnica correcta del precio?",
      options: [
        "El precio incluye únicamente el margen de ganancia del 3000%",
        "El costo del componente es solo una parte del precio. Se suman: identificación del corto (diagnóstico), tiempo de soldadura especializada, consumo de flux y herramientas, overhead del taller y garantía de 90 días",
        "Es caro porque los capacitores de esa marca son importados",
        "El precio incluye el envío gratis para el cliente"
      ],
      answer: 1,
      explanation: "En microelectrónica, el componente puede costar centavos pero identificar cuál de los 2000 capacitores de la placa está en corto, desoldarlo sin dañar los adyacentes y verificar el resultado requiere conocimiento especializado y equipo profesional. El valor está en el diagnóstico y la ejecución, no en el componente."
    },
    {
      question: "Recibes una laptop corporativa de un banco para reparar. Al encenderla, ves documentos financieros en el escritorio. ¿Cuál es el protocolo correcto?",
      options: [
        "Revisar los documentos para entender mejor el uso del equipo",
        "Tomar fotos de la pantalla como respaldo de evidencia",
        "No acceder a los documentos, trabajar solo en el nivel de hardware necesario, y recordar al cliente que el NDA firmado cubre la confidencialidad de la información",
        "Reportar los documentos a las autoridades fiscales"
      ],
      answer: 2,
      explanation: "El técnico está autorizado a acceder al equipo solo en la medida necesaria para el diagnóstico y reparación. Los datos del cliente son confidenciales y están protegidos por el NDA y por las leyes de protección de datos. Acceder a documentos sin autorización expresa puede constituir una violación legal."
    },
    {
      question: "Quieres calcular el precio de una reparación de soldadura BGA de GPU. El componente (GPU de repuesto) costó $80. El proceso tomó 3 horas a tu tarifa de $25/hora. El overhead del taller es $10 por reparación. ¿Cuál sería el precio mínimo con un margen del 30%?",
      options: [
        "$80 (solo el componente)",
        "$165",
        "($80 + $75 + $10) = $165 × 1.30 = $214.50",
        "$25 por hora = $75 total"
      ],
      answer: 2,
      explanation: "Costo total = componente ($80) + mano de obra ($25×3h = $75) + overhead ($10) = $165. Aplicando el margen del 30%: $165 × 1.30 = $214.50. Este es el precio mínimo para que el negocio sea rentable. Cobrar menos significa trabajar a pérdida o sin margen para imprevistos."
    },
    {
      question: "Un taller implementa un sistema de llamada de verificación a los 7 días post-reparación. ¿Cuál es el principal beneficio de negocio de esta práctica?",
      options: [
        "Permite al taller facturar horas adicionales por la llamada",
        "Detecta problemas recurrentes para culpar al cliente de mal uso",
        "Genera confianza, fidelización del cliente y aumenta exponencialmente las probabilidades de que el cliente regrese y refiera el taller a otros contactos",
        "Es un requisito legal obligatorio en todos los países"
      ],
      answer: 2,
      explanation: "El seguimiento post-reparación convierte una transacción única en una relación. Los estudios de marketing demuestran que cuesta 5-7× más adquirir un cliente nuevo que retener uno existente. Un cliente que recibe seguimiento activo tiene 80% más de probabilidad de regresar y de recomendar el taller activamente."
    }
  ],
  flashcards: [
    { question: "¿Cuáles son los 4 elementos que componen el precio de una reparación?", answer: "1) Costo del componente, 2) Mano de obra (horas × tarifa), 3) Overhead del taller (alquiler, herramientas, servicios), 4) Margen de ganancia (mínimo 30-40% sobre costos totales)." },
    { question: "¿Qué diferencia un 'tiempo de respuesta' de un 'tiempo de resolución' en un SLA?", answer: "Tiempo de respuesta: cuándo el técnico contacta al cliente y comienza a atender el caso. Tiempo de resolución: cuándo el problema está completamente solucionado. Un SLA puede comprometer respuesta en 4h pero resolución en 48h si se necesitan repuestos." },
    { question: "¿Qué es el borrado criptográfico y cuándo se usa?", answer: "Destruir la llave AES de cifrado de un disco BitLocker o FileVault, haciendo todos los datos irrecuperables matemáticamente sin necesidad de sobrescribir físicamente el disco. Más rápido y igualmente seguro para equipos con cifrado activo." },
    { question: "¿Por qué especializarse en una marca/tipo de equipo es más rentable que ser un taller generalista?", answer: "La especialización justifica precios premium (el experto cobra más), reduce el tiempo de diagnóstico (conoce los defectos comunes del modelo), atrae clientes de mayor poder adquisitivo y genera reputación de referencia en el mercado." },
    { question: "¿Qué debe incluir un NDA firmado con un cliente corporativo?", answer: "Definición de información confidencial cubierta, obligaciones de confidencialidad del técnico, período de vigencia (ej: 5 años), exclusiones (información ya pública), consecuencias legales por incumplimiento y firma de ambas partes con fecha." }
  ]
};
