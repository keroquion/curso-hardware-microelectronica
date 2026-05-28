export const module8 = {
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
  };
