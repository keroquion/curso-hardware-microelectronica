export const module6 = {
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
  };
