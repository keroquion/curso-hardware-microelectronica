export const module2 = {
    id: 2,
    title: "Ingeniería Inversa con Esquemáticos y Boardview",
    image: "images/buck_converter.png",
    objectives: [
      "Aprender a buscar e interpretar esquemáticos OEM y datasheets de componentes.",
      "Dominar la simbología de resistencias, capacitores, MOSFETs, reguladores Buck y cargadores.",
      "Instalar y dominar el uso de OpenBoardView y FlexBV.",
      "Sincronizar la lectura de un Boardview gráfico con el diagrama esquemático de un circuito.",
      "Rastrear pistas electrónicas ocultas, vías y puntos de prueba (Test Points)."
    ],
    content: `
      <h3>1. Lectura de Diagramas Esquemáticos</h3>
      <p>Un esquemático es el plano conceptual de la placa base. Para leerlo con éxito debemos identificar:</p>
      <ul>
        <li><strong>Nomenclatura de componentes:</strong> R = Resistencia, C = Capacitor, L = Inductor/Bobina, Q = Transistor (MOSFET o Bipolar), U = Circuito Integrado, D = Diodo, F = Fusible, JP = Jumper/Punto de soldadura.</li>
        <li><strong>Páginas de Bloques (Block Diagram):</strong> La primera página suele mostrar cómo se interconectan el CPU, RAM, PCH, puertos, y las fuentes de poder con sus respectivos voltajes y buses. Es el mapa general.</li>
        <li><strong>Redes de alimentación (Power Rails):</strong> Nombres como <code>+3VS5</code> (+3.3V en estado S5), <code>+5VALW</code> (+5V Always), o <code>+VCC_CORE</code> (voltaje de CPU). Los símbolos de flechas indican si la señal entra, sale o es bidireccional.</li>
      </ul>

      <h3>2. Funcionamiento de Componentes Críticos</h3>
      <ul>
        <li><strong>Resistencias de Pull-Up y Pull-Down:</strong> Se usan para definir un estado lógico estable en una línea de datos (3.3V o 0V) cuando no está activamente conducida.</li>
        <li><strong>MOSFET (N-Channel vs P-Channel):</strong> Los MOSFET tipo N conducen cuando el voltaje en el Gate (Compuerta) es mayor que en el Source (Fuente) por al menos 4V-10V (Vg > Vs). Los tipo P conducen cuando el Gate es menor que el Source (Vg < Vs). Son el interruptor principal de los circuitos de potencia.</li>
        <li><strong>Circuitos Integrados Buck PWM (Pulse Width Modulation):</strong> Controlan dos MOSFET (High-Side y Low-Side) para tomar un voltaje alto (19V) y convertirlo en uno bajo (3.3V o 5V) de forma altamente eficiente con ayuda de una bobina y capacitores de filtro.</li>
      </ul>

      <h3>3. Sincronización de Boardview con Esquemático</h3>
      <p>El **Boardview** es el plano físico en 2D de la placa madre que muestra la ubicación exacta de cada componente, pin y pista de cobre (incluso en las capas internas multicapa).</p>
      <ul>
        <li>Software recomendado: <strong>OpenBoardView</strong> (gratuito y de código abierto) y <strong>FlexBV</strong> (de pago, especializado para microscopios y reparación avanzada).</li>
        <li><strong>Flujo de trabajo:</strong> Cuando encuentras una línea sospechosa en el esquemático (por ejemplo, <code>+3V_LP</code>), copias el nombre exacto de la red y lo pegas en el buscador del Boardview. El software resaltará inmediatamente todos los pines de componentes y Test Points conectados físicamente a esa línea. Esto permite saber dónde colocar las puntas del multímetro o inyectar voltaje sin dañar otros componentes.</li>
      </ul>

      <h3>4. Práctica de Fuente de 3.3V ALW</h3>
      <p>Análisis de un circuito integrado PWM típico (ej. RT8205):</p>
      <ol>
        <li><strong>Alimentación (VIN / VCC):</strong> Pin que recibe los 19V de la línea principal.</li>
        <li><strong>LDO Habilitadores (EN / EN0):</strong> Señal de habilitación para los reguladores lineales internos.</li>
        <li><strong>Salidas de Regulador Lineal (VREG3 / VREG5):</strong> Generan 3.3V y 5V de baja corriente (máx. 100mA) de forma inmediata para encender el EC.</li>
        <li><strong>Entrada de habilitación de salidas conmutadas (EN1 / EN2):</strong> Pulsos provenientes del EC para encender las bobinas principales de 3.3V y 5V de alta corriente.</li>
        <li><strong>Gates (UGATE / LGATE):</strong> Salidas del integrado hacia las compuertas de los MOSFET de potencia.</li>
      </ol>

      <h3>5. Reconocimiento de Componentes por Serigrafía (Silk Screen)</h3>
      <p>La serigrafía es la impresión de texto y símbolos sobre el PCB de la laptop. Aprender a leer estos códigos permite identificar instantáneamente el tipo de componente antes de realizar mediciones:</p>
      <div class="module-image-showcase">
        <img src="images/pcb_silkscreen_guide.png" alt="Guía visual de serigrafía en PCB de laptops" style="width:100%;border-radius:10px;margin:1rem 0;box-shadow:0 4px 18px rgba(0,0,0,0.35);">
      </div>
      <ul>
        <li><strong>R (Resistencia):</strong> Componente pasivo limitador de corriente. Generalmente de color negro.</li>
        <li><strong>C (Capacitor Cerámico):</strong> Almacena carga temporalmente y filtra ruido de alta frecuencia. De color marrón, gris o beige.</li>
        <li><strong>D (Diodo):</strong> Permite el paso de corriente en un solo sentido. Marcado con una barra física para denotar el cátodo.</li>
        <li><strong>E / EC (Capacitor Electrolítico):</strong> Almacena alta capacidad. Tiene polaridad marcada física y lógicamente.</li>
        <li><strong>Z / ZD (Diodo Zener):</strong> Utilizado como regulador de voltaje de referencia o diodo de protección.</li>
        <li><strong>IC / U (Circuito Integrado):</strong> Chips controladores principales (Charger, PWM, Super I/O, etc.).</li>
        <li><strong>RP (Resistor Pack):</strong> Arreglo de múltiples resistencias en un único encapsulado (marcado comúnmente como '822' para packs de 8.2kΩ).</li>
        <li><strong>PQ (Power MOSFET):</strong> Transistores de potencia utilizados para conmutación de fuentes conmutadas y llaves de paso.</li>
        <li><strong>Y (Cristal Oscilador):</strong> Genera la frecuencia de reloj del sistema (ej: 32.768 kHz para el circuito RTC).</li>
        <li><strong>L / PL (Inductor / Bobina de Potencia):</strong> Almacena energía magnética en fuentes Buck conmutadas.</li>
      </ul>

      <h3>6. Decodificación de Códigos de Resistencias SMD</h3>
      <p>Las resistencias de montaje superficial (SMD) utilizan códigos numéricos estampados en su superficie para declarar su valor nominal de forma rápida:</p>
      <div class="module-image-showcase">
        <img src="images/smd_resistor_codes.png" alt="Explicación de códigos de resistencias SMD de 3 dígitos" style="width:100%;border-radius:10px;margin:1rem 0;box-shadow:0 4px 18px rgba(0,0,0,0.35);">
      </div>
      <ul>
        <li><strong>Formato de 3 Dígitos:</strong> Los primeros dos dígitos son significativos, y el tercer dígito es el multiplicador (número de ceros a añadir):
          <br>- <code>102</code> = 10 y dos ceros = 1000 Ω = 1 kΩ.
          <br>- <code>104</code> = 10 y cuatro ceros = 100,000 Ω = 100 kΩ.
          <br>- <code>223</code> = 22 y tres ceros = 22,000 Ω = 22 kΩ.
        </li>
        <li><strong>Resistencias de precisión (4 Dígitos):</strong> Los primeros tres dígitos son significativos, y el cuarto es el multiplicador. Ejemplo: <code>1002</code> = 100 y dos ceros = 10,000 Ω = 10 kΩ.</li>
        <li><strong>Resistencias de valor menor a 10Ω:</strong> Utilizan la letra <code>R</code> como punto decimal. Ejemplo: <code>2R2</code> = 2.2 Ω.</li>
      </ul>

      <h3>7. Circuitos de Protección contra Sobretensión (OVP)</h3>
      <p>El circuito OVP (Overvoltage Protection) protege a la placa de picos de voltaje originados en cargadores defectuosos o universales de mala calidad:</p>
      <div class="module-image-showcase">
        <img src="images/ovp_circuit_diagram.png" alt="Esquema simplificado de circuito OVP de laptop" style="width:100%;border-radius:10px;margin:1rem 0;box-shadow:0 4px 18px rgba(0,0,0,0.35);">
      </div>
      <ul>
        <li><strong>Lógica de Funcionamiento:</strong> El voltaje del cargador entra a un pin sensor del OVP IC. Si supera un umbral de seguridad prefijado (ej. 20.5V en placas de 19V), el integrado abre de inmediato el interruptor interno MOSFET, bloqueando el paso de corriente al riel principal y salvando al Charger IC y otros componentes delicados de una destrucción masiva.</li>
        <li><strong>Filtrado Bypass:</strong> Cuenta con capacitores cerámicos conectados a tierra en su entrada y salida para absorber ruidos transitorios rápidos.</li>
      </ul>
    `,
    glossary: [
      { term: "Boardview", definition: "Archivo digital y software que muestra la disposición física tridimensional de los componentes, soldaduras y pistas de una tarjeta electrónica específica." },
      { term: "LDO", definition: "Low Dropout Regulator. Regulador de voltaje lineal de baja caída. Altamente preciso pero ineficiente para altas corrientes, comúnmente usado para alimentar el EC y BIOS en standby." },
      { term: "Pull-Up", definition: "Resistencia conectada entre una línea de señal y un riel positivo (ej. 3.3V) para asegurar que la línea permanezca en nivel alto por defecto." },
      { term: "Gate (Compuerta)", definition: "El terminal de control de un MOSFET. Aplicando una diferencia de potencial en él, se permite o bloquea el flujo de corriente entre Drain and Source." },
      { term: "Test Point (TP)", definition: "Punto de prueba de cobre expuesto en la placa madre diseñado para soldar cables de diagnóstico o colocar la punta del multímetro/osciloscopio." },
      { term: "Resistor Pack (RP)", definition: "Arreglo integrado de múltiples resistencias idénticas en un solo encapsulado físico para ahorrar espacio en la placa base." },
      { term: "OVP", definition: "Overvoltage Protection. Circuito integrado encargado de desconectar el paso de voltaje principal de entrada si este supera el límite seguro de funcionamiento de la placa." }
    ],
    quiz: [
      {
        question: "Si medimos el Gate de un MOSFET canal N de entrada conectado a 19V en Source, ¿qué voltaje deberíamos encontrar aproximadamente para que esté conduciendo?",
        options: [
          "0V",
          "9.5V",
          "19V",
          "25V o 26V"
        ],
        answer: 3,
        explanation: "Para encender un MOSFET canal N, el voltaje del Gate (Vg) debe ser mayor que el del Source (Vs) por al menos 5V. Como el Source está a 19V, se usa una bomba de carga en el IC Charger para elevar el Gate a unos 25V-26V."
      },
      {
        question: "¿Cuál es la función principal de una bobina (Inductor) en una fuente conmutada Buck?",
        options: [
          "Limitar el paso de la corriente continua",
          "Almacenar energía en forma de campo magnético y suavizar la corriente de salida",
          "Proteger la placa contra sobretensiones estáticas",
          "Actuar como un fusible de seguridad rearmable"
        ],
        answer: 1,
        explanation: "El inductor se opone a los cambios bruscos de corriente, almacenando energía magnética durante la fase de encendido del MOSFET y liberándola en la fase de apagado para proveer una corriente continua estable."
      },
      {
        question: "¿Qué archivo de Boardview suele terminar con la extensión '.cad', '.brd' o '.fv'?",
        options: [
          "Archivos de firmware de la BIOS",
          "Archivos de datos de esquemas PDF",
          "Formatos comunes de Boardview compatibles con OpenBoardView",
          "Actualizaciones de controladores de sistema"
        ],
        answer: 2,
        explanation: "Los archivos físicos de Boardview se guardan en formatos propietarios de CAD como .cad, .brd, .bvr, .fv o .asc, los cuales son interpretados por visores de placas."
      },
      {
        question: "En un esquemático, ¿qué significa que una línea de señal tenga una barra diagonal encima o un prefijo 'n' (por ejemplo, nSYS_RESET)?",
        options: [
          "Que está conectada a un componente del disipador térmico",
          "Que es una señal de alta velocidad",
          "Que es una señal activa en nivel bajo (0V)",
          "Que es una señal analógica pura"
        ],
        answer: 2,
        explanation: "La letra 'n' minúscula al inicio o una barra superior denota 'negada', es decir, señal activa en nivel bajo (0V)."
      },
      {
        question: "Si el circuito integrado de standby genera VREG3 pero no activa el riel de potencia +3V_ALW en la bobina, ¿cuál es el paso lógico de diagnóstico?",
        options: [
          "Reemplazar el procesador central de inmediato",
          "Verificar si el integrado de standby recibe la señal de habilitación (EN1 / EN2) para las fuentes conmutadas",
          "Inyectar 19V en el pin VREG3",
          "Retirar los capacitores de filtrado de la memoria RAM"
        ],
        answer: 1,
        explanation: "Los rieles LDO (como VREG3) se activan automáticamente con la alimentación del IC, pero las bobinas principales requieren señales de habilitación adicionales (EN1 / EN2) del EC para activarse."
      },
      {
        question: "Encuentras un componente quemado con la serigrafía 'RP30' en una placa base. ¿A qué tipo de componente hace referencia la designación 'RP'?",
        options: [
          "Regulador de Potencia",
          "Resistor Pack (Arreglo de resistencias)",
          "Relé de Protección",
          "Resonador Piezoeléctrico"
        ],
        answer: 1,
        explanation: "El código de serigrafía 'RP' identifica a los 'Resistor Packs' (arreglos de resistencias), que son múltiples resistencias unificadas en un solo componente físico SMD."
      },
      {
        question: "Estás leyendo una resistencia SMD de 3 dígitos con el marcado '104'. ¿Cuál es el valor nominal de esta resistencia?",
        options: [
          "104 Ohmios",
          "10.4 Kiloohmios",
          "100 Kiloohmios",
          "1 Megaohmio"
        ],
        answer: 2,
        explanation: "El marcado 104 indica 10 como base y 4 ceros de multiplicador: 100,000 Ohmios, lo cual equivale a 100 kΩ."
      },
      {
        question: "¿Qué ocurre dentro de un chip protector OVP (Overvoltage Protection) cuando el voltaje del cargador conectado supera su umbral seguro de diseño?",
        options: [
          "El chip se quema a propósito para interrumpir la conexión",
          "El chip abre de inmediato su MOSFET interruptor interno para aislar la placa",
          "El chip reduce el voltaje extra transformándolo en calor",
          "El chip envía una interrupción de software para apagar Windows"
        ],
        answer: 1,
        explanation: "El OVP IC actúa como un interruptor electrónico inteligente ultrarrápido; al detectar sobrevoltaje en el sensor, apaga el MOSFET de paso en nanosegundos para proteger los circuitos internos."
      }
    ],
    flashcards: [
      { question: "¿Cuál es la diferencia entre regulador LDO y Buck?", answer: "El LDO es lineal (baja corriente, desperdicia energía como calor pero es simple); el Buck es conmutado (alta eficiencia, alta corriente, requiere transistores, bobina y diodo/MOSFET)." },
      { question: "¿Qué hace una resistencia pull-down?", answer: "Conecta una línea a tierra (0V) para asegurar un nivel lógico bajo constante hasta que se aplique un voltaje activo." },
      { question: "¿Cómo se identifica el pin 1 en un chip físico?", answer: "Por un punto impreso en la superficie del encapsulado, o un bisel/chaflán en una de sus esquinas." },
      { question: "¿Qué significan las siglas PWM?", answer: "Pulse Width Modulation (Modulación por Ancho de Pulso). Método para controlar el voltaje variando el tiempo de encendido y apagado de transistores rápidos." },
      { question: "¿Por qué es útil sincronizar esquemático y Boardview?", answer: "Permite encontrar la ubicación exacta en el circuito físico del componente abstracto que estamos analizando en el diagrama en PDF." },
      { question: "¿Qué significan las letras Y y PQ en la serigrafía de la placa madre?", answer: "Y representa un oscilador de cristal (reloj del sistema) y PQ representa un MOSFET de potencia." },
      { question: "¿Cuál es el valor de una resistencia marcada como 2R2?", answer: "La letra R indica el punto decimal, por lo tanto representa una resistencia de 2.2 Ohmios." },
      { question: "¿Cuál es el propósito principal del circuito OVP en una laptop?", answer: "Desconectar la entrada de voltaje si se conecta un cargador con sobrevoltaje para evitar dañar componentes de la placa madre." }
    ]
  };

