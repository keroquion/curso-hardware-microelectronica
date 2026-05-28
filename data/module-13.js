export const module13 = {
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
  };
