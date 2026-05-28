export const module12 = {
    id: 12,
    title: "Producción y Flujo Industrial",
    image: "images/industrial_production.png",
    objectives: [
      "Optimizar el flujo de trabajo de recepción de lotes de equipos en laboratorios a escala.",
      "Implementar un etiquetado sistemático mediante códigos de barras y seriales de rastreo.",
      "Configurar y utilizar herramientas de clonación masiva sobre red local (FOG Project, MDT, PXE).",
      "Diseñar estaciones de QA masivo con pruebas en paralelo para optimizar tiempos.",
      "Establecer flujos de descarte rápido para optimizar la logística de refacciones."
    ],
    content: `
      <h3>1. Recepción y Triage de Lotes</h3>
      <p>En centros de reparación industrial, reacondicionamiento o soporte a gran escala, la organización logística es fundamental para evitar cuellos de botella:</p>
      <ul>
        <li><strong>Triage Inicial:</strong> Clasificar los equipos entrantes en tres grupos principales:
          <ol>
            <li><em>A: Fallas de Software / Estética rápida</em> (Rápido retorno).</li>
            <li><em>B: Fallas de Componentes Menores</em> (Teclados, pantallas, baterías, conectores).</li>
            <li><em>C: Fallas de Tarjeta Madre</em> (Cortocircuitos, BIOS corruptas, soldadura BGA).</li>
          </ol>
        </li>
        <li><strong>Rastreo mediante Códigos de Barras:</strong> Cada placa y chasis recibe una etiqueta adhesiva resistente a altas temperaturas con un código de barras único. Esto vincula de forma digital el historial de mediciones, componentes reemplazados, número de serie original de fábrica y nombre del técnico asignado.</li>
      </ul>

      <h3>2. Clonación e Instalación Masiva por Red</h3>
      <p>Una vez reparados los equipos de un lote grande, reinstalar sistemas operativos uno a uno mediante memorias USB individuales es ineficiente. Se utilizan herramientas de **despliegue por red**:</p>
      <ul>
        <li><strong>PXE Boot (Preboot Execution Environment):</strong> Protocolo que permite a la tarjeta de red de la laptop bootear e iniciar un sistema operativo básico cargado desde un servidor local de la red cableada (sin necesidad de almacenamiento local en la laptop).</li>
        <li><strong>FOG Project:</strong> Servidor de clonación de código abierto basado en Linux. Permite registrar las computadoras de un lote, tomar una imagen de disco maestro (previamente optimizada con controladores y software de diagnóstico) y desplegarla por red mediante multicast a 20 o 30 laptops simultáneamente a velocidades superiores a 5 GB/min por equipo.</li>
        <li><strong>MDT (Microsoft Deployment Toolkit):</strong> Permite automatizar la instalación limpia de Windows inyectando controladores específicos para cada marca y modelo de forma desatendida.</li>
      </ul>

      <h3>3. Estaciones de QA Masivo (Burn-In Testing)</h3>
      <p>Consiste en estantes equipados con conexiones de red cableadas y adaptadores de corriente universales donde se colocan múltiples laptops encendidas ejecutando suites de pruebas de forma ininterrumpida por 12-24 horas (Burn-In). Un servidor central recopila los logs de temperatura e informa de inmediato si algún equipo falla o se reinicia durante el proceso.</p>
    `,
    glossary: [
      { term: "PXE Boot", definition: "Entorno de ejecución previo al arranque que permite a una computadora arrancar utilizando una interfaz de red de forma independiente al almacenamiento local." },
      { term: "FOG Project", definition: "Solución de clonación de computadoras basada en red, que permite capturar, desplegar y administrar imágenes de disco de forma automatizada mediante red local." },
      { term: "Burn-In Testing", definition: "Prueba de esfuerzo prolongada de componentes electrónicos para detectar fallas infantiles o defectos de fabricación latentes antes de su entrega al cliente." },
      { term: "Triage", definition: "Método de clasificación rápida de equipos en función de la gravedad y tipología de sus fallas para optimizar los recursos del laboratorio." },
      { term: "Multicast", definition: "Método de transmisión de datos en red de un solo punto a múltiples destinos simultáneamente, reduciendo la saturación de ancho de banda del servidor." }
    ],
    quiz: [
      {
        question: "¿Qué protocolo de red permite a una laptop sin disco duro iniciar un sistema operativo cargado desde un servidor del taller?",
        options: [
          "HTTP / HTTPS",
          "PXE Boot (Preboot Execution Environment)",
          "FTP de transferencia rápida",
          "Bluetooth 5.0"
        ],
        answer: 1,
        explanation: "El protocolo PXE (generalmente pronunciado 'pixie') permite a la BIOS de la tarjeta de red del equipo obtener una dirección IP por DHCP y descargar un archivo de arranque básico desde un servidor TFTP de la red local para arrancar un sistema de diagnóstico."
      },
      {
        question: "Al clonar 20 laptops idénticas simultáneamente mediante FOG Project, ¿qué modo de transmisión de red evita saturar el ancho de banda del servidor?",
        options: [
          "Unicast (un hilo independiente por máquina)",
          "Multicast (el servidor envía los datos en un solo flujo común que todas las laptops leen a la vez)",
          "Comunicación por infrarrojos",
          "WiFi compartido de red doméstica"
        ],
        answer: 1,
        explanation: "El envío por Multicast permite al servidor enviar los paquetes de datos de la imagen del disco maestro una sola vez en la red local. Las 20 laptops reciben el mismo flujo de datos a la vez, multiplicando la eficiencia y reduciendo la carga del switch y del servidor."
      },
      {
        question: "¿Cuál es la función de una prueba 'Burn-In' en el control de calidad industrial?",
        options: [
          "Quemar las soldaduras viejas con calor",
          "Someter al equipo a una prueba de funcionamiento continuo por 12-24 horas para forzar la aparición de fallas de componentes inestables antes de su embalaje final",
          "Limpiar la resina adhesiva de los chips",
          "Validar el peso neto de la laptop"
        ],
        answer: 1,
        explanation: "Las fallas en soldaduras de componentes microscópicos o celdas de batería degradadas suelen aparecer por fatiga térmica acumulada. El Burn-In fuerza estas condiciones límite por varias horas para filtrar y corregir fallas en el taller, evitando que fallen en manos del cliente."
      },
      {
        question: "Estás organizando un lote de 100 computadoras portátiles corporativas retiradas para reacondicionamiento. ¿Cuál es la primera etapa logística?",
        options: [
          "Pintar las carcasas",
          "Ejecutar un triage y clasificación en función del estado estético y fallas funcionales críticas",
          "Comprar 100 discos duros nuevos",
          "Reprogramar la BIOS de los 100 equipos de forma obligatoria"
        ],
        answer: 1,
        explanation: "El triage clasifica qué equipos requieren soldadura compleja (costo y tiempo altos), cuáles repuestos rápidos y cuáles solo software, optimizando el presupuesto y el tiempo de entrega del lote."
      },
      {
        question: "¿Por qué es importante utilizar etiquetas con código de barras en el flujo de producción del taller?",
        options: [
          "Para que el cliente vea que la laptop brilla",
          "Para automatizar el seguimiento del historial de reparaciones, mediciones de diagnóstico, y componentes utilizados, evitando confusiones físicas de placas idénticas",
          "Para bloquear la BIOS por software",
          "Para aumentar la señal de la antena WiFi"
        ],
        answer: 1,
        explanation: "En un taller con cientos de placas base en reparación, muchas placas del mismo modelo son físicamente idénticas. El código de barras digitaliza la identidad y el estado exacto de diagnóstico de cada una, evitando errores de entrega o diagnósticos repetidos."
      }
    ],
    flashcards: [
      { question: "¿Qué significa PXE?", answer: "Preboot Execution Environment (Entorno de Ejecución Previo al Arranque) que permite arrancar sistemas sobre una tarjeta de red." },
      { question: "¿Qué hace sysprep en Windows?", answer: "Herramienta de Microsoft que limpia los identificadores únicos (SID) y controladores específicos de una instalación de Windows para permitir clonarla limpiamente en otros equipos." },
      { question: "¿Qué es una imagen máster (Golden Image)?", answer: "Instalación de referencia configurada con software de prueba, actualizaciones y optimizaciones, utilizada como base para clonar masivamente." },
      { question: "¿Qué es el descarte rápido?", answer: "Metodología para diagnosticar y descartar placas base insalvables (ej. CPU integrado en corto y placa perforada) en menos de 5 minutos para no perder tiempo en el taller." },
      { question: "¿Qué es el burn-in de batería?", answer: "Realizar múltiples ciclos controlados de carga y descarga total para validar la capacidad física real de retención de energía del componente." }
    ]
  };
