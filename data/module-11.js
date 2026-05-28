export const module11 = {
    id: 11,
    title: "Software Técnico y Linux",
    image: "images/linux_diagnostics.png",
    objectives: [
      "Crear y configurar unidades USB Live de Linux personalizadas para diagnóstico de hardware.",
      "Dominar utilidades avanzadas de testeo de memoria (MemTest86, OCCT).",
      "Interpretar lecturas de sensores de temperatura, voltaje y SMART (CrystalDiskInfo, HWInfo).",
      "Automatizar flujos de verificación mediante scripts y logs de rendimiento.",
      "Diseñar entornos técnicos portables aislados para pruebas seguras libres de virus."
    ],
    content: `
      <h3>1. Diagnóstico Mediante Sistemas Live de Linux</h3>
      <p>Cuando un equipo presenta fallas intermitentes de sistema operativo o sospechamos de virus o fallas del disco duro principal, utilizar un **sistema operativo Live** ejecutado directamente desde la memoria RAM mediante un puerto USB es el estándar profesional:</p>
      <ul>
        <li><strong>Aislamiento completo:</strong> Permite probar todo el hardware (tarjeta de sonido, puertos USB, teclado, conectores de video, WiFi) de forma independiente al sistema Windows del cliente.</li>
        <li>Distribuciones recomendadas: <strong>Mediccat USB</strong>, <strong>Hiren's BootCD PE</strong> o distribuciones Linux personalizadas basadas en Debian/Ubuntu que contienen herramientas de testeo preinstaladas.</li>
      </ul>

      <h3>2. Herramientas Críticas de Monitoreo de Hardware</h3>
      <ul>
        <li><strong>MemTest86 / MemTest86+:</strong> Herramienta que se ejecuta en modo booteable directo (fuera del sistema operativo) y satura las direcciones de memoria RAM con patrones de datos para descubrir fallas microscópicas de celdas que causan pantallas azules de Windows.</li>
        <li><strong>OCCT (OverClock Checking Tool):</strong> Suite de diagnóstico muy completa. Permite estresar de forma separada la RAM, el CPU (con instrucciones AVX), la GPU y la fuente de alimentación, registrando gráficas de temperatura, voltaje y RPM de los ventiladores.</li>
        <li><strong>HWInfo / HWMonitor:</strong> Software esencial para visualizar sensores integrados en la placa. Permite detectar si un riel de voltaje decae bajo carga o si el procesador está sufriendo "Thermal Throttling".</li>
        <li><strong>CrystalDiskInfo / GSmartControl:</strong> Lectura de registros SMART de discos de estado sólido (SSD) y mecánicos (HDD). Permite conocer el porcentaje de salud del disco, sectores reasignados, horas de uso y errores de bus PCIe.</li>
      </ul>

      <h3>3. Automatización de Pruebas y Reportes</h3>
      <p>Para sistematizar el control de calidad en talleres concurridos, se pueden compilar scripts ejecutables (usando scripts bash o instaladores desatendidos) que ejecuten de forma secuencial pruebas de lectura/escritura en discos de red, guarden un reporte en un archivo log de texto y verifiquen la firma digital del procesador.</p>
    `,
    glossary: [
      { term: "Linux Live USB", definition: "Unidad de almacenamiento USB booteable que contiene una distribución de Linux funcional que se carga y opera directamente en la memoria RAM." },
      { term: "S.M.A.R.T.", definition: "Self-Monitoring, Analysis and Reporting Technology. Sistema de monitoreo integrado en discos de almacenamiento para detectar y predecir fallas." },
      { term: "Sector Reasignado", definition: "Sector del disco duro que ha fallado mecánicamente o lógicamente y cuyos datos han sido transferidos a un área de reserva del disco." },
      { term: "AVX Instructions", definition: "Advanced Vector Extensions. Extensiones de arquitectura de CPU que realizan cálculos matemáticos masivos en paralelo, utilizadas para estresar al máximo la temperatura del procesador." },
      { term: "Mediccat USB", definition: "Caja de herramientas de diagnóstico de hardware en formato USB booteable que compila decenas de utilidades de rescate y pruebas de componentes." }
    ],
    quiz: [
      {
        question: "¿Por qué se prefiere ejecutar MemTest86 desde un USB booteable en lugar de un software de prueba dentro de Windows?",
        options: [
          "Porque el USB lee más rápido la memoria",
          "Para evitar que el sistema operativo Windows cargue en la RAM y bloquee el acceso directo a ciertas direcciones de memoria física impidiendo probarlas",
          "Porque Windows daña las memorias RAM permanentemente",
          "Porque no requiere energía eléctrica de la placa"
        ],
        answer: 1,
        explanation: "Windows se reserva grandes porciones de memoria RAM para su núcleo (Kernel) y controladores, bloqueando el acceso a software de diagnóstico convencional. Bootear MemTest86 fuera de Windows permite probar el 100% de la RAM física."
      },
      {
        question: "Al analizar un disco de estado sólido SSD con CrystalDiskInfo, ¿qué parámetro nos avisa sobre el desgaste de las celdas flash de escritura de forma directa?",
        options: [
          "La velocidad de rotación",
          "El parámetro 'Porcentaje de Vida Útil / Salud' basado en los TBW (Terabytes Escritos)",
          "El color del disipador de la laptop",
          "La versión del protocolo SATA del disco duro mecánico"
        ],
        answer: 1,
        explanation: "Las memorias Flash NAND tienen un límite físico de ciclos de borrado y escritura (TBW). Los SSD modernos registran estos valores en sus registros SMART y CrystalDiskInfo los interpreta para calcular el porcentaje de salud restante."
      },
      {
        question: "¿Qué síntoma presenta un equipo que sufre de 'Thermal Throttling' severo según las gráficas de HWInfo?",
        options: [
          "El ventilador se apaga por completo",
          "La frecuencia de reloj del CPU decae drásticamente (ej. a 800MHz) al alcanzar los 95°C-100°C para protegerse del calor",
          "El sistema operativo cambia el idioma automáticamente",
          "El voltaje de la batería sube al doble de su valor nominal"
        ],
        answer: 1,
        explanation: "El estrangulamiento térmico reduce la frecuencia y voltaje del procesador para mitigar la disipación térmica cuando la refrigeración es ineficiente. Se manifiesta como una ralentización extrema bajo carga pesada."
      },
      {
        question: "Estás probando la estabilidad de una tarjeta gráfica discretizada (GPU) reparada mediante soldadura BGA. ¿Qué test de OCCT es el más adecuado?",
        options: [
          "El test de CPU",
          "El test de GPU (con verificación de errores de memoria VRAM activa)",
          "El test de lectura de tarjeta de sonido",
          "El test de escritura de la BIOS SPI"
        ],
        answer: 1,
        explanation: "El test de GPU de OCCT renderiza gráficos complejos y calcula operaciones matemáticas en la VRAM, verificando activamente si se producen artefactos visuales o errores de cálculo que evidencien soldaduras defectuosas bajo las memorias o el núcleo gráfico."
      },
      {
        question: "¿Qué ventaja principal ofrece realizar pruebas de hardware con una distribución Live USB en comparación con usar el disco duro original del cliente?",
        options: [
          "Aumenta permanentemente el rendimiento físico de los componentes",
          "Previene que posibles virus o fallas lógicas de software en el sistema operativo del cliente distorsionen las mediciones de estabilidad de hardware",
          "Permite soldar componentes sin necesidad de apagar la placa",
          "Repara de forma física las pistas destruidas"
        ],
        answer: 1,
        explanation: "Usar un sistema Live USB proporciona un entorno limpio, controlado y predecible. Si la máquina se congela con el Live USB, confirmas una falla física de hardware; si funciona perfecto, sabes que el problema está en el software/Windows del cliente."
      }
    ],
    flashcards: [
      { question: "¿Qué significan las siglas S.M.A.R.T.?", answer: "Self-Monitoring, Analysis and Reporting Technology (Tecnología de Autocontrol, Análisis e Informes) integrada en unidades de almacenamiento." },
      { question: "¿Qué son los TBW en un SSD?", answer: "Terabytes Written. Cantidad total de datos en Terabytes que se pueden escribir en un SSD antes de que sus celdas flash comiencen a degradarse." },
      { question: "¿Cómo ayuda Hiren's BootCD?", answer: "Compila un entorno Windows PE ligero y portátil con utilidades preinstaladas para resetear contraseñas, clonar discos y testear componentes." },
      { question: "¿Qué hace la prueba 'Power' en OCCT?", answer: "Satura simultáneamente CPU y GPU para demandar el máximo consumo eléctrico a la fuente de alimentación, testeando su estabilidad y protecciones." },
      { question: "¿Qué indica un estado SMART de 'Riesgo' (Caution) en amarillo?", answer: "Indica la presencia de sectores con errores de lectura, sectores reasignados o temperaturas críticas de operación." }
    ]
  };
