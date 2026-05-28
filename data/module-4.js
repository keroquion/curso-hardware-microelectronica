export const module4 = {
    id: 4,
    title: "Microelectrónica, Soldadura y Herramientas",
    image: "images/micro_soldering.png",
    objectives: [
      "Conocer las diferencias metalúrgicas y de temperatura entre aleaciones con y sin plomo.",
      "Ajustar los perfiles de temperatura y flujo de aire en estaciones de aire caliente y cautines T12/JBC.",
      "Dominar las técnicas profesionales de desoldado usando malla de cobre y flux de calidad.",
      "Realizar reconstrucción de pads destruidos y pistas microscópicas mediante jumpers y máscara UV.",
      "Reemplazar chips SMD de montaje superficial, circuitos QFN y controladores Super I/O."
    ],
    content: `
      <h3>1. Aleaciones de Soldadura</h3>
      <p>La soldadura utilizada en electrónica es una mezcla de metales con propiedades específicas:</p>
      <ul>
        <li><strong>Aleación Leaded (Con Plomo - 60/40 o 63/37 Sn/Pb):</strong> Punto de fusión bajo (~183°C). Es muy dócil, brilla al solidificarse, tiene alta resistencia a la fatiga térmica y es sumamente fácil de soldar. <em>Nota comercial:</em> Prohibida en la industria de manufactura masiva por normativas ambientales (RoHS), pero ampliamente usada en reparación por su facilidad de trabajo.</li>
        <li><strong>Aleación Lead-Free (Libre de Plomo - SAC305: Sn96.5/Ag3.0/Cu0.5):</strong> Punto de fusión elevado (~217°C a 220°C). Es más dura, propensa a quebraduras mecánicas (soldaduras frías), y requiere mayor temperatura en las herramientas de soldadura.</li>
      </ul>

      <h3>2. Uso de Flux y Capilaridad</h3>
      <p>El <strong>flux</strong> (fundente) es el elemento químico más importante del soldador. Sus funciones son:</p>
      <ol>
        <li>Limpiar la oxidación de los metales al calentarse.</li>
        <li>Facilitar la transferencia de calor de la herramienta a la placa.</li>
        <li>Mejorar la tensión superficial para que la soldadura líquida fluya y se adhiera únicamente a las partes metálicas (capilaridad).</li>
      </ol>
      <p>Para microelectrónica se requiere flux de tipo <em>No-Clean</em> de alta calidad (ej. Amtech NC-559 o Kingbo) para evitar residuos conductivos o corrosivos bajo los chips.</p>

      <h3>3. Control de Temperatura y Flujo de Aire</h3>
      <ul>
        <li><strong>Para desoldar chips QFN/Super I/O:</strong> Configurar la estación de aire caliente a unos 350°C - 380°C con flujo de aire medio para evitar volar componentes pequeños adyacentes. Precalentar la zona de forma uniforme antes de concentrar el calor sobre el chip.</li>
        <li><strong>Para cautines modernos (T12 / JBC):</strong> Utilizar puntas tipo cuchilla (K) o punta fina doblada. Trabajar a 320°C - 350°C. La potencia de estas estaciones permite calentar el cobre de la placa en milisegundos, evitando sobrecalentar y dañar los componentes internos.</li>
      </ul>

      <h3>4. Reconstrucción de Pistas y Jumpering</h3>
      <p>Cuando un pad o pista se desprende por corrosión (líquidos) o mal trabajo mecánico:</p>
      <ol>
        <li>Raspar suavemente la máscara verde del PCB para exponer el cobre sano de la pista restante usando un bisturí quirúrgico.</li>
        <li>Aplicar flux y estañar el cobre expuesto.</li>
        <li>Soldar un hilo de cobre esmaltado ultrafino (0.02mm o 0.09mm) desde la pista sana hasta el pad destruido.</li>
        <li>Aplicar una gota milimétrica de **máscara UV** (polímero fotosensible).</li>
        <li>Curar la máscara con una lámpara de luz ultravioleta por 10-30 segundos para aislar y fijar mecánicamente el cable de cobre.</li>
      </ol>
    `,
    glossary: [
      { term: "SAC305", definition: "Aleación estándar libre de plomo compuesta por 96.5% de Estaño, 3% de Plata y 0.5% de Cobre. Punto de fusión ~217°C." },
      { term: "Máscara UV", definition: "Resina líquida fotosensible que se solidifica bajo luz ultravioleta. Reemplaza el recubrimiento protector verde (solder mask) original de la placa." },
      { term: "Jumper", definition: "Cable puente de cobre esmaltado o aislado soldado manualmente para restablecer una conexión eléctrica interrumpida por una pista rota." },
      { term: "Drag Soldering (Soldadura por arrastre)", definition: "Técnica de soldadura rápida de chips QFP o conectores de muchos pines, usando una punta tipo cuchilla cargada de estaño y flux deslizada sobre los terminales." },
      { term: "Capilaridad", definition: "Fenómeno físico que atrae los líquidos (estaño fundido) a través de canales estrechos guiados por la fuerza del flux y la afinidad metálica." }
    ],
    quiz: [
      {
        question: "¿A qué temperatura aproximada funde la soldadura tradicional con plomo (63/37)?",
        options: [
          "100°C",
          "183°C",
          "217°C",
          "350°C"
        ],
        answer: 1,
        explanation: "La soldadura eutéctica con plomo (63% estaño y 37% plomo) funde exactamente a 183°C, permitiendo soldar con temperaturas más bajas en las herramientas."
      },
      {
        question: "Al soldar bajo el microscopio, ¿cuál es el objetivo principal del flux?",
        options: [
          "Enfriar rápidamente la soldadura para que se solidifique",
          "Adherir los chips mecánicamente a la placa antes de calentarlos",
          "Eliminar el óxido metálico de las superficies y mejorar la fluidez de la soldadura",
          "Pintar el circuito impreso de color verde"
        ],
        answer: 2,
        explanation: "El flux elimina la capa de óxido que se forma sobre los metales con el oxígeno del aire al aplicar calor, permitiendo que la soldadura estañe correctamente las terminales por capilaridad."
      },
      {
        question: "¿Cómo se debe curar la resina verde para reconstrucción de pistas?",
        options: [
          "Esperando 24 horas a temperatura ambiente",
          "Calentando con la estación de aire a 400°C",
          "Exponiendo la resina a luz ultravioleta (UV)",
          "Limpiando con alcohol isopropílico de alta concentración"
        ],
        answer: 2,
        explanation: "La máscara protectora UV es un polímero fotosensible que reacciona químicamente a la radiación ultravioleta, curando (endureciendo) en segundos."
      },
      {
        question: "¿Qué técnica de soldadura se recomienda para soldar un chip Super I/O (EC) de 128 pines de forma rápida y limpia?",
        options: [
          "Soldar pin por pin usando una punta aguja fina sin flux",
          "Técnica de soldadura por arrastre (drag soldering) usando flux abundante y punta de cuchilla",
          "Calentar todo el chip con soplete de gas butano",
          "Inyectar pasta de estaño fría y no usar calor"
        ],
        answer: 1,
        explanation: "El arrastre (drag soldering) con una punta tipo cuchilla (K) y abundante flux permite soldar decenas de pines alineados en segundos, ya que la tensión superficial y el flux guían la soldadura líquida solo a los pads de cobre, evitando puentes."
      },
      {
        question: "¿Qué material se utiliza para limpiar el exceso de soldadura de los pads de la placa dejándolos planos?",
        options: [
          "Alambre de hierro galvanizado",
          "Malla desoldadora de cobre trenzado impregnada con flux",
          "Papel lija de grano fino",
          "Bisturí quirúrgico calentado a 300°C"
        ],
        answer: 1,
        explanation: "La malla de desoldar de cobre absorbe el estaño fundido gracias a la capilaridad de su tejido metálico y al flux, dejando los pads de la placa limpios y planos para soldar el nuevo chip."
      }
    ],
    flashcards: [
      { question: "¿Qué es RoHS?", answer: "Restricción de Sustancias Peligrosas. Directiva europea que prohíbe el uso de plomo en aparatos electrónicos nuevos por motivos de salud ambiental." },
      { question: "¿Por qué se utiliza alcohol isopropílico?", answer: "Porque es un solvente que remueve el flux de forma eficiente y se evapora extremadamente rápido sin dejar agua ni humedad en la placa." },
      { question: "¿Qué es el reballing?", answer: "Proceso de retirar el estaño dañado de un chip BGA y colocar esferas nuevas de soldadura usando una plantilla o stencil metálico." },
      { question: "¿Qué pasa si tiras de la malla desoldadora con fuerza?", answer: "Puedes arrancar físicamente los delicados pads de cobre de la placa madre si la soldadura aún no está completamente fundida." },
      { question: "¿A qué temperatura funde la soldadura SAC305?", answer: "Funde aproximadamente a los 217°C, siendo la aleación libre de plomo más común de la industria." }
    ]
  };
