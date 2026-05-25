/**
 * CURSO DE REPARACIÓN PROFESIONAL: INGENIERÍA DE HARDWARE Y MICROELECTRÓNICA
 * Base de datos de contenido completo para los 14 módulos de estudio.
 * Optimizado para acceso offline y renderizado dinámico en el portal.
 */

const MODULES_DATA = [
  {
    id: 1,
    title: "Arquitectura Electrónica y Secuencia de Encendido",
    image: "images/power_sequence_diagram.png",
    objectives: [
      "Diferenciar las arquitecturas Intel SoC/PCH vs AMD en placas base de laptop.",
      "Identificar el rol del CPU, PCH, VRM y Super I/O (EC/KBC) en el arranque.",
      "Aprender de memoria los estados ACPI: G3, S5, S4, S3 y S0.",
      "Comprender la secuencia temporal: VIN -> ALWAYS -> SUSPEND -> VCORE -> POWER GOOD -> RESET.",
      "Analizar las señales lógicas críticas: ACOK, RSMRST#, SLP_S3#, SLP_S5#, VR_ON, PWROK y PLTRST#."
    ],
    content: `
      <h3>1. Arquitectura de Sistemas: Intel SoC vs AMD</h3>
      <p>En las laptops modernas, la arquitectura de hardware ha evolucionado desde el clásico sistema de tres chips (CPU, Puente Norte y Puente Sur) a soluciones altamente integradas:</p>
      <ul>
        <li><strong>Arquitectura Intel SoC (System on Chip) / PCH:</strong> El PCH (Platform Controller Hub) realiza las tareas del antiguo puente sur (SATA, USB, audio, PCIe lentos) y el controlador de memoria e interfaz gráfica se han integrado en el CPU. En arquitecturas SoC de ultrabooks, el CPU y el PCH vienen en el mismo encapsulado físico (BGA). El EC (Embedded Controller) gestiona las tareas térmicas, de teclado y de secuencia inicial de encendido, comunicándose con el PCH a través del bus LPC o eSPI (Enhanced Serial Peripheral Interface).</li>
        <li><strong>Arquitectura AMD:</strong> Similar a Intel, AMD utiliza la estructura de APU (Accelerated Processing Unit) que integra CPU y GPU. AMD integra las funciones del PCH directamente en la APU (llamado FCH o Fusion Controller Hub en modelos anteriores), reduciendo el consumo y el espacio en placa. El EC (KBC) realiza funciones idénticas a las de plataformas Intel, negociando los estados de encendido.</li>
      </ul>

      <h3>2. Componentes Clave del Sistema</h3>
      <ul>
        <li><strong>CPU (Central Processing Unit):</strong> El procesador principal. Requiere voltajes sumamente estables y limpios (VCORE), que pueden sobrepasar los 100 amperios a voltajes bajos (~0.8V a 1.2V).</li>
        <li><strong>PCH (Platform Controller Hub):</strong> El núcleo de comunicaciones de la placa. Gestiona la secuencia lógica intermedia de encendido, controla los estados de suspensión y comunica con la BIOS y el EC.</li>
        <li><strong>VRM (Voltage Regulator Module):</strong> Módulos reguladores de voltaje (Buck Converters) que reducen el voltaje de entrada (19V de cargador o 11V-15V de batería) a los niveles requeridos por el CPU, RAM, PCH, etc.</li>
        <li><strong>Super I/O (EC/KBC - Embedded Controller):</strong> Un microcontrolador independiente (usualmente de marcas como ITE, ENE, Nuvoton o SMSC) que corre su propio firmware. Monitorea sensores de temperatura, controla el ventilador, lee el teclado y, lo más importante, <strong>controla la primera fase del encendido</strong> de la placa y la lógica de carga de la batería.</li>
      </ul>

      <h3>3. Estados ACPI (Advanced Configuration and Power Interface)</h3>
      <p>El estándar industrial define cómo debe comportarse el consumo energético del equipo:</p>
      <ul>
        <li><strong>G3 (Mechanical Off):</strong> Estado de apagado total mecánico. No hay energía conectada (sin cargador y sin batería) excepto por la pila de la BIOS (RTC, 3V).</li>
        <li><strong>S5 (Soft Off):</strong> Apagado por software. El cargador o la batería están conectados. Solo existen voltajes primarios u obligatorios llamados "ALWAYS" (3.3V ALW, 5V ALW, y el voltaje de alimentación del EC). El consumo es mínimo (~10mA a ~30mA).</li>
        <li><strong>S4 (Suspend to Disk / Hibernación):</strong> Similar al estado S5 a nivel de hardware, el contexto del sistema se guarda en el disco.</li>
        <li><strong>S3 (Suspend to RAM / Suspender):</strong> La memoria RAM permanece energizada para conservar los datos volátiles del sistema. Los voltajes de CPU y GPU están apagados. Se le conoce como estado de suspensión.</li>
        <li><strong>S0 (Working):</strong> Equipo completamente encendido. Todos los rieles de voltaje (incluidos CPU VCORE y GPU VCORE) están activos y el procesador ejecuta instrucciones.</li>
      </ul>

      <h3>4. Secuencia Lógica de Encendido</h3>
      <p>La secuencia temporal de arranque sigue este flujo estricto (cualquier interrupción detiene el encendido):</p>
      <ol>
        <li><strong>Ingreso de Voltaje Principal (VIN / B+ / 19V):</strong> El voltaje del cargador entra a la placa y alimenta la línea principal del sistema a través de dos MOSFET de entrada controlados por el IC Charger.</li>
        <li><strong>Generación de Voltajes Primarios (3.3V ALWAYS & 5.0V ALWAYS):</strong> Los reguladores Buck de 3.3V y 5V se activan. El EC se enciende y lee su firmware interno o una porción de la BIOS principal.</li>
        <li><strong>Presión del Botón de Encendido (ON/OFF#):</strong> Se envía un pulso lógico al EC (baja a 0V y sube a 3.3V).</li>
        <li><strong>Liberación de Reset del EC (RSMRST# a 3.3V):</strong> El EC informa al PCH que los voltajes ALW están estables y listos.</li>
        <li><strong>Envío de Señales de Suspensión (SLP_S5# y SLP_S3# a 3.3V):</strong> El PCH responde liberando las líneas de suspensión, indicando que se pueden activar los voltajes secundarios (SUSPEND / RUN).</li>
        <li><strong>Activación de Rieles Secundarios (1.2V/1.5V RAM, 1.0V PCH, etc.):</strong> Se habilitan los integrados y transistores para alimentar la RAM y el resto de la placa.</li>
        <li><strong>Habilitación del CPU (VR_ON / HWPG a 3.3V):</strong> El EC o PCH habilita el chip PWM que controla las fases del CPU (VCORE).</li>
        <li><strong>Señal de Voltajes Correctos (PWROK / SYS_PWROK a 3.3V):</strong> Se informa al PCH y al CPU que todos los voltajes de la placa están estables.</li>
        <li><strong>Liberación del Reset del Sistema (PLTRST# / CPURST# a 3.3V):</strong> El PCH libera al procesador del estado de reset y este empieza a leer la BIOS SPI para iniciar el POST.</li>
      </ol>
    `,
    glossary: [
      { term: "ACOK", definition: "AC Detect OK. Señal de salida del circuito integrado de carga (Charger IC) que indica al EC que el cargador conectado es válido y seguro." },
      { term: "RSMRST#", definition: "Resume Reset. Señal lógica emitida por el EC hacia el PCH para sacarlo de su estado de reinicio de standby, indicando que todos los rieles ALWAYS están estables." },
      { term: "SLP_S3# / SLP_S5#", definition: "Sleep S3 / S5. Señales de control emitidas por el PCH hacia el EC o MOSFETs de potencia para transicionar el sistema entre estados de suspensión y encendido activo." },
      { term: "VR_ON", definition: "Voltage Regulator Enable. Señal lógica emitida por el EC (o PCH) para encender la fuente de poder multipase encargada del CPU VCORE." },
      { term: "PLTRST#", definition: "Platform Reset. La señal de reset de la plataforma emitida por el PCH. Cuando sube a 3.3V, todos los periféricos y el CPU comienzan a operar." },
      { term: "eSPI", definition: "Enhanced Serial Peripheral Interface. Bus de alta velocidad que reemplaza al antiguo bus LPC en arquitecturas Intel a partir de la 8ª generación para comunicar el EC con el PCH." }
    ],
    quiz: [
      {
        question: "¿Cuál es el primer riel de voltaje que debe estabilizarse al conectar el cargador?",
        options: [
          "CPU VCORE (~1.0V)",
          "Voltaje de RAM (1.2V)",
          "Línea de entrada principal (VIN / B+ de 19V)",
          "Señal PLTRST# (3.3V)"
        ],
        answer: 2,
        explanation: "La línea principal de entrada (VIN / B+ de 19V o 20V) es el origen de toda la energía de la placa y debe validarse antes de que cualquier otra fuente conmutada arranque."
      },
      {
        question: "¿Qué componente se encarga de emitir la señal RSMRST# al PCH?",
        options: [
          "El chip de BIOS SPI",
          "El Embedded Controller (EC / Super I/O)",
          "El circuito integrado de la memoria RAM",
          "El MOSFET High-Side del VRM del procesador"
        ],
        answer: 1,
        explanation: "El EC (Embedded Controller) es el encargado de verificar que los voltajes ALWAYS estén listos y luego emite la señal RSMRST# a nivel alto (3.3V) hacia el PCH."
      },
      {
        question: "En el estado ACPI S3, ¿qué componente permanece energizado?",
        options: [
          "La memoria RAM",
          "El procesador (CPU VCORE)",
          "La tarjeta gráfica discreta (GPU)",
          "Únicamente el chip de red WiFi"
        ],
        answer: 0,
        explanation: "El estado S3 es 'Suspend to RAM'. Para conservar los datos del sistema operativo abiertos, el riel de memoria RAM permanece encendido, apagándose el resto de los rieles lógicos pesados."
      },
      {
        question: "¿Qué indica un estado lógico bajo (0V) en una señal que termina con el símbolo '#' (por ejemplo, RSMRST#)?",
        options: [
          "Que la señal está inactiva (lógica negativa)",
          "Que la señal está activa (lógica negativa, el '0' lógico activa la función)",
          "Que hay un cortocircuito a tierra absoluto en la línea",
          "Que la placa madre está dañada irreversiblemente"
        ],
        answer: 1,
        explanation: "El símbolo '#' o la barra superior indica 'Active Low' (Lógica Negativa). Significa que la función o reset está activo cuando la tensión es 0V (estado bajo) y se desactiva cuando sube a 3.3V."
      },
      {
        question: "¿Cuál es el bus moderno de comunicación entre el EC y el PCH en arquitecturas Intel recientes?",
        options: [
          "El bus I2C de 100 kHz",
          "El bus LPC de 33 MHz",
          "El bus eSPI de alta velocidad",
          "La interfaz SATA 3"
        ],
        answer: 2,
        explanation: "El bus eSPI (Enhanced Serial Peripheral Interface) reemplazó al bus LPC en plataformas modernas de Intel, ofreciendo menor cantidad de pines y mayor frecuencia de reloj."
      }
    ],
    flashcards: [
      { question: "¿Qué significa el estado ACPI G3?", answer: "Mechanical Off: Desconexión mecánica total. No hay cargador, no hay batería conectado. Solo la pila RTC (3V) alimenta el reloj interno del PCH." },
      { question: "¿Qué mide la señal ACOK?", answer: "Valida que el cargador entregue un voltaje correcto y estable a la placa madre, permitiendo al EC iniciar la secuencia lógica." },
      { question: "¿Cuál es el rol de VR_ON?", answer: "Habilitar (Enable) el circuito PWM del procesador para arrancar la generación de voltaje VCORE." },
      { question: "¿Qué sucede inmediatamente después de que PLTRST# sube a 3.3V?", answer: "El CPU se libera del estado de reset y comienza a buscar y leer las primeras instrucciones en la memoria flash de la BIOS SPI." },
      { question: "¿Qué diferencia un SoC de un CPU clásico?", answer: "El SoC integra CPU, tarjeta de video (GPU) y el puente de control (PCH) dentro de un solo silicio o empaque físico." }
    ]
  },
  {
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
    `,
    glossary: [
      { term: "Boardview", definition: "Archivo digital y software que muestra la disposición física tridimensional de los componentes, soldaduras y pistas de una tarjeta electrónica específica." },
      { term: "LDO", definition: "Low Dropout Regulator. Regulador de voltaje lineal de baja caída. Altamente preciso pero ineficiente para altas corrientes, comúnmente usado para alimentar el EC y BIOS en standby." },
      { term: "Pull-Up", definition: "Resistencia conectada entre una línea de señal y un riel positivo (ej. 3.3V) para asegurar que la línea permanezca en nivel alto por defecto." },
      { term: "Gate (Compuerta)", definition: "El terminal de control de un MOSFET. Aplicando una diferencia de potencial en él, se permite o bloquea el flujo de corriente entre Drain y Source." },
      { term: "Test Point (TP)", definition: "Punto de prueba de cobre expuesto en la placa madre diseñado para soldar cables de diagnóstico o colocar la punta del multímetro/osciloscopio." }
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
      }
    ],
    flashcards: [
      { question: "¿Cuál es la diferencia entre regulador LDO y Buck?", answer: "El LDO es lineal (baja corriente, desperdicia energía como calor pero es simple); el Buck es conmutado (alta eficiencia, alta corriente, requiere transistores, bobina y diodo/MOSFET)." },
      { question: "¿Qué hace una resistencia pull-down?", answer: "Conecta una línea a tierra (0V) para asegurar un nivel lógico bajo constante hasta que se aplique un voltaje activo." },
      { question: "¿Cómo se identifica el pin 1 en un chip físico?", answer: "Por un punto impreso en la superficie del encapsulado, o un bisel/chaflán en una de sus esquinas." },
      { question: "¿Qué significan las siglas PWM?", answer: "Pulse Width Modulation (Modulación por Ancho de Pulso). Método para controlar el voltaje variando el tiempo de encendido y apagado de transistores rápidos." },
      { question: "¿Por qué es útil sincronizar esquemático y Boardview?", answer: "Permite encontrar la ubicación exacta en el circuito físico del componente abstracto que estamos analizando en el diagrama en PDF." }
    ]
  },
  {
    id: 3,
    title: "Diagnóstico Electrónico, Mediciones y Osciloscopio",
    image: "images/oscilloscope.png",
    objectives: [
      "Comprender la diferencia crucial entre mediciones en frío (resistencia/diodo) y mediciones en caliente (voltaje).",
      "Utilizar el multímetro de forma profesional en todas sus escalas críticas.",
      "Diagnosticar cortocircuitos mediante medición de impedancias e inyección de voltaje controlada.",
      "Utilizar la cámara térmica y el método del rosin para localizar componentes en corto.",
      "Configurar y operar un osciloscopio digital (Trigger, Time/Div, Volts/Div) para capturar señales PWM y BIOS SPI."
    ],
    content: `
      <h3>1. Mediciones en Frío vs Mediciones en Caliente</h3>
      <ul>
        <li><strong>Mediciones en Frío (Sin energía):</strong> Se realizan sin cargador ni batería conectados. La escala más valiosa es <strong>Modo Diodo</strong> o <strong>Resistencia (Ohmios)</strong>.
          <br><em>Uso crítico:</em> Medir la impedancia (resistencia relativa a tierra) de todas las bobinas de la placa. Una bobina con una impedancia extremadamente baja (cercana a 0 ohmios) indica un cortocircuito en esa línea de voltaje. (Excepción: rieles de CPU VCORE y GPU, cuyas impedancias normales son de apenas unos pocos ohmios: 1.5Ω a 15Ω).
        </li>
        <li><strong>Mediciones en Caliente (Con energía):</strong> Se realizan conectando el cargador. Se mide en escala de <strong>Voltaje Continuo (VDC)</strong>.
          <br><em>Uso crítico:</em> Verificar la presencia de voltajes principales y señales lógicas en puntos clave definidos por la secuencia de encendido.
        </li>
      </ul>

      <h3>2. Localización de Cortocircuitos</h3>
      <p>Cuando encontramos una línea de alimentación con cortocircuito a tierra (impedancia anómala), nunca debemos conectar el cargador original, ya que el circuito de protección se activará o dañará más componentes. El método correcto es la <strong>Inyección de Voltaje Limitada</strong>:</p>
      <ol>
        <li>Ajustar la fuente de laboratorio a un voltaje seguro. <strong>Regla de oro:</strong> Nunca inyectar más del voltaje nominal de la línea (ej. máximo 1.0V para CPU VCORE, 3.3V para la línea de 3.3V ALW, y 1.0V a 2.0V para la línea de 19V para evitar daños colaterales si la compuerta de un MOSFET está perforada).</li>
        <li>Limitar la corriente de la fuente a 1A o 2A.</li>
        <li>Soldar un cable delgado en la bobina o capacitor de la línea en corto y conectar el borne positivo de la fuente. Conectar el borne negativo al chasis (GND) de la placa.</li>
        <li>Encender la fuente y buscar el componente que se calienta:
          <ul>
            <li><strong>Método de Rosin:</strong> Se quema resina de rosin con el cautín y se cubre la placa de un polvo blanco. El componente defectuoso disipará calor y el polvo blanco se derretirá instantáneamente volviéndose transparente.</li>
            <li><strong>Cámara Térmica:</strong> Permite ver de forma inmediata el punto caliente (Hot Spot) con precisión de milisegundos.</li>
          </ul>
        </li>
      </ol>

      <h3>3. Osciloscopio en el Diagnóstico de Laptop</h3>
      <p>El multímetro solo muestra un promedio de voltaje en el tiempo. Un osciloscopio permite ver cambios rápidos de microsegundos:</p>
      <ul>
        <li><strong>Configuración Inicial:</strong> Ajustar la punta en 10X para evitar cargar el circuito. Ajustar la escala de Voltaje a 1V/Div o 2V/Div. Ajustar la escala de tiempo (Time/Div) a microsegundos (µs) para ver PWM, o milisegundos (ms) para ver la subida de un voltaje.</li>
        <li><strong>Trigger (Disparador):</strong> Ajustar el trigger en modo "Single" (Disparo Único) y configurar el nivel a unos 1.5V para capturar señales transitorias rápidas como el encendido o la ráfaga de comunicación BIOS SPI.</li>
        <li><strong>Señal SPI de BIOS:</strong> Colocando la punta en el Pin 2 (Data Out) o Pin 5 (Data In) de la BIOS flash, y encendiendo la placa, debemos ver pulsos digitales de 3.3V de amplitud. Si no hay actividad, el CPU no está intentando leer la BIOS (puede ser por falta de reset o alimentación).</li>
        <li><strong>Frecuencia PWM:</strong> Medir en la fase antes de la bobina (en el nodo de conmutación / fase) nos mostrará una onda cuadrada limpia de entre 200 kHz a 1 MHz, validando que los MOSFETs y el driver PWM funcionan correctamente.</li>
      </ul>
    `,
    glossary: [
      { term: "Impedancia", definition: "Resistencia al paso de corriente alterna o continua medida en un circuito respecto a tierra. Es crucial para identificar cortocircuitos." },
      { term: "Rosin", definition: "Resina de pino sólida usada como fundente de soldadura que, evaporada sobre componentes fríos, sirve como indicador térmico visual de cortocircuitos." },
      { term: "Trigger", definition: "Función del osciloscopio que sincroniza el barrido de la pantalla con un punto específico de la señal medida para estabilizar o capturar formas de onda." },
      { term: "Inyección de Voltaje", definition: "Técnica de diagnóstico que consiste en aplicar tensión controlada externamente a una línea de alimentación en corto para identificar componentes defectuosos por disipación térmica." },
      { term: "Modo Diodo", definition: "Escala del multímetro que inyecta una corriente constante baja y mide la caída de tensión en milivoltios. Ideal para medir impedancias en líneas de datos rápidas." }
    ],
    quiz: [
      {
        question: "Estás diagnosticando una línea de 19V con un cortocircuito absoluto (0 ohmios a tierra). ¿Cuál es el voltaje máximo recomendado para inyectar?",
        options: [
          "19V, ya que es el voltaje original de la línea",
          "1V - 2V, limitando la corriente en la fuente",
          "5V, para asegurar que el corto se queme rápido",
          "No se debe inyectar voltaje en la línea de 19V bajo ninguna circunstancia"
        ],
        answer: 1,
        explanation: "Si un MOSFET del procesador está en corto entre Drain y Source, inyectar 19V enviará esa tensión alta directamente al CPU, destruyéndolo. Inyectar 1V a 2V es totalmente seguro y suficiente para calentar el capacitor o MOSFET defectuoso."
      },
      {
        question: "¿Qué nos indica medir una caída de tensión de 0.001V en modo diodo en una bobina de alimentación de memoria RAM?",
        options: [
          "Que el circuito funciona perfectamente",
          "Que la memoria RAM está en modo de espera",
          "Un cortocircuito directo a tierra en esa línea de alimentación",
          "Que la punta de prueba roja del multímetro está abierta"
        ],
        answer: 2,
        explanation: "Una lectura cercana a cero (0.001V o similar) en modo diodo indica un puente directo a tierra (cortocircuito absoluto), por lo que esa línea no podrá levantar voltaje."
      },
      {
        question: "Al usar el osciloscopio para verificar la BIOS SPI, ¿en qué momento debemos observar la ráfaga de datos?",
        options: [
          "A las 2 horas de tener la computadora encendida",
          "Únicamente al apagar la computadora",
          "Justo en el instante en que la placa se energiza y sale del estado de RESET",
          "Durante la carga completa del sistema operativo Windows"
        ],
        answer: 2,
        explanation: "El procesador lee la BIOS inmediatamente después de ser liberado de su estado de reset para cargar las primeras instrucciones de inicialización (POST). Es un evento transitorio que ocurre al encender la máquina."
      },
      {
        question: "¿Por qué las bobinas del procesador (CPU VCORE) muestran lecturas de resistencia muy bajas (ej. 3 ohmios) sin estar dañadas?",
        options: [
          "Porque el silicio del procesador tiene una resistencia interna extremadamente baja por su diseño de alta potencia",
          "Porque el procesador está dañado internamente",
          "Porque las bobinas están mal soldadas de fábrica",
          "Porque la pila de la BIOS está descargada"
        ],
        answer: 0,
        explanation: "Los microprocesadores modernos consumen mucha corriente a voltajes bajos. De acuerdo con la Ley de Ohm, una resistencia muy baja es normal para permitir el paso de decenas de amperios necesarios para su operación."
      },
      {
        question: "¿Para qué sirve ajustar la punta del osciloscopio en modo 10X?",
        options: [
          "Para multiplicar el voltaje de entrada por 10",
          "Para reducir la carga capacitiva y resistiva que la punta de prueba introduce en circuitos de alta frecuencia",
          "Para aumentar el brillo de la pantalla",
          "Para apagar los filtros de ruido de la placa"
        ],
        answer: 1,
        explanation: "El ajuste 10X introduce una resistencia de 9 MΩ en la punta de prueba que, en paralelo con el osciloscopio, atenúa la señal por 10 y reduce la capacitancia, evitando distorsionar señales rápidas como el bus SPI o PWM."
      }
    ],
    flashcards: [
      { question: "¿Cómo se mide en frío?", answer: "Sin alimentación conectada a la placa. Escala de diodo o resistencia, punta roja a tierra de la placa, punta negra al pin de prueba." },
      { question: "¿Qué ventajas tiene el método de Rosin?", answer: "Es extremadamente económico, no requiere software y hace visible el calor en forma física inmediata al derretirse el polvo blanco." },
      { question: "¿Qué hace la perilla Time/Div?", answer: "Controla la escala de tiempo horizontal en la pantalla del osciloscopio por cada división de la cuadrícula." },
      { question: "¿Qué es el modo Single del osciloscopio?", answer: "Configura el osciloscopio para capturar un único evento rápido que cumpla la condición del trigger y congelarlo en pantalla." },
      { question: "¿Por qué calienta un componente en corto al inyectar voltaje?", answer: "Por el efecto Joule (P = I² * R). La corriente de la fuente fluye masivamente a través de la resistencia del corto, disipando calor." }
    ]
  },
  {
    id: 4,
    title: "Microelectrónica, Soldadura y Herramientas",
    image: "images/micro_soldering.png",
    objectives: [
      "Conocer las diferencias metalúrgicas y de temperatura entre aleaciones con y sin plomo.",
      "Ajustar los perfiles de temperatura y flujo de aire en estaciones de aire caliente y cautines T12/JBC.",
      "Dominar las técnicas profesionales de desoldado usando malla de cobre y flux de calidad.",
      "Realizar reconstrucción de pads destruidos y pistas microscópicas mediante jumpers y máscara UV.",
      "Reemplazar chips SMD de montaje superficial, circuitos QFN y controladores Super I/O."
    ],
    content: `
      <h3>1. Aleaciones de Soldadura</h3>
      <p>La soldadura utilizada en electrónica es una mezcla de metales con propiedades específicas:</p>
      <ul>
        <li><strong>Aleación Leaded (Con Plomo - 60/40 o 63/37 Sn/Pb):</strong> Punto de fusión bajo (~183°C). Es muy dócil, brilla al solidificarse, tiene alta resistencia a la fatiga térmica y es sumamente fácil de soldar. <em>Nota comercial:</em> Prohibida en la industria de manufactura masiva por normativas ambientales (RoHS), pero ampliamente usada en reparación por su facilidad de trabajo.</li>
        <li><strong>Aleación Lead-Free (Libre de Plomo - SAC305: Sn96.5/Ag3.0/Cu0.5):</strong> Punto de fusión elevado (~217°C a 220°C). Es más dura, propensa a quebraduras mecánicas (soldaduras frías), y requiere mayor temperatura en las herramientas de soldadura.</li>
      </ul>

      <h3>2. Uso de Flux y Capilaridad</h3>
      <p>El <strong>flux</strong> (fundente) es el elemento químico más importante del soldador. Sus funciones son:</p>
      <ol>
        <li>Limpiar la oxidación de los metales al calentarse.</li>
        <li>Facilitar la transferencia de calor de la herramienta a la placa.</li>
        <li>Mejorar la tensión superficial para que la soldadura líquida fluya y se adhiera únicamente a las partes metálicas (capilaridad).</li>
      </ol>
      <p>Para microelectrónica se requiere flux de tipo <em>No-Clean</em> de alta calidad (ej. Amtech NC-559 o Kingbo) para evitar residuos conductivos o corrosivos bajo los chips.</p>

      <h3>3. Control de Temperatura y Flujo de Aire</h3>
      <ul>
        <li><strong>Para desoldar chips QFN/Super I/O:</strong> Configurar la estación de aire caliente a unos 350°C - 380°C con flujo de aire medio para evitar volar componentes pequeños adyacentes. Precalentar la zona de forma uniforme antes de concentrar el calor sobre el chip.</li>
        <li><strong>Para cautines modernos (T12 / JBC):</strong> Utilizar puntas tipo cuchilla (K) o punta fina doblada. Trabajar a 320°C - 350°C. La potencia de estas estaciones permite calentar el cobre de la placa en milisegundos, evitando sobrecalentar y dañar los componentes internos.</li>
      </ul>

      <h3>4. Reconstrucción de Pistas y Jumpering</h3>
      <p>Cuando un pad o pista se desprende por corrosión (líquidos) o mal trabajo mecánico:</p>
      <ol>
        <li>Raspar suavemente la máscara verde del PCB para exponer el cobre sano de la pista restante usando un bisturí quirúrgico.</li>
        <li>Aplicar flux y estañar el cobre expuesto.</li>
        <li>Soldar un hilo de cobre esmaltado ultrafino (0.02mm o 0.09mm) desde la pista sana hasta el pad destruido.</li>
        <li>Aplicar una gota milimétrica de **máscara UV** (polímero fotosensible).</li>
        <li>Curar la máscara con una lámpara de luz ultravioleta por 10-30 segundos para aislar y fijar mecánicamente el cable de cobre.</li>
      </ol>
    `,
    glossary: [
      { term: "SAC305", definition: "Aleación estándar libre de plomo compuesta por 96.5% de Estaño, 3% de Plata y 0.5% de Cobre. Punto de fusión ~217°C." },
      { term: "Máscara UV", definition: "Resina líquida fotosensible que se solidifica bajo luz ultravioleta. Reemplaza el recubrimiento protector verde (solder mask) original de la placa." },
      { term: "Jumper", definition: "Cable puente de cobre esmaltado o aislado soldado manualmente para restablecer una conexión eléctrica interrumpida por una pista rota." },
      { term: "Drag Soldering (Soldadura por arrastre)", definition: "Técnica de soldadura rápida de chips QFP o conectores de muchos pines, usando una punta tipo cuchilla cargada de estaño y flux deslizada sobre los terminales." },
      { term: "Capilaridad", definition: "Fenómeno físico que atrae los líquidos (estaño fundido) a través de canales estrechos guiados por la fuerza del flux y la afinidad metálica." }
    ],
    quiz: [
      {
        question: "¿A qué temperatura aproximada funde la soldadura tradicional con plomo (63/37)?",
        options: [
          "100°C",
          "183°C",
          "217°C",
          "350°C"
        ],
        answer: 1,
        explanation: "La soldadura eutéctica con plomo (63% estaño y 37% plomo) funde exactamente a 183°C, permitiendo soldar con temperaturas más bajas en las herramientas."
      },
      {
        question: "Al soldar bajo el microscopio, ¿cuál es el objetivo principal del flux?",
        options: [
          "Enfriar rápidamente la soldadura para que se solidifique",
          "Adherir los chips mecánicamente a la placa antes de calentarlos",
          "Eliminar el óxido metálico de las superficies y mejorar la fluidez de la soldadura",
          "Pintar el circuito impreso de color verde"
        ],
        answer: 2,
        explanation: "El flux elimina la capa de óxido que se forma sobre los metales con el oxígeno del aire al aplicar calor, permitiendo que la soldadura estañe correctamente las terminales por capilaridad."
      },
      {
        question: "¿Cómo se debe curar la resina verde para reconstrucción de pistas?",
        options: [
          "Esperando 24 horas a temperatura ambiente",
          "Calentando con la estación de aire a 400°C",
          "Exponiendo la resina a luz ultravioleta (UV)",
          "Limpiando con alcohol isopropílico de alta concentración"
        ],
        answer: 2,
        explanation: "La máscara protectora UV es un polímero fotosensible que reacciona químicamente a la radiación ultravioleta, curando (endureciendo) en segundos."
      },
      {
        question: "¿Qué técnica de soldadura se recomienda para soldar un chip Super I/O (EC) de 128 pines de forma rápida y limpia?",
        options: [
          "Soldar pin por pin usando una punta aguja fina sin flux",
          "Técnica de soldadura por arrastre (drag soldering) usando flux abundante y punta de cuchilla",
          "Calentar todo el chip con soplete de gas butano",
          "Inyectar pasta de estaño fría y no usar calor"
        ],
        answer: 1,
        explanation: "El arrastre (drag soldering) con una punta tipo cuchilla (K) y abundante flux permite soldar decenas de pines alineados en segundos, ya que la tensión superficial y el flux guían la soldadura líquida solo a los pads de cobre, evitando puentes."
      },
      {
        question: "¿Qué material se utiliza para limpiar el exceso de soldadura de los pads de la placa dejándolos planos?",
        options: [
          "Alambre de hierro galvanizado",
          "Malla desoldadora de cobre trenzado impregnada con flux",
          "Papel lija de grano fino",
          "Bisturí quirúrgico calentado a 300°C"
        ],
        answer: 1,
        explanation: "La malla de desoldar de cobre absorbe el estaño fundido gracias a la capilaridad de su tejido metálico y al flux, dejando los pads de la placa limpios y planos para soldar el nuevo chip."
      }
    ],
    flashcards: [
      { question: "¿Qué es RoHS?", answer: "Restricción de Sustancias Peligrosas. Directiva europea que prohíbe el uso de plomo en aparatos electrónicos nuevos por motivos de salud ambiental." },
      { question: "¿Por qué se utiliza alcohol isopropílico?", answer: "Porque es un solvente que remueve el flux de forma eficiente y se evapora extremadamente rápido sin dejar agua ni humedad en la placa." },
      { question: "¿Qué es el reballing?", answer: "Proceso de retirar el estaño dañado de un chip BGA y colocar esferas nuevas de soldadura usando una plantilla o stencil metálico." },
      { question: "¿Qué pasa si tiras de la malla desoldadora con fuerza?", answer: "Puedes arrancar físicamente los delicados pads de cobre de la placa madre si la soldadura aún no está completamente fundida." },
      { question: "¿A qué temperatura funde la soldadura SAC305?", answer: "Funde aproximadamente a los 217°C, siendo la aleación libre de plomo más común de la industria." }
    ]
  },
  {
    id: 5,
    title: "Firmware, BIOS y Seguridad de Bajo Nivel",
    image: "images/bios_firmware.png",
    objectives: [
      "Diferenciar la arquitectura y funcionamiento de BIOS Legacy vs UEFI.",
      "Aprender a operar programadores de memoria flash por hardware (CH341A, RT809F, SVOD).",
      "Realizar lecturas directas y extracción de dumps de BIOS soldada y fuera de la placa.",
      "Dominar la edición hexadecimal de archivos binarios (.BIN / .ROM).",
      "Limpiar la región Intel ME (Management Engine) y AMD PSP para resolver fallas lógicas."
    ],
    content: `
      <h3>1. Arquitectura BIOS / UEFI</h3>
      <p>La BIOS (Basic Input/Output System) o la moderna **UEFI** (Unified Extensible Firmware Interface) es el código inicial que el procesador ejecuta al encenderse:</p>
      <ul>
        <li>Se almacena en chips de memoria flash EEPROM que se comunican por el bus SPI (Serial Peripheral Interface). Usualmente de 8 pines (como W25Q64 de 8MB o W25Q128 de 16MB) o de 16 pines.</li>
        <li><strong>Fallas comunes por BIOS corrupta:</strong> La placa enciende pero no da video, bucles infinitos de reinicio, ventilador a máxima velocidad de forma inmediata, o cuelgues aleatorios en el logotipo de la marca.</li>
      </ul>

      <h3>2. Programación de BIOS por Hardware</h3>
      <p>Cuando la BIOS está tan dañada que el equipo no arranca, debemos reprogramarla de forma externa:</p>
      <ol>
        <li><strong>Uso de pinza SOIC8:</strong> Permite leer/escribir el chip directamente en la placa sin desoldarlo. <em>¡Precaución!</em> Muchas placas modernas alimentan otros componentes a través de la línea de 3.3V del programador, causando lecturas corruptas o fallas. Es muy recomendable desoldar el chip para una programación 100% segura.</li>
        <li><strong>Programador CH341A:</strong> El más popular y económico. Requiere modificación a 3.3V en algunos modelos de PCB que entregan 5V en las líneas de datos.</li>
        <li><strong>Programadores Profesionales (RT809F, RT809H, SVOD):</strong> Tienen detección automática de pines, soporte para programar el chip del EC (Super I/O) a través del puerto del teclado e interfaces ISP rápidas.</li>
      </ol>

      <h3>3. Limpieza de Región Intel ME (Management Engine)</h3>
      <p>Las BIOS Intel contienen una sección de firmware llamada **Intel ME Region** que maneja la seguridad y funciones de bajo nivel. Está enlazada al PCH y procesador durante el primer arranque.</p>
      <ul>
        <li>Si soldamos una BIOS extraída de otra laptop idéntica (un "dump" sucio), la máquina podría tardar hasta 30 segundos en dar video, apagarse exactamente a los 30 minutos, o no regular las RPM del ventilador. Esto ocurre porque la región ME ya tiene grabada la identidad de la placa original.</li>
        <li><strong>Procedimiento de limpieza:</strong>
          <ol>
            <li>Abrir la BIOS con la herramienta **FIT (Flash Image Tool)** de Intel correspondiente a la generación del procesador.</li>
            <li>Extraer la región ME del archivo binario.</li>
            <li>Reemplazarla por un archivo ME "limpio" (RGN o EXTR) obtenido de la base de datos del fabricante.</li>
            <li>Reconstruir el binario final y programar el chip SPI.</li>
          </ol>
        </li>
      </ul>
    `,
    glossary: [
      { term: "SPI", definition: "Serial Peripheral Interface. Bus de comunicación serie síncrono de 4 hilos utilizado para la transferencia rápida de datos entre el CPU y el chip de BIOS." },
      { term: "Dump", definition: "Copia exacta del contenido de la memoria flash de un dispositivo de almacenamiento volcado a un archivo binario (.bin, .hex o .rom)." },
      { term: "Intel ME (Management Engine)", definition: "Subsistema autónomo integrado en los chipsets Intel que ejecuta su propio sistema operativo de bajo nivel y requiere una sección limpia de firmware para funcionar correctamente en una placa nueva." },
      { term: "Editor Hexadecimal", definition: "Software que permite visualizar y editar los bytes binarios de un archivo en formato hexadecimal (ej. HxD, Neo)." },
      { term: "ISP (In-System Programming)", definition: "Tecnología que permite programar chips integrados directamente en la tarjeta de circuito impreso sin retirarlos del circuito." }
    ],
    quiz: [
      {
        question: "¿Qué síntoma típico presenta una laptop Intel que tiene la región ME sucia o corrupta?",
        options: [
          "No detecta la batería",
          "La pantalla se ve azul y distorsionada",
          "Tarda 30 segundos en dar video o se apaga sola a los 30 minutos de encendida",
          "El disco duro gira en sentido contrario"
        ],
        answer: 2,
        explanation: "La región ME controla temporizadores de seguridad de bajo nivel. Si no está limpia o enlazada correctamente con el PCH, el sistema no se inicializa a tiempo (retardo de video) o se apaga a los 30 minutos por falta de comunicación segura."
      },
      {
        question: "¿Cuál es el voltaje de alimentación estándar de los chips de BIOS modernos en plataformas de bajo consumo (SoC)?",
        options: [
          "5.0V",
          "12.0V",
          "1.8V",
          "19.0V"
        ],
        answer: 2,
        explanation: "Las plataformas modernas de laptop usan memorias flash SPI de bajo consumo que operan a 1.8V (como la serie W25Q64FW) en lugar de los 3.3V tradicionales."
      },
      {
        question: "Al utilizar un programador CH341A para leer un chip de BIOS, ¿qué paso inicial es fundamental para evitar archivos corruptos?",
        options: [
          "Hacer una copia de seguridad (Read & Save) antes de borrar o escribir el chip",
          "Pintar el chip de color negro",
          "Limpiar la placa con agua y jabón",
          "Subir el voltaje de la fuente a 19V"
        ],
        answer: 0,
        explanation: "Nunca se debe escribir un chip sin antes respaldar su contenido actual (dump original). Incluso si está corrupto, puede contener datos vitales de calibración de fábrica (DMI, números de serie, llaves de Windows) que deben transferirse al nuevo archivo."
      },
      {
        question: "¿Qué herramienta oficial de Intel se utiliza para analizar y descomponer las imágenes de BIOS en sus diferentes regiones (BIOS, ME, Descriptor)?",
        options: [
          "Intel FIT (Flash Image Tool)",
          "Intel Extreme Tuning Utility",
          "Notepad++",
          "Windows Device Manager"
        ],
        answer: 0,
        explanation: "Intel FIT (Flash Image Tool) es la herramienta oficial de ingeniería que permite desmontar las imágenes de BIOS completas de Intel para actualizar la región ME."
      },
      {
        question: "¿Qué bus utiliza el programador SVOD para escribir firmware dentro de un controlador de teclado EC sin desoldarlo?",
        options: [
          "A través del conector del teclado (KBC connector) mapeando las líneas correspondientes",
          "Por puerto USB de carga rápida",
          "A través de la tarjeta de red WiFi",
          "Por medio del conector Jack de audio de 3.5mm"
        ],
        answer: 0,
        explanation: "El programador SVOD conecta un cable plano flexible al conector del teclado de la laptop madre y mapea los pines de bus de programación del EC (como ITE o ENE), permitiendo flashearlo directamente."
      }
    ],
    flashcards: [
      { question: "¿Qué contiene el Descriptor de una BIOS Intel?", answer: "La tabla de particiones y mapas de acceso a las distintas regiones de la memoria flash (BIOS, ME, GbE, etc.)." },
      { question: "¿Qué sucede si programamos una BIOS de 1.8V a 3.3V?", answer: "El chip de memoria flash SPI se dañará permanentemente por exceso de tensión térmica y eléctrica." },
      { question: "¿Qué datos del sistema se pierden si no se conserva la región DMI?", answer: "El número de serie del equipo, la clave de activación de Windows (inyectada en placa) y la dirección MAC de red original." },
      { question: "¿Qué hace la opción 'Verify' en el software de programación?", answer: "Compara bit a bit los datos escritos en la memoria flash con el archivo binario original para asegurar una escritura perfecta." },
      { question: "¿Qué es el firmware del EC?", answer: "Código básico que ejecuta el Embedded Controller independiente del CPU para manejar la secuencia física inicial, ventilación y batería." }
    ]
  },
  {
    id: 6,
    title: "QA, Logística y Estandarización de Laboratorio",
    image: "images/micro_soldering.png", // Reused fallback
    objectives: [
      "Diseñar y ejecutar pruebas de estrés térmico rigurosas para CPU y GPU.",
      "Crear listas de chequeo sistemáticas para validación de periféricos (WiFi, batería, puertos).",
      "Utilizar herramientas profesionales de diagnóstico comercial y Linux Live.",
      "Comprender la importancia de la compatibilidad y gestión de Part Numbers OEM.",
      "Establecer flujos estandarizados de validación post-reparación en taller."
    ],
    content: `
      <h3>1. Protocolos de Control de Calidad (QA)</h3>
      <p>Una reparación no termina cuando da video; termina cuando pasa un control de calidad riguroso. Un equipo inestable generará garantías costosas y pérdida de reputación.</p>
      <ul>
        <li><strong>Pruebas de Estrés Térmico:</strong> Ejecutar pruebas combinadas de CPU y GPU a carga máxima por al menos 1 hora (utilizando software como Furmark, Prime95 u OCCT) monitoreando temperaturas. La temperatura estable no debería sobrepasar los 85°C-90°C. Si hay sobrecalentamiento inmediato, hay fallas en la pasta térmica, disipador o ventilador.</li>
        <li><strong>Validación de Puertos y Periféricos:</strong> Comprobación sistemática de todos los puertos USB, HDMI, Jack de audio, lector de tarjetas, teclado completo, trackpad, cámara web, micrófono, conexión WiFi (bandas 2.4/5GHz) y Bluetooth.</li>
      </ul>

      <h3>2. Herramientas de Diagnóstico</h3>
      <ul>
        <li><strong>Petulap / PC-Doctor:</strong> Herramientas industriales que ejecutan diagnósticos a bajo nivel (comprobación de registros del CPU, bus PCIe, sectores de memoria RAM y direccionamientos lógicos).</li>
        <li><strong>C# y Automatización:</strong> Creación de pequeñas utilidades ejecutables que automaticen las pruebas de lectura/escritura en discos, pruebas de teclado y registro de reportes para el cliente.</li>
      </ul>

      <h3>3. Gestión de Part Numbers OEM</h3>
      <p>En el soporte multimarca, la compatibilidad física no garantiza la compatibilidad electrónica:</p>
      <ul>
        <li>Las pantallas de laptops usan Part Numbers específicos (ej. LP156WF6). Instalar una pantalla con conector compatible pero sin la EEPROM (EDID) programada adecuadamente para esa marca puede causar que la laptop no regule el brillo o no dé video.</li>
        <li>Las placas de laptops tienen revisiones (ej. LA-A991P Rev 1.0 vs Rev 2.0). Es mandatorio verificar el Part Number de la placa para buscar esquemas o repuestos de componentes compatibles de forma inequívoca.</li>
      </ul>
    `,
    glossary: [
      { term: "QA", definition: "Quality Assurance (Control de Calidad). Procesos sistemáticos para verificar si un producto reparado cumple con los requerimientos de fiabilidad del fabricante." },
      { term: "EDID", definition: "Extended Display Identification Data. Formato de datos estándar de VESA que contiene información sobre las capacidades de la pantalla, almacenado en una EEPROM del panel." },
      { term: "Part Number (P/N)", definition: "Código alfanumérico único asignado por el fabricante OEM para identificar una pieza o componente electrónico de forma precisa." },
      { term: "Estrés Térmico", definition: "Someter los procesadores del equipo a máxima carga de cálculo para elevar la temperatura al límite seguro y verificar la estabilidad del sistema de disipación." },
      { term: "Garantía de Reparación", definition: "Período durante el cual el taller asume el costo de fallas recurrentes en el componente reparado, minimizado mediante protocolos QA estrictos." }
    ],
    quiz: [
      {
        question: "¿Cuál es el tiempo mínimo recomendado para realizar una prueba de estrés de temperatura en un equipo de alto rendimiento reparado?",
        options: [
          "5 minutos",
          "Entre 30 y 60 minutos con monitoreo continuo",
          "24 horas seguidas a máxima temperatura sin parar",
          "No es necesario hacer pruebas térmicas"
        ],
        answer: 1,
        explanation: "Una prueba de estrés de 30 a 60 minutos permite que la temperatura interna del disipador de calor y de la carcasa de la laptop se estabilicen por completo, mostrando fallas térmicas reales que no aparecen en pruebas rápidas."
      },
      {
        question: "Al reemplazar una pantalla de laptop, ¿qué datos lee la placa base para regular el brillo y habilitar el video de forma nativa?",
        options: [
          "El código de barras impreso",
          "El chip EDID grabado en la EEPROM de la propia pantalla",
          "El controlador de red inalámbrica",
          "El sistema de archivos de Windows"
        ],
        answer: 1,
        explanation: "La BIOS de la laptop lee los metadatos de visualización almacenados en la EEPROM EDID integrada en el circuito de la pantalla para ajustar la resolución, brillo y perfiles térmicos."
      },
      {
        question: "Estás buscando repuestos para una tarjeta madre dañada marca Lenovo. ¿Cuál es el identificador en el cual debes basar tu búsqueda?",
        options: [
          "El color de la máscara de soldadura (azul/verde)",
          "El código OEM de la placa madre (ej: NM-A273) grabado en el PCB",
          "El modelo comercial de la laptop impreso en la tapa",
          "La marca del ventilador extractor"
        ],
        answer: 1,
        explanation: "Lenovo comercializa placas NM-A273 o similares en diferentes modelos de laptops. Identificar el código de ingeniería exacto grabado directamente en el PCB garantiza compatibilidad total."
      },
      {
        question: "¿Qué software es ideal para realizar pruebas de estrés gráfico intensivas en componentes de GPU reparados?",
        options: [
          "Microsoft Word",
          "Furmark o 3DMark",
          "Notepad",
          "Google Chrome"
        ],
        answer: 1,
        explanation: "Furmark y 3DMark son programas diseñados para renderizar gráficos tridimensionales complejos de alta exigencia, obligando a la GPU a operar al 100% de su capacidad eléctrica y térmica."
      },
      {
        question: "¿Qué valida la prueba de ciclo de carga y descarga de la batería en un protocolo QA?",
        options: [
          "Únicamente el color del LED de carga",
          "Que el circuito integrado de carga (Charger IC) detecte y cargue la batería linealmente y que esta mantenga la autonomía esperada sin apagados abruptos",
          "El tamaño de la batería",
          "El número de celdas internas únicamente"
        ],
        answer: 1,
        explanation: "Monitorear un ciclo completo asegura que no haya celdas defectuosas que causen caídas rápidas de voltaje o que impidan la transición correcta del cargador a la batería."
      }
    ],
    flashcards: [
      { question: "¿Qué es el 'Thermal Throttling'?", answer: "Mecanismo de seguridad de los procesadores que disminuye su frecuencia de reloj para reducir la temperatura si esta supera el límite crítico (~100°C)." },
      { question: "¿Qué mide la utilidad MemTest86?", answer: "Realiza pruebas de patrones de escritura/lectura en la RAM para detectar celdas corruptas que generen Pantallas Azules (BSOD)." },
      { question: "¿Qué es el código DMI?", answer: "Direct Media Interface (en contexto de BIOS: Desktop Management Interface). Sección que guarda configuraciones y seriales del equipo del cliente." },
      { question: "¿Por qué se valida el puerto HDMI?", answer: "Para asegurar que las líneas de comunicación DDC del puente gráfico y de video externo estén operativas tras reparar soldaduras en BGA." },
      { question: "¿Para qué sirve un reporte de QA?", answer: "Documento que certifica que el equipo ha superado todas las pruebas estandarizadas, ofreciendo transparencia y reduciendo reclamos por garantía." }
    ]
  },
  {
    id: 7,
    title: "VRM y Regulación de Voltaje",
    image: "images/buck_converter.png", // Reused fallback
    objectives: [
      "Analizar el funcionamiento y ventajas de la arquitectura VRM multipase.",
      "Identificar y testear PWM Controllers y MOSFETs de High-Side y Low-Side.",
      "Comprender el ripple de voltaje, la frecuencia de conmutación y el lazo de retroalimentación (feedback loop).",
      "Diagnosticar fallas lógicas y eléctricas en rieles de CPU VCORE y GPU_CORE.",
      "Reemplazar MOSFETs y controladores PWM en zonas de alta temperatura y masa de cobre."
    ],
    content: `
      <h3>1. Arquitectura VRM Multipase</h3>
      <p>El procesador de una laptop requiere voltajes bajos (~0.8V a 1.2V) pero corrientes inmensas (hasta 100A o más bajo carga). Una sola fuente conmutada Buck simple se quemaría por exceso de temperatura. Para solucionar esto se utiliza la **arquitectura multifase**:</p>
      <ul>
        <li>El sistema divide el trabajo en múltiples canales o "fases" en paralelo operadas por un único chip controlador PWM central.</li>
        <li>Cada fase consta de su propia bobina y su propio par de MOSFETs (High-Side y Low-Side).</li>
        <li>El controlador PWM activa las compuertas (Gates) de forma desfasada (por ejemplo, desfasados 120° en un sistema de 3 fases). Esto reduce el rizado de voltaje (ripple) de salida y reparte el calor disipado uniformemente en la placa.</li>
      </ul>

      <h3>2. Transistores High-Side y Low-Side</h3>
      <p>En cada fase del regulador Buck:</p>
      <ul>
        <li><strong>MOSFET de High-Side (Lado Alto):</strong> Conectado directamente a la línea principal de 19V en su Drain. Se encarga de dejar pasar pulsos rápidos de 19V hacia el nodo común. Su Gate recibe señales de alta frecuencia.</li>
        <li><strong>MOSFET de Low-Side (Lado Bajo):</strong> Conectado a tierra (GND) en su Source. Actúa como diodo de libre circulación o rectificador síncrono. Cuando el High-Side se apaga, el Low-Side se enciende para cerrar el circuito y permitir que la energía almacenada en la bobina siga fluyendo hacia el CPU. Su Drain está conectado al nodo común de la bobina.</li>
      </ul>

      <h3>3. Diagnóstico de Fallas en VRM</h3>
      <p>El síntoma más común de falla en el VRM es una laptop que enciende 1 segundo y se apaga (protección contra sobrecorriente, OCP) o que no enciende en absoluto con consumo en fuente de laboratorio que sube inmediatamente al máximo (cortocircuito directo):</p>
      <ol>
        <li><strong>Corto en MOSFET de High-Side:</strong> Al entrar en cortocircuito entre Drain y Source, los 19V de entrada pasan directamente al procesador. La protección de sobrevoltaje (OVP) del PWM apaga el sistema de inmediato para intentar salvar el CPU, pero usualmente el chip CPU muere instantáneamente. Al medir resistencia en la bobina de VCORE, dará 0Ω a tierra. Y al medir entre la bobina y la línea de 19V, también dará 0Ω.</li>
        <li><strong>Fallas de Driver o PWM:</strong> Si el integrado de control está dañado o no recibe alimentación (VCC), no emitirá las señales PWM en los Gates de los MOSFETs, resultando en ausencia total de voltaje VCORE en las bobinas.</li>
      </ol>
    `,
    glossary: [
      { term: "Multiphase Buck Converter", definition: "Circuito convertidor de voltaje DC-DC que utiliza múltiples etapas de conmutación en paralelo y desfasadas para entregar alta corriente con bajo rizado." },
      { term: "Ripple (Rizado)", definition: "La variación residual de voltaje continuo (CA superpuesta) generada por el proceso de conmutación en fuentes Buck." },
      { term: "High-Side MOSFET", definition: "Transistor de potencia conectado al voltaje de entrada alto. Controla la fase de inyección de corriente al inductor." },
      { term: "Low-Side MOSFET", definition: "Transistor de potencia conectado a tierra. Permite el retorno y continuidad del flujo de corriente en el inductor cuando el High-Side está abierto." },
      { term: "Feedback Loop (Lazo de Realimentación)", definition: "Línea de señal analógica que devuelve una porción del voltaje de salida al controlador PWM para que este ajuste dinámicamente el ancho de pulso." }
    ],
    quiz: [
      {
        question: "Si el MOSFET de High-Side de una de las fases del procesador entra en cortocircuito entre Drain y Source, ¿qué voltaje se expone en la bobina?",
        options: [
          "0V",
          "1.2V",
          "19V (el voltaje de entrada principal)",
          "5V"
        ],
        answer: 2,
        explanation: "Al dañarse el MOSFET de High-Side y quedar en cortocircuito directo (cerrado permanentemente), el riel de entrada de 19V se conecta físicamente a la bobina, inyectando sobrevoltaje masivo al CPU."
      },
      {
        question: "¿Por qué el rizo de voltaje (ripple) disminuye al añadir fases al VRM del CPU?",
        options: [
          "Porque los MOSFETs son más grandes",
          "Debido a que las fases conmutan desfasadas en el tiempo, cancelando parte de la ondulación de salida",
          "Porque se filtra el voltaje con resistencias de alto valor",
          "Porque el procesador consume menos energía"
        ],
        answer: 1,
        explanation: "La conmutación desfasada (interleaving) hace que las crestas y valles de corriente de cada fase se sumen y solapen, resultando en una corriente de salida promedio mucho más lineal y estable."
      },
      {
        question: "¿Cómo detectamos un MOSFET de VRM en cortocircuito sin desoldarlo?",
        options: [
          "Midiendo resistencia en frío entre Source y Drain. Si da un valor extremadamente bajo (~0Ω) en ambas direcciones, está dañado",
          "Midiendo el color de su encapsulado",
          "Encendiendo el equipo por 3 horas seguidas",
          "Midiendo voltaje alterno con el osciloscopio en el botón de encendido"
        ],
        answer: 0,
        explanation: "Un transistor en buen estado muestra resistencia infinita (o muy alta) entre Drain y Source sin señal de excitación en el Gate. Un valor de ~0Ω es prueba inequívoca de cortocircuito interno por sobrecarga térmica/eléctrica."
      },
      {
        question: "¿Qué pin del circuito integrado PWM de CPU VCORE es responsable de monitorear en tiempo real el voltaje de salida para ajustarlo?",
        options: [
          "El pin VIN de alimentación",
          "El pin FB (Feedback) / VOUT_SENSE",
          "El pin de GND de tierra",
          "El pin de comunicación I2C"
        ],
        answer: 1,
        explanation: "El pin FB (Feedback) lee directamente el voltaje final de salida. Si el voltaje decae por alta carga del CPU, el chip PWM aumenta la duración del pulso (Duty Cycle) para compensar y estabilizar la tensión."
      },
      {
        question: "Durante la soldadura de un MOSFET de VRM grande, ¿por qué es tan difícil retirar el componente con aire caliente?",
        options: [
          "Porque la soldadura está sucia",
          "Debido a que el plano de masa de cobre masivo de la placa madre absorbe y disipa el calor de la herramienta rápidamente",
          "Porque los pines del transistor son de plástico",
          "Porque el flux enfría el estaño en segundos"
        ],
        answer: 1,
        explanation: "Las áreas de VRM usan planos internos de cobre muy gruesos para manejar altas corrientes. Estos planos actúan como disipadores de calor gigantescos. Se requiere precalentar la placa o usar un cautín de alta potencia en combinación con aire caliente."
      }
    ],
    flashcards: [
      { question: "¿Qué es el ciclo de trabajo (Duty Cycle)?", answer: "La proporción de tiempo que un transistor conmutador está encendido en comparación con el período total de encendido/apagado." },
      { question: "¿Qué es la modulación síncrona?", answer: "Uso de un MOSFET como rectificador en lugar de un diodo Schottky en el lado de baja para reducir pérdidas por caída de tensión." },
      { question: "¿Cómo se protege el procesador de sobrecorriente?", answer: "El chip PWM lee la caída de tensión en los MOSFETs (Rds_on) o en una resistencia de medición y apaga el circuito si la corriente excede el límite." },
      { question: "¿Qué rango de frecuencia es normal en el VRM de un CPU moderno?", answer: "Suele operar a frecuencias de conmutación muy altas, entre 300 kHz y 1.2 MHz por fase." },
      { question: "¿Qué síntoma da una bobina de VRM rota o desoldada?", answer: "Falta una fase en la regulación. La placa puede no dar video por inestabilidad de voltaje o colapsar inmediatamente bajo cargas pesadas." }
    ]
  },
  {
    id: 8,
    title: "USB-C y Power Delivery",
    image: "images/usbc_power_delivery.png",
    objectives: [
      "Comprender la arquitectura física y los terminales del conector USB Type-C.",
      "Analizar la lógica de negociación en el estándar USB-PD (Power Delivery).",
      "Identificar y medir el rol de las líneas CC1 y CC2 en la detección de orientación del cable.",
      "Diagnosticar fallas lógicas de no carga o bloqueo de voltaje en puertos USB-C.",
      "Utilizar instrumental específico como medidores USB-C y placas de Trigger de voltaje."
    ],
    content: `
      <h3>1. Arquitectura del Conector USB-C</h3>
      <p>A diferencia de los conectores USB antiguos, el USB-C es reversible gracias a su disposición simétrica de pines en dos filas (A y B) con 24 pines en total:</p>
      <ul>
        <li><strong>VBUS (A4, A9, B4, B9):</strong> Riel de alimentación principal. En reposo entrega 5V. Puede negociarse hasta 20V (en laptops) o 48V (bajo estándar USB-PD EPR moderno) con corrientes de hasta 5A.</li>
        <li><strong>GND (A1, A12, B1, B12):</strong> Retorno de masa de potencia.</li>
        <li><strong>CC1 y CC2 (A5, B5 - Configuration Channel):</strong> Los pines más importantes para el técnico. Se usan para detectar la orientación del cable, detectar la conexión del dispositivo y negociar los perfiles de voltaje de Power Delivery.</li>
        <li><strong>D+ y D- (A6, A7, B6, B7):</strong> Líneas de datos USB 2.0 heredadas.</li>
        <li><strong>TX y RX:</strong> Canales diferenciales de alta velocidad para USB 3.x / Thunderbolt / DisplayPort Alt Mode.</li>
      </ul>

      <h3>2. Negociación USB Power Delivery (USB-PD)</h3>
      <p>Por seguridad, los cargadores USB-C entregan inicialmente solo <strong>5V a 0.5A/3A</strong>. Una laptop no puede encenderse o cargar su batería con 5V de forma eficiente. Requiere 20V. El proceso de negociación es el siguiente:</p>
      <ol>
        <li>El cargador se conecta a la laptop. Se establece una conexión física y el cargador detecta una resistencia de pull-down (Rd, normalmente 5.1kΩ) en uno de los pines CC de la placa.</li>
        <li>Esto le dice al cargador en qué dirección está insertado el cable y que hay un dispositivo que consume energía (Sink). El cargador activa los 5V en VBUS.</li>
        <li>El controlador de USB-PD de la laptop (ej. chip TPS65982 o CD3215 en MacBooks) y el cargador inician comunicación digital por el pin CC activo, usando codificación BMC (Biphase Mark Coding).</li>
        <li>El cargador envía una lista de sus capacidades de potencia (ej. 5V@3A, 9V@3A, 15V@3A, 20V@3.25A para un cargador de 65W).</li>
        <li>El controlador USB-PD de la laptop selecciona el perfil adecuado (20V) y solicita la transición.</li>
        <li>El cargador eleva el voltaje en VBUS a 20V y el EC de la laptop habilita los MOSFET de entrada de carga principal.</li>
      </ol>

      <h3>3. Diagnóstico de Puertos USB-C</h3>
      <ul>
        <li><strong>Equipo atascado en 5V:</strong> Si al conectar el cargador con un multímetro USB-C en serie observamos 5V con consumo nulo o muy bajo (~10-30mA), significa que la negociación digital falló. El chip controlador de USB-PD puede estar dañado, quemado, no tener alimentación LDO propia, o las líneas CC1/CC2 pueden estar en cortocircuito por ESD (descargas estáticas del usuario al conectar el cable).</li>
        <li><strong>Corto en VBUS:</strong> Si al conectar la fuente de laboratorio a través de una placa de prueba USB-C el consumo es máximo, hay un corto en los capacitores cerámicos de entrada del puerto.</li>
      </ul>
    `,
    glossary: [
      { term: "USB-PD", definition: "USB Power Delivery. Protocolo estándar de carga que permite negociar voltajes elevados de hasta 240W sobre cables y conectores tipo C." },
      { term: "Configuration Channel (CC)", definition: "Pines físicos del puerto USB-C que permiten la detección de orientación, rol y transmisión de datos de control de carga." },
      { term: "BMC Coding", definition: "Biphase Mark Coding. Tipo de codificación de señal en serie a nivel físico utilizada para transmitir los paquetes de datos del protocolo Power Delivery sobre el canal CC." },
      { term: "USB-C Trigger Board", definition: "Herramienta de diagnóstico que engaña al cargador simulando la presencia de una laptop para forzar la entrega de un perfil de voltaje fijo (ej. 20V)." },
      { term: "Diodos ESD de Protección", definition: "Componentes semiconductores rápidos colocados en paralelo en las líneas de datos y CC del puerto USB-C para desviar sobretensiones estáticas a tierra." }
    ],
    quiz: [
      {
        question: "Al conectar una laptop funcional a un cargador USB-C original, el multímetro de prueba marca 5V con consumo de 0A. ¿Qué etapa ha fallado?",
        options: [
          "La regulación del disipador de calor",
          "La negociación lógica del protocolo Power Delivery sobre las líneas CC",
          "El circuito de la tarjeta gráfica discreta",
          "La BIOS de red inalámbrica"
        ],
        answer: 1,
        explanation: "Si el voltaje se queda en 5V y no sube a 20V, significa que el chip controlador USB-PD de la placa no pudo negociar con el cargador. Esto evita que se habiliten los MOSFETs de entrada hacia los rieles de potencia internos."
      },
      {
        question: "¿Qué resistencia interna debe tener implementada la laptop en sus pines CC a tierra para que el cargador detecte su conexión?",
        options: [
          "5.1 kΩ (Rd)",
          "1 MΩ",
          "0 ohmios (corto directo)",
          "100 kΩ"
        ],
        answer: 0,
        explanation: "El estándar USB Type-C define que el dispositivo de consumo (Sink) debe presentar una resistencia de pulso descendente (Rd) de 5.1kΩ a tierra en las líneas CC para avisar que está presente."
      },
      {
        question: "¿Para qué sirve un cable de prueba 'USB-C Breakout Board'?",
        options: [
          "Para convertir una laptop en un teléfono inteligente",
          "Para exponer físicamente los pines internos del conector USB-C facilitando la medición con multímetro en modo diodo",
          "Para aumentar la velocidad de transferencia del disco duro",
          "Para puentear de forma destructiva la línea de 19V a tierra"
        ],
        answer: 1,
        explanation: "La placa breakout expone físicamente cada uno de los 24 terminales inaccesibles del conector tipo C, permitiendo al técnico medir impedancias a tierra en líneas CC, VBUS y datos para diagnosticar fallas de soldadura o cortocircuitos."
      },
      {
        question: "¿Qué componente suele dañarse con mayor frecuencia en las líneas CC1/CC2 debido a estática al tocar el puerto?",
        options: [
          "El microprocesador central",
          "Los diodos de protección contra descargas electrostáticas (ESD)",
          "La pila del sistema RTC",
          "El conector de la pantalla LCD"
        ],
        answer: 1,
        explanation: "Los diodos ESD están diseñados para sacrificarse absorbiendo las descargas estáticas del exterior para proteger los costosos circuitos internos de la placa. Al quemarse, entran en corto a tierra."
      },
      {
        question: "¿Qué voltaje inicial entrega un cargador USB-C antes de que empiece cualquier tipo de negociación digital?",
        options: [
          "0V, por seguridad absoluta",
          "5V",
          "15V",
          "20V"
        ],
        answer: 1,
        explanation: "El puerto USB-C entrega un voltaje inicial de standby de 5V una vez que detecta físicamente la resistencia Rd de 5.1kΩ de la placa, antes de comenzar la comunicación del protocolo PD."
      }
    ],
    flashcards: [
      { question: "¿Cuántos pines tiene un conector USB-C?", answer: "Tiene 24 pines distribuidos en dos filas simétricas de 12 (A1-A12 y B1-B12)." },
      { question: "¿Cómo sabe el cargador qué pin CC medir?", answer: "Al insertar el cable, solo uno de los dos pines CC (CC1 o CC2) del puerto se conecta al cable físico; el otro se convierte en VCONN para alimentar accesorios activos." },
      { question: "¿Qué hace un chip multiplexor (Mux) en USB-C?", answer: "Conmutar dinámicamente las líneas de datos de alta velocidad (TX/RX) dependiendo del lado en el que se haya introducido el cable reversible." },
      { question: "¿Qué es el perfil 'PPS' en Power Delivery?", answer: "Programmable Power Supply. Permite ajustes finos paso a paso de voltaje (ej. en pasos de 20mV) y corriente para reducir pérdidas por calor al cargar la batería." },
      { question: "¿Qué es el bus BMC?", answer: "Biphase Mark Coding. Método de transmisión de un solo hilo que integra datos y reloj de sincronización para controlar la negociación USB-PD." }
    ]
  },
  {
    id: 9,
    title: "BGA y Reparaciones Avanzadas",
    image: "images/bga_reballing.png",
    objectives: [
      "Comprender la diferencia metalúrgica e industrial entre procesos de Reflow y Reballing.",
      "Identificar y evitar fallas térmicas críticas como delaminación e imperfecciones mecánicas (cold joints).",
      "Calcular y programar perfiles térmicos precisos en soldadura BGA.",
      "Operar de forma segura precalentadores (preheaters) y termopares de monitoreo.",
      "Diagnosticar fallas complejas de comunicación en soldaduras bajo procesadores GPU y CPU."
    ],
    content: `
      <h3>1. Arquitectura BGA (Ball Grid Array)</h3>
      <p>Los chips de alta densidad como el CPU, GPU y el PCH no tienen patas en los costados. Se conectan a la placa mediante una matriz de esferas de soldadura diminutas en su parte inferior (BGA). Esto permite cientos de conexiones eléctricas en un área pequeña.</p>
      <ul>
        <li><strong>Falla térmica típica:</strong> Con los ciclos constantes de calentamiento y enfriamiento (dilatación y contracción), las esferas de soldadura debajo del chip sufren fatiga mecánica, agrietándose. Esto genera falsos contactos eléctricos (soldadura fría) que provocan que la máquina no dé video, no detecte la RAM o tenga pantallas azules constantes.</li>
      </ul>

      <h3>2. Reflow vs Reballing</h3>
      <ul>
        <li><strong>Reflow (Refusión):</strong> Consiste en aplicar flux y calentar el chip BGA hasta derretir las esferas existentes para que hagan contacto de nuevo. <strong>¡Es una reparación temporal y de mala calidad!</strong> La soldadura agrietada ya está oxidada y se volverá a romper en pocas semanas o meses. Solo se debe usar como prueba de diagnóstico rápido.</li>
        <li><strong>Reballing (Reesferado):</strong> Es la única solución profesional. Consiste en retirar el chip de la placa usando una estación Rework BGA, remover toda la soldadura vieja oxidada tanto de la placa como del chip, colocar esferas nuevas de soldadura (usualmente de plomo 63/37 para dar flexibilidad ante esfuerzos térmicos) usando una plantilla metálica (stencil) y volver a soldar el chip en la placa.</li>
      </ul>

      <h3>3. Perfiles Térmicos de Soldadura</h3>
      <p>Para desoldar y soldar un chip BGA sin destruir la placa base (pandeo o arqueamiento del PCB) o el propio silicio, se debe seguir una curva térmica controlada por computadora dividida en 4 fases principales:</p>
      <ol>
        <li><strong>Precalentamiento (Preheat):</strong> Se eleva la temperatura de toda la placa de forma lenta (Rampa de ~1°C a 2°C por segundo) usando el precalentador inferior (preheater) hasta unos 120°C - 150°C. Esto elimina la humedad interna del PCB y evita choques térmicos destructivos.</li>
        <li><strong>Activación del Flux (Soak / Remojo):</strong> Se mantiene la temperatura por 60-90 segundos para permitir que el flux penetre y active su limpieza química.</li>
        <li><strong>Refusión (Reflow / Peak):</strong> Se aplica calor por la parte superior (Top Heater) hasta alcanzar el punto de fusión de las esferas (220°C para sin plomo, 183°C con plomo) superándolo por unos 20°C a 30°C (temperatura pico de ~235°C a 245°C) por no más de 30-40 segundos para que todas las esferas se licúen y se unan.</li>
        <li><strong>Enfriamiento (Cooling):</strong> Se reduce la temperatura de forma controlada para formar una estructura cristalina sólida y resistente en la soldadura.</li>
      </ol>

      <h3>4. Riesgo de Delaminación (Efecto Popcorn)</h3>
      <p>Si la placa base o el chip BGA han estado almacenados en ambientes húmedos, el agua microscópica atrapada dentro de las capas de resina epoxi del PCB se evaporará instantáneamente al calentarse a más de 200°C. Esto expande las capas internas de forma explosiva, generando burbujas en el chip o deformando las pistas internas, destruyendo la placa por completo. Para evitar esto, las placas deben pasar por un proceso de <strong>deshumidificación (baking)</strong> en un horno a 100°C - 120°C durante 12-24 horas antes de aplicar calor BGA.</p>
    `,
    glossary: [
      { term: "BGA", definition: "Ball Grid Array (Matriz de Rejilla de Bolas). Encapsulado de montaje superficial que utiliza esferas de soldadura conductoras en su base en lugar de pines metálicos tradicionales." },
      { term: "Delaminación", definition: "Separación física de las capas internas de fibra de vidrio y cobre de un circuito impreso multicapa debido a la expansión violenta de humedad." },
      { term: "Preheater (Precalentador)", definition: "Elemento calefactor de infrarrojos o aire caliente colocado debajo de la placa madre para calentar uniformemente el área circundante antes del soldado superior." },
      { term: "Stencil (Plantilla BGA)", definition: "Lámina metálica perforada con láser con el patrón exacto de contactos del chip, utilizada para alinear y colocar las esferas de soldadura líquida o sólida en el chip." },
      { term: "Termopar (Thermocouple)", definition: "Sensor térmico compuesto por dos metales distintos que genera un voltaje proporcional a la temperatura en su unión. Se coloca tocando la placa junto al chip para monitorear el perfil térmico en tiempo real." }
    ],
    quiz: [
      {
        question: "¿Por qué el proceso de Reflow no es considerado una solución profesional o definitiva para fallas de soldadura en chips BGA?",
        options: [
          "Porque el flux de pino quema el chip",
          "Porque no retira la soldadura oxidada ni fatigada térmicamente, haciendo que la fisura vuelva a aparecer rápidamente",
          "Porque el osciloscopio no puede calibrarlo",
          "Porque es ilegal en talleres domésticos"
        ],
        answer: 1,
        explanation: "El reflow simplemente vuelve a derretir el estaño agrietado y oxidado que ya ha perdido sus propiedades mecánicas. Las impurezas y óxidos remanentes garantizan que la unión física colapse rápidamente de nuevo."
      },
      {
        question: "¿Cuál es el propósito principal del precalentador inferior (preheater) en una estación de Rework BGA?",
        options: [
          "Iluminar la zona inferior de la placa",
          "Enfriar la placa rápidamente",
          "Calentar de forma lenta y uniforme toda la tarjeta para evitar que el PCB se doble por diferencias de dilatación térmica",
          "Derretir los componentes plásticos no deseados"
        ],
        answer: 2,
        explanation: "Si calentamos solo la parte superior del PCB con aire caliente a 250°C, esa cara se expandirá mientras que la inferior fría no lo hará, curvando y rompiendo las pistas internas de la placa madre multicapa. El precalentador inferior equilibra la temperatura total."
      },
      {
        question: "¿Qué fenómeno físico genera burbujas destructivas en el encapsulado del chip si este absorbió humedad antes del proceso BGA?",
        options: [
          "La ley de Ampere",
          "El efecto 'Popcorn' (Delaminación por ebullición del agua atrapada)",
          "La inducción magnética del disipador",
          "El efecto Hall"
        ],
        answer: 1,
        explanation: "Al calentar el chip por encima del punto de ebullición del agua, la humedad microscópica interna se convierte en vapor a presión, inflando y separando las capas plásticas y de silicio del chip (efecto palomita de maíz)."
      },
      {
        question: "¿Qué aleación metálica es recomendada por los técnicos para realizar reballing manual debido a su flexibilidad mecánica y menor punto de fusión?",
        options: [
          "Estaño puro al 100%",
          "Plata y Cobre sin plomo (SAC305)",
          "Estaño con Plomo (63/37 Sn/Pb)",
          "Aluminio líquido"
        ],
        answer: 2,
        explanation: "La soldadura con plomo 63/37 funde a 183°C (menor estrés térmico sobre el chip) y es mucho más dúctil y elástica que la soldadura ecológica libre de plomo, tolerando mejor las flexiones físicas de la laptop."
      },
      {
        question: "Durante la fase Peak (Pico) de un perfil de soldadura BGA sin plomo, ¿a qué temperatura máxima aproximada debe llegar la soldadura bajo el chip?",
        options: [
          "150°C",
          "183°C",
          "235°C - 245°C",
          "400°C"
        ],
        answer: 2,
        explanation: "La soldadura libre de plomo funde a los 217°C. Para garantizar que todas las esferas de la matriz BGA se fundan y fusionen uniformemente, la temperatura del termopar de control debe alcanzar un pico de 235°C a 245°C durante un breve lapso."
      }
    ],
    flashcards: [
      { question: "¿Qué es el 'Underfill'?", answer: "Resina epoxi termoestable inyectada bajo los chips BGA de fábrica para absorber impactos mecánicos y proteger las soldaduras de la humedad." },
      { question: "¿Qué hace la rampa de temperatura?", answer: "La velocidad de incremento de calor medida en grados por segundo (°C/s) para evitar choques térmicos destructivos." },
      { question: "¿Para qué sirve el horneado (baking)?", answer: "Proceso de calentar placas y chips a baja temperatura (~100°C) por muchas horas para evaporar la humedad acumulada de forma segura antes del soldado." },
      { question: "¿Qué indica cuando un chip BGA 'flota' en la fase de reflow?", answer: "Significa que todas las esferas de soldadura debajo del chip se han licuado completamente, permitiendo un leve toque físico para que se auto-alinee por tensión superficial." },
      { question: "¿Cómo se limpia el estaño residual de los pads BGA en la placa?", answer: "Aplicando flux, usando un cautín con punta ancha de cuchilla y arrastrando suavemente malla de cobre desoldadora sobre la matriz." }
    ]
  },
  {
    id: 10,
    title: "Casos Reales de Laboratorio y Metodología",
    image: "images/lab_diagnostic.png",
    objectives: [
      "Desarrollar un mapa lógico de diagnóstico para laptops con falla de 'No Enciende' (No Power).",
      "Diagnosticar fallas de 'Enciende sin Video' o reinicios en bucle.",
      "Identificar y aislar cortocircuitos en la línea principal de 19V y rieles del CPU VCORE.",
      "Resolver problemas complejos de corrupción de firmware de BIOS y fallas de carga de batería.",
      "Estructurar un protocolo sistemático de reparación para optimizar tiempos en laboratorio."
    ],
    content: `
      <h3>1. Falla Común: Laptop no enciende (No Power)</h3>
      <p>El equipo no presenta actividad de luces, consumo nulo en fuente de laboratorio. Metodología de diagnóstico:</p>
      <ol>
        <li><strong>Inspección visual:</strong> Buscar daños físicos, corrosión por humedad o componentes quemados.</li>
        <li><strong>Medición del Jack de Entrada y MOSFET de Entrada:</strong> Medir si llegan los 19V al primer MOSFET. Si entran 19V en el Drain pero salen 0V en el Source, verificar el Gate. Si el Gate está a 19V (canal N), el MOSFET está apagado. Verificar si el integrado de carga está alimentado y emite ACDRV / ACOK.</li>
        <li><strong>Verificación de rieles ALWAYS:</strong> Medir las bobinas de 3.3V ALW y 5V ALW. Si no hay voltajes, medir impedancia a tierra en esas bobinas. Si la resistencia es alta, el integrado PWM de standby podría estar dañado o sin alimentación (VIN).</li>
        <li><strong>Alimentación del EC:</strong> Verificar que el Embedded Controller reciba 3.3V en sus pines VCC (provenientes del LDO VREG3) y que tenga su señal de reset correcta.</li>
      </ol>

      <h3>2. Falla Común: Enciende pero no da video</h3>
      <p>Los ventiladores giran, los LEDs encienden, pero la pantalla permanece negra.</p>
      <ul>
        <li><strong>Paso 1: Medir todos los rieles lógicos.</strong> Verificar voltaje de memoria RAM, PCH, y especialmente CPU VCORE. Si falta alguno, el POST se detendrá en ese punto.</li>
        <li><strong>Paso 2: Verificar señal de Reset (PLTRST#).</strong> Debe medir 3.3V. Si mide 0V, el procesador está en reset eterno y nunca leerá la BIOS.</li>
        <li><strong>Paso 3: Actividad en BIOS SPI.</strong> Usar el osciloscopio en el Pin 2 (Data Out) al encender la placa. Si se observan ondas digitales, el CPU está intentando arrancar y leer la BIOS. Si el bus permanece en 3.3V constantes sin pulsos, reprogramar la BIOS es el paso recomendado.</li>
        <li><strong>Paso 4: Memoria RAM y Pantalla.</strong> Probar con módulos RAM de prueba conocidos en buen estado. Probar salida de video externo por puerto HDMI para descartar falla en el circuito de retroiluminación (Backlight) de la pantalla interna.</li>
      </ul>

      <h3>3. Cortocircuitos en Línea Principal de 19V</h3>
      <p>Al conectar la fuente de laboratorio a la placa, esta se protege inmediatamente por consumo máximo (CC/CV activa con corriente a tope):</p>
      <ul>
        <li>Se debe al daño de un capacitor cerámico de filtrado (se vuelven conductores al fracturarse) o un MOSFET perforado.</li>
        <li><strong>Diagnóstico:</strong> Medir resistencia a tierra en la resistencia de censado de corriente principal (resistencia de bajo valor óhmico PR, de unos 0.01Ω, ubicada justo después de los MOSFETs de entrada). Si da ~0Ω, el corto está en la línea principal. Inyectar 1.0V con límite de 2A en esa resistencia de censado y buscar el componente que se calienta en la placa madre usando rosin o cámara térmica.</li>
      </ul>
    `,
    glossary: [
      { term: "OCP", definition: "Over Current Protection. Protección contra sobrecorriente implementada en fuentes y chips lógicos para apagar el sistema ante aumentos desmedidos de corriente." },
      { term: "OVP", definition: "Over Voltage Protection. Protección contra sobretensiones que desconecta los rieles de potencia si el voltaje excede el nivel seguro." },
      { term: "PR (Power Resistor)", definition: "Prefijo de nomenclatura esquemática utilizado para identificar resistencias críticas en los circuitos de regulación de potencia." },
      { term: "Backlight", definition: "Circuito de retroiluminación LED de la pantalla LCD. Opera con voltajes elevados (~19V para alimentación y ~3V a 40V de salida en el driver LED)." },
      { term: "POST (Power On Self Test)", definition: "Rutina automática de diagnóstico ejecutada por la BIOS al encender para comprobar que el CPU, la RAM y los componentes principales operen adecuadamente." }
    ],
    quiz: [
      {
        question: "Al conectar el cargador, el multímetro de la fuente muestra un consumo de 0.005A (5mA) y el equipo no enciende. ¿Qué nos indica este consumo tan bajo?",
        options: [
          "Que hay un cortocircuito absoluto en la línea de 19V",
          "Que el consumo está en rango normal de standby (S5) y la alimentación básica del EC probablemente funciona",
          "Que el procesador está corriendo a máxima capacidad",
          "Que la pantalla LCD consume demasiada corriente"
        ],
        answer: 1,
        explanation: "Un consumo de 5mA a 20mA es el comportamiento normal y saludable de una placa en estado de apagado (S5). Indica que la línea de 19V está activa y las fuentes LDO de standby operan sin cortocircuitos pesados."
      },
      {
        question: "Estás buscando un cortocircuito en la línea principal de 19V de una laptop. ¿En qué componente de sensado general es más conveniente soldar el cable para inyectar voltaje?",
        options: [
          "En el botón de encendido físico",
          "Directamente en la resistencia de censado de corriente (Shunt resistor) ubicada tras los MOSFET de entrada",
          "En los pines del conector de la batería",
          "En el chip de la tarjeta de red WiFi"
        ],
        answer: 1,
        explanation: "La resistencia de censado de corriente (Shunt) distribuye los 19V estables a toda la placa. Inyectar voltaje ahí distribuye la corriente de diagnóstico de forma directa a todas las bifurcaciones y evita dañar los MOSFET de entrada del cargador."
      },
      {
        question: "La laptop enciende, tiene consumo dinámico en fuente, pero no da video. Al medir la señal PLTRST# (Platform Reset), el multímetro marca 0V. ¿Qué conclusión se obtiene?",
        options: [
          "La pantalla LCD está rota",
          "El sistema operativo no arranca",
          "El procesador permanece en estado de reinicio (Reset) y no iniciará el POST; la causa debe ser la falta de algún voltaje secundario o señal PWROK",
          "La batería está cargada al 100%"
        ],
        answer: 2,
        explanation: "Para que el CPU comience a funcionar, el PCH debe liberar la línea PLTRST# llevándola a nivel alto (3.3V). Si marca 0V, el hardware está congelado en reinicio, bloqueando la lectura de la BIOS."
      },
      {
        question: "¿Qué voltaje aproximado requiere el pin Gate de los MOSFET de entrada tipo Canal N para dejar pasar los 19V del cargador a la placa?",
        options: [
          "0V",
          "5V",
          "19V",
          "25V o más (generado por una bomba de carga en el integrado de carga)"
        ],
        answer: 3,
        explanation: "Los MOSFET de entrada Canal N requieren un voltaje en su compuerta (Vg) mayor al de su fuente (Vs, que está a 19V). Por tanto, el chip cargador integra un circuito duplicador de tensión (Bomba de carga) que eleva el Gate a ~25V para saturar y encender el transistor."
      },
      {
        question: "Un equipo enciende y da video, pero al conectar la batería, la luz de carga parpadea en naranja y el sistema indica 'conectado pero sin cargar'. ¿Qué línea de comunicación digital debemos verificar entre el chip de batería y el EC?",
        options: [
          "El bus de datos PCIe",
          "Las líneas de datos SMBus (SDA y SCL) de comunicación inteligente de batería",
          "La línea de video HDMI",
          "Los rieles de voltaje VCORE del procesador"
        ],
        answer: 1,
        explanation: "Las baterías inteligentes se comunican con el EC/Super I/O mediante el protocolo SMBus (líneas SDA de datos y SCL de reloj) para reportar temperatura, desgaste, corriente y habilitar la carga. Si estas líneas están dañadas (ej. diodos de protección rotos), la carga se bloquea."
      }
    ],
    flashcards: [
      { question: "¿Qué hace la señal ACDET?", answer: "Pin del integrado de carga que detecta mediante un divisor resistivo si la tensión del cargador externo es suficiente (~2.6V en el pin equivale a 19V de entrada)." },
      { question: "¿Qué indica un LED de puerto RJ45 encendido en standby?", answer: "Que los voltajes primarios de 3.3V y el controlador de red LAN están energizados y operativos." },
      { question: "¿Cuál es el primer paso ante una laptop mojada?", answer: "Retirar inmediatamente la batería principal y la pila RTC de 3V para detener los procesos de electrólisis y corrosión galvánica destructivos." },
      { question: "¿Qué es el divisor resistivo?", answer: "Circuito de dos resistencias en serie que reduce un voltaje de entrada a un valor proporcional seguro para ser leído por pines lógicos." },
      { question: "¿Cómo descartar cortocircuito en el CPU si da 0.5 ohmios?", answer: "Se debe retirar el procesador físicamente (si es socketed) o desoldar la bobina para separar la zona del VRM de la zona de alimentación interna del CPU." }
    ]
  },
  {
    id: 11,
    title: "Software Técnico y Linux",
    image: "images/linux_diagnostics.png",
    objectives: [
      "Crear y configurar unidades USB Live de Linux personalizadas para diagnóstico de hardware.",
      "Dominar utilidades avanzadas de testeo de memoria (MemTest86, OCCT).",
      "Interpretar lecturas de sensores de temperatura, voltaje y SMART (CrystalDiskInfo, HWInfo).",
      "Automatizar flujos de verificación mediante scripts y logs de rendimiento.",
      "Diseñar entornos técnicos portables aislados para pruebas seguras libres de virus."
    ],
    content: `
      <h3>1. Diagnóstico Mediante Sistemas Live de Linux</h3>
      <p>Cuando un equipo presenta fallas intermitentes de sistema operativo o sospechamos de virus o fallas del disco duro principal, utilizar un **sistema operativo Live** ejecutado directamente desde la memoria RAM mediante un puerto USB es el estándar profesional:</p>
      <ul>
        <li><strong>Aislamiento completo:</strong> Permite probar todo el hardware (tarjeta de sonido, puertos USB, teclado, conectores de video, WiFi) de forma independiente al sistema Windows del cliente.</li>
        <li>Distribuciones recomendadas: <strong>Mediccat USB</strong>, <strong>Hiren's BootCD PE</strong> o distribuciones Linux personalizadas basadas en Debian/Ubuntu que contienen herramientas de testeo preinstaladas.</li>
      </ul>

      <h3>2. Herramientas Críticas de Monitoreo de Hardware</h3>
      <ul>
        <li><strong>MemTest86 / MemTest86+:</strong> Herramienta que se ejecuta en modo booteable directo (fuera del sistema operativo) y satura las direcciones de memoria RAM con patrones de datos para descubrir fallas microscópicas de celdas que causan pantallas azules de Windows.</li>
        <li><strong>OCCT (OverClock Checking Tool):</strong> Suite de diagnóstico muy completa. Permite estresar de forma separada la RAM, el CPU (con instrucciones AVX), la GPU y la fuente de alimentación, registrando gráficas de temperatura, voltaje y RPM de los ventiladores.</li>
        <li><strong>HWInfo / HWMonitor:</strong> Software esencial para visualizar sensores integrados en la placa. Permite detectar si un riel de voltaje decae bajo carga o si el procesador está sufriendo "Thermal Throttling".</li>
        <li><strong>CrystalDiskInfo / GSmartControl:</strong> Lectura de registros SMART de discos de estado sólido (SSD) y mecánicos (HDD). Permite conocer el porcentaje de salud del disco, sectores reasignados, horas de uso y errores de bus PCIe.</li>
      </ul>

      <h3>3. Automatización de Pruebas y Reportes</h3>
      <p>Para sistematizar el control de calidad en talleres concurridos, se pueden compilar scripts ejecutables (usando scripts bash o instaladores desatendidos) que ejecuten de forma secuencial pruebas de lectura/escritura en discos de red, guarden un reporte en un archivo log de texto y verifiquen la firma digital del procesador.</p>
    `,
    glossary: [
      { term: "Linux Live USB", definition: "Unidad de almacenamiento USB booteable que contiene una distribución de Linux funcional que se carga y opera directamente en la memoria RAM." },
      { term: "S.M.A.R.T.", definition: "Self-Monitoring, Analysis and Reporting Technology. Sistema de monitoreo integrado en discos de almacenamiento para detectar y predecir fallas." },
      { term: "Sector Reasignado", definition: "Sector del disco duro que ha fallado mecánicamente o lógicamente y cuyos datos han sido transferidos a un área de reserva del disco." },
      { term: "AVX Instructions", definition: "Advanced Vector Extensions. Extensiones de arquitectura de CPU que realizan cálculos matemáticos masivos en paralelo, utilizadas para estresar al máximo la temperatura del procesador." },
      { term: "Mediccat USB", definition: "Caja de herramientas de diagnóstico de hardware en formato USB booteable que compila decenas de utilidades de rescate y pruebas de componentes." }
    ],
    quiz: [
      {
        question: "¿Por qué se prefiere ejecutar MemTest86 desde un USB booteable en lugar de un software de prueba dentro de Windows?",
        options: [
          "Porque el USB lee más rápido la memoria",
          "Para evitar que el sistema operativo Windows cargue en la RAM y bloquee el acceso directo a ciertas direcciones de memoria física impidiendo probarlas",
          "Porque Windows daña las memorias RAM permanentemente",
          "Porque no requiere energía eléctrica de la placa"
        ],
        answer: 1,
        explanation: "Windows se reserva grandes porciones de memoria RAM para su núcleo (Kernel) y controladores, bloqueando el acceso a software de diagnóstico convencional. Bootear MemTest86 fuera de Windows permite probar el 100% de la RAM física."
      },
      {
        question: "Al analizar un disco de estado sólido SSD con CrystalDiskInfo, ¿qué parámetro nos avisa sobre el desgaste de las celdas flash de escritura de forma directa?",
        options: [
          "La velocidad de rotación",
          "El parámetro 'Porcentaje de Vida Útil / Salud' basado en los TBW (Terabytes Escritos)",
          "El color del disipador de la laptop",
          "La versión del protocolo SATA del disco duro mecánico"
        ],
        answer: 1,
        explanation: "Las memorias Flash NAND tienen un límite físico de ciclos de borrado y escritura (TBW). Los SSD modernos registran estos valores en sus registros SMART y CrystalDiskInfo los interpreta para calcular el porcentaje de salud restante."
      },
      {
        question: "¿Qué síntoma presenta un equipo que sufre de 'Thermal Throttling' severo según las gráficas de HWInfo?",
        options: [
          "El ventilador se apaga por completo",
          "La frecuencia de reloj del CPU decae drásticamente (ej. a 800MHz) al alcanzar los 95°C-100°C para protegerse del calor",
          "El sistema operativo cambia el idioma automáticamente",
          "El voltaje de la batería sube al doble de su valor nominal"
        ],
        answer: 1,
        explanation: "El estrangulamiento térmico reduce la frecuencia y voltaje del procesador para mitigar la disipación térmica cuando la refrigeración es ineficiente. Se manifiesta como una ralentización extrema bajo carga pesada."
      },
      {
        question: "Estás probando la estabilidad de una tarjeta gráfica discretizada (GPU) reparada mediante soldadura BGA. ¿Qué test de OCCT es el más adecuado?",
        options: [
          "El test de CPU",
          "El test de GPU (con verificación de errores de memoria VRAM activa)",
          "El test de lectura de tarjeta de sonido",
          "El test de escritura de la BIOS SPI"
        ],
        answer: 1,
        explanation: "El test de GPU de OCCT renderiza gráficos complejos y calcula operaciones matemáticas en la VRAM, verificando activamente si se producen artefactos visuales o errores de cálculo que evidencien soldaduras defectuosas bajo las memorias o el núcleo gráfico."
      },
      {
        question: "¿Qué ventaja principal ofrece realizar pruebas de hardware con una distribución Live USB en comparación con usar el disco duro original del cliente?",
        options: [
          "Aumenta permanentemente el rendimiento físico de los componentes",
          "Previene que posibles virus o fallas lógicas de software en el sistema operativo del cliente distorsionen las mediciones de estabilidad de hardware",
          "Permite soldar componentes sin necesidad de apagar la placa",
          "Repara de forma física las pistas destruidas"
        ],
        answer: 1,
        explanation: "Usar un sistema Live USB proporciona un entorno limpio, controlado y predecible. Si la máquina se congela con el Live USB, confirmas una falla física de hardware; si funciona perfecto, sabes que el problema está en el software/Windows del cliente."
      }
    ],
    flashcards: [
      { question: "¿Qué significan las siglas S.M.A.R.T.?", answer: "Self-Monitoring, Analysis and Reporting Technology (Tecnología de Autocontrol, Análisis e Informes) integrada en unidades de almacenamiento." },
      { question: "¿Qué son los TBW en un SSD?", answer: "Terabytes Written. Cantidad total de datos en Terabytes que se pueden escribir en un SSD antes de que sus celdas flash comiencen a degradarse." },
      { question: "¿Cómo ayuda Hiren's BootCD?", answer: "Compila un entorno Windows PE ligero y portátil con utilidades preinstaladas para resetear contraseñas, clonar discos y testear componentes." },
      { question: "¿Qué hace la prueba 'Power' en OCCT?", answer: "Satura simultáneamente CPU y GPU para demandar el máximo consumo eléctrico a la fuente de alimentación, testeando su estabilidad y protecciones." },
      { question: "¿Qué indica un estado SMART de 'Riesgo' (Caution) en amarillo?", answer: "Indica la presencia de sectores con errores de lectura, sectores reasignados o temperaturas críticas de operación." }
    ]
  },
  {
    id: 12,
    title: "Producción y Flujo Industrial",
    image: "images/industrial_production.png",
    objectives: [
      "Optimizar el flujo de trabajo de recepción de lotes de equipos en laboratorios a escala.",
      "Implementar un etiquetado sistemático mediante códigos de barras y seriales de rastreo.",
      "Configurar y utilizar herramientas de clonación masiva sobre red local (FOG Project, MDT, PXE).",
      "Diseñar estaciones de QA masivo con pruebas en paralelo para optimizar tiempos.",
      "Establecer flujos de descarte rápido para optimizar la logística de refacciones."
    ],
    content: `
      <h3>1. Recepción y Triage de Lotes</h3>
      <p>En centros de reparación industrial, reacondicionamiento o soporte a gran escala, la organización logística es fundamental para evitar cuellos de botella:</p>
      <ul>
        <li><strong>Triage Inicial:</strong> Clasificar los equipos entrantes en tres grupos principales:
          <ol>
            <li><em>A: Fallas de Software / Estética rápida</em> (Rápido retorno).</li>
            <li><em>B: Fallas de Componentes Menores</em> (Teclados, pantallas, baterías, conectores).</li>
            <li><em>C: Fallas de Tarjeta Madre</em> (Cortocircuitos, BIOS corruptas, soldadura BGA).</li>
          </ol>
        </li>
        <li><strong>Rastreo mediante Códigos de Barras:</strong> Cada placa y chasis recibe una etiqueta adhesiva resistente a altas temperaturas con un código de barras único. Esto vincula de forma digital el historial de mediciones, componentes reemplazados, número de serie original de fábrica y nombre del técnico asignado.</li>
      </ul>

      <h3>2. Clonación e Instalación Masiva por Red</h3>
      <p>Una vez reparados los equipos de un lote grande, reinstalar sistemas operativos uno a uno mediante memorias USB individuales es ineficiente. Se utilizan herramientas de **despliegue por red**:</p>
      <ul>
        <li><strong>PXE Boot (Preboot Execution Environment):</strong> Protocolo que permite a la tarjeta de red de la laptop bootear e iniciar un sistema operativo básico cargado desde un servidor local de la red cableada (sin necesidad de almacenamiento local en la laptop).</li>
        <li><strong>FOG Project:</strong> Servidor de clonación de código abierto basado en Linux. Permite registrar las computadoras de un lote, tomar una imagen de disco maestro (previamente optimizada con controladores y software de diagnóstico) y desplegarla por red mediante multicast a 20 o 30 laptops simultáneamente a velocidades superiores a 5 GB/min por equipo.</li>
        <li><strong>MDT (Microsoft Deployment Toolkit):</strong> Permite automatizar la instalación limpia de Windows inyectando controladores específicos para cada marca y modelo de forma desatendida.</li>
      </ul>

      <h3>3. Estaciones de QA Masivo (Burn-In Testing)</h3>
      <p>Consiste en estantes equipados con conexiones de red cableadas y adaptadores de corriente universales donde se colocan múltiples laptops encendidas ejecutando suites de pruebas de forma ininterrumpida por 12-24 horas (Burn-In). Un servidor central recopila los logs de temperatura e informa de inmediato si algún equipo falla o se reinicia durante el proceso.</p>
    `,
    glossary: [
      { term: "PXE Boot", definition: "Entorno de ejecución previo al arranque que permite a una computadora arrancar utilizando una interfaz de red de forma independiente al almacenamiento local." },
      { term: "FOG Project", definition: "Solución de clonación de computadoras basada en red, que permite capturar, desplegar y administrar imágenes de disco de forma automatizada mediante red local." },
      { term: "Burn-In Testing", definition: "Prueba de esfuerzo prolongada de componentes electrónicos para detectar fallas infantiles o defectos de fabricación latentes antes de su entrega al cliente." },
      { term: "Triage", definition: "Método de clasificación rápida de equipos en función de la gravedad y tipología de sus fallas para optimizar los recursos del laboratorio." },
      { term: "Multicast", definition: "Método de transmisión de datos en red de un solo punto a múltiples destinos simultáneamente, reduciendo la saturación de ancho de banda del servidor." }
    ],
    quiz: [
      {
        question: "¿Qué protocolo de red permite a una laptop sin disco duro iniciar un sistema operativo cargado desde un servidor del taller?",
        options: [
          "HTTP / HTTPS",
          "PXE Boot (Preboot Execution Environment)",
          "FTP de transferencia rápida",
          "Bluetooth 5.0"
        ],
        answer: 1,
        explanation: "El protocolo PXE (generalmente pronunciado 'pixie') permite a la BIOS de la tarjeta de red del equipo obtener una dirección IP por DHCP y descargar un archivo de arranque básico desde un servidor TFTP de la red local para arrancar un sistema de diagnóstico."
      },
      {
        question: "Al clonar 20 laptops idénticas simultáneamente mediante FOG Project, ¿qué modo de transmisión de red evita saturar el ancho de banda del servidor?",
        options: [
          "Unicast (un hilo independiente por máquina)",
          "Multicast (el servidor envía los datos en un solo flujo común que todas las laptops leen a la vez)",
          "Comunicación por infrarrojos",
          "WiFi compartido de red doméstica"
        ],
        answer: 1,
        explanation: "El envío por Multicast permite al servidor enviar los paquetes de datos de la imagen del disco maestro una sola vez en la red local. Las 20 laptops reciben el mismo flujo de datos a la vez, multiplicando la eficiencia y reduciendo la carga del switch y del servidor."
      },
      {
        question: "¿Cuál es la función de una prueba 'Burn-In' en el control de calidad industrial?",
        options: [
          "Quemar las soldaduras viejas con calor",
          "Someter al equipo a una prueba de funcionamiento continuo por 12-24 horas para forzar la aparición de fallas de componentes inestables antes de su embalaje final",
          "Limpiar la resina adhesiva de los chips",
          "Validar el peso neto de la laptop"
        ],
        answer: 1,
        explanation: "Las fallas en soldaduras de componentes microscópicos o celdas de batería degradadas suelen aparecer por fatiga térmica acumulada. El Burn-In fuerza estas condiciones límite por varias horas para filtrar y corregir fallas en el taller, evitando que fallen en manos del cliente."
      },
      {
        question: "Estás organizando un lote de 100 computadoras portátiles corporativas retiradas para reacondicionamiento. ¿Cuál es la primera etapa logística?",
        options: [
          "Pintar las carcasas",
          "Ejecutar un triage y clasificación en función del estado estético y fallas funcionales críticas",
          "Comprar 100 discos duros nuevos",
          "Reprogramar la BIOS de los 100 equipos de forma obligatoria"
        ],
        answer: 1,
        explanation: "El triage clasifica qué equipos requieren soldadura compleja (costo y tiempo altos), cuáles repuestos rápidos y cuáles solo software, optimizando el presupuesto y el tiempo de entrega del lote."
      },
      {
        question: "¿Por qué es importante utilizar etiquetas con código de barras en el flujo de producción del taller?",
        options: [
          "Para que el cliente vea que la laptop brilla",
          "Para automatizar el seguimiento del historial de reparaciones, mediciones de diagnóstico, y componentes utilizados, evitando confusiones físicas de placas idénticas",
          "Para bloquear la BIOS por software",
          "Para aumentar la señal de la antena WiFi"
        ],
        answer: 1,
        explanation: "En un taller con cientos de placas base en reparación, muchas placas del mismo modelo son físicamente idénticas. El código de barras digitaliza la identidad y el estado exacto de diagnóstico de cada una, evitando errores de entrega o diagnósticos repetidos."
      }
    ],
    flashcards: [
      { question: "¿Qué significa PXE?", answer: "Preboot Execution Environment (Entorno de Ejecución Previo al Arranque) que permite arrancar sistemas sobre una tarjeta de red." },
      { question: "¿Qué hace sysprep en Windows?", answer: "Herramienta de Microsoft que limpia los identificadores únicos (SID) y controladores específicos de una instalación de Windows para permitir clonarla limpiamente en otros equipos." },
      { question: "¿Qué es una imagen máster (Golden Image)?", answer: "Instalación de referencia configurada con software de prueba, actualizaciones y optimizaciones, utilizada como base para clonar masivamente." },
      { question: "¿Qué es el descarte rápido?", answer: "Metodología para diagnosticar y descartar placas base insalvables (ej. CPU integrado en corto y placa perforada) en menos de 5 minutos para no perder tiempo en el taller." },
      { question: "¿Qué es el burn-in de batería?", answer: "Realizar múltiples ciclos controlados de carga y descarga total para validar la capacidad física real de retención de energía del componente." }
    ]
  },
  {
    id: 13,
    title: "Fundamentos Electrónicos Aplicados",
    image: "images/buck_converter.png", // Reused fallback
    objectives: [
      "Aplicar la Ley de Ohm y el cálculo de potencia eléctrica en diagnósticos de placas madre.",
      "Identificar, medir y analizar fallas en capacitores, diodos e inductores.",
      "Comprender la física y el funcionamiento dinámico de transistores MOSFET y modulación PWM.",
      "Analizar circuitos lógicos de Pull-Up, Pull-Down y control de señales digitales.",
      "Interpretar valores de caída de tensión y comportamiento resistivo en líneas de datos rápidas."
    ],
    content: `
      <h3>1. Ley de Ohm y Potencia Eléctrica</h3>
      <p>Cualquier análisis de fallas electrónicas se rige por estas dos fórmulas fundamentales:</p>
      <ul>
        <li><strong>Ley de Ohm: V = I * R</strong> (Voltaje = Corriente * Resistencia). Si la resistencia de una línea de alimentación decae drásticamente a 0.1Ω (cortocircuito) y aplicamos 19V, la corriente (I = V / R) tendería a ser inmensa (190A), activando protecciones o quemando componentes.</li>
        <li><strong>Ley de Potencia: P = V * I</strong> (Potencia / Calor = Voltaje * Corriente) o <strong>P = I² * R</strong>. Al inyectar voltaje en una línea en cortocircuito (ejemplo, 1V), la corriente fluye masivamente a través del componente que hace el puente a tierra (que presenta una baja resistencia local). La potencia disipada se convierte en calor concentrado en ese componente físico (Efecto Joule), haciéndolo brillar en la cámara térmica o derretir el rosin.</li>
      </ul>

      <h3>2. Componentes Pasivos en Placa de Laptop</h3>
      <ul>
        <li><strong>Capacitores Cerámicos Multicapa (MLCC):</strong> Son los componentes que más fallan en las laptops. Se colocan en paralelo entre las líneas de voltaje y tierra para filtrar el ruido. Al fracturarse internamente por vibración o calor, las placas internas de cobre se tocan, convirtiendo al capacitor en un conductor directo a tierra (cortocircuito absoluto en la línea).</li>
        <li><strong>Diodos y Diodos Zener:</strong> Permiten el paso de corriente en un solo sentido. Se usan en los circuitos de entrada para protección contra polaridad inversa y como supresores de picos de voltaje (ESD). Si fallan, suelen quedar en cortocircuito directo.</li>
        <li><strong>Inductores (Bobinas):</strong> Almacenan energía en forma de campo magnético. En placas madre, actúan como filtros de corriente en fuentes conmutadas Buck. Si se dañan mecánicamente o sus espiras entran en cortocircuito, la eficiencia de la fuente conmutada decae drásticamente, quemando los MOSFETs de potencia por sobretemperatura.</li>
      </ul>

      <h3>3. Funcionamiento de MOSFETs en Placas Lógicas</h3>
      <p>Un MOSFET es una válvula electrónica controlada por voltaje en su pin Gate (Compuerta):</p>
      <ul>
        <li><strong>Canal N:</strong> Conduce cuando el Gate es positivo respecto al Source. Es el más eficiente y utilizado en fuentes conmutadas de alta corriente.</li>
        <li><strong>Canal P:</strong> Conduce cuando el Gate es negativo respecto al Source. Comúnmente utilizado como interruptor de encendido de rieles secundarios simples.</li>
      </ul>
    `,
    glossary: [
      { term: "Ley de Ohm", definition: "Principio físico fundamental que establece que la corriente que fluye por un conductor es directamente proporcional al voltaje aplicado e inversamente proporcional a su resistencia." },
      { term: "MLCC", definition: "Multi-Layer Ceramic Capacitor (Capacitor Cerámico Multicapa). Componente de filtrado y acoplamiento muy común que suele fallar poniéndose en cortocircuito." },
      { term: "Efecto Joule", definition: "Fenómeno por el cual los electrones en movimiento chocan con los átomos del conductor, disipando parte de su energía cinética en forma de calor." },
      { term: "Rectificador Síncrono", definition: "Uso de transistores MOSFET de baja resistencia controlados activamente para reemplazar diodos convencionales, mejorando la eficiencia energética de las fuentes Buck." },
      { term: "Diodo Zener", definition: "Diodo diseñado para permitir el flujo de corriente en sentido inverso cuando se alcanza un voltaje límite de ruptura específico, protegiendo circuitos integrados sensibles." }
    ],
    quiz: [
      {
        question: "Si una resistencia de 10 ohmios tiene una caída de voltaje medida de 5V entre sus extremos, ¿qué corriente fluye a través de ella?",
        options: [
          "0.5 Amperios (500 mA)",
          "2 Amperios",
          "50 Amperios",
          "0 Amperios"
        ],
        answer: 0,
        explanation: "Aplicando la Ley de Ohm: I = V / R. Dividimos 5V entre 10Ω, resultando en 0.5A (500mA) de corriente."
      },
      {
        question: "¿Por qué los capacitores cerámicos MLCC de filtrado son los culpables del 80% de los cortocircuitos en placas base?",
        options: [
          "Porque explotan físicamente derramando ácido",
          "Debido a que al agrietarse mecánicamente o fallar por calor, sus capas metálicas internas en paralelo se tocan, creando un puente directo a tierra",
          "Porque se desmagnetizan",
          "Porque cambian su valor a megaohmios"
        ],
        answer: 1,
        explanation: "Los MLCC constan de decenas de capas metálicas alternadas muy cercanas entre sí. Si el PCB se flexiona o sufre sobrecalentamiento, las capas se perforan o fracturan, uniendo el polo positivo de alimentación con la masa de tierra."
      },
      {
        question: "Al medir un diodo en buen estado con el multímetro en escala de diodo, ¿qué deberíamos observar en pantalla al polarizarlo en sentido inverso?",
        options: [
          "0.001V (corto directo)",
          "OL (Open Line / Línea Abierta, indicando conducción nula)",
          "0.500V exactos",
          "Un pitido continuo del multímetro"
        ],
        answer: 1,
        explanation: "Un diodo bloquea la corriente en sentido inverso. El multímetro mostrará 'OL' (sin flujo de corriente) al colocar la punta roja en el cátodo y la negra en el ánodo, confirmando el correcto bloqueo de tensión."
      },
      {
        question: "¿Cuál es el rol de un divisor de voltaje compuesto por dos resistencias en el circuito de detección de cargador?",
        options: [
          "Elevar los 19V del cargador a 40V",
          "Reducir una tensión alta de forma proporcional a un nivel seguro para que sea medida por un pin analógico del EC o cargador",
          "Generar calor para calentar la placa",
          "Almacenar energía eléctrica en standby"
        ],
        answer: 1,
        explanation: "El divisor reduce, por ejemplo, los 19V del cargador mediante la relación de dos resistencias en serie, entregando unos 2.6V seguros que el pin de detección (ACDET) del integrado puede sensar directamente."
      },
      {
        question: "Para saturar (encender por completo) un MOSFET de canal P que tiene 19V en su terminal Source, ¿qué voltaje aproximado se debe aplicar en su Gate?",
        options: [
          "25V",
          "19V",
          "Un voltaje menor (ej: 9V o 0V) para crear la diferencia negativa Vgs necesaria",
          "No requiere voltaje en el Gate para conducir"
        ],
        answer: 2,
        explanation: "Un MOSFET Canal P requiere que el voltaje de compuerta (Vg) sea inferior al de su fuente (Vs). Si Vs está a 19V, llevar el Gate a un nivel bajo (ej. 9V o 0V) activa el canal de conducción."
      }
    ],
    flashcards: [
      { question: "¿Qué es la inductancia?", answer: "Propiedad de un conductor (bobina) de oponerse a los cambios en la corriente eléctrica, almacenando energía en un campo magnético." },
      { question: "¿Qué indica una lectura de 0.5V en modo diodo en un diodo de silicio?", answer: "Mide la caída de tensión umbral en sentido directo necesaria para que el diodo empiece a conducir corriente." },
      { question: "¿Qué es la potencia disipada?", answer: "Energía eléctrica que se pierde irreversiblemente en forma de calor por el paso de corriente a través de una resistencia." },
      { question: "¿Qué diferencia un MOSFET de un transistor bipolar (BJT)?", answer: "El MOSFET se controla por voltaje en el Gate (casi sin consumo de corriente); el BJT se controla por corriente en la Base." },
      { question: "¿Qué pasa si un diodo de protección ESD entra en cortocircuito?", answer: "Desvía la línea de señal protegida (ej: datos USB) permanentemente a tierra, haciendo que el puerto deje de funcionar." }
    ]
  },
  {
    id: 14,
    title: "Debugging y POST Analysis",
    image: "images/post_debug_card.png",
    objectives: [
      "Interpretar códigos hexadecimales de diagnóstico (POST Codes).",
      "Conectar y utilizar tarjetas de depuración (Debug Cards) para buses LPC y eSPI.",
      "Analizar los puntos de control del firmware de la BIOS durante el encendido.",
      "Diagnosticar fallas de inicialización temprana en buses de CPU y memoria RAM.",
      "Utilizar técnicas avanzadas de rastreo lógico para aislar bloqueos del sistema."
    ],
    content: `
      <h3>1. Códigos POST (Power On Self Test)</h3>
      <p>Cuando el procesador arranca y lee la BIOS, ejecuta la secuencia POST para testear e inicializar cada chip. A medida que avanza, la BIOS envía códigos de estado numéricos hexadecimales de 8 bits (ej. <code>00</code> a <code>FF</code>) a un puerto de salida específico de I/O (usualmente el Puerto 80h):</p>
      <ul>
        <li>Si la inicialización de la RAM falla, el POST se detiene y muestra un código específico en el puerto 80h (por ejemplo, el código <code>E7</code> o <code>55</code> dependiendo de la marca de la BIOS: AMI, Phoenix o Insyde).</li>
        <li>Si el equipo enciende sin dar video, leer los códigos POST nos indica con precisión milimétrica qué componente falló (CPU, RAM, GPU, Chip de red, controlador SATA, etc.) en lugar de adivinar.</li>
      </ul>

      <h3>2. Tarjetas de Diagnóstico Debug (LPC / eSPI)</h3>
      <p>Las laptops modernas no tienen ranuras PCI clásicas para pinchar tarjetas POST. Los técnicos utilizan interfaces dedicadas:</p>
      <ul>
        <li><strong>Conexión al bus LPC / eSPI:</strong> Se suelda una pequeña tarjeta de diagnóstico a puntos de prueba del bus LPC de la placa (CLK, FRAME, LFRAME#, LAD0, LAD1, LAD2, LAD3) o se conecta directamente al puerto del conector del teclado (en placas compatibles) o al puerto mini-PCIe / M.2 WLAN que tenga expuesto el bus LPC.</li>
        <li><strong>Debug Cards Modernas:</strong> Muestran los códigos en displays de 7 segmentos de doble dígito o pantallas OLED. Los modelos avanzados leen buses eSPI de placas de 8ª generación en adelante.</li>
      </ul>

      <h3>3. BIOS Checkpoints e Inicialización de RAM</h3>
      <p>El proceso de POST sigue este orden lógico de control:</p>
      <ol>
        <li><strong>Inicialización del CPU (Code 00 / FF):</strong> Si el lector POST se queda en 00 o FF nada más encender la placa, el CPU no está ejecutando código. Puede faltar alimentación VCORE, reloj de 25MHz o el reset PLTRST# está activo.</li>
        <li><strong>Detección y calibración de RAM (Codes 15 a 35 aprox):</strong> El CPU lee la configuración de los módulos RAM a través del bus I2C de comunicación lenta (llamado bus SPD) a 1.2V-3.3V. Luego calibra las líneas de datos rápidas. Si hay soldadura agrietada bajo el zócalo de la RAM o en el CPU integrado, el código se congela aquí.</li>
        <li><strong>Inicialización Gráfica (Codes 90 a A5 aprox):</strong> Se habilita la tarjeta gráfica (GPU) y se configuran los buses LVDS/eDP de la pantalla interna. Si la máquina se detiene en este rango, hay fallas en la GPU o en la lectura del EDID de la pantalla.</li>
        <li><strong>Carga de periféricos e inicio de Booteo (Codes B0 a F0):</strong> Se inicializan puertos USB, discos y controladores SATA, dándose el control al sector de arranque del sistema operativo.</li>
      </ol>
    `,
    glossary: [
      { term: "POST Codes", definition: "Códigos hexadecimales de 2 dígitos enviados por la BIOS al Puerto 80h para indicar el progreso del autodiagnóstico de encendido." },
      { term: "Port 80h", definition: "Dirección física de bus de entrada/salida (I/O) estándar de la arquitectura x86 reservada para mostrar códigos de diagnóstico de hardware." },
      { term: "SPD (Serial Presence Detect)", definition: "EEPROM pequeña integrada en los módulos de memoria RAM que almacena tiempos, capacidades y voltajes de funcionamiento leídos por la BIOS mediante bus I2C." },
      { term: "eDP (Embedded DisplayPort)", definition: "Interfaz digital de alta velocidad moderna utilizada para conectar de forma interna la controladora gráfica con la pantalla LCD de la laptop." },
      { term: "LPC Bus", definition: "Low Pin Count. Bus de comunicación serie de pocos pines desarrollado por Intel para conectar periféricos de baja velocidad (BIOS, EC) al PCH." }
    ],
    quiz: [
      {
        question: "Al encender la placa madre con una tarjeta POST soldada al bus LPC, el display se queda fijo en '00' o 'FF' de forma indefinida. ¿Qué nos indica este comportamiento?",
        options: [
          "Que la memoria RAM está llena de datos",
          "Que el procesador no está ejecutando ninguna instrucción (falta de alimentación, falta de señal de reloj, o está en reset permanente)",
          "Que el sistema operativo Windows cargó correctamente",
          "Que la batería está cargada al 100%"
        ],
        answer: 1,
        explanation: "Los códigos 00 y FF indican el estado inicial nulo. Si se queda fijo inmediatamente al pulsar encendido, significa que el CPU ni siquiera ha intentado procesar la primera línea de código de la BIOS."
      },
      {
        question: "¿Qué bus del procesador lee los perfiles de configuración de tiempos y voltaje grabados en la EEPROM de la memoria RAM (SPD)?",
        options: [
          "El bus SATA 3",
          "El bus I2C / SMBus de la memoria RAM",
          "La salida HDMI digital",
          "La línea de reset PLTRST#"
        ],
        answer: 1,
        explanation: "La BIOS se comunica con la memoria RAM inicialmente por un bus lento serie I2C (SMBus) para leer los datos de la EEPROM SPD que le dicen qué tipo de RAM es (DDR3/DDR4/DDR5), frecuencia y voltajes requeridos."
      },
      {
        question: "Si la tarjeta de diagnóstico POST se congela en un código relacionado con la inicialización de video (ejemplo, código 2B o 90) y no da imagen, ¿cuál es el componente bajo mayor sospecha?",
        options: [
          "El ventilador del sistema",
          "El controlador de disquetera",
          "El chip gráfico (GPU), el puerto eDP/pantalla o el firmware de la BIOS de video",
          "La tarjeta de red inalámbrica"
        ],
        answer: 2,
        explanation: "Los códigos intermedios tardíos del POST se encargan de levantar el video. Congelarse ahí indica que la placa base reconoció CPU y RAM pero falló al inicializar el hardware gráfico o comunicarse con la pantalla."
      },
      {
        question: "¿Qué bus rápido reemplazó al bus LPC para la transmisión de códigos de depuración y comunicación del EC en plataformas Intel modernas de 8ª generación en adelante?",
        options: [
          "El bus eSPI",
          "La interfaz de red Ethernet",
          "Los conectores de audio Jack",
          "El puerto Thunderbolt de carga externa"
        ],
        answer: 0,
        explanation: "El bus eSPI (Enhanced Serial Peripheral Interface) es la evolución del bus LPC. Funciona a voltajes más bajos (1.8V) y frecuencias superiores, y las tarjetas debug modernas deben soportar este protocolo para placas recientes."
      },
      {
        question: "Estás soldando hilos finos para conectar una tarjeta POST de diagnóstico. ¿Cuál de los siguientes pines NO pertenece al bus LPC?",
        options: [
          "LAD0 (LPC Address/Data 0)",
          "LFRAME# (LPC Frame Indicator)",
          "LCLK (LPC Clock de 33MHz)",
          "VBUS (Línea de 20V de entrada USB-C)"
        ],
        answer: 3,
        explanation: "El bus LPC utiliza señales lógicas de baja tensión (3.3V) como LAD0-LAD3, LFRAME# y LCLK. VBUS es la línea de alta potencia del puerto USB-C y quemaría la tarjeta de diagnóstico si se conecta a ella."
      }
    ],
    flashcards: [
      { question: "¿Qué es el bus SPD?", answer: "Bus I2C secundario utilizado por la placa base para leer la información de tiempos y configuración almacenada en el pequeño chip EEPROM de cada módulo RAM." },
      { question: "¿Qué nos indica un código POST '55' o 'D3' en la mayoría de BIOS?", answer: "Falla de detección de la memoria RAM física (puede ser memoria ausente, incompatible o sucia)." },
      { question: "¿Para qué sirve el pin LFRAME#?", answer: "Señal activa baja en el bus LPC que indica el inicio de un ciclo de transferencia de datos de direccionamiento." },
      { question: "¿Por qué el bus eSPI usa voltajes más bajos que LPC?", answer: "Opera a 1.8V en lugar de los 3.3V de LPC para adaptarse a los procesos litográficos más pequeños de los procesadores actuales y reducir el consumo energético." },
      { question: "¿Qué es la BIOS de video (VBIOS)?", answer: "Porción de código de firmware encargada de inicializar la controladora gráfica y configurar la resolución básica de visualización del monitor." }
    ]
  }
];
