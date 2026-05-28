export const module15 = {
    id: 15,
    title: "Testers Especializados para Diagnóstico Rápido",
    image: "images/diagnostic_testers_tools.png",
    objectives: [
      "Conocer y utilizar el tester de slots RAM (DDR3/DDR4/DDR5) para verificar continuidad del bus de memoria sin encender la placa.",
      "Dominar el uso del tester de bobinas/inductores (CT-1, MaAnt M093, RELIFE XA5) mediante inducción electromagnética para diagnóstico no invasivo.",
      "Utilizar testers de puertos USB-A y USB-C con indicadores LED y beeper para validar continuidad de señales de datos y alimentación.",
      "Aplicar adaptadores diagnósticos M.2 NVMe para leer velocidades reales de un SSD y separar fallas de la unidad vs. el slot de la placa.",
      "Usar medidores USB tipo FNIRSI FNB58 para capturar perfiles de carga, voltaje y corriente en puertos USB-C con Power Delivery.",
      "Integrar el medidor LCR para medir la inductancia real de bobinas SMD y verificar su valor nominal sin desoldar.",
      "Interpretar lecturas del multímetro en modo diodo para confirmar cortocircuitos en líneas de alimentación de forma rápida y precisa."
    ],
    content: `
      <div class="module-image-showcase">
        <img src="images/diagnostic_testers_tools.png" alt="Colección completa de testers especializados para diagnóstico rápido de laptops" style="width:100%;border-radius:12px;margin-bottom:1.5rem;box-shadow:0 4px 24px rgba(0,0,0,0.4);">
      </div>

      <div style="background:linear-gradient(135deg, rgba(0,255,136,0.08), rgba(0,200,255,0.06));border-left:4px solid var(--accent-green);padding:1.2rem 1.5rem;border-radius:0 12px 12px 0;margin-bottom:2rem;">
        <strong style="color:var(--accent-green);font-size:1.1rem;">💡 Filosofía de este Módulo</strong>
        <p style="margin:0.5rem 0 0 0;">Un técnico de nivel junior diagnostica con "a ver si es esto". Un técnico profesional <strong>descarta componentes en segundos usando herramientas dedicadas</strong>. Este módulo te enseña a pasar de la adivinanza al diagnóstico quirúrgico. Cada minuto ahorrado es dinero ganado y reputación construida.</p>
      </div>

      <h3>1. Tester de Slot de RAM (Memory Slot Tester)</h3>
      <p>Cuando una laptop llega al taller con pantalla negra y sospechamos de la memoria, la primera pregunta es: <strong>¿falla la RAM o falla el slot?</strong> El tester de slot RAM resuelve esto <em>sin necesidad de encender la placa</em>.</p>

      <div class="module-image-showcase">
        <img src="images/ram_tester_slot_card.png" alt="Tester de slot DDR4 con LEDs indicadores insertado en placa madre" style="width:100%;border-radius:10px;margin:1rem 0;box-shadow:0 4px 18px rgba(0,0,0,0.35);">
      </div>

      <h4>📋 Datos Técnicos del Bus de Memoria</h4>
      <table style="width:100%;border-collapse:collapse;margin:1rem 0;font-size:0.9rem;">
        <tr style="background:rgba(255,255,255,0.05);">
          <th style="text-align:left;padding:10px;border-bottom:1px solid rgba(255,255,255,0.1);">Tipo</th>
          <th style="text-align:left;padding:10px;border-bottom:1px solid rgba(255,255,255,0.1);">Pines Totales</th>
          <th style="text-align:left;padding:10px;border-bottom:1px solid rgba(255,255,255,0.1);">Voltaje VDD</th>
          <th style="text-align:left;padding:10px;border-bottom:1px solid rgba(255,255,255,0.1);">Líneas de Datos</th>
          <th style="text-align:left;padding:10px;border-bottom:1px solid rgba(255,255,255,0.1);">Líneas de Dirección</th>
        </tr>
        <tr>
          <td style="padding:8px;border-bottom:1px solid rgba(255,255,255,0.05);">DDR3 SO-DIMM</td>
          <td style="padding:8px;border-bottom:1px solid rgba(255,255,255,0.05);">204</td>
          <td style="padding:8px;border-bottom:1px solid rgba(255,255,255,0.05);">1.50V ± 5%</td>
          <td style="padding:8px;border-bottom:1px solid rgba(255,255,255,0.05);">DQ0–DQ63</td>
          <td style="padding:8px;border-bottom:1px solid rgba(255,255,255,0.05);">A0–A14</td>
        </tr>
        <tr style="background:rgba(255,255,255,0.02);">
          <td style="padding:8px;border-bottom:1px solid rgba(255,255,255,0.05);">DDR4 SO-DIMM</td>
          <td style="padding:8px;border-bottom:1px solid rgba(255,255,255,0.05);">260</td>
          <td style="padding:8px;border-bottom:1px solid rgba(255,255,255,0.05);">1.20V ± 5%</td>
          <td style="padding:8px;border-bottom:1px solid rgba(255,255,255,0.05);">DQ0–DQ63</td>
          <td style="padding:8px;border-bottom:1px solid rgba(255,255,255,0.05);">A0–A16</td>
        </tr>
        <tr>
          <td style="padding:8px;border-bottom:1px solid rgba(255,255,255,0.05);">DDR5 SO-DIMM</td>
          <td style="padding:8px;border-bottom:1px solid rgba(255,255,255,0.05);">262</td>
          <td style="padding:8px;border-bottom:1px solid rgba(255,255,255,0.05);">1.10V ± 3%</td>
          <td style="padding:8px;border-bottom:1px solid rgba(255,255,255,0.05);">DQ0–DQ63 (2 canales × 32)</td>
          <td style="padding:8px;border-bottom:1px solid rgba(255,255,255,0.05);">A0–A17</td>
        </tr>
      </table>

      <ul>
        <li><strong>¿Qué es?</strong> Una pequeña tarjeta PCB con contactos dorados en el formato DDR3, DDR4 o DDR5 que se inserta en el slot de memoria. Cuenta con su propia alimentación (batería de botón CR2032 o USB) y una fila de LEDs indicadores.</li>
        <li><strong>¿Cómo funciona?</strong> La tarjeta inyecta señales de prueba a cada línea de datos (DQ0–DQ63), dirección (A0–A14/A17), comando (CS#, RAS#, CAS#, WE#) y alimentación (VDD, VDDQ) del slot. Si algún LED no enciende, existe una línea rota o en corto en el PCB o en el controlador de memoria (IMC) del CPU.</li>
        <li><strong>⚠️ Limitación crítica:</strong> Solo realiza comprobaciones de continuidad eléctrica. <em>No puede detectar fallos a nivel de celda de memoria</em> (datos corruptos, latencias fuera de especificación). Para eso se requiere MemTest86+ desde un USB booteable en una placa funcional.</li>
      </ul>

      <div style="background:rgba(255,165,0,0.08);border-left:4px solid var(--accent-orange);padding:1rem 1.2rem;border-radius:0 10px 10px 0;margin:1.5rem 0;">
        <strong style="color:var(--accent-orange);">🔧 Hack de Taller — El "Truco del Slot Vacío"</strong>
        <p style="margin:0.5rem 0 0 0;">Si NO tienes un tester de slot RAM, puedes hacer un diagnóstico parcial con el <strong>multímetro en modo diodo</strong>: mide la impedancia entre el pin VDD del slot y tierra (GND). En DDR4, debes leer <strong>~0.450V–0.600V</strong> (presencia de diodos de protección del IMC). Si lees <strong>0.001V (cortocircuito)</strong> o <strong>OL (circuito abierto)</strong>, el slot tiene daño en su riel de alimentación. Este método te da un diagnóstico del 70% de los casos en 30 segundos.</p>
      </div>

      <h4>📊 Tabla de Diagnóstico Rápido: Slot RAM</h4>
      <table style="width:100%;border-collapse:collapse;margin:1rem 0;font-size:0.9rem;">
        <tr style="background:rgba(0,200,255,0.1);">
          <th style="text-align:left;padding:10px;border-bottom:1px solid rgba(255,255,255,0.15);">Resultado del Tester</th>
          <th style="text-align:left;padding:10px;border-bottom:1px solid rgba(255,255,255,0.15);">Diagnóstico</th>
          <th style="text-align:left;padding:10px;border-bottom:1px solid rgba(255,255,255,0.15);">Acción</th>
        </tr>
        <tr>
          <td style="padding:8px;border-bottom:1px solid rgba(255,255,255,0.05);">✅ Todos los LEDs verdes</td>
          <td style="padding:8px;border-bottom:1px solid rgba(255,255,255,0.05);">Slot OK — el problema es la RAM, el IMC del CPU, o la BIOS</td>
          <td style="padding:8px;border-bottom:1px solid rgba(255,255,255,0.05);">Probar RAM de referencia conocida. Si falla, revisar voltaje VDD en la bobina del riel de RAM</td>
        </tr>
        <tr style="background:rgba(255,255,255,0.02);">
          <td style="padding:8px;border-bottom:1px solid rgba(255,255,255,0.05);">🟡 LED de VDD encendido, LEDs de datos apagados</td>
          <td style="padding:8px;border-bottom:1px solid rgba(255,255,255,0.05);">Líneas de datos DQ rotas entre slot y CPU (pista fracturada)</td>
          <td style="padding:8px;border-bottom:1px solid rgba(255,255,255,0.05);">Verificar pistas bajo microscopio. Posible fractura por flexión del PCB</td>
        </tr>
        <tr>
          <td style="padding:8px;border-bottom:1px solid rgba(255,255,255,0.05);">🔴 Ningún LED enciende</td>
          <td style="padding:8px;border-bottom:1px solid rgba(255,255,255,0.05);">Sin alimentación al slot — bobina de RAM rota o PWM sin funcionar</td>
          <td style="padding:8px;border-bottom:1px solid rgba(255,255,255,0.05);">Medir voltaje VDD en la bobina con multímetro. DDR4 = 1.2V. Si es 0V, revisar el PWM de RAM</td>
        </tr>
        <tr style="background:rgba(255,255,255,0.02);">
          <td style="padding:8px;border-bottom:1px solid rgba(255,255,255,0.05);">🟠 LEDs parpadean de forma errática</td>
          <td style="padding:8px;border-bottom:1px solid rgba(255,255,255,0.05);">Cortocircuito parcial en alguna línea (posible soldadura fría en BGA del CPU)</td>
          <td style="padding:8px;border-bottom:1px solid rgba(255,255,255,0.05);">Verificar impedancia en modo diodo entre pines DQ sospechosos y tierra</td>
        </tr>
      </table>

      <h3>2. Tester de Bobinas e Inductores (Coil Tester / Inductor Detector)</h3>
      <p>Esta herramienta ha <strong>revolucionado</strong> el diagnóstico de fuentes de poder en placas madre. Antes, para saber si una bobina estaba abierta internamente había que desoldarla. Ahora basta con <strong>acercar la punta del tester</strong> sin tocar siquiera el componente.</p>

      <div class="module-image-showcase">
        <img src="images/coil_tester_bobina.png" alt="Técnico usando tester de bobinas RELIFE sobre inductores SMD de placa madre de laptop" style="width:100%;border-radius:10px;margin:1rem 0;box-shadow:0 4px 18px rgba(0,0,0,0.35);">
      </div>

      <h4>⚡ Principio de Funcionamiento: Inducción Electromagnética</h4>
      <p>La punta del tester genera un campo magnético de alta frecuencia (~100kHz–500kHz). Cuando se acerca a una bobina sana, la bobina responde electromagnéticamente (Ley de Faraday): sus espiras generan una corriente inducida que el circuito del tester detecta.</p>

      <ul>
        <li><strong>Bobina sana:</strong> LED verde + tono continuo (en modelos con beeper). La corriente inducida confirma integridad de las espiras.</li>
        <li><strong>Bobina abierta (hilo roto):</strong> LED rojo o silencio. No hay circuito cerrado → no hay respuesta inductiva. La bobina tiene una ruptura interna causada por vibración, sobrecalentamiento o fatiga mecánica.</li>
        <li><strong>Bobina en corto (espiras pegadas):</strong> El tester da una lectura errática o anómalamente alta. Las espiras cortocircuitadas reducen la inductancia real y alteran la respuesta electromagnética.</li>
      </ul>

      <div style="background:rgba(0,255,136,0.08);border-left:4px solid var(--accent-green);padding:1rem 1.2rem;border-radius:0 10px 10px 0;margin:1.5rem 0;">
        <strong style="color:var(--accent-green);">🔧 Hack de Taller — "El Método del Barrido en 2 Minutos"</strong>
        <p style="margin:0.5rem 0 0 0;">Cuando recibes una placa con "no enciende" y no sabes por dónde empezar: <strong>toma el tester de bobinas y barre TODAS las bobinas de la placa en secuencia</strong>. Son solo 10-20 bobinas en la mayoría de laptops. Cualquier bobina que no responda te indica exactamente qué riel de voltaje tiene problemas. En 2 minutos ya tienes un mapa mental de "qué líneas están vivas y cuáles no".</p>
        <p style="margin:0.5rem 0 0 0;"><strong>Dato clave:</strong> La primera pista con cortocircuito marca el inicio de tu diagnóstico. Enfoca tu esfuerzo ahí antes de medir nada más.</p>
      </div>

      <h4>📊 Modelos Recomendados: Comparativa</h4>
      <table style="width:100%;border-collapse:collapse;margin:1rem 0;font-size:0.9rem;">
        <tr style="background:rgba(0,200,255,0.1);">
          <th style="text-align:left;padding:10px;border-bottom:1px solid rgba(255,255,255,0.15);">Modelo</th>
          <th style="text-align:left;padding:10px;border-bottom:1px solid rgba(255,255,255,0.15);">Precio Aprox.</th>
          <th style="text-align:left;padding:10px;border-bottom:1px solid rgba(255,255,255,0.15);">Indicación</th>
          <th style="text-align:left;padding:10px;border-bottom:1px solid rgba(255,255,255,0.15);">Mejor Para</th>
        </tr>
        <tr>
          <td style="padding:8px;border-bottom:1px solid rgba(255,255,255,0.05);"><strong>JTX CT-1</strong></td>
          <td style="padding:8px;border-bottom:1px solid rgba(255,255,255,0.05);">$15–25 USD</td>
          <td style="padding:8px;border-bottom:1px solid rgba(255,255,255,0.05);">LED verde/rojo</td>
          <td style="padding:8px;border-bottom:1px solid rgba(255,255,255,0.05);">Talleres principiantes. Económico y funcional</td>
        </tr>
        <tr style="background:rgba(255,255,255,0.02);">
          <td style="padding:8px;border-bottom:1px solid rgba(255,255,255,0.05);"><strong>MaAnt M093</strong></td>
          <td style="padding:8px;border-bottom:1px solid rgba(255,255,255,0.05);">$25–40 USD</td>
          <td style="padding:8px;border-bottom:1px solid rgba(255,255,255,0.05);">LED + sensibilidad alta</td>
          <td style="padding:8px;border-bottom:1px solid rgba(255,255,255,0.05);">MacBooks y placas densas con bobinas pequeñas</td>
        </tr>
        <tr>
          <td style="padding:8px;border-bottom:1px solid rgba(255,255,255,0.05);"><strong>RELIFE XA5</strong></td>
          <td style="padding:8px;border-bottom:1px solid rgba(255,255,255,0.05);">$30–50 USD</td>
          <td style="padding:8px;border-bottom:1px solid rgba(255,255,255,0.05);">Pantalla digital + LED</td>
          <td style="padding:8px;border-bottom:1px solid rgba(255,255,255,0.05);">Medir valor µH aproximado sin desoldar</td>
        </tr>
        <tr style="background:rgba(255,255,255,0.02);">
          <td style="padding:8px;border-bottom:1px solid rgba(255,255,255,0.05);"><strong>LANRUI K7</strong></td>
          <td style="padding:8px;border-bottom:1px solid rgba(255,255,255,0.05);">$20–35 USD</td>
          <td style="padding:8px;border-bottom:1px solid rgba(255,255,255,0.05);">Beep de audio + LED</td>
          <td style="padding:8px;border-bottom:1px solid rgba(255,255,255,0.05);">Trabajar con microscopio sin apartar la vista</td>
        </tr>
      </table>

      <p><strong>⚠️ Regla de Oro:</strong> El tester de bobinas <em>no requiere que la placa esté encendida</em>. Se usa <strong>siempre en frío</strong>, antes de conectar cualquier fuente de alimentación. Esto lo hace completamente seguro.</p>

      <div style="background:rgba(255,165,0,0.08);border-left:4px solid var(--accent-orange);padding:1rem 1.2rem;border-radius:0 10px 10px 0;margin:1.5rem 0;">
        <strong style="color:var(--accent-orange);">🏭 Caso Real de Taller</strong>
        <p style="margin:0.5rem 0 0 0;">Una Lenovo IdeaPad 330 llega sin encender. Consumo en fuente: 0.000A. Usando el tester CT-1 sobre las bobinas, encuentro que la bobina de <strong>3.3V ALW (Always-On)</strong> no responde. Con el multímetro en modo diodo, confirmo cortocircuito: <strong>lectura 0.004V a tierra</strong> (debería ser >0.350V). El culpable: un capacitor cerámico de filtrado (MLCC) en esa línea, fracturado internamente. Al removerlo, la resistencia sube a 0.550V. Soldé la placa, encendió. <strong>Tiempo total: 12 minutos.</strong> Sin el tester de bobinas, habría tardado 1 hora midiendo cada línea manualmente.</p>
      </div>

      <h3>3. Multímetro en Modo Diodo: La Técnica que Todo Experto Domina</h3>
      <p>El multímetro en modo diodo es la herramienta de diagnóstico <strong>más poderosa y más subestimada</strong> del taller. A diferencia del modo de resistencia (ohmios), el modo diodo inyecta una corriente de prueba constante y mide la <strong>caída de voltaje</strong> a través del componente, lo cual es infinitamente más útil para encontrar cortocircuitos en placas madre.</p>

      <h4>📋 Cómo Leer las Mediciones</h4>
      <table style="width:100%;border-collapse:collapse;margin:1rem 0;font-size:0.9rem;">
        <tr style="background:rgba(0,200,255,0.1);">
          <th style="text-align:left;padding:10px;border-bottom:1px solid rgba(255,255,255,0.15);">Lectura en Modo Diodo</th>
          <th style="text-align:left;padding:10px;border-bottom:1px solid rgba(255,255,255,0.15);">Significado</th>
          <th style="text-align:left;padding:10px;border-bottom:1px solid rgba(255,255,255,0.15);">Ejemplo Real</th>
        </tr>
        <tr>
          <td style="padding:8px;border-bottom:1px solid rgba(255,255,255,0.05);"><strong>0.000V – 0.050V</strong></td>
          <td style="padding:8px;border-bottom:1px solid rgba(255,255,255,0.05);">🔴 Cortocircuito directo a tierra</td>
          <td style="padding:8px;border-bottom:1px solid rgba(255,255,255,0.05);">MLCC fracturado, MOSFET perforado, diodo quemado</td>
        </tr>
        <tr style="background:rgba(255,255,255,0.02);">
          <td style="padding:8px;border-bottom:1px solid rgba(255,255,255,0.05);"><strong>0.050V – 0.200V</strong></td>
          <td style="padding:8px;border-bottom:1px solid rgba(255,255,255,0.05);">🟠 Cortocircuito parcial o resistencia muy baja</td>
          <td style="padding:8px;border-bottom:1px solid rgba(255,255,255,0.05);">Posible capacitor degradado o fuga en chip</td>
        </tr>
        <tr>
          <td style="padding:8px;border-bottom:1px solid rgba(255,255,255,0.05);"><strong>0.300V – 0.600V</strong></td>
          <td style="padding:8px;border-bottom:1px solid rgba(255,255,255,0.05);">✅ Lectura normal (impedancia saludable)</td>
          <td style="padding:8px;border-bottom:1px solid rgba(255,255,255,0.05);">Línea de voltaje con capacitores y diodos de protección intactos</td>
        </tr>
        <tr style="background:rgba(255,255,255,0.02);">
          <td style="padding:8px;border-bottom:1px solid rgba(255,255,255,0.05);"><strong>OL (Over Limit)</strong></td>
          <td style="padding:8px;border-bottom:1px solid rgba(255,255,255,0.05);">🟡 Circuito abierto — no hay camino a tierra</td>
          <td style="padding:8px;border-bottom:1px solid rgba(255,255,255,0.05);">Bobina rota internamente, pista cortada o fusible quemado</td>
        </tr>
      </table>

      <h4>📋 Valores de Referencia por Línea (Placa Sana)</h4>
      <table style="width:100%;border-collapse:collapse;margin:1rem 0;font-size:0.9rem;">
        <tr style="background:rgba(0,200,255,0.1);">
          <th style="text-align:left;padding:10px;border-bottom:1px solid rgba(255,255,255,0.15);">Línea de Voltaje</th>
          <th style="text-align:left;padding:10px;border-bottom:1px solid rgba(255,255,255,0.15);">Lectura Modo Diodo (Bobina a GND)</th>
          <th style="text-align:left;padding:10px;border-bottom:1px solid rgba(255,255,255,0.15);">Si marca <0.050V</th>
        </tr>
        <tr>
          <td style="padding:8px;border-bottom:1px solid rgba(255,255,255,0.05);">19V (Entrada principal)</td>
          <td style="padding:8px;border-bottom:1px solid rgba(255,255,255,0.05);">0.350V – 0.550V</td>
          <td style="padding:8px;border-bottom:1px solid rgba(255,255,255,0.05);">Corto en MOSFET de entrada o capacitor de filtro</td>
        </tr>
        <tr style="background:rgba(255,255,255,0.02);">
          <td style="padding:8px;border-bottom:1px solid rgba(255,255,255,0.05);">3.3V ALW (Always-On)</td>
          <td style="padding:8px;border-bottom:1px solid rgba(255,255,255,0.05);">0.400V – 0.580V</td>
          <td style="padding:8px;border-bottom:1px solid rgba(255,255,255,0.05);">Corto en capacitor cerámico MLCC o EC dañado</td>
        </tr>
        <tr>
          <td style="padding:8px;border-bottom:1px solid rgba(255,255,255,0.05);">5V ALW</td>
          <td style="padding:8px;border-bottom:1px solid rgba(255,255,255,0.05);">0.380V – 0.520V</td>
          <td style="padding:8px;border-bottom:1px solid rgba(255,255,255,0.05);">Corto en capacitor de filtrado o chip USB</td>
        </tr>
        <tr style="background:rgba(255,255,255,0.02);">
          <td style="padding:8px;border-bottom:1px solid rgba(255,255,255,0.05);">CPU VCORE (0.8V–1.2V)</td>
          <td style="padding:8px;border-bottom:1px solid rgba(255,255,255,0.05);">0.020V – 0.080V (normal bajo por impedancia del die)</td>
          <td style="padding:8px;border-bottom:1px solid rgba(255,255,255,0.05);">⚠️ Normal. El die del CPU tiene impedancia muy baja. Compara con placa buena</td>
        </tr>
        <tr>
          <td style="padding:8px;border-bottom:1px solid rgba(255,255,255,0.05);">VDD RAM (1.2V DDR4)</td>
          <td style="padding:8px;border-bottom:1px solid rgba(255,255,255,0.05);">0.350V – 0.500V</td>
          <td style="padding:8px;border-bottom:1px solid rgba(255,255,255,0.05);">Corto en módulo RAM o en riel de alimentación del slot</td>
        </tr>
      </table>

      <div style="background:rgba(255,50,50,0.08);border-left:4px solid #ff4444;padding:1rem 1.2rem;border-radius:0 10px 10px 0;margin:1.5rem 0;">
        <strong style="color:#ff6666;">⚠️ Trampa Común: La Lectura del VCORE</strong>
        <p style="margin:0.5rem 0 0 0;">La línea de CPU VCORE <strong>siempre mide muy bajo</strong> en modo diodo (0.020V–0.080V) porque el dado de silicio del procesador tiene una impedancia extremadamente baja por naturaleza. <strong>Esto NO es cortocircuito.</strong> Si ves 0.035V en VCORE, no cambies el capacitor. Compara siempre contra una placa buena del mismo modelo. Solo si mide <strong>0.001V–0.005V</strong> (prácticamente cero) hay un MOSFET de VRM perforado.</p>
      </div>

      <h3>4. Tester de Puertos USB con Beeper (USB Port Tester)</h3>
      <p>Los puertos USB son uno de los elementos más maltratados de una laptop. Los clientes los fuerzan, meten cargadores incorrectos, y las descargas electrostáticas (ESD) queman los diodos de protección. El tester USB permite diagnosticar en <strong>segundos</strong> si el puerto entrega voltaje correcto y si las líneas de datos tienen continuidad.</p>

      <div class="module-image-showcase">
        <img src="images/usb_port_tester_beeper.png" alt="Tester USB con beeper y LEDs indicadores conectado a puerto USB de laptop" style="width:100%;border-radius:10px;margin:1rem 0;box-shadow:0 4px 18px rgba(0,0,0,0.35);">
      </div>

      <h4>📋 Interpretación de LEDs</h4>
      <ul>
        <li><strong>🟢 LED VBUS (5V):</strong> El controlador USB del PCH está alimentando el puerto correctamente. <em>Dato: El USB 2.0 debe entregar 5V ±5% con hasta 500mA. USB 3.0 sube a 900mA.</em></li>
        <li><strong>🟡 LED D+ / D-:</strong> Las líneas de datos tienen continuidad hacia el chip HUB USB o el PCH. Si estos LEDs no encienden, puede haber un diodo ESD quemado o una pista rota en la placa.</li>
        <li><strong>🔴 LED de Error + BEEPER:</strong> Detecta inversión de polaridad, ausencia de tierra o sobretensión (>5.5V), situaciones que indican fallo en el controlador de potencia USB.</li>
      </ul>

      <h4>🔊 El Tester con Beeper: Diagnóstico sin Mirar</h4>
      <p>Especialmente útil cuando el técnico trabaja con <strong>microscopio binocular</strong> o tiene las manos ocupadas con la estación de soldadura. El sonido confirma la lectura sin necesidad de mover la cabeza para mirar el dispositivo.</p>
      <ul>
        <li>🔊 <strong>Un pitido largo continuo</strong> = Señal correcta (VBUS + D+ + D- OK)</li>
        <li>🔊🔊 <strong>Dos pitidos cortos</strong> = Fallo detectado (línea de datos abierta o voltaje fuera de rango)</li>
        <li>🔇 <strong>Silencio total</strong> = Puerto completamente muerto (sin voltaje de ningún tipo)</li>
      </ul>

      <div style="background:rgba(255,165,0,0.08);border-left:4px solid var(--accent-orange);padding:1rem 1.2rem;border-radius:0 10px 10px 0;margin:1.5rem 0;">
        <strong style="color:var(--accent-orange);">🔧 Hack de Taller — El "Test de Arranque USB"</strong>
        <p style="margin:0.5rem 0 0 0;">En placas que "no dan video" pero parece que hacen POST: inserta el tester USB en cada puerto. Si los LEDs del tester <strong>encienden 3-5 segundos después de presionar el botón de encendido</strong>, significa que la placa está completando la secuencia de encendido hasta el punto donde el EC activa los puertos USB. Esto confirma que el CPU arranca, que hay POST, y que el problema probablemente es solo de video (pantalla, cable eDP o GPU).</p>
      </div>

      <h4>📋 Diagnóstico Avanzado — Medidor FNIRSI FNB58</h4>
      <p>Este instrumento de alta gama se conecta <strong>en serie</strong> entre el cargador USB-C y la laptop. Muestra en pantalla a color:</p>
      <ul>
        <li>📊 Voltaje en tiempo real (resolución 0.001V)</li>
        <li>⚡ Corriente actual (resolución 0.001A)</li>
        <li>🔋 Potencia en watts calculada</li>
        <li>📡 Protocolo de carga activo (USB-PD 2.0, PD 3.0, QC 2.0, QC 3.0, Apple 2.4A, Samsung AFC)</li>
        <li>📈 Capacidad acumulada (mAh) para medir la carga real que entra a la batería</li>
      </ul>

      <div style="background:rgba(0,255,136,0.08);border-left:4px solid var(--accent-green);padding:1rem 1.2rem;border-radius:0 10px 10px 0;margin:1.5rem 0;">
        <strong style="color:var(--accent-green);">🏭 Caso Real — Diagnóstico de Carga Intermitente</strong>
        <p style="margin:0.5rem 0 0 0;">MacBook Air M1 que "a veces carga y a veces no". El FNIRSI FNB58 revela: el cargador negocia a 20V correctamente, pero la corriente fluctúa entre 2.3A y 0.0A de forma cíclica cada 8 segundos. <strong>Diagnóstico:</strong> el chip CD3215 (USB-C PD controller de Apple) tiene una soldadura fría y pierde la comunicación PD cada 8 segundos, forzando al cargador a renegociar. <strong>Sin el FNIRSI</strong>, este problema habría sido imposible de diagnosticar con multímetro estándar porque los ciclos de 8 segundos son demasiado rápidos para leer manualmente.</p>
      </div>

      <h3>5. Adaptador Diagnóstico M.2 NVMe (M.2 Tester)</h3>
      <p>Cuando una laptop no detecta su disco M.2, la pregunta crucial es: <strong>¿está dañado el SSD o el slot M.2 de la placa?</strong> El adaptador diagnóstico M.2 permite resolver esto en menos de 2 minutos.</p>

      <div class="module-image-showcase">
        <img src="images/m2_nvme_tester.png" alt="Adaptador diagnóstico M.2 NVMe mostrando velocidades de lectura/escritura en pantalla digital" style="width:100%;border-radius:10px;margin:1rem 0;box-shadow:0 4px 18px rgba(0,0,0,0.35);">
      </div>

      <h4>📋 Velocidades de Referencia para SSD Sanos</h4>
      <table style="width:100%;border-collapse:collapse;margin:1rem 0;font-size:0.9rem;">
        <tr style="background:rgba(0,200,255,0.1);">
          <th style="text-align:left;padding:10px;border-bottom:1px solid rgba(255,255,255,0.15);">Tipo SSD</th>
          <th style="text-align:left;padding:10px;border-bottom:1px solid rgba(255,255,255,0.15);">Lectura Secuencial</th>
          <th style="text-align:left;padding:10px;border-bottom:1px solid rgba(255,255,255,0.15);">Escritura Secuencial</th>
          <th style="text-align:left;padding:10px;border-bottom:1px solid rgba(255,255,255,0.15);">Si marca <50% del esperado</th>
        </tr>
        <tr>
          <td style="padding:8px;border-bottom:1px solid rgba(255,255,255,0.05);">SATA M.2 (B+M key)</td>
          <td style="padding:8px;border-bottom:1px solid rgba(255,255,255,0.05);">~550 MB/s</td>
          <td style="padding:8px;border-bottom:1px solid rgba(255,255,255,0.05);">~500 MB/s</td>
          <td style="padding:8px;border-bottom:1px solid rgba(255,255,255,0.05);">Celdas NAND degradadas o throttling térmico</td>
        </tr>
        <tr style="background:rgba(255,255,255,0.02);">
          <td style="padding:8px;border-bottom:1px solid rgba(255,255,255,0.05);">NVMe PCIe 3.0 ×4</td>
          <td style="padding:8px;border-bottom:1px solid rgba(255,255,255,0.05);">1,500–3,500 MB/s</td>
          <td style="padding:8px;border-bottom:1px solid rgba(255,255,255,0.05);">1,000–3,000 MB/s</td>
          <td style="padding:8px;border-bottom:1px solid rgba(255,255,255,0.05);">Verificar carriles PCIe. Puede estar operando en ×2 en vez de ×4</td>
        </tr>
        <tr>
          <td style="padding:8px;border-bottom:1px solid rgba(255,255,255,0.05);">NVMe PCIe 4.0 ×4</td>
          <td style="padding:8px;border-bottom:1px solid rgba(255,255,255,0.05);">4,000–7,000 MB/s</td>
          <td style="padding:8px;border-bottom:1px solid rgba(255,255,255,0.05);">2,500–5,000 MB/s</td>
          <td style="padding:8px;border-bottom:1px solid rgba(255,255,255,0.05);">¿Conectado en slot PCIe 3.0? Verificar especificaciones de la placa</td>
        </tr>
      </table>

      <ul>
        <li><strong>Adaptador M.2 a USB (enclosure de prueba):</strong> Se saca el SSD de la laptop dañada y se inserta en el adaptador. Se conecta a una PC funcional por USB. Si CrystalDiskInfo lo detecta, el SSD está bien y el problema es el slot o el controlador PCIe de la placa madre.</li>
        <li><strong>Adaptador con pantalla de velocidad:</strong> Algunos modelos avanzados (Wavlink, Orico Pro) traen una pantalla OLED que muestra la velocidad de lectura y escritura en tiempo real sin necesidad de software.</li>
        <li><strong>⚠️ Muesca M vs. B+M:</strong> Un SSD NVMe usa el protocolo PCIe y tiene la muesca solo en posición M (extremo derecho). Un SSD SATA M.2 tiene la muesca en posición B o B+M. <em>Un adaptador SATA-only no detectará un NVMe y viceversa.</em> Usa un adaptador universal M+B.</li>
      </ul>

      <div style="background:rgba(255,165,0,0.08);border-left:4px solid var(--accent-orange);padding:1rem 1.2rem;border-radius:0 10px 10px 0;margin:1.5rem 0;">
        <strong style="color:var(--accent-orange);">🔧 Hack de Taller — Diagnóstico del Slot M.2 con Multímetro</strong>
        <p style="margin:0.5rem 0 0 0;">Si el SSD funciona perfecto en el adaptador externo pero la placa no lo detecta, revisa la impedancia de los carriles PCIe en el conector M.2 con el multímetro en modo diodo. Mide entre los pines de datos PCIe TX/RX y tierra. Una lectura normal muestra <strong>0.350V–0.500V</strong>. Si algún carril muestra <strong>OL (circuito abierto)</strong>, hay una pista interna fracturada entre el slot y el CPU/PCH.</p>
      </div>

      <h3>6. Medidor LCR: Verificación de Valor de Inductores</h3>
      <p>El medidor LCR (Inductancia-Capacitancia-Resistencia) permite medir el <strong>valor real en Henrios (µH o mH)</strong> de una bobina. Esto es útil cuando sospechamos que un inductor fue dañado térmicamente y perdió sus propiedades, pero visualmente parece intacto.</p>
      <ul>
        <li><strong>Uso en reparación:</strong> Toca ambos terminales de la bobina SMD con las puntas del LCR. Compara el valor medido con el marcado impreso en el componente. Una bobina con núcleo de ferrita agrietado puede medir un valor completamente diferente.</li>
        <li><strong>No confundir con el tester de bobinas:</strong> El tester CT-1/M093 solo dice si la bobina conduce o no (go/no-go). El LCR mide el valor exacto de inductancia. <strong>Son herramientas complementarias.</strong></li>
      </ul>

      <h4>📋 Tabla de Marcado de Inductores SMD</h4>
      <table style="width:100%;border-collapse:collapse;margin:1rem 0;font-size:0.9rem;">
        <tr style="background:rgba(0,200,255,0.1);">
          <th style="text-align:left;padding:10px;border-bottom:1px solid rgba(255,255,255,0.15);">Código Impreso</th>
          <th style="text-align:left;padding:10px;border-bottom:1px solid rgba(255,255,255,0.15);">Valor Real</th>
          <th style="text-align:left;padding:10px;border-bottom:1px solid rgba(255,255,255,0.15);">Uso Típico en Laptops</th>
        </tr>
        <tr>
          <td style="padding:8px;border-bottom:1px solid rgba(255,255,255,0.05);">1R0</td>
          <td style="padding:8px;border-bottom:1px solid rgba(255,255,255,0.05);">1.0 µH</td>
          <td style="padding:8px;border-bottom:1px solid rgba(255,255,255,0.05);">VRM de CPU (alta frecuencia, alta corriente)</td>
        </tr>
        <tr style="background:rgba(255,255,255,0.02);">
          <td style="padding:8px;border-bottom:1px solid rgba(255,255,255,0.05);">2R2</td>
          <td style="padding:8px;border-bottom:1px solid rgba(255,255,255,0.05);">2.2 µH</td>
          <td style="padding:8px;border-bottom:1px solid rgba(255,255,255,0.05);">VRM de GPU o RAM</td>
        </tr>
        <tr>
          <td style="padding:8px;border-bottom:1px solid rgba(255,255,255,0.05);">4R7</td>
          <td style="padding:8px;border-bottom:1px solid rgba(255,255,255,0.05);">4.7 µH</td>
          <td style="padding:8px;border-bottom:1px solid rgba(255,255,255,0.05);">Fuentes Buck secundarias (3.3V, 5V)</td>
        </tr>
        <tr style="background:rgba(255,255,255,0.02);">
          <td style="padding:8px;border-bottom:1px solid rgba(255,255,255,0.05);">100</td>
          <td style="padding:8px;border-bottom:1px solid rgba(255,255,255,0.05);">10 µH</td>
          <td style="padding:8px;border-bottom:1px solid rgba(255,255,255,0.05);">Filtrado de audio o standby de bajo consumo</td>
        </tr>
        <tr>
          <td style="padding:8px;border-bottom:1px solid rgba(255,255,255,0.05);">220</td>
          <td style="padding:8px;border-bottom:1px solid rgba(255,255,255,0.05);">22 µH</td>
          <td style="padding:8px;border-bottom:1px solid rgba(255,255,255,0.05);">Reguladores Boost de retroiluminación LCD</td>
        </tr>
      </table>

      <h3>7. Flujo de Diagnóstico Rápido con Testers — "El Protocolo de los 10 Minutos"</h3>
      <p>Cuando recibes una laptop con "no enciende" o "pantalla negra", este es el protocolo optimizado para descartar o aislar la falla en <strong>10 minutos o menos</strong>:</p>

      <div style="background:rgba(0,200,255,0.06);border:1px solid rgba(0,200,255,0.2);border-radius:12px;padding:1.5rem;margin:1.5rem 0;">
        <h4 style="margin-top:0;color:var(--accent-cyan);">📋 CHECKLIST: Protocolo de Diagnóstico en 10 Minutos</h4>
        <ol style="line-height:2.2;">
          <li>☐ <strong>Inspección visual (30 seg):</strong> Buscar corrosión, quemaduras, capacitores hinchados, rastros de líquido, componentes sueltos.</li>
          <li>☐ <strong>Tester de bobinas — barrido completo (2 min):</strong> Recorre TODAS las bobinas de la placa con el CT-1/MaAnt/RELIFE. Cualquier bobina que no responda (LED rojo) te indica la línea muerta.</li>
          <li>☐ <strong>Multímetro en modo diodo (3 min):</strong> Mide la impedancia de cada bobina marcada a tierra para confirmar cortocircuitos. Lectura <0.050V = corto confirmado.</li>
          <li>☐ <strong>Conectar fuente DC (1 min):</strong> Conecta la fuente de laboratorio a 19V con límite de 0.5A. Observa el consumo:
            <ul style="margin-top:0.5rem;">
              <li>• 0.000A = Sin consumo (EC no arranca o línea cortada)</li>
              <li>• 0.005A–0.020A = Standby normal (S5), EC activo</li>
              <li>• 0.030A–0.080A = Equipo intentando encender (pulsos)</li>
              <li>• >0.5A inmediato = Cortocircuito pesado (subir límite lentamente)</li>
            </ul>
          </li>
          <li>☐ <strong>Tester USB en cada puerto (1 min):</strong> Inserta el tester USB. Si los LEDs de VBUS encienden tras presionar el botón de power, el EC arrancó y activó los puertos.</li>
          <li>☐ <strong>Tester de slot RAM (1 min):</strong> Retira el módulo RAM e inserta el tester en el slot. Verifica continuidad de todas las líneas de alimentación y datos.</li>
          <li>☐ <strong>Adaptador M.2 externo (2 min):</strong> Extrae el SSD y pruébalo en otra PC. Elimina el disco de la cadena de sospecha.</li>
          <li>☐ <strong>Si todo pasa OK — diagnóstico profundo:</strong> Osciloscopio en línea SPI de BIOS + FNIRSI FNB58 en USB-C para verificar negociación de voltaje.</li>
        </ol>
      </div>

      <h4>📊 Diagrama de Flujo: "No Enciende" — Diagnóstico con Testers</h4>
      <div style="background:rgba(0,0,0,0.2);border-radius:12px;padding:1.5rem;margin:1.5rem 0;font-family:monospace;font-size:0.85rem;line-height:1.8;overflow-x:auto;">
<pre style="margin:0;white-space:pre-wrap;">
LAPTOP NO ENCIENDE
    │
    ▼
[Tester Bobinas → Barrido Completo]
    │
    ├── Alguna bobina NO responde (LED rojo)
    │       │
    │       ▼
    │   [Multímetro Modo Diodo → Medir bobina a GND]
    │       │
    │       ├── Lectura < 0.050V → 🔴 CORTOCIRCUITO
    │       │       │
    │       │       ▼
    │       │   [Inyectar 1V/2A → Buscar componente caliente]
    │       │   [Usar cámara térmica o rosin]
    │       │   [Retirar MLCC sospechoso y verificar]
    │       │
    │       └── Lectura OL → BOBINA ABIERTA
    │               │
    │               ▼
    │           [Reemplazar inductor por equivalente]
    │           [Verificar marcado: ej. 4R7 = 4.7µH]
    │
    └── Todas las bobinas OK (LED verde)
            │
            ▼
    [Conectar Fuente DC → Medir consumo]
        │
        ├── 0.000A → EC no arranca
        │       ▼
        │   [Verificar 3.3V ALW, VDD del EC, RESET]
        │
        ├── 0.005–0.020A → Standby OK
        │       ▼
        │   [Presionar botón de encendido]
        │       │
        │       ├── Consumo sube a 0.3–0.8A → POST OK
        │       │       ▼
        │       │   [Problema de VIDEO → Revisar GPU/eDP]
        │       │
        │       └── Consumo no cambia → EC no responde
        │               ▼
        │           [Verificar botón, EC firmware, BIOS SPI]
        │
        └── >0.5A inmediato → CORTO PESADO
                ▼
            [Volver a modo diodo]
            [Medir línea de 19V principal]
</pre>
      </div>

      <h3>8. Herramientas Complementarias de Diagnóstico Rápido</h3>
      <p>Además de los testers principales, existen herramientas auxiliares que aceleran drásticamente el trabajo de diagnóstico:</p>

      <h4>🔬 Cámara Térmica (Thermal Camera)</h4>
      <ul>
        <li><strong>FLIR ONE / UTi260B / INFIRAY P2 Pro:</strong> Se conectan al celular y muestran un mapa de calor de la placa madre en tiempo real.</li>
        <li><strong>Uso:</strong> Al inyectar 1V con límite de 2A en una línea en cortocircuito, el componente dañado (capacitor MLCC, MOSFET, diodo) se calienta. La cámara lo señala en <strong>rojo brillante</strong> en menos de 5 segundos.</li>
        <li><strong>Hack alternativo sin cámara:</strong> Si no tienes cámara térmica, aplica <strong>flux de colofonia (rosin)</strong> disuelto en alcohol sobre la zona sospechosa. Al inyectar voltaje, el componente en corto se calentará y el flux cercano empezará a burbujear o evaporarse, señalando el culpable visualmente.</li>
      </ul>

      <h4>🔧 Tester de Conector de Batería (Battery Connector Tester)</h4>
      <ul>
        <li>Placa pequeña que simula la presencia de una batería conectada. Engaña al EC para que proceda con la secuencia de encendido sin necesidad de batería real.</li>
        <li>Útil cuando la batería está muerta (0V) y el EC se niega a arrancar sin ella. Algunos chips de carga (BQ24780, ISL6251) requieren detectar la batería para activar los rieles de voltaje principales.</li>
      </ul>

      <h4>🔧 Tester POST de Arranque (POST Card con Beeper)</h4>
      <ul>
        <li>Algunas tarjetas POST modernas incluyen un <strong>beeper integrado</strong> que emite un tono de confirmación cuando la placa supera ciertos checkpoints del POST (inicialización de CPU, RAM detectada, video inicializado).</li>
        <li>El beeper te avisa auditivamente del progreso sin tener que estar mirando la pantalla de 7 segmentos continuamente, ideal para talleres con mucho ruido visual.</li>
      </ul>

      <div style="background:linear-gradient(135deg, rgba(0,255,136,0.08), rgba(0,200,255,0.06));border-left:4px solid var(--accent-green);padding:1.2rem 1.5rem;border-radius:0 12px 12px 0;margin:2rem 0;">
        <strong style="color:var(--accent-green);font-size:1.1rem;">💰 Kit Mínimo Recomendado por Nivel de Inversión</strong>
        <table style="width:100%;border-collapse:collapse;margin:0.8rem 0;font-size:0.9rem;">
          <tr style="background:rgba(255,255,255,0.05);">
            <th style="text-align:left;padding:8px;">Nivel</th>
            <th style="text-align:left;padding:8px;">Herramientas</th>
            <th style="text-align:left;padding:8px;">Inversión</th>
          </tr>
          <tr>
            <td style="padding:8px;">🟢 Básico</td>
            <td style="padding:8px;">Multímetro + CT-1 + Tester USB LED + Adaptador M.2</td>
            <td style="padding:8px;">$50–80 USD</td>
          </tr>
          <tr style="background:rgba(255,255,255,0.02);">
            <td style="padding:8px;">🟡 Intermedio</td>
            <td style="padding:8px;">+ MaAnt M093 + FNIRSI FNB58 + RAM Slot Tester + LCR</td>
            <td style="padding:8px;">$150–250 USD</td>
          </tr>
          <tr>
            <td style="padding:8px;">🔴 Profesional</td>
            <td style="padding:8px;">+ Cámara térmica + Osciloscopio + POST Card eSPI + Breakout USB-C</td>
            <td style="padding:8px;">$500–1,200 USD</td>
          </tr>
        </table>
        <p style="margin:0.5rem 0 0 0;font-size:0.85rem;opacity:0.8;">La inversión en testers se recupera en las primeras 10-15 reparaciones. Cada herramienta que ahorra 30 minutos de diagnóstico vale su peso en oro.</p>
      </div>
    `,
    glossary: [
      { term: "Memory Slot Tester", definition: "Tarjeta diagnóstica con contactos dorados en formato DDR3/4/5 y LEDs indicadores que comprueba la continuidad eléctrica de todas las líneas del bus de memoria sin necesitar encender la placa." },
      { term: "Coil Tester (Tester de Bobinas)", definition: "Herramienta que usa inducción electromagnética para detectar si un inductor SMD está funcional, abierto o en corto sin necesidad de desoldar el componente. Modelos: JTX CT-1, MaAnt M093, RELIFE XA5." },
      { term: "Modo Diodo (Multímetro)", definition: "Función del multímetro que inyecta una corriente constante y mide la caída de voltaje. Lecturas <0.050V indican cortocircuito. Es la técnica más confiable para encontrar cortos en placas madre de laptops." },
      { term: "FNIRSI FNB58", definition: "Medidor USB de alta gama que muestra en pantalla a color el voltaje, corriente, potencia y protocolo de carga activo (USB-PD, QC) en tiempo real al conectarse entre el cargador y el dispositivo." },
      { term: "LCR Meter (Medidor LCR)", definition: "Instrumento de medición que determina con precisión los valores de Inductancia (L), Capacitancia (C) y Resistencia (R) de componentes electrónicos pasivos en circuito o fuera de él." },
      { term: "M.2 Enclosure (Adaptador diagnóstico)", definition: "Adaptador que aloja una unidad M.2 NVMe o SATA y la convierte en un dispositivo de almacenamiento externo USB para probarla en cualquier computadora funcional." },
      { term: "Breakout Board USB-C", definition: "Placa de expansión que expone físicamente cada uno de los 24 pines del conector USB-C en terminales accesibles para diagnóstico con multímetro u osciloscopio." },
      { term: "SMD (Surface Mount Device)", definition: "Componente electrónico diseñado para montarse directamente sobre la superficie de la placa de circuito impreso, sin atravesar el PCB con pines o terminales." },
      { term: "MLCC (Multi-Layer Ceramic Capacitor)", definition: "Capacitor cerámico multicapa. El componente que más falla en laptops. Al fracturarse internamente, sus placas metálicas se tocan y crean un cortocircuito directo a tierra." },
      { term: "Cámara Térmica", definition: "Dispositivo de imagen infrarroja que muestra la temperatura superficial de los componentes en un mapa de calor. Ideal para localizar componentes en cortocircuito que se calientan al inyectar voltaje." }
    ],
    quiz: [
      {
        question: "Al insertar el tester de slot RAM en una placa y ver que los LEDs de datos (DQ) no encienden pero el LED de alimentación (VDD) sí, ¿cuál es el diagnóstico más probable?",
        options: [
          "El módulo de RAM instalado estaba defectuoso",
          "Hay una línea de datos del bus de memoria rota o en corto entre el slot y el IMC del procesador",
          "La BIOS necesita actualizarse para reconocer el tester",
          "El tester de slot está defectuoso y necesita batería nueva"
        ],
        answer: 1,
        explanation: "Si la alimentación (VDD/VDDQ) llega correctamente al slot pero las líneas de datos (DQ) no tienen continuidad, el problema está en las pistas del PCB entre el slot y el controlador de memoria integrado (IMC) del CPU, o en el propio IMC. Esto puede ocurrir por fractura de pistas debido a flexión del PCB."
      },
      {
        question: "Estás midiendo la bobina de CPU VCORE en modo diodo y obtienes una lectura de 0.035V a tierra. ¿Cuál es la interpretación correcta?",
        options: [
          "La línea de VCORE tiene cortocircuito — hay que buscar un capacitor MLCC dañado",
          "Es una lectura normal. La impedancia interna del die del CPU es extremadamente baja por naturaleza. Solo si marca 0.001V–0.005V hay un MOSFET perforado",
          "La bobina está abierta internamente y debe reemplazarse",
          "El multímetro está descalibrado y necesita batería nueva"
        ],
        answer: 1,
        explanation: "La línea de CPU VCORE siempre muestra lecturas bajas en modo diodo (0.020V–0.080V) porque el dado de silicio del procesador tiene una impedancia intrínsecamente baja. Esto NO es cortocircuito. Solo valores de 0.001V–0.005V (prácticamente cero) indican un MOSFET de VRM perforado. Siempre compara con una placa buena del mismo modelo."
      },
      {
        question: "Usas un tester de bobinas CT-1 sobre todos los inductores de la placa en frío. Encuentras que la bobina de 3.3V ALW no da señal (LED rojo). ¿Cuál es tu siguiente paso?",
        options: [
          "Reemplazar inmediatamente el CPU, ya que la bobina de 3.3V protege el procesador",
          "Medir con el multímetro en modo diodo la impedancia de esa bobina a tierra para confirmar si hay cortocircuito o si la bobina está abierta",
          "Encender la placa con el cargador original para ver si calienta",
          "Soldar un puente de cobre sobre la bobina defectuosa"
        ],
        answer: 1,
        explanation: "El tester de bobinas indica que hay anomalía, pero no distingue entre bobina abierta internamente y bobina con corto en la línea. El multímetro en modo diodo confirma: una lectura <0.050V a tierra = cortocircuito en esa línea. Una lectura OL (circuito abierto) = la bobina está rota internamente y necesita reemplazo."
      },
      {
        question: "Conectas el FNIRSI FNB58 entre un cargador USB-C de 65W y un MacBook. El medidor muestra: 20V negociados correctamente, pero la corriente fluctúa entre 2.1A y 0.0A en ciclos de 8 segundos. ¿Cuál es tu diagnóstico?",
        options: [
          "El cargador de 65W es de baja calidad y debe reemplazarse",
          "Es el comportamiento normal de carga de un MacBook",
          "El chip USB-C PD controller (CD3215) tiene una soldadura fría que pierde comunicación con el cargador periódicamente, forzando renegociaciones cíclicas",
          "La batería del MacBook está completamente cargada al 100%"
        ],
        answer: 2,
        explanation: "El voltaje está correctamente negociado a 20V, descartando problema del cargador. Pero la caída cíclica de corriente a 0A indica que el protocolo PD pierde la conexión lógica repetidamente. En MacBooks esto apunta directamente al CD3215 (controlador PD) con soldadura fría o daño por ESD, que pierde la comunicación cada pocos segundos y fuerza al cargador a renegociar desde cero."
      },
      {
        question: "Un cliente trae su laptop y dice que el SSD M.2 'desapareció' tras una caída. Lo pruebas en el adaptador M.2 externo conectado a otra PC y se detecta con velocidades normales de 3200 MB/s. ¿Cuál es tu conclusión?",
        options: [
          "El SSD está dañado internamente y las velocidades son un error del software de prueba",
          "El SSD funciona correctamente. El impacto de la caída fracturó una pista PCIe interna entre el slot M.2 y el CPU/PCH de la placa madre",
          "La laptop necesita una actualización de BIOS para reconocer NVMe después de un impacto",
          "El sistema operativo de la laptop está corrupto por la caída"
        ],
        answer: 1,
        explanation: "Si el SSD opera correctamente con velocidades normales en un adaptador externo, el componente está sano. El impacto de la caída probablemente fracturó las pistas PCIe ultra-finas en las capas internas del PCB multicapa entre el slot M.2 y el controlador. Verificar con multímetro en modo diodo la impedancia de los carriles TX/RX del conector M.2."
      }
    ],
    flashcards: [
      { question: "¿Qué tres testers de bobinas son los más recomendados en talleres profesionales?", answer: "JTX CT-1 (económico y confiable), MaAnt M093 (alta sensibilidad para MacBook), RELIFE XA5 (con pantalla de valor numérico) y LANRUI K7 (con indicador de audio/beep para trabajar bajo microscopio)." },
      { question: "¿Cuál es la lectura normal en modo diodo de la línea de 3.3V ALW de una placa sana?", answer: "Entre 0.400V y 0.580V medido desde la bobina a tierra. Si marca <0.050V hay cortocircuito en esa línea. Si marca OL la bobina está abierta." },
      { question: "¿Por qué la línea VCORE del CPU siempre mide bajo en modo diodo?", answer: "Porque el dado de silicio del procesador tiene una impedancia intrínsecamente baja (~0.020V–0.080V). NO es cortocircuito. Solo valores de 0.001V–0.005V (prácticamente cero) indican un MOSFET de VRM perforado. Siempre comparar contra placa buena del mismo modelo." },
      { question: "¿Por qué un tester de slot RAM no puede reemplazar a MemTest86?", answer: "El tester verifica continuidad eléctrica (pistas físicas sanas), pero no ejecuta patrones de datos a alta velocidad para detectar errores de celda, tiempos incorrectos o fallas bajo carga térmica. Solo MemTest86 hace pruebas funcionales reales." },
      { question: "¿Qué indica cuando los LEDs de VBUS de un tester USB encienden 3-5 segundos después de presionar el botón de power?", answer: "Que la placa completó la secuencia de encendido hasta el punto donde el EC activa los puertos USB. Confirma que el CPU arranca y el POST progresa. Si no hay video, el problema es probablemente de pantalla, cable eDP o GPU, no de la placa madre en sí." },
      { question: "¿Qué velocidad de lectura es normal para un SSD NVMe PCIe 3.0 ×4 sano?", answer: "Entre 1,500 MB/s y 3,500 MB/s de lectura secuencial. Si marca menos del 50% del esperado, puede estar operando en ×2 en vez de ×4 (carril PCIe roto) o tener celdas NAND degradadas." },
      { question: "¿Cuánto cuesta armar un kit de testers de nivel básico para empezar?", answer: "Aproximadamente $50–80 USD: multímetro digital + tester de bobinas CT-1 ($15–25) + tester USB LED básico ($5–10) + adaptador M.2 a USB ($15–25). La inversión se recupera en las primeras 10-15 reparaciones." }
    ]
  };
