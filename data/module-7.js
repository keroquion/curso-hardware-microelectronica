export const module7 = {
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
  };
