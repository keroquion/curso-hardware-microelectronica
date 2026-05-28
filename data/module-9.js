export const module9 = {
    id: 9,
    title: "BGA y Reparaciones Avanzadas",
    image: "images/bga_reballing.png",
    objectives: [
      "Comprender la diferencia metalúrgica e industrial entre procesos de Reflow y Reballing.",
      "Identificar y evitar fallas térmicas críticas como delaminación e imperfecciones mecánicas (cold joints).",
      "Calcular y programar perfiles térmicos precisos en soldadura BGA.",
      "Operar de forma segura precalentadores (preheaters) y termopares de monitoreo.",
      "Diagnosticar fallas complejas de comunicación en soldaduras bajo procesadores GPU y CPU."
    ],
    content: `
      <h3>1. Arquitectura BGA (Ball Grid Array)</h3>
      <p>Los chips de alta densidad como el CPU, GPU y el PCH no tienen patas en los costados. Se conectan a la placa mediante una matriz de esferas de soldadura diminutas en su parte inferior (BGA). Esto permite cientos de conexiones eléctricas en un área pequeña.</p>
      <ul>
        <li><strong>Falla térmica típica:</strong> Con los ciclos constantes de calentamiento y enfriamiento (dilatación y contracción), las esferas de soldadura debajo del chip sufren fatiga mecánica, agrietándose. Esto genera falsos contactos eléctricos (soldadura fría) que provocan que la máquina no dé video, no detecte la RAM o tenga pantallas azules constantes.</li>
      </ul>

      <h3>2. Reflow vs Reballing</h3>
      <ul>
        <li><strong>Reflow (Refusión):</strong> Consiste en aplicar flux y calentar el chip BGA hasta derretir las esferas existentes para que hagan contacto de nuevo. <strong>¡Es una reparación temporal y de mala calidad!</strong> La soldadura agrietada ya está oxidada y se volverá a romper en pocas semanas o meses. Solo se debe usar como prueba de diagnóstico rápido.</li>
        <li><strong>Reballing (Reesferado):</strong> Es la única solución profesional. Consiste en retirar el chip de la placa usando una estación Rework BGA, remover toda la soldadura vieja oxidada tanto de la placa como del chip, colocar esferas nuevas de soldadura (usualmente de plomo 63/37 para dar flexibilidad ante esfuerzos térmicos) usando una plantilla metálica (stencil) y volver a soldar el chip en la placa.</li>
      </ul>

      <h3>3. Perfiles Térmicos de Soldadura</h3>
      <p>Para desoldar y soldar un chip BGA sin destruir la placa base (pandeo o arqueamiento del PCB) o el propio silicio, se debe seguir una curva térmica controlada por computadora dividida en 4 fases principales:</p>
      <ol>
        <li><strong>Precalentamiento (Preheat):</strong> Se eleva la temperatura de toda la placa de forma lenta (Rampa de ~1°C a 2°C por segundo) usando el precalentador inferior (preheater) hasta unos 120°C - 150°C. Esto elimina la humedad interna del PCB y evita choques térmicos destructivos.</li>
        <li><strong>Activación del Flux (Soak / Remojo):</strong> Se mantiene la temperatura por 60-90 segundos para permitir que el flux penetre y active su limpieza química.</li>
        <li><strong>Refusión (Reflow / Peak):</strong> Se aplica calor por la parte superior (Top Heater) hasta alcanzar el punto de fusión de las esferas (220°C para sin plomo, 183°C con plomo) superándolo por unos 20°C a 30°C (temperatura pico de ~235°C a 245°C) por no más de 30-40 segundos para que todas las esferas se licúen y se unan.</li>
        <li><strong>Enfriamiento (Cooling):</strong> Se reduce la temperatura de forma controlada para formar una estructura cristalina sólida y resistente en la soldadura.</li>
      </ol>

      <h3>4. Riesgo de Delaminación (Efecto Popcorn)</h3>
      <p>Si la placa base o el chip BGA han estado almacenados en ambientes húmedos, el agua microscópica atrapada dentro de las capas de resina epoxi del PCB se evaporará instantáneamente al calentarse a más de 200°C. Esto expande las capas internas de forma explosiva, generando burbujas en el chip o deformando las pistas internas, destruyendo la placa por completo. Para evitar esto, las placas deben pasar por un proceso de <strong>deshumidificación (baking)</strong> en un horno a 100°C - 120°C durante 12-24 horas antes de aplicar calor BGA.</p>
    `,
    glossary: [
      { term: "BGA", definition: "Ball Grid Array (Matriz de Rejilla de Bolas). Encapsulado de montaje superficial que utiliza esferas de soldadura conductoras en su base en lugar de pines metálicos tradicionales." },
      { term: "Delaminación", definition: "Separación física de las capas internas de fibra de vidrio y cobre de un circuito impreso multicapa debido a la expansión violenta de humedad." },
      { term: "Preheater (Precalentador)", definition: "Elemento calefactor de infrarrojos o aire caliente colocado debajo de la placa madre para calentar uniformemente el área circundante antes del soldado superior." },
      { term: "Stencil (Plantilla BGA)", definition: "Lámina metálica perforada con láser con el patrón exacto de contactos del chip, utilizada para alinear y colocar las esferas de soldadura líquida o sólida en el chip." },
      { term: "Termopar (Thermocouple)", definition: "Sensor térmico compuesto por dos metales distintos que genera un voltaje proporcional a la temperatura en su unión. Se coloca tocando la placa junto al chip para monitorear el perfil térmico en tiempo real." }
    ],
    quiz: [
      {
        question: "¿Por qué el proceso de Reflow no es considerado una solución profesional o definitiva para fallas de soldadura en chips BGA?",
        options: [
          "Porque el flux de pino quema el chip",
          "Porque no retira la soldadura oxidada ni fatigada térmicamente, haciendo que la fisura vuelva a aparecer rápidamente",
          "Porque el osciloscopio no puede calibrarlo",
          "Porque es ilegal en talleres domésticos"
        ],
        answer: 1,
        explanation: "El reflow simplemente vuelve a derretir el estaño agrietado y oxidado que ya ha perdido sus propiedades mecánicas. Las impurezas y óxidos remanentes garantizan que la unión física colapse rápidamente de nuevo."
      },
      {
        question: "¿Cuál es el propósito principal del precalentador inferior (preheater) en una estación de Rework BGA?",
        options: [
          "Iluminar la zona inferior de la placa",
          "Enfriar la placa rápidamente",
          "Calentar de forma lenta y uniforme toda la tarjeta para evitar que el PCB se doble por diferencias de dilatación térmica",
          "Derretir los componentes plásticos no deseados"
        ],
        answer: 2,
        explanation: "Si calentamos solo la parte superior del PCB con aire caliente a 250°C, esa cara se expandirá mientras que la inferior fría no lo hará, curvando y rompiendo las pistas internas de la placa madre multicapa. El precalentador inferior equilibra la temperatura total."
      },
      {
        question: "¿Qué fenómeno físico genera burbujas destructivas en el encapsulado del chip si este absorbió humedad antes del proceso BGA?",
        options: [
          "La ley de Ampere",
          "El efecto 'Popcorn' (Delaminación por ebullición del agua atrapada)",
          "La inducción magnética del disipador",
          "El efecto Hall"
        ],
        answer: 1,
        explanation: "Al calentar el chip por encima del punto de ebullición del agua, la humedad microscópica interna se convierte en vapor a presión, inflando y separando las capas plásticas y de silicio del chip (efecto palomita de maíz)."
      },
      {
        question: "¿Qué aleación metálica es recomendada por los técnicos para realizar reballing manual debido a su flexibilidad mecánica y menor punto de fusión?",
        options: [
          "Estaño puro al 100%",
          "Plata y Cobre sin plomo (SAC305)",
          "Estaño con Plomo (63/37 Sn/Pb)",
          "Aluminio líquido"
        ],
        answer: 2,
        explanation: "La soldadura con plomo 63/37 funde a 183°C (menor estrés térmico sobre el chip) y es mucho más dúctil y elástica que la soldadura ecológica libre de plomo, tolerando mejor las flexiones físicas de la laptop."
      },
      {
        question: "Durante la fase Peak (Pico) de un perfil de soldadura BGA sin plomo, ¿a qué temperatura máxima aproximada debe llegar la soldadura bajo el chip?",
        options: [
          "150°C",
          "183°C",
          "235°C - 245°C",
          "400°C"
        ],
        answer: 2,
        explanation: "La soldadura libre de plomo funde a los 217°C. Para garantizar que todas las esferas de la matriz BGA se fundan y fusionen uniformemente, la temperatura del termopar de control debe alcanzar un pico de 235°C a 245°C durante un breve lapso."
      }
    ],
    flashcards: [
      { question: "¿Qué es el 'Underfill'?", answer: "Resina epoxi termoestable inyectada bajo los chips BGA de fábrica para absorber impactos mecánicos y proteger las soldaduras de la humedad." },
      { question: "¿Qué hace la rampa de temperatura?", answer: "La velocidad de incremento de calor medida en grados por segundo (°C/s) para evitar choques térmicos destructivos." },
      { question: "¿Para qué sirve el horneado (baking)?", answer: "Proceso de calentar placas y chips a baja temperatura (~100°C) por muchas horas para evaporar la humedad acumulada de forma segura antes del soldado." },
      { question: "¿Qué indica cuando un chip BGA 'flota' en la fase de reflow?", answer: "Significa que todas las esferas de soldadura debajo del chip se han licuado completamente, permitiendo un leve toque físico para que se auto-alinee por tensión superficial." },
      { question: "¿Cómo se limpia el estaño residual de los pads BGA en la placa?", answer: "Aplicando flux, usando un cautín con punta ancha de cuchilla y arrastrando suavemente malla de cobre desoldadora sobre la matriz." }
    ]
  };
