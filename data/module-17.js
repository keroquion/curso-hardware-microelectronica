export const module17 = {
  id: 17,
  title: "Rescate de Equipos con Daño por Líquidos",
  image: "images/lab_diagnostic.png",
  objectives: [
    "Comprender la física de la electrólisis y la corrosión galvánica que destruyen las pistas de cobre.",
    "Ejecutar el protocolo de rescate de emergencia en los primeros 60 minutos tras daño por líquido.",
    "Operar un limpiador ultrasónico con los parámetros correctos para descontaminación de PCBs.",
    "Crear un mapa de corrosión visual e identificar qué componentes y pistas requieren reconstrucción.",
    "Reconstruir pistas y contactos corroídos con ácido cítrico, jumpers y barniz UV."
  ],
  content: `
    <h3>1. Física de la Electrólisis y Corrosión Galvánica</h3>
    <p>Entender <em>por qué</em> el agua daña la electrónica es fundamental para entender la urgencia del protocolo de rescate:</p>
    <ul>
      <li><strong>El agua pura no conduce electricidad:</strong> El peligro viene de los minerales, sales e iones disueltos en el líquido (agua de grifo, refresco, café). Estos iones actúan como electrolito, permitiendo que la corriente fluya entre pistas de cobre que no deberían estar conectadas.</li>
      <li><strong>Corrosión Galvánica:</strong> Cuando dos metales distintos (ej: cobre y estaño de soldadura) están en contacto a través de un electrolito y con corriente presente, el metal menos noble (cobre) se oxida y disuelve. Esto destruye pistas en horas si la batería permanece conectada.</li>
      <li><strong>Agresividad por tipo de líquido:</strong>
        <ul>
          <li>🟢 Agua destilada: mínimo daño, no conduce</li>
          <li>🟡 Agua de grifo: moderado, contiene minerales</li>
          <li>🟠 Refresco/café con azúcar: alto, el azúcar deja residuos conductivos al secarse</li>
          <li>🔴 Agua de mar / agua salada: destrucción severa en minutos</li>
          <li>☠️ Orina: máxima agresividad por sales de amonio y cloruros</li>
        </ul>
      </li>
    </ul>

    <h3>2. Protocolo de Rescate de Emergencia (Primeros 60 Minutos)</h3>
    <p><strong>⚠️ Regla de Oro:</strong> Cada minuto con la batería conectada y corriente fluyendo multiplica el daño. La primera acción SIEMPRE es cortar la energía.</p>
    <ol>
      <li><strong>PASO CERO — Desconectar la batería interna:</strong> Sin negociación. Abrir la laptop y desconectar el conector de batería antes de hacer cualquier otra cosa. Si el conector de la batería ya está corroído, cortar el cable con tijera de punta fina.</li>
      <li><strong>Retirar todos los módulos desmontables:</strong> RAM, SSD M.2, batería principal, pila RTC. Estos componentes se limpian por separado y están a salvo del ultrasónico.</li>
      <li><strong>NO usar secador de aire caliente de uso personal:</strong> El calor puede cristalizar los depósitos de minerales en las pistas, haciéndolos más difíciles de remover. Usar aire frío o temperatura ambiente.</li>
      <li><strong>Fotografiar el estado inicial:</strong> Documentar con macro fotográfica todas las zonas con residuos, oxidación visible (verde/azul = óxido de cobre, blanco = sales minerales).</li>
      <li><strong>Enjuague preliminar con isopropílico al 99%:</strong> Aplicar alcohol isopropílico directamente sobre la placa con una jeringa y un cepillo de cerdas suaves (cepillo de dientes nuevo). Retirar los residuos superficiales más gruesos antes del ultrasónico.</li>
    </ol>

    <h3>3. Limpieza Ultrasónica Profesional</h3>
    <p>El limpiador ultrasónico genera ondas de alta frecuencia (25-40 kHz) en el líquido de limpieza, creando millones de microburbujillas (cavitación) que implosionan con fuerza microsísmica, arrancando mecánicamente los depósitos de los componentes:</p>
    <ul>
      <li><strong>Solución recomendada:</strong> Agua destilada al 70% + Alcohol Isopropílico al 30%, o solución específica como Branson EC (para electrónica).</li>
      <li><strong>Temperatura:</strong> 40°C a 50°C. El calor mejora la cavitación pero no debe superar los 60°C para no dañar conectores plásticos.</li>
      <li><strong>Tiempo de ciclo:</strong> 5 a 10 minutos por ciclo. Inspeccionar y repetir si hay residuos visibles.</li>
      <li><strong>Componentes que NUNCA deben entrar al ultrasónico:</strong>
        <ul>
          <li>❌ Displays OLED (la vibración destruye los compuestos orgánicos)</li>
          <li>❌ Altavoces y bocinas (membrana de papel/Mylar)</li>
          <li>❌ Sensores biométricos de huella dactilar</li>
          <li>❌ Módulos de memoria con underfill epoxi poroso</li>
          <li>❌ Cámaras integradas (el lente puede desprenderse)</li>
        </ul>
      </li>
      <li><strong>Post-limpieza:</strong> Enjuague con isopropílico puro al 99% para arrastrar los residuos de la solución de limpieza. Secar en horno de laboratorio a 60-70°C durante 30-40 minutos o en desecador con sílica gel por 2-4 horas.</li>
    </ul>

    <h3>4. Mapa de Corrosión Post-Limpieza</h3>
    <p>Después de la limpieza ultrasónica, muchas pistas de cobre corroídas se vuelven visibles con el microscopio digital o con luz UV:</p>
    <ul>
      <li><strong>Color verde/turquesa:</strong> Carbonato de cobre (Patina) — corrosión avanzada que ha consumido el metal de la pista.</li>
      <li><strong>Color blanco/grisáceo:</strong> Depósitos de sales minerales — menos destructivo, puede removerse con una solución de ácido cítrico al 5%.</li>
      <li><strong>Pistas negras y quebradizas:</strong> Corrosión severa que ha carbonizado el cobre. La pista ya no conduce y debe reconstruirse con jumper.</li>
      <li><strong>Luz UV (365nm):</strong> Los residuos de flux y sales fluorescentan bajo luz ultravioleta, revelando contaminación invisible a simple vista.</li>
    </ul>

    <h3>5. Reparación de Daños de Corrosión en PCB</h3>
    <ol>
      <li><strong>Remoción de óxido:</strong> Aplicar solución de ácido cítrico al 5% en agua con un hisopo fino sobre la zona corroída. Dejar actuar 2-3 minutos. El ácido reacciona con el óxido de cobre (Cu₂O) convirtiéndolo en citrato de cobre soluble que se retira fácilmente.</li>
      <li><strong>Raspado mecánico:</strong> Con bisturí quirúrgico #11, raspar suavemente el óxido residual y la máscara de soldadura dañada para exponer cobre sano y brillante.</li>
      <li><strong>Estañado de la zona expuesta:</strong> Aplicar flux y estañar con cautín a 320°C para proteger el cobre recuperado y prepararlo para soldar el jumper.</li>
      <li><strong>Soldado del jumper:</strong> Cable de cobre esmaltado de 0.02mm a 0.1mm (según la corriente necesaria) soldado entre el punto de inicio y el destino de la pista perdida.</li>
      <li><strong>Sellado con barniz UV:</strong> Aplicar resina UV líquida sobre el jumper y curar con lámpara UV de 365nm durante 20-30 segundos. Esto aísla eléctricamente, protege contra humedad futura y ancla mecánicamente el cable fino.</li>
    </ol>
  `,
  glossary: [
    { term: "Electrólisis", definition: "Proceso de descomposición química provocado por el paso de corriente eléctrica a través de una solución conductora, que disuelve los metales del electrodo negativo (ánodo)." },
    { term: "Corrosión Galvánica", definition: "Reacción electroquímica que ocurre cuando dos metales distintos están en contacto eléctrico en presencia de un electrolito, oxidando el metal menos noble." },
    { term: "Cavitación Ultrasónica", definition: "Fenómeno físico de formación e implosión violenta de millones de microburbujillas en un líquido sometido a ondas ultrasónicas, generando energía mecánica limpiadora." },
    { term: "Ácido Cítrico", definition: "Ácido orgánico débil y seguro derivado de cítricos, utilizado en solución al 3-5% para remover óxido de cobre de pistas de PCB sin atacar el cobre base." },
    { term: "Underfill", definition: "Resina epoxi de baja viscosidad inyectada bajo los chips BGA de fábrica para proteger las soldaduras de humedad e impactos mecánicos. Dificulta la limpieza ultrasónica." },
    { term: "Óxido de Cobre (Cu₂O)", definition: "Compuesto rojo/marrón/verde que se forma sobre las pistas de cobre expuestas a oxígeno y humedad. No conduce electricidad y debe removerse para recuperar el contacto eléctrico." }
  ],
  quiz: [
    {
      question: "Un cliente trae una laptop que cayó al inodoro (agua de inodoro). Llega 30 minutos después. ¿Cuál es la acción absolutamente PRIMERO que debes realizar?",
      options: [
        "Encenderla para ver si todavía funciona",
        "Sumergirla en alcohol isopropílico al 99%",
        "Desconectar la batería interna inmediatamente sin encenderla",
        "Colocarla en una bolsa de arroz por 48 horas"
      ],
      answer: 2,
      explanation: "El arroz es un mito urbano ineficaz. Encenderla con agua adentro acelera la corrosión galvánica. El paso CERO es cortar la corriente desconectando la batería. Mientras haya voltaje presente, la electrólisis destruye activamente las pistas de cobre en tiempo real."
    },
    {
      question: "¿Por qué el agua con azúcar (refresco) es más dañina que el agua mineral pura para una placa base?",
      options: [
        "El azúcar reacciona con el silicio y lo disuelve",
        "Al evaporarse el agua, el azúcar deja un residuo sólido conductivo que sigue causando cortocircuitos incluso después de que el líquido desaparece",
        "El azúcar bloquea los ventiladores del sistema",
        "El CO₂ del refresco reacciona con el aluminio del chasis"
      ],
      answer: 1,
      explanation: "El azúcar y otros solutos orgánicos dejan residuos higroscópicos (que atraen humedad del ambiente) y ligeramente conductivos al secarse. Esto significa que aunque la laptop parezca 'seca', los cortocircuitos continúan produciéndose por los residuos sólidos."
    },
    {
      question: "¿Cuál de los siguientes componentes NUNCA debe colocarse dentro del limpiador ultrasónico?",
      options: [
        "La placa madre sin pantalla ni altavoces",
        "El módulo de memoria RAM DDR4",
        "Un display OLED de laptop",
        "Un conector USB-C suelto de la placa"
      ],
      answer: 2,
      explanation: "Los displays OLED utilizan compuestos orgánicos electroluminiscentes extremadamente sensibles. Las vibraciones ultrasónicas de 40kHz pueden desprender las capas orgánicas del sustrato, causando líneas, manchas o falla total permanente del panel."
    },
    {
      question: "Después de la limpieza ultrasónica, encuentras una pista de cobre de color verde oscuro y quebradizo al tacto. ¿Qué indica este color y cuál es el procedimiento correcto?",
      options: [
        "Es el recubrimiento protector de la placa; no requiere acción",
        "Corrosión avanzada de óxido de cobre que ha consumido el metal. Debe rasparse mecánicamente, aplicar ácido cítrico, estañar y reconstruir con jumper de cobre esmaltado",
        "Es flux de soldadura carbonizado; se limpia con isopropílico",
        "Indica que la placa es de bajo costo; reemplazarla completa"
      ],
      answer: 1,
      explanation: "El color verde turquesa es el óxido de cobre avanzado (carbonato de cobre o patina) que confirma que el metal de la pista fue consumido electroquímicamente. Si la pista es quebradiza, ya no conduce y debe reconstruirse mecánicamente con un jumper de alambre."
    },
    {
      question: "Al aplicar ácido cítrico al 5% sobre una zona corroída del PCB, el técnico debe esperar ¿cuánto tiempo aproximado antes de retirar el ácido?",
      options: [
        "Inmediatamente, el ácido actúa al instante",
        "2 a 3 minutos para permitir la reacción química con el óxido de cobre",
        "24 horas de remojo completo",
        "No se retira; el ácido se neutraliza solo al secarse"
      ],
      answer: 1,
      explanation: "El ácido cítrico al 5% requiere 2-3 minutos de contacto para convertir el óxido de cobre insoluble (Cu₂O) en citrato de cobre soluble y removible. Dejarlo más tiempo puede empezar a atacar el cobre base sano que queremos conservar."
    }
  ],
  flashcards: [
    { question: "¿Cuál es el tipo de líquido más destructivo para una placa base?", answer: "La orina, por su alto contenido de sales de amonio, cloruros y urea. Genera corrosión galvánica extremadamente agresiva y en horas destruye pistas completas de cobre." },
    { question: "¿Qué temperatura y tiempo se recomiendan para el horno de secado post-limpieza?", answer: "60°C a 70°C durante 30 a 40 minutos. Temperatura suficiente para evaporar el alcohol y la humedad, sin dañar componentes plásticos ni degradar el estaño de las soldaduras." },
    { question: "¿Para qué sirve la luz UV (365nm) en el diagnóstico post-limpieza?", answer: "Para detectar residuos de flux, contaminantes orgánicos y depósitos de sales que son invisibles a simple vista pero fluorescentan bajo ultravioleta, revelando zonas que necesitan limpieza adicional." },
    { question: "¿Qué tipo de cable se usa para reconstruir pistas de señal corroídas?", answer: "Cable de cobre esmaltado (magnet wire) de 0.02mm a 0.1mm de diámetro. El esmalte actúa como aislante, permitiendo cruzar otras pistas sin cortocircuitar." },
    { question: "¿Por qué el 'truco del arroz' es ineficaz para laptops mojadas?", answer: "El arroz absorbe humedad del aire pero no puede extraer el electrolito (sales, azúcar) de las pistas de la placa. La corrosión continúa activa mientras los minerales disueltos permanezcan en contacto con el cobre." }
  ]
};
