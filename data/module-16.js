export const module16 = {
  id: 16,
  title: "Suite de Diagnóstico Web y Periféricos",
  image: "images/diagnostic_testers_tools.png",
  objectives: [
    "Utilizar APIs del navegador (WebRTC, WebHID) para testear cámara, micrófono y teclado sin instalar software.",
    "Interpretar scancodes de teclado para diferenciar fallas de membrana, flex cable o firmware del EC.",
    "Ejecutar test de pantalla con patrones de color para detectar dead pixels, manchas y retroiluminación desigual.",
    "Dominar PC-Doctor, Lenovo Diagnostics y HP UEFI Hardware Diagnostics en entornos WinPE y UEFI.",
    "Construir y personalizar un portal de diagnóstico interactivo propio con JavaScript y APIs de navegador."
  ],
  content: `
    <h3>1. Diagnóstico de Cámara y Micrófono con WebRTC</h3>
    <p>Las APIs modernas del navegador permiten interactuar directamente con el hardware multimedia sin instalar software adicional. Esto es ideal para diagnósticos rápidos:</p>
    <ul>
      <li><strong>navigator.mediaDevices.getUserMedia():</strong> API de JavaScript que solicita acceso a la cámara y/o micrófono del sistema. Si el dispositivo no aparece en la lista de <code>navigator.mediaDevices.enumerateDevices()</code>, el problema es a nivel de hardware (driver, flex cable o controlador).</li>
      <li><strong>Diferencia crítica:</strong> Si la cámara aparece en el Device Manager de Windows con código de error 43 pero no en el navegador, el problema es el driver. Si no aparece en Device Manager, el flex cable o el sensor están físicamente dañados.</li>
      <li><strong>Herramientas recomendadas:</strong> <code>webcamtests.com</code> (latencia, FPS y resolución), <code>onlinemictest.com</code> (grabación de referencia con espectro de frecuencias), <code>keyboardtester.io</code> (mapeo visual de teclas).</li>
    </ul>

    <h3>2. Diagnóstico de Teclado a Nivel de Scancode y HID</h3>
    <p>Un teclado que "no responde" puede tener fallos en 4 niveles distintos con diagnósticos diferentes:</p>
    <ul>
      <li><strong>Nivel 1 — Flex Cable:</strong> Si ninguna tecla de una zona responde pero otras sí (ej. fila F1-F4 muerta pero el resto funciona), el flex cable del teclado tiene una rotura física en esa sección. Medir continuidad con multímetro en las pistas del flex.</li>
      <li><strong>Nivel 2 — Matriz del Teclado:</strong> Los teclados usan una matriz de filas × columnas. Si una tecla falla sola, medir resistencia entre el pad de la fila y la columna correspondiente con el multímetro en frío. Un valor superior a 10MΩ indica membrana rota o contacto perdido.</li>
      <li><strong>Nivel 3 — Firmware del EC (KBC):</strong> El Embedded Controller interpreta los scancodes de la matriz. Si el EC tiene firmware dañado, puede generar teclas "fantasma" (tecla que aparece pulsada sola). Diagnóstico: conectar teclado USB externo — si funciona normal, el problema es el EC o el firmware.</li>
      <li><strong>Nivel 4 — HID en Windows:</strong> Usar <code>PowerShell: Get-PnpDevice | Where Class -eq "Keyboard"</code> para listar dispositivos HID. Si el teclado integrado aparece con falla, intentar reinstalar el driver del dispositivo HID.</li>
    </ul>

    <h3>3. Test de Pantalla: Dead Pixels, Uniformidad y Retroiluminación</h3>
    <p>El proceso sistemático de evaluación de una pantalla requiere tres pruebas distintas:</p>
    <ol>
      <li><strong>Test de Dead Pixels:</strong> Mostrar fondos de color sólido puro (rojo, verde, azul, blanco, negro) en pantalla completa. Los puntos muertos "stuck pixels" (siempre encendidos) se ven en el fondo negro. Los "dead pixels" (siempre apagados) se ven en fondos blancos. Herramienta: <code>deadpixeltest.org</code>.</li>
      <li><strong>Test de Uniformidad de Retroiluminación:</strong> En una habitación oscura, mostrar un gris uniforme al 50% de brillo. Las manchas amarillas, blanquecinas o zonas de "bleeding" (fuga de luz) en las esquinas indican deterioro del difusor o daño en los LEDs de retroiluminación.</li>
      <li><strong>Test de Respuesta y Angulo de Visión:</strong> Los paneles TN tienen ángulos estrechos donde el color se invierte; los IPS mantienen color hasta 178°. Un panel IPS que muestra inversión de color significa que la presión física ha dañado las capas de cristal líquido.</li>
    </ol>

    <h3>4. Suites de Diagnóstico Industrial: PC-Doctor y Herramientas OEM</h3>
    <ul>
      <li><strong>PC-Doctor for DOS (USB Booteable):</strong> Herramienta industrial que realiza pruebas a bajo nivel de bus PCIe, registros del CPU, lecturas de I2C de batería y diagnóstico de audio codec. Genera reportes XML con resultados de cada prueba.</li>
      <li><strong>Lenovo Diagnostics (UEFI + WinPE):</strong> Accesible presionando F10 durante el arranque en ThinkPads. Prueba memoria RAM sin iniciar Windows, identifica fallas de disco NVMe y comprueba la secuencia de carga de la batería. Los resultados se guardan en la NVRAM de la BIOS.</li>
      <li><strong>HP Hardware Diagnostics UEFI:</strong> Integrado en la BIOS de ProBooks y EliteBooks. Accessible con F2. Permite pruebas de "Fast Test" (3 minutos) y "Extensive Test" (1+ hora). Genera un código de error alfanumérico de 24 caracteres para soporte técnico de HP.</li>
    </ul>

    <h3>5. Construir tu Portal de Diagnóstico Propio</h3>
    <p>Un taller profesional puede crear su propio sistema de diagnóstico web personalizado usando HTML, CSS y JavaScript:</p>
    <ul>
      <li><strong>API de Batería (<code>navigator.getBattery()</code>):</strong> Muestra nivel de carga, si está cargando y el tiempo estimado de autonomía. Detecta baterías que no cargan desde el navegador.</li>
      <li><strong>API de Dispositivos (<code>navigator.mediaDevices</code>):</strong> Lista todas las cámaras y micrófonos conectados con sus IDs únicos.</li>
      <li><strong>API de Teclado (<code>KeyboardEvent</code>):</strong> Captura y muestra el scancode de cada tecla presionada para el mapa de diagnóstico.</li>
      <li><strong>Exportar reportes:</strong> Usar <code>JSON.stringify()</code> y un Blob para generar un archivo de reporte descargable con fecha, modelo del equipo (User Agent) y resultados de cada prueba.</li>
    </ul>
  `,
  glossary: [
    { term: "WebRTC", definition: "Web Real-Time Communication. API de HTML5 que permite comunicación multimedia directa en el navegador incluyendo acceso a cámara y micrófono sin plugins externos." },
    { term: "HID", definition: "Human Interface Device. Clase de dispositivos USB que incluye teclados, trackpads y ratones. El driver HID de Windows gestiona la comunicación con estos periféricos." },
    { term: "Scancode", definition: "Código numérico hexadecimal que identifica de forma única una tecla física en el teclado, independientemente del idioma o configuración del sistema operativo." },
    { term: "Dead Pixel", definition: "Píxel defectuoso en una pantalla LCD que permanece permanentemente apagado (negro) por fallo en el transistor TFT que lo controla." },
    { term: "Bleeding (Fuga de Luz)", definition: "Defecto de retroiluminación LED en pantallas IPS donde la luz se filtra por los bordes del panel, creando zonas brillantes irregulares en los bordes especialmente en fondos oscuros." },
    { term: "PC-Doctor", definition: "Suite profesional de diagnóstico de hardware que ejecuta pruebas a nivel de firmware para validar CPU, RAM, bus PCIe, audio y almacenamiento. Estándar industrial en centros de reacondicionamiento." }
  ],
  quiz: [
    {
      question: "Un técnico conecta una laptop con 'cámara no detectada' y la ejecuta en webcamtests.com. La cámara no aparece tampoco en la lista de dispositivos del navegador ni en el Administrador de Dispositivos de Windows. ¿Cuál es la causa más probable?",
      options: [
        "El navegador web tiene un bug de software",
        "El driver de cámara necesita actualizarse en Windows Update",
        "El flex cable de la cámara está físicamente desconectado o roto, o el sensor de imagen está dañado",
        "La resolución de la pantalla es incompatible con la cámara"
      ],
      answer: 2,
      explanation: "Si el dispositivo no aparece en el Administrador de Dispositivos, significa que el sistema operativo no detecta ningún hardware en el bus USB/PCIe correspondiente. Esto descarta fallos de driver y apunta directamente a una falla física: flex cable desconectado, roto o sensor dañado."
    },
    {
      question: "Al ejecutar un test de pantalla con fondo negro puro, encuentras 3 puntos que brillan en azul claro de forma permanente. ¿Cómo se clasifican estos defectos?",
      options: [
        "Dead pixels (píxeles muertos, apagados permanentemente)",
        "Stuck pixels (píxeles atascados, encendidos permanentemente en un color)",
        "Hot pixels (píxeles quemados por sobrecalentamiento del backlight)",
        "Bleeding pixels (fuga de retroiluminación)"
      ],
      answer: 1,
      explanation: "Los stuck pixels son aquellos cuyo transistor TFT está atascado en estado conductor (encendido), mostrando siempre el mismo color (rojo, verde o azul). Los dead pixels están completamente apagados y solo se ven en fondos blancos o claros como puntos negros."
    },
    {
      question: "Estás diagnosticando un teclado donde la fila completa de teclas numéricas 1-0 no responde, pero el resto del teclado funciona. Al conectar un teclado USB externo, funciona perfectamente. ¿Qué componente es el sospechoso principal?",
      options: [
        "El chip de BIOS SPI está corrupto",
        "El controlador PCH tiene una falla en su matriz de bus I2C",
        "El flex cable del teclado tiene una rotura física en la sección correspondiente a esa fila de contactos",
        "La memoria RAM está causando interferencia electromagnética"
      ],
      answer: 2,
      explanation: "El hecho de que toda una fila falle (patrón geométrico consistente) y el teclado externo funcione elimina al EC y a Windows como causa. Una rotura en el flex cable en la sección que conecta esa fila de la matriz es el diagnóstico más preciso."
    },
    {
      question: "¿Qué ventaja tienen las herramientas de diagnóstico UEFI (como Lenovo Diagnostics F10 o HP UEFI Diagnostics) frente a las herramientas que corren dentro de Windows?",
      options: [
        "Son más coloridas y tienen mejor interfaz gráfica",
        "Prueban el hardware directamente sin que Windows modifique las lecturas de sensores, reserva de memoria o recursos de dispositivos",
        "Generan reportes en formato PDF automáticamente",
        "Solo funcionan en laptops de gama alta"
      ],
      answer: 1,
      explanation: "Las herramientas UEFI se ejecutan antes de que Windows cargue, accediendo al hardware en estado limpio. Windows puede enmascarar fallas (por ejemplo, reserva zonas de RAM defectuosa y las oculta) que solo aparecen en diagnósticos a bajo nivel."
    },
    {
      question: "Al usar navigator.getBattery() en tu portal de diagnóstico web, el objeto devuelto muestra charging: true pero level: 0.15 (15%) después de 30 minutos conectado al cargador. ¿Qué sugiere esto?",
      options: [
        "El navegador no tiene permiso para leer la batería",
        "La batería está cargando lentamente pero el nivel es correcto",
        "Posible falla en el circuito de carga (Charger IC) que no entrega suficiente corriente, o celdas de batería muy degradadas con alta resistencia interna",
        "El sistema operativo tiene un bug de software en el monitor de batería"
      ],
      answer: 2,
      explanation: "Si tras 30 minutos la batería apenas subió del nivel inicial, hay un problema de corriente de carga insuficiente. Las causas son: Charger IC con falla parcial que limita la corriente de carga, o celdas de batería muy degradadas con alta resistencia interna que rechazan la corriente."
    }
  ],
  flashcards: [
    { question: "¿Qué API de navegador permite listar todos los dispositivos de cámara y micrófono conectados?", answer: "navigator.mediaDevices.enumerateDevices() retorna una lista de objetos MediaDeviceInfo con el tipo (audioinput/videoinput) e ID único de cada dispositivo detectado por el sistema." },
    { question: "¿Qué indica un teclado con teclas 'fantasma' (keypresses aleatorios sin presionar)?", answer: "Firmware del EC (KBC) dañado o corrupto, o cortocircuito en las líneas de la matriz del teclado que genera pulsaciones falsas al interpretar ruido eléctrico como activación de tecla." },
    { question: "¿Cuál es la diferencia entre un 'stuck pixel' y un 'dead pixel'?", answer: "Stuck pixel: transistor TFT bloqueado en estado ON, el píxel siempre brilla en un color (rojo, verde o azul). Dead pixel: transistor TFT no responde, el píxel está permanentemente negro/apagado." },
    { question: "¿Qué reporta el código de error de 24 caracteres de HP Hardware Diagnostics?", answer: "Identifica el tipo de falla, el componente específico, el número de prueba y el resultado. HP Support usa ese código para autorizar reemplazos en garantía sin necesidad de inspección física." },
    { question: "¿Por qué es útil probar un teclado con 'keyboardtester.io'?", answer: "Muestra visualmente en tiempo real qué teclas generan eventos HID. Permite identificar teclas que no envían scancode (falla mecánica/flex) vs. teclas que envían el scancode incorrecto (falla de firmware EC)." }
  ]
};
