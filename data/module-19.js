export const module19 = {
  id: 19,
  title: "Gestión de Part Numbers, FRUs y Compatibilidad",
  image: "images/lab_diagnostic.png",
  objectives: [
    "Navegar y extraer información precisa de las bases de datos PSREF de Lenovo y Parts Lookup de HP.",
    "Decodificar el Part Number de un panel LCD para verificar su compatibilidad antes de comprarlo.",
    "Identificar equivalencias de MOSFETs, capacitores y otros componentes SMD entre fabricantes.",
    "Organizar un sistema de inventario de componentes SMD en el taller con etiquetado profesional.",
    "Decidir cuándo comprar un tablero donante vs. componentes individuales en función de costo y disponibilidad."
  ],
  content: `
    <h3>1. Ecosistema Lenovo: NM-Codes, FRU Numbers y PSREF</h3>
    <p>Lenovo tiene uno de los ecosistemas de documentación más completos de la industria, si sabes dónde mirar:</p>
    <ul>
      <li><strong>El código NM (Network Module):</strong> Es el identificador de ingeniería de la placa base, impreso directamente en el PCB (ej: <code>NM-A273</code>, <code>NM-B901</code>). Este código es más confiable que el número de modelo comercial porque identifica la revisión específica del PCB con todos sus componentes.</li>
      <li><strong>FRU Number (Field Replacement Unit):</strong> Código de 8 dígitos que Lenovo asigna a cada componente reemplazable. Por ejemplo: <code>5B20X19035</code> para una placa específica de ThinkPad E14 Gen 2. El FRU garantiza compatibilidad 100% con el modelo indicado.</li>
      <li><strong>Base de datos PSREF (Product Specifications Reference):</strong> Documento PDF oficial descargable desde <em>psref.lenovo.com</em> que lista TODAS las configuraciones posibles de un modelo (RAM, pantalla, teclado, placa, Wi-Fi). Permite saber exactamente qué pantalla FRU es compatible con una ThinkPad específica en el mercado latinoamericano vs. el mercado estadounidense.</li>
      <li><strong>Lenovo Parts Lookup:</strong> En <em>support.lenovo.com/partslookup</em>, ingresando el número de serie (MTM) de la laptop, obtienes la lista de partes exactas que componen ese equipo específico de fábrica, incluyendo el Part Number del panel de pantalla instalado.</li>
    </ul>

    <h3>2. Ecosistema HP: SPS Parts, QuickSpecs y Parts Surfer</h3>
    <ul>
      <li><strong>SPS (Spare Part Number):</strong> Sistema de codificación de HP para piezas de reemplazo. El número SPS de una placa base HP suele tener el formato <code>L83491-601</code> donde los últimos 3 dígitos indican la variante regional.</li>
      <li><strong>HP Parts Surfer (<em>partsurfer.hp.com</em>):</strong> Base de datos pública de HP. Ingresando el número de producto del equipo obtienes el explodia completo de piezas, incluidos tornillos, bisagras, conectores y placas de reemplazo con sus SPS numbers.</li>
      <li><strong>HP QuickSpecs:</strong> Documento técnico descargable desde <em>h20195.www2.hp.com</em> que describe las configuraciones de hardware oficiales de cada modelo comercial. Incluye los chipsets compatibles, memoria máxima y opciones de pantalla disponibles de fábrica.</li>
      <li><strong>BIOS Region y Variant:</strong> Las BIOS de laptops HP tienen códigos de región (ej: <code>-001</code> = USA, <code>-161</code> = México, <code>-201</code> = Europa). Flashear una BIOS con código de región incorrecto puede bloquear el teclado numérico, el idioma o la carga del cargador regional.</li>
    </ul>

    <h3>3. Decodificando el Part Number de una Pantalla LCD</h3>
    <p>Las pantallas LCD/IPS tienen códigos de identificación estandarizados por los fabricantes de paneles (LG Display, BOE, AUO, Innolux, Samsung Display). Aprender a leerlos evita comprar la pantalla incorrecta:</p>
    <ul>
      <li><strong>Ejemplo: <code>LP156WF6-SPK3</code></strong>
        <ul>
          <li><code>LP</code>: Fabricante (LP = LG Display)</li>
          <li><code>156</code>: Tamaño diagonal en décimas de pulgada (15.6")</li>
          <li><code>WF</code>: Tipo de panel (W = Wide, F = Full HD 1080p)</li>
          <li><code>6</code>: Generación del panel</li>
          <li><code>SP</code>: Subtipo (Single LVDS / eDP)</li>
          <li><code>K3</code>: Revisión del modelo</li>
        </ul>
      </li>
      <li><strong>Compatibilidad eDP:</strong> Verificar el número de carriles eDP (1, 2 o 4 carriles) y el voltaje de retroiluminación. Una pantalla de 4 carriles eDP no funciona en un conector de 2 carriles aunque el conector físico sea idéntico.</li>
      <li><strong>EDID:</strong> Usar el software <em>EDID Reader</em> o <em>MonInfo</em> para leer la EEPROM de la pantalla instalada y comparar resolución, frecuencia y señalización antes de ordenar el reemplazo.</li>
    </ul>

    <h3>4. Equivalencias de Componentes SMD entre Fabricantes</h3>
    <p>En el taller a veces el componente exacto no está disponible. Conocer las equivalencias ahorra tiempo y costo:</p>
    <ul>
      <li><strong>MOSFETs — Parámetros Críticos de Equivalencia:</strong>
        <ul>
          <li>Tipo de canal: N o P (no intercambiables)</li>
          <li>Voltaje máximo Drain-Source (Vds): debe ser igual o mayor al original</li>
          <li>Corriente máxima (Id): igual o mayor</li>
          <li>Resistencia en conducción (Rds_on): igual o menor para no generar más calor</li>
          <li>Empaque (Package): SOT-23, SOT-363, DFN, QFN — debe ser idéntico</li>
        </ul>
      </li>
      <li><strong>Ejemplo de equivalencias de MOSFET Canal P (SOT-23):</strong>
        <ul>
          <li><code>AO3401A</code> ≈ <code>SI2301CDS</code> ≈ <code>AP2301GH</code> ≈ <code>CJ2301</code></li>
          <li>Todos tienen Vds: -30V, Id: -4A, Rds: 65mΩ en SOT-23</li>
        </ul>
      </li>
      <li><strong>Capacitores MLCC:</strong> La equivalencia requiere: valor (ej. 10µF), voltaje (ej. 25V), dieléctrico (X5R es el estándar para placas madre, nunca usar Y5V), y empaque (0402, 0603, 0805). Un capacitor X5R de Murata puede reemplazarse con X5R de TDK o Samsung.</li>
      <li><strong>Bases de datos de búsqueda cruzada:</strong> <em>Octopart.com</em>, <em>DigiKey.com</em> (filtros avanzados de especificaciones), <em>Mouser.com</em>, <em>LCSC.com</em> (componentes económicos de fabricantes asiáticos).</li>
    </ul>

    <h3>5. Gestión de Inventario de Componentes en el Taller</h3>
    <p>Un taller organizado reduce el tiempo de reparación a la mitad. El sistema de inventario es tan importante como las herramientas:</p>
    <ul>
      <li><strong>Sistema de cajones con divisiones:</strong> Organizar por tipo de componente (resistencias, capacitores MLCC, MOSFETs, reguladores LDO) y por valor/tamaño. Etiquetar cada sección con valor, empaque y voltaje máximo.</li>
      <li><strong>Etiquetas con código QR:</strong> Usar una aplicación como ZXing o QR-Code-Generator para generar QR que enlacen al datasheet del componente. Escanear con el teléfono durante la reparación para ver las especificaciones completas.</li>
      <li><strong>Tablero donante vs. componentes individuales:</strong>
        <ul>
          <li>✅ <strong>Tablero donante</strong> (placa base rota usada como fuente de repuestos): conviene cuando necesitas chips BGA específicos (EC, PWM, Audio), chips raros de 100+ pines o conectores propietarios difíciles de encontrar.</li>
          <li>✅ <strong>Componentes individuales</strong> (Digikey/Mouser/LCSC): conviene para resistencias, capacitores, MOSFETs, diodos y reguladores LDO pequeños. Son económicos y disponibles con entrega rápida.</li>
        </ul>
      </li>
    </ul>

    <h3>6. Lectura Técnica de Especificaciones de Baterías de Laptop (Caso HP RE03XL)</h3>
    <p>Las baterías de litio de las laptops contienen etiquetas informativas obligatorias. Aprender a leer e interpretar correctamente esta información evita daños al equipo y permite un diagnóstico certero de la etapa de carga:</p>
    <div class="module-image-showcase">
      <img src="images/hp_battery_re03xl_specs.png" alt="Desglose de especificaciones de batería de laptop HP" style="width:100%;border-radius:10px;margin:1rem 0;box-shadow:0 4px 18px rgba(0,0,0,0.35);">
    </div>
    <ul>
      <li><strong>Model Name (Modelo Comercial):</strong> <code>RE03XL</code>. Es el código principal para buscar repuestos comerciales genéricos de reemplazo.</li>
      <li><strong>HP Spare Part (SPS Number):</strong> <code>L32407-AC2</code>. Código de inventario oficial de HP para repuestos de soporte. Su equivalente regulatorio de modelo es <code>HSTNN-OB1C</code>.</li>
      <li><strong>Voltaje Nominal:</strong> <code>11.55V</code>. Es el voltaje promedio de entrega de la batería basado en la cantidad de celdas en serie. Se compone típicamente de 3 celdas de polímero de litio en serie de 3.85V nominales cada una ($3 \times 3.85V = 11.55V$).</li>
      <li><strong>Capacidad de Energía (Wh):</strong> <code>45Wh</code>. Mide el trabajo eléctrico que puede realizar la batería en una hora. A mayor Wh, mayor autonomía de la laptop.</li>
      <li><strong>Capacidad de Carga (mAh / Rated Capacity):</strong> <code>3750mAh</code> (o 3.75 Ah). La relación matemática entre energía, voltaje y corriente es:
        <br>$$\text{Capacidad (Ah)} = \frac{\text{Energía (Wh)}}{\text{Voltaje (V)}} = \frac{45Wh}{11.55V} \approx 3.89 Ah \approx 3750mAh$$
      </li>
      <li><strong>Voltaje Límite de Carga (Charging Limit Voltage):</strong> <code>13.2Vdc</code>. Es el voltaje máximo al que el cargador e IC Charger de la laptop deben cargar la batería ($3 \text{ celdas} \times 4.40V \text{ por celda} = 13.2V$). Cargar la batería por encima de este límite provocará hinchamiento, fuego o explosión del litio.</li>
    </ul>
  `,
  glossary: [
    { term: "FRU (Field Replacement Unit)", definition: "Número de parte oficial asignado por el fabricante (Lenovo, HP, Dell) a cada componente diseñado para ser reemplazado en campo. Garantiza compatibilidad 100% con el modelo indicado." },
    { term: "PSREF (Product Specifications Reference)", definition: "Base de datos oficial de Lenovo que documenta todas las configuraciones de hardware disponibles para cada modelo de ThinkPad, IdeaPad y Legion, incluyendo FRU numbers de cada variante." },
    { term: "SPS (Spare Part Number)", definition: "Sistema de codificación de HP para identificar piezas de repuesto originales. El sufijo de 3 dígitos indica la variante regional del componente." },
    { term: "Rds_on (On-State Resistance)", definition: "Resistencia eléctrica entre Drain y Source de un MOSFET cuando está completamente encendido (saturado). Valores más bajos generan menos calor y son preferibles en circuitos de alta corriente." },
    { term: "eDP (Embedded DisplayPort)", definition: "Interfaz de alta velocidad para paneles integrados. El número de carriles (lanes) de 1, 2 o 4 determina el ancho de banda máximo y la compatibilidad física con el controlador gráfico." },
    { term: "LCSC", definition: "Distribuidor electrónico chino especializado en componentes SMD económicos de fabricantes asiáticos. Ideal para resistencias, capacitores y transistores genéricos de bajo costo." },
    { term: "Capacidad de energía (Wh)", definition: "Watt-hora. Medida de energía eléctrica almacenada en la batería. Define la cantidad total de watts que la batería puede entregar de forma continua en una hora." },
    { term: "Capacidad de carga (mAh)", definition: "Miliamperio-hora. Medida del flujo total de corriente eléctrica acumulada en las celdas químicas de la batería." }
  ],
  quiz: [
    {
      question: "Un técnico necesita una pantalla de repuesto para un ThinkPad E15 Gen 3. El número impreso en el panel original es 'B156HAN02.8'. ¿Qué información obtiene del código 'B156'?",
      options: [
        "B = BOE (fabricante del panel), 156 = pantalla de 15.6 pulgadas",
        "B = Brillo máximo en candelas, 156 = número de lote de fabricación",
        "B = Retroiluminación LED azul, 156 = resolución en píxeles por pulgada",
        "B = Batería integrada, 156 = capacidad en mWh"
      ],
      answer: 0,
      explanation: "El prefijo B en paneles LCD indica el fabricante BOE (Beijing Orion Electronics, uno de los mayores fabricantes de paneles del mundo). Los siguientes 3 dígitos (156) representan el tamaño diagonal en décimas de pulgada: 15.6 pulgadas."
    },
    {
      question: "Necesitas reemplazar el MOSFET AO3401A (Canal P, SOT-23) en una placa pero no está disponible localmente. ¿Cuál de estos componentes podría usarse como sustituto directo?",
      options: [
        "IRF3205 (Canal N, TO-220, 55V 110A)",
        "SI2301CDS (Canal P, SOT-23, Vds -30V, Id -4A)",
        "2N3904 (NPN BJT, TO-92)",
        "LM317 (Regulador lineal, TO-220)"
      ],
      answer: 1,
      explanation: "El SI2301CDS tiene el mismo tipo de canal (P), empaque idéntico (SOT-23), voltajes y corrientes equivalentes al AO3401A. Los parámetros críticos de equivalencia son: tipo de canal, Vds máximo, Id máximo, Rds_on y empaque físico."
    },
    {
      question: "Al buscar en HP Parts Surfer el número de parte de una pantalla, el sistema muestra dos opciones: '741476-001' y '741476-161'. ¿Qué diferencia el sufijo -001 del -161?",
      options: [
        "El -001 es la versión con retroiluminación LED y el -161 usa CCFL",
        "Son números de lote de fabricación sin diferencia funcional",
        "El sufijo indica la variante regional: -001 es USA/Canadá y -161 es América Latina/México",
        "El -001 incluye 2 años de garantía y el -161 solo 1 año"
      ],
      answer: 2,
      explanation: "HP usa sufijos numéricos de 3 dígitos para identificar variantes regionales del mismo componente. El -001 generalmente corresponde a USA, mientras que el -161 identifica la variante para América Latina/México. Pueden tener diferencias en el teclado (idioma), configuración de teclado numérico o voltaje del adaptador."
    },
    {
      question: "¿Cuál es el parámetro que NUNCA puede ser menor en el capacitor sustituto al reemplazar un MLCC de filtrado?",
      options: [
        "El color de la carcasa del componente",
        "El voltaje máximo de operación (nunca puede ser MENOR que el original)",
        "El fabricante (siempre debe ser la misma marca)",
        "El número de lote de producción"
      ],
      answer: 1,
      explanation: "El voltaje de operación de un capacitor de reemplazo NUNCA puede ser menor al original. Si el capacitor original es de 16V y se coloca uno de 10V en una línea de 12V, el componente fallará en poco tiempo. El sustituto puede tener mayor voltaje (ej. 25V en lugar de 16V) sin problema."
    },
    {
      question: "Tienes una laptop HP EliteBook 840 G8 con el chip de audio Realtek dañado. ¿Qué recurso usarías para encontrar el FRU correcto de la placa de reemplazo garantizando compatibilidad con el modelo específico del cliente?",
      options: [
        "Buscar en Google 'HP 840 G8 placa madre'",
        "Usar HP Parts Surfer ingresando el número de serie del equipo para obtener el SPS Number exacto de la placa base compatible",
        "Comprar cualquier placa de HP EliteBook 840 disponible en MercadoLibre",
        "Usar el Part Number impreso en la caja del empaque original"
      ],
      answer: 1,
      explanation: "HP Parts Surfer con el número de serie del equipo específico devuelve exactamente los SPS Numbers de las piezas que HP instaló en esa unidad de fábrica, garantizando compatibilidad de BIOS, región y configuración. Buscar genéricamente por modelo puede devolver placas de otras configuraciones (diferente procesador, distinta generación de batería)."
    },
    {
      question: "Una batería de laptop HP RE03XL declara especificaciones de 45Wh de energía y 11.55V nominales. De acuerdo con la relación eléctrica fundamental, ¿cuál es su capacidad aproximada de carga en mAh?",
      options: [
        "1500 mAh",
        "2800 mAh",
        "3750 mAh",
        "5000 mAh"
      ],
      answer: 2,
      explanation: "La relación matemática es: Capacidad (Ah) = Energía (Wh) / Voltaje (V). En este caso: 45Wh / 11.55V = 3.89 Ah, lo cual equivale aproximadamente a 3750 mAh."
    },
    {
      question: "Si una batería de litio de laptop de 11.55V nominales tiene una especificación de voltaje de límite de carga de 13.2V, ¿qué sucedería si el IC Charger del circuito de carga de la placa falla y le inyecta 15V de carga?",
      options: [
        "La batería cargará mucho más rápido sin efectos secundarios",
        "El voltaje excedente será ignorado por las celdas químicas",
        "Se corre un riesgo crítico de sobrecalentamiento, hinchamiento severo, fuego o explosión del litio",
        "La batería durará más horas en uso independiente"
      ],
      answer: 2,
      explanation: "Superar el voltaje límite de carga de las celdas químicas de litio (típicamente 4.40V por celda, o 13.2V para 3 celdas en serie) provoca sobrecarga severa, descomposición electrolítica, hinchamiento por desgasificación y una reacción térmica descontrolada altamente peligrosa."
    }
  ],
  flashcards: [
    { question: "¿Dónde se imprime el código NM de la placa base de un ThinkPad?", answer: "Directamente en el PCB de la placa base, usualmente en la capa de serigrafía blanca near el conector de la batería o el procesador. Formato: NM-XXXX (ej: NM-B621, NM-A741)." },
    { question: "¿Qué significa el dieléctrico X5R en un capacitor MLCC?", answer: "X5R indica que el capacitor opera correctamente en el rango de temperatura de -55°C a +85°C y que la variación de capacitancia en ese rango es de ±15%. Es el estándar para circuitos de alimentación en placas madre." },
    { question: "¿Cuál es la ventaja de comprar componentes en LCSC.com frente a DigiKey?", answer: "LCSC ofrece componentes genéricos asiáticos (resistencias, capacitores, transistores básicos) a precios muy inferiores. DigiKey garantiza componentes de marca con trazabilidad completa, preferible para chips críticos de alto costo." },
    { question: "¿Para qué sirve MonInfo en diagnóstico de pantallas?", answer: "Lee y muestra la EEPROM EDID de una pantalla conectada, mostrando el fabricante del panel, modelo, resolución nativa, frecuencia máxima, rangos de sincronización y tipo de interfaz (eDP/LVDS)." },
    { question: "¿Qué es un 'tablero donante'?", answer: "Una placa base funcional o semi-funcional del mismo modelo, adquirida a bajo costo por tener un daño irreparable (ej: procesador quemado), usada como fuente de componentes SMD o chips BGA para reparar otras placas del mismo modelo." },
    { question: "¿Cuál es la relación matemática fundamental en las especificaciones de una batería?", answer: "La capacidad de carga (Ah) es igual a la energía (Wh) dividida entre el voltaje nominal (V). Ah = Wh / V." },
    { question: "¿Qué riesgo existe al superar el voltaje límite de carga de una batería?", answer: "Existe riesgo crítico de sobrecalentamiento, liberación de gases que hinchan la batería, cortocircuitos internos, fuego o explosión térmica." }
  ]
};
