export const module3 = {
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
      <p>El multímetro solo muestra un promedio de voltaje en el tiempo. Un osciloscopio permit        <li><strong>Configuración Inicial:</strong> Ajustar la punta en 10X para evitar cargar el circuito. Ajustar la escala de Voltaje a 1V/Div o 2V/Div. Ajustar la escala de tiempo (Time/Div) a microsegundos (µs) para ver PWM, o milisegundos (ms) para ver la subida de un voltaje.</li>
        <li><strong>Trigger (Disparador):</strong> Ajustar el trigger en modo "Single" (Disparo Único) y configurar el nivel a unos 1.5V para capturar señales transitorias rápidas como el encendido o la ráfaga de comunicación BIOS SPI.</li>
        <li><strong>Señal SPI de BIOS:</strong> Colocando la punta en el Pin 2 (Data Out) o Pin 5 (Data In) de la BIOS flash, y encendiendo la placa, debemos ver pulsos digitales de 3.3V de amplitud. Si no hay actividad, el CPU no está intentando leer la BIOS (puede ser por falta de reset o alimentación).</li>
        <li><strong>Frecuencia PWM:</strong> Medir en la fase antes de la bobina (en el nodo de conmutación / fase) nos mostrará una onda cuadrada limpia de entre 200 kHz a 1 MHz, validando que los MOSFETs y el driver PWM funcionan correctamente.</li>
      </ul>

      <h3>4. Transistores SMD y Códigos de Equivalencias (NPN)</h3>
      <p>Los transistores en encapsulado SOT-23 de 3 pines se utilizan ampliamente para la conmutación de señales lógicas. Es crucial conocer sus códigos de marcado y límites de operación para encontrar reemplazos compatibles:</p>
      <div class="module-image-showcase">
        <img src="images/smd_transistor_codes.png" alt="Transistores SMD L5, L6 y L7 y equivalentes NPN" style="width:100%;border-radius:10px;margin:1rem 0;box-shadow:0 4px 18px rgba(0,0,0,0.35);">
      </div>
      <ul>
        <li><strong>Marcas de Código Comunes (NPN):</strong>
          <br>- <code>L5</code>: Voltaje máximo Colector-Emisor 20V, Corriente de Colector máxima 100mA.
          <br>- <code>L6</code>: Voltaje máximo Colector-Emisor 50V, Corriente de Colector máxima 100mA.
          <br>- <code>L7</code>: Voltaje máximo Colector-Emisor 60V, Corriente de Colector máxima 100mA.
        </li>
        <li><strong>Regla de Reemplazo Seguro:</strong> Puedes sustituir un transistor <code>L5</code> por un <code>L6</code> o <code>L7</code> ya que soportan voltajes superiores con idéntica corriente (100mA), pero NUNCA al revés.</li>
      </ul>

      <h3>5. Reguladores de Voltaje Lineales LDO (Serie 1117)</h3>
      <p>El regulador LDO (Low Dropout) con encapsulado SOT-223 es muy común en placas secundarias o etapas de potencia auxiliar:</p>
      <div class="module-image-showcase">
        <img src="images/ldo_1117_pinout.png" alt="Pinout de regulador LDO serie 1117" style="width:100%;border-radius:10px;margin:1rem 0;box-shadow:0 4px 18px rgba(0,0,0,0.35);">
      </div>
      <ul>
        <li><strong>Configuración del Pinout (Vista Frontal, de izquierda a derecha):</strong>
          <br>- <strong>Pin 1:</strong> Ground (GND) / Referencia.
          <br>- <strong>Pin 2 (y lengüeta superior):</strong> Salida de voltaje regulado (OUT 3.3V en el caso del 1117-33).
          <br>- <strong>Pin 3:</strong> Entrada de voltaje (IN 5V).
        </li>
        <li><strong>Diagnóstico de Fallas:</strong> Si el voltaje de entrada (Pin 3) está presente pero el de salida (Pin 2) es 0V o extremadamente bajo, verificar resistencia a tierra en la salida. Si no hay corto a tierra en esa línea, el integrado LDO está internamente abierto y debe reemplazarse.</li>
      </ul>

      <h3>6. Prueba y Diagnóstico de Optoacopladores (PC817)</h3>
      <p>El optoacoplador aísla galvánicamente dos circuitos mediante luz (LED infrarrojo interno y fototransistor). Es muy común en fuentes de alimentación conmutadas (cargadores de laptop):</p>
      <div class="module-image-showcase">
        <img src="images/optocoupler_pc817_testing.png" alt="Esquema de medición de optoacoplador PC817" style="width:100%;border-radius:10px;margin:1rem 0;box-shadow:0 4px 18px rgba(0,0,0,0.35);">
      </div>
      <ul>
        <li><strong>Distribución de Pines (PC817):</strong>
          <br>- <strong>Pin 1 (Ánodo) y Pin 2 (Cátodo):</strong> Lado del LED emisor.
          <br>- <strong>Pin 3 (Emisor) y Pin 4 (Colector):</strong> Lado del fototransistor receptor.
        </li>
        <li><strong>Prueba Práctica en Modo Diodo (Fuera de la placa):</strong>
          <br>- Medir entre Pin 1 y Pin 2: En polarización directa debe marcar caída de diodo silicona (<strong>~1.0V a 1.2V</strong>). En inversa debe dar circuito abierto (<code>OL</code>).
          <br>- Medir entre Pin 3 y Pin 4: En cualquier dirección debe marcar <strong>OL</strong> (sin energizar el LED). Si mide cualquier valor bajo u ohmios, el fototransistor interno está dañado (en cortocircuito).
        </li>
      </ul>

      <h3>7. Comportamiento de Señales en Componentes RLC bajo Onda Cuadrada</h3>
      <p>Cuando alimentamos componentes pasivos (Resistencia, Inductor, Capacitor) con una fuente de onda cuadrada (como las conmutaciones PWM de una laptop), la corriente se comporta de maneras drásticamente distintas:</p>
      <div class="module-image-showcase">
        <img src="images/rlc_current_waveforms.png" alt="Curvas de corriente en circuitos RLC con onda cuadrada" style="width:100%;border-radius:10px;margin:1rem 0;box-shadow:0 4px 18px rgba(0,0,0,0.35);">
      </div>
      <ul>
        <li><strong>Resistor (R):</strong> La corriente copia la forma de la tensión. Sube y baja de forma instantánea de acuerdo a la Ley de Ohm ($I = V/R$).</li>
        <li><strong>Inductor / Bobina (L):</strong> La corriente no puede cambiar instantáneamente. Al subir la tensión, la corriente sube en rampa exponencial almacenando energía magnética. Al caer la tensión, baja en rampa liberando la energía.</li>
        <li><strong>Capacitor (C):</strong> La corriente tiene picos extremos en los flancos de subida y bajada de la tensión (fase de carga y descarga de la placa metálica), manteniéndose en 0 en los estados estáticos de la onda.</li>
      </ul>
    `,
    glossary: [
      { term: "Impedancia", definition: "Resistencia al paso de corriente alterna o continua medida en un circuito respecto a tierra. Es crucial para identificar cortocircuitos." },
      { term: "Rosin", definition: "Resina de pino sólida usada como fundente de soldadura que, evaporada sobre componentes fríos, sirve como indicador térmico visual de cortocircuitos." },
      { term: "Trigger", definition: "Función del osciloscopio que sincroniza el barrido de la pantalla con un punto específico de la señal medida para estabilizar o capturar formas de onda." },
      { term: "Inyección de Voltaje", definition: "Técnica de diagnóstico que consiste en aplicar tensión controlada externamente a una línea de alimentación en corto para identificar componentes defectuosos por disipación térmica." },
      { term: "Modo Diodo", definition: "Escala del multímetro que inyecta una corriente constante baja y mide la caída de tensión en milivoltios. Ideal para medir impedancias en líneas de datos rápidas." },
      { term: "SOT-23", definition: "Small Outline Transistor. Encapsulado estándar de montaje superficial de 3 pines utilizado en transistores pequeños e integrados simples de conmutación lógica." },
      { term: "Optoacoplador", definition: "Dispositivo de acoplamiento óptico que aísla galvánicamente dos etapas eléctricas de un circuito mediante un LED interno y un fototransistor." },
      { term: "Componentes RLC", definition: "Circuitos formados por combinación de Resistencias (R), Inductores (L) y Capacitores (C), que gobiernan el filtrado y estabilidad en fuentes de alimentación conmutadas." }
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
      },
      {
        question: "Tienes un transistor NPN SMD quemado marcado como 'L5'. No tienes el repuesto exacto, pero tienes transistores marcados como 'L6' y 'L7'. ¿Cuál puedes utilizar como reemplazo?",
        options: [
          "Ninguno, no son compatibles bajo ninguna circunstancia",
          "Cualquiera de los dos, ya que tienen límites de voltaje superiores (50V y 60V) y misma corriente (100mA)",
          "Solamente el L6, pero modificando una resistencia en el circuito base",
          "Solamente L7 si se coloca una resistencia de derivación externa"
        ],
        answer: 1,
        explanation: "En la familia de transistores NPN SOT-23 equivalentes, el L5 opera a un máximo de 20V. Los L6 (50V) y L7 (60V) manejan voltajes mayores con la misma corriente (100mA), por lo que son reemplazos directos 100% seguros sin modificar el circuito."
      },
      {
        question: "Al realizar la medición en frío de los pines de un optoacoplador PC817 desmontado, mides entre el emisor (Pin 3) y el colector (Pin 4) del fototransistor obteniendo una lectura de 12 ohmios. ¿Qué indica esto?",
        options: [
          "Que el optoacoplador funciona correctamente",
          "Que el LED emisor interno está dañado",
          "Que el fototransistor de salida está en cortocircuito (dañado)",
          "Que las puntas de medición están mal conectadas"
        ],
        answer: 2,
        explanation: "En reposo (sin corriente fluyendo por el LED), el fototransistor de un optoacoplador debe comportarse como un circuito abierto total (lectura OL). Una lectura de 12 ohmios indica cortocircuito por falla de la juntura interna."
      },
      {
        question: "Al excitar un circuito con una onda cuadrada de voltaje, ¿cómo se manifiesta la corriente que pasa a través de un capacitor?",
        options: [
          "Es una onda cuadrada idéntica a la tensión",
          "Es una rampa triangular progresiva",
          "Se presenta en forma de picos o pulsos extremos en los flancos de subida y bajada de la tensión",
          "Permanece constante en un valor fijo de CC"
        ],
        answer: 2,
        explanation: "La corriente en el capacitor es proporcional a la derivada de la tensión respecto al tiempo (I = C * dV/dT). Al haber cambios instantáneos de voltaje (flancos de la onda cuadrada), se generan picos de corriente muy marcados, bajando a cero en los tramos planos."
      }
    ],
    notes: "",
    flashcards: [
      { question: "¿Cómo se mide en frío?", answer: "Sin alimentación conectada a la placa. Escala de diodo o resistencia, punta roja a tierra de la placa, punta negra al pin de prueba." },
      { question: "¿Qué ventajas tiene el método de Rosin?", answer: "Es extremadamente económico, no requiere software y hace visible el calor en forma física inmediata al derretirse el polvo blanco." },
      { question: "¿Qué hace la perilla Time/Div?", answer: "Controla la escala de tiempo horizontal en la pantalla del osciloscopio por cada división de la cuadrícula." },
      { question: "¿Qué es el modo Single del osciloscopio?", answer: "Configura el osciloscopio para capturar un único evento rápido que cumpla la condición del trigger y congelarlo en pantalla." },
      { question: "¿Por qué calienta un componente en corto al inyectar voltaje?", answer: "Por el efecto Joule (P = I² * R). La corriente de la fuente fluye masivamente a través de la resistencia del corto, disipando calor." },
      { question: "¿Cuál es el pinout de un regulador de voltaje LDO 1117 (SOT-223) de izquierda a derecha?", answer: "Pin 1: Ground (GND), Pin 2: Output (Voltaje Regulado), Pin 3: Input (Entrada)." },
      { question: "¿Qué transistor es equivalente superior de un L5 (NPN)?", answer: "Los transistores marcados como L6 o L7 son equivalentes de mayor voltaje (50V y 60V vs 20V) y misma corriente (100mA)." },
      { question: "¿Cómo se comporta la corriente en un inductor ante una onda cuadrada de voltaje?", answer: "Se comporta como una rampa exponencial, subiendo progresivamente al aplicarse voltaje y descendiendo al retirarse." }
    ]
  };
