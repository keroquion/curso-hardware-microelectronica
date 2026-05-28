export const module1 = {
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
  };
