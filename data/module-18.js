export const module18 = {
  id: 18,
  title: "Ecosistema Apple: MacBooks Intel y Apple Silicon",
  image: "images/bios_firmware.png",
  objectives: [
    "Identificar las diferencias arquitectónicas entre MacBooks Intel (T2) y Apple Silicon (M1/M2/M3).",
    "Comprender el rol del chip T2, SMC y Apple Secure Enclave en la seguridad y reparación.",
    "Diagnosticar fallas de carga en MacBook usando el chip CD3215 y medidores USB-C.",
    "Utilizar herramientas de diagnóstico exclusivas de macOS: coconutBattery, TG Pro y comandos Terminal.",
    "Aplicar técnicas de reparación de puertos USB-C, pantallas Retina y trackpads en MacBooks."
  ],
  content: `
    <h3>1. Arquitectura MacBook Intel con Chip T2</h3>
    <p>Los MacBooks con procesadores Intel (2018-2020) incluyen el chip de seguridad Apple T2, que cambió radicalmente las posibilidades de reparación:</p>
    <ul>
      <li><strong>¿Qué hace el chip T2?</strong> Integra en un solo chip: el controlador del sistema (SMC), el controlador del SSD integrado con cifrado AES, el Touch ID, el Secure Enclave (bóveda de claves biométricas) y la Boot ROM de arranque.</li>
      <li><strong>Implicación crítica:</strong> El T2 cifra el SSD con una llave derivada del UID único del chip. Si el T2 falla, los datos del SSD son irrecuperables aunque se desuelda el chip NAND y se coloca en otro MacBook. El T2 también impide el arranque de software no autorizado mediante Secure Boot.</li>
      <li><strong>¿Por qué no funciona CH341A en MacBooks?</strong> En MacBooks Intel modernos, el chip de BIOS (EFI ROM) no está en un chip SPI estándar de 8 pines. Está integrado dentro del T2. Para reprogramar el firmware, se necesita el modo DFU (Device Firmware Upgrade) mediante Apple Configurator 2 o herramientas de servicio ASP.</li>
      <li><strong>Señales ACPI equivalentes en MacBook:</strong> PPBUS_G3H (≈ VIN 12-13V de batería), PP3V3_G3H (≈ 3.3V ALWAYS), PP5V0_USB3_HS_HOST (equivalente al VBUS de USB).</li>
    </ul>

    <h3>2. Apple Silicon: M1, M2, M3 — La Revolución SoC</h3>
    <p>Los MacBooks con Apple Silicon (desde 2020) representan el mayor cambio de arquitectura en la historia de la computación personal:</p>
    <ul>
      <li><strong>Memoria Unificada (UMA):</strong> La RAM no es un chip separado intercambiable. Está integrada directamente en el mismo paquete físico que el procesador (die-stacking). Esto significa que la RAM de un M1 MacBook Air de 8GB es literalmente parte del chip principal y no puede reemplazarse.</li>
      <li><strong>Implicaciones para reparación:</strong> Si el SoC (chip principal) falla, la laptop completa requiere reemplazo de la placa base. Sin embargo, todos los circuitos periféricos son reparables: carga USB-C, audio, pantalla eDP, antenas WiFi/BT, trackpad y teclado.</li>
      <li><strong>El chip de seguridad sigue presente:</strong> En Apple Silicon, las funciones del T2 están integradas directamente en el SoC. El modo DFU se activa mediante Apple Configurator 2 en un Mac de rescate.</li>
    </ul>

    <h3>3. Diagnóstico de Carga: CD3215 y el Ecosistema USB-C de Apple</h3>
    <p>El chip CD3215 (Texas Instruments) es el controlador de Power Delivery propietario de Apple, presente en MacBooks con USB-C. Es el componente que más falla cuando un MacBook "no carga":</p>
    <ul>
      <li><strong>¿Por qué falla el CD3215?</strong> Las descargas electrostáticas (ESD) al conectar el cargador, especialmente en ambientes secos, queman los diodos de protección internos del chip o destruyen directamente el IC.</li>
      <li><strong>Síntomas de CD3215 dañado:</strong>
        <ul>
          <li>MacBook no carga por ninguno de los puertos USB-C</li>
          <li>El FNIRSI FNB58 muestra que el cargador entrega 5V pero no negocia a 20V</li>
          <li>La pantalla de carga de macOS muestra "No se está cargando" aunque el adaptador esté conectado</li>
          <li>En casos de cortocircuito interno: el cargador original se apaga de forma inmediata (protección del cargador activa)</li>
        </ul>
      </li>
      <li><strong>Diagnóstico del CD3215:</strong>
        <ol>
          <li>Medir la impedancia a tierra de los pines VBUS del puerto USB-C en modo diodo. Un valor de 0.001V indica cortocircuito en el bus de potencia.</li>
          <li>Verificar el voltaje VDD del CD3215 (normalmente 3.3V). Si es 0V, el chip no tiene alimentación propia y no puede negociar.</li>
          <li>Usar el FNIRSI FNB58 entre cargador y MacBook: si el voltaje queda en 5V sin subir, la negociación PD falló.</li>
        </ol>
      </li>
    </ul>

    <h3>4. Herramientas de Diagnóstico Exclusivas de macOS</h3>
    <ul>
      <li><strong>coconutBattery:</strong> Muestra ciclos de carga reales, capacidad actual vs. capacidad de diseño, temperatura de la batería y protocolo de carga activo. Fundamental para evaluar el desgaste real de la batería antes de reemplazarla.</li>
      <li><strong>TG Pro:</strong> Accede a todos los sensores térmicos del MacBook (CPU, GPU, SSD, batería, case) con gráficas de temperatura en tiempo real. Detecta fallas de sensores que causan que el ventilador gire a máxima velocidad siempre.</li>
      <li><strong>Comandos de Terminal para técnicos:</strong>
        <ul>
          <li><code>system_profiler SPPowerDataType</code>: Reporta estado completo de la batería, ciclos, voltaje y amperios.</li>
          <li><code>pmset -g log | grep -i "sleep"</code>: Historial de eventos de encendido/apagado/suspensión. Detecta apagados inesperados por sobrecalentamiento.</li>
          <li><code>ioreg -rn AppleSmartBattery</code>: Lee directamente los registros SMBus de la batería, incluyendo temperatura interna, resistencia interna y estado de las celdas.</li>
        </ul>
      </li>
      <li><strong>Apple Diagnostics (D al encender):</strong> Suite UEFI integrada que prueba CPU, RAM, SSD, red y batería. Genera un código de referencia de 6-8 caracteres para soporte Apple.</li>
    </ul>

    <h3>5. Reparación de Puertos, Pantallas y Trackpads en MacBooks</h3>
    <ul>
      <li><strong>Puertos USB-C:</strong> Los conectores USB-C de MacBook son componentes SMD soldados en la placa. Requieren aire caliente a 380°C y flux abundante para desoldarse. El reemplazo del conector por sí solo (sin cambiar el CD3215) resuelve problemas de conector físicamente dañado.</li>
      <li><strong>Pantalla Retina:</strong> El circuito de retroiluminación usa el IC de driver LP8558 o similar. La falla más común es el "stage light effect": 7 puntos de luz visibles en la parte baja de la pantalla en un fondo oscuro, causados por daño en las líneas de retroiluminación del flex cable de la pantalla por la bisagra.</li>
      <li><strong>Trackpad MacBook:</strong> Los trackpads Force Touch de Apple usan sensores de fuerza piezoeléctricos. Si el trackpad no registra clics o registra clics falsos, verificar el flex cable de conexión y el controlador SPI del trackpad. En MacBooks recientes el trackpad comparte el bus SPI con el teclado.</li>
    </ul>
  `,
  glossary: [
    { term: "Chip T2 (Apple T2)", definition: "Coprocesador de seguridad de Apple integrado en MacBooks Intel 2018-2020 que controla el arranque seguro, cifra el SSD con AES-256, gestiona Touch ID y actúa como controlador del sistema (SMC)." },
    { term: "UMA (Unified Memory Architecture)", definition: "Arquitectura de Apple Silicon donde la RAM, GPU y CPU comparten el mismo pool de memoria físicamente integrado en el mismo paquete de silicio, eliminando la latencia de transferencia entre chips separados." },
    { term: "CD3215", definition: "Circuito integrado de Texas Instruments utilizado por Apple como controlador USB-C Power Delivery en MacBooks. Gestiona la negociación de voltaje, orientación del cable y modos alternativos (Thunderbolt, DisplayPort)." },
    { term: "DFU Mode (Device Firmware Upgrade)", definition: "Modo especial de recuperación de bajo nivel de Apple que permite reprogramar el firmware del chip T2 o del SoC Apple Silicon mediante Apple Configurator 2, incluso si el sistema no puede arrancar." },
    { term: "Stage Light Effect", definition: "Defecto visual en pantallas Retina de MacBook donde aparecen 7-8 zonas brillantes en forma de arco en la parte inferior de la pantalla en fondos oscuros, causado por daño en el flex cable de retroiluminación en la bisagra." },
    { term: "Secure Enclave", definition: "Procesador de seguridad aislado dentro del T2 o SoC Apple Silicon que almacena y procesa de forma criptográficamente segura las claves de Touch ID y Face ID sin que el sistema operativo principal pueda acceder directamente a ellas." }
  ],
  quiz: [
    {
      question: "Un MacBook Pro 2019 (Intel + T2) fue recibido con el SSD dañado. El técnico desuelda el chip NAND del SSD para recuperar los datos y lo coloca en otro MacBook idéntico. ¿Logrará recuperar los datos?",
      options: [
        "Sí, cualquier MacBook del mismo año puede leer el SSD",
        "No. El chip T2 cifra el SSD con una llave AES-256 única ligada al UID del T2 específico de esa placa. Sin ese T2, los datos son criptogrãficamente irrecuperables",
        "Sí, si se usa un programador CH341A para leer el chip NAND directamente",
        "No, porque el conector del SSD es propietario de Apple"
      ],
      answer: 1,
      explanation: "El T2 genera y almacena en su Secure Enclave una llave criptográfica AES-256 única derivada del UID del chip. Todos los datos del SSD están cifrados con esa llave. Sin el T2 original funcionando, no existe ninguna clave de descifrado accesible."
    },
    {
      question: "Al medir con FNIRSI FNB58 entre el cargador de 96W de Apple y un MacBook Air M2, el medidor muestra 5V con 0A de consumo y el voltaje no sube. ¿Cuál es el diagnóstico más probable?",
      options: [
        "El cargador original de Apple es defectuoso",
        "La batería del MacBook está completamente cargada",
        "El controlador USB-C del MacBook (CD3215 o equivalente en M2) no está respondiendo a la negociación Power Delivery para solicitar 20V",
        "macOS tiene un bug que bloquea la carga cuando hay actualizaciones pendientes"
      ],
      answer: 2,
      explanation: "5V con 0A indica que el cargador conectó físicamente y detectó la resistencia Rd, pero la negociación PD (para subir a 20V) nunca se completó. El controlador USB-C del MacBook (que en Apple Silicon está integrado en el SoC o en un chip externo) no respondió al protocolo."
    },
    {
      question: "Un cliente trae su MacBook Pro 16' 2021 (M1 Pro) diciendo que la RAM 'está lenta'. Quiere agregar más RAM. ¿Qué le explicas?",
      options: [
        "Que Apple cobra $200 adicionales por actualizar la RAM en tienda",
        "Que la RAM de los MacBooks con Apple Silicon está integrada en el mismo paquete físico del SoC y es físicamente imposible de reemplazar o ampliar por ningún técnico",
        "Que con un programador de BIOS se puede reprogramar el controlador de memoria para reconocer módulos LPDDR5 externos",
        "Que se puede añadir RAM vía Thunderbolt 4 con un dock externo"
      ],
      answer: 1,
      explanation: "En los SoC de Apple Silicon, la memoria LPDDR5 está integrada en el mismo paquete físico usando die-stacking. No es un DIMM ni un módulo soldado separado: es parte del chip principal. La única forma de tener más RAM es comprar el modelo con más RAM de fábrica."
    },
    {
      question: "Al ejecutar 'ioreg -rn AppleSmartBattery' en Terminal de macOS, el campo 'CycleCount' muestra 1245. El fabricante indica 1000 ciclos para el 80% de capacidad. ¿Qué información relevante obtienes?",
      options: [
        "La batería está en perfecto estado ya que 1245 > 1000",
        "El contador de ciclos está defectuoso y debe resetearse",
        "La batería ha superado significativamente su vida útil de diseño y probablemente tiene capacidad reducida y mayor resistencia interna, justificando su reemplazo",
        "macOS está mal configurado y muestra datos incorrectos"
      ],
      answer: 2,
      explanation: "Los fabricantes garantizan el 80% de capacidad original hasta los 1000 ciclos. Con 1245 ciclos, la batería operó 24.5% más de su vida útil garantizada. Es muy probable que la capacidad real esté por debajo del 75-70%, justificando el reemplazo para mejorar la autonomía."
    },
    {
      question: "Un MacBook Air 2020 (Intel) muestra el 'stage light effect': 7 zonas brillantes en el borde inferior de la pantalla en fondos oscuros. ¿Cuál es la causa más probable?",
      options: [
        "La GPU tiene una falla de VRAM",
        "La placa del controlador de pantalla (TCON) está dañada",
        "El flex cable de retroiluminación fue pinzado o roto por la bisagra al abrir y cerrar la laptop repetidamente, cortando algunas líneas de los LEDs de retroiluminación",
        "Los píxeles OLED de la parte inferior fallaron por uso prolongado"
      ],
      answer: 2,
      explanation: "El efecto 'stage light' es una falla mecánica característica de MacBooks. El flex cable que conecta la placa de retroiluminación LED pasa por la bisagra y con el tiempo se fractura en algunas líneas, dejando los LEDs del borde inferior sin señal de control, lo que causa la fuga de luz visible."
    }
  ],
  flashcards: [
    { question: "¿Qué es el modo DFU en MacBook?", answer: "Device Firmware Upgrade: modo especial de bajo nivel que permite a Apple Configurator 2 reprogramar el firmware del chip T2 o del SoC Apple Silicon cuando el sistema no puede arrancar normalmente." },
    { question: "¿Cuántos núcleos tiene el Apple M1 y de qué tipos?", answer: "8 núcleos de CPU (4 de alto rendimiento 'Firestorm' + 4 de eficiencia 'Icestorm'), 8 núcleos de GPU integrada, y 16 núcleos de Neural Engine para IA." },
    { question: "¿Qué muestra coconutBattery que no muestra macOS nativo?", answer: "Muestra los ciclos de carga reales, la capacidad actual vs. la capacidad de diseño original en mAh, la temperatura de la batería en tiempo real y el cargador detectado con su voltaje y amperaje actual." },
    { question: "¿Por qué los MacBooks con Apple Silicon arrancan más rápido que los Intel?", answer: "El SoC Apple Silicon incluye una Boot ROM de arranque seguro directa y la memoria unificada permite que el sistema operativo se cargue desde el NVMe integrado con latencias mínimas sin pasar por múltiples buses externos." },
    { question: "¿Qué diferencia hay entre el conector MagSafe y USB-C en términos de reparabilidad?", answer: "MagSafe usa un conector magnético propietario con pocas líneas (GND, VBUS, ID). USB-C tiene 24 pines y requiere el chip CD3215 para negociación PD. MagSafe se repara fácilmente; el puerto USB-C requiere reemplazar el conector SMD y posiblemente el controlador CD3215." }
  ]
};
