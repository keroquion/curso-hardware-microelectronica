export const module14 = {
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
  };
