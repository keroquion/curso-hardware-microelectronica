export const module5 = {
    id: 5,
    title: "Firmware, BIOS y Seguridad de Bajo Nivel",
    image: "images/bios_firmware.png",
    objectives: [
      "Diferenciar la arquitectura y funcionamiento de BIOS Legacy vs UEFI.",
      "Aprender a operar programadores de memoria flash por hardware (CH341A, RT809F, SVOD).",
      "Realizar lecturas directas y extracción de dumps de BIOS soldada y fuera de la placa.",
      "Dominar la edición hexadecimal de archivos binarios (.BIN / .ROM).",
      "Limpiar la región Intel ME (Management Engine) y AMD PSP para resolver fallas lógicas."
    ],
    content: `
      <h3>1. Arquitectura BIOS / UEFI</h3>
      <p>La BIOS (Basic Input/Output System) o la moderna **UEFI** (Unified Extensible Firmware Interface) es el código inicial que el procesador ejecuta al encenderse:</p>
      <ul>
        <li>Se almacena en chips de memoria flash EEPROM que se comunican por el bus SPI (Serial Peripheral Interface). Usualmente de 8 pines (como W25Q64 de 8MB o W25Q128 de 16MB) o de 16 pines.</li>
        <li><strong>Fallas comunes por BIOS corrupta:</strong> La placa enciende pero no da video, bucles infinitos de reinicio, ventilador a máxima velocidad de forma inmediata, o cuelgues aleatorios en el logotipo de la marca.</li>
      </ul>

      <h3>2. Programación de BIOS por Hardware</h3>
      <p>Cuando la BIOS está tan dañada que el equipo no arranca, debemos reprogramarla de forma externa:</p>
      <ol>
        <li><strong>Uso de pinza SOIC8:</strong> Permite leer/escribir el chip directamente en la placa sin desoldarlo. <em>¡Precaución!</em> Muchas placas modernas alimentan otros componentes a través de la línea de 3.3V del programador, causando lecturas corruptas o fallas. Es muy recomendable desoldar el chip para una programación 100% segura.</li>
        <li><strong>Programador CH341A:</strong> El más popular y económico. Requiere modificación a 3.3V en algunos modelos de PCB que entregan 5V en las líneas de datos.</li>
        <li><strong>Programadores Profesionales (RT809F, RT809H, SVOD):</strong> Tienen detección automática de pines, soporte para programar el chip del EC (Super I/O) a través del puerto del teclado e interfaces ISP rápidas.</li>
      </ol>

      <h3>3. Limpieza de Región Intel ME (Management Engine)</h3>
      <p>Las BIOS Intel contienen una sección de firmware llamada **Intel ME Region** que maneja la seguridad y funciones de bajo nivel. Está enlazada al PCH y procesador durante el primer arranque.</p>
      <ul>
        <li>Si soldamos una BIOS extraída de otra laptop idéntica (un "dump" sucio), la máquina podría tardar hasta 30 segundos en dar video, apagarse exactamente a los 30 minutos, o no regular las RPM del ventilador. Esto ocurre porque la región ME ya tiene grabada la identidad de la placa original.</li>
        <li><strong>Procedimiento de limpieza:</strong>
          <ol>
            <li>Abrir la BIOS con la herramienta **FIT (Flash Image Tool)** de Intel correspondiente a la generación del procesador.</li>
            <li>Extraer la región ME del archivo binario.</li>
            <li>Reemplazarla por un archivo ME "limpio" (RGN o EXTR) obtenido de la base de datos del fabricante.</li>
            <li>Reconstruir el binario final y programar el chip SPI.</li>
          </ol>
        </li>
      </ul>
    `,
    glossary: [
      { term: "SPI", definition: "Serial Peripheral Interface. Bus de comunicación serie síncrono de 4 hilos utilizado para la transferencia rápida de datos entre el CPU y el chip de BIOS." },
      { term: "Dump", definition: "Copia exacta del contenido de la memoria flash de un dispositivo de almacenamiento volcado a un archivo binario (.bin, .hex o .rom)." },
      { term: "Intel ME (Management Engine)", definition: "Subsistema autónomo integrado en los chipsets Intel que ejecuta su propio sistema operativo de bajo nivel y requiere una sección limpia de firmware para funcionar correctamente en una placa nueva." },
      { term: "Editor Hexadecimal", definition: "Software que permite visualizar y editar los bytes binarios de un archivo en formato hexadecimal (ej. HxD, Neo)." },
      { term: "ISP (In-System Programming)", definition: "Tecnología que permite programar chips integrados directamente en la tarjeta de circuito impreso sin retirarlos del circuito." }
    ],
    quiz: [
      {
        question: "¿Qué síntoma típico presenta una laptop Intel que tiene la región ME sucia o corrupta?",
        options: [
          "No detecta la batería",
          "La pantalla se ve azul y distorsionada",
          "Tarda 30 segundos en dar video o se apaga sola a los 30 minutos de encendida",
          "El disco duro gira en sentido contrario"
        ],
        answer: 2,
        explanation: "La región ME controla temporizadores de seguridad de bajo nivel. Si no está limpia o enlazada correctamente con el PCH, el sistema no se inicializa a tiempo (retardo de video) o se apaga a los 30 minutos por falta de comunicación segura."
      },
      {
        question: "¿Cuál es el voltaje de alimentación estándar de los chips de BIOS modernos en plataformas de bajo consumo (SoC)?",
        options: [
          "5.0V",
          "12.0V",
          "1.8V",
          "19.0V"
        ],
        answer: 2,
        explanation: "Las plataformas modernas de laptop usan memorias flash SPI de bajo consumo que operan a 1.8V (como la serie W25Q64FW) en lugar de los 3.3V tradicionales."
      },
      {
        question: "Al utilizar un programador CH341A para leer un chip de BIOS, ¿qué paso inicial es fundamental para evitar archivos corruptos?",
        options: [
          "Hacer una copia de seguridad (Read & Save) antes de borrar o escribir el chip",
          "Pintar el chip de color negro",
          "Limpiar la placa con agua y jabón",
          "Subir el voltaje de la fuente a 19V"
        ],
        answer: 0,
        explanation: "Nunca se debe escribir un chip sin antes respaldar su contenido actual (dump original). Incluso si está corrupto, puede contener datos vitales de calibración de fábrica (DMI, números de serie, llaves de Windows) que deben transferirse al nuevo archivo."
      },
      {
        question: "¿Qué herramienta oficial de Intel se utiliza para analizar y descomponer las imágenes de BIOS en sus diferentes regiones (BIOS, ME, Descriptor)?",
        options: [
          "Intel FIT (Flash Image Tool)",
          "Intel Extreme Tuning Utility",
          "Notepad++",
          "Windows Device Manager"
        ],
        answer: 0,
        explanation: "Intel FIT (Flash Image Tool) es la herramienta oficial de ingeniería que permite desmontar las imágenes de BIOS completas de Intel para actualizar la región ME."
      },
      {
        question: "¿Qué bus utiliza el programador SVOD para escribir firmware dentro de un controlador de teclado EC sin desoldarlo?",
        options: [
          "A través del conector del teclado (KBC connector) mapeando las líneas correspondientes",
          "Por puerto USB de carga rápida",
          "A través de la tarjeta de red WiFi",
          "Por medio del conector Jack de audio de 3.5mm"
        ],
        answer: 0,
        explanation: "El programador SVOD conecta un cable plano flexible al conector del teclado de la laptop madre y mapea los pines de bus de programación del EC (como ITE o ENE), permitiendo flashearlo directamente."
      }
    ],
    flashcards: [
      { question: "¿Qué contiene el Descriptor de una BIOS Intel?", answer: "La tabla de particiones y mapas de acceso a las distintas regiones de la memoria flash (BIOS, ME, GbE, etc.)." },
      { question: "¿Qué sucede si programamos una BIOS de 1.8V a 3.3V?", answer: "El chip de memoria flash SPI se dañará permanentemente por exceso de tensión térmica y eléctrica." },
      { question: "¿Qué datos del sistema se pierden si no se conserva la región DMI?", answer: "El número de serie del equipo, la clave de activación de Windows (inyectada en placa) y la dirección MAC de red original." },
      { question: "¿Qué hace la opción 'Verify' en el software de programación?", answer: "Compara bit a bit los datos escritos en la memoria flash con el archivo binario original para asegurar una escritura perfecta." },
      { question: "¿Qué es el firmware del EC?", answer: "Código básico que ejecuta el Embedded Controller independiente del CPU para manejar la secuencia física inicial, ventilación y batería." }
    ]
  };
