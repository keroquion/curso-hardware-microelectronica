export const module10 = {
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
  };
