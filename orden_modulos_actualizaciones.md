# 🗺️ Plan de Ruta Pedagógica: Reordenamiento del Curso de Reparación Profesional

Este documento detalla la estructura actual de los **20 módulos** del curso de reparación de hardware y microelectrónica, analiza las inconsistencias en la ruta de aprendizaje y propone una **Ruta Pedagógica Optimizada** para la próxima actualización de la plataforma.

---

## 🔍 Estado Actual y Hallazgos

Actualmente, el proyecto cuenta con 20 módulos implementados, que consolidan:
1. El **Programa Avanzado** de 14 módulos extraído de la documentación oficial (`Programa_Avanzado_Hardware_Microelectronica.pdf`).
2. Las **herramientas de diagnóstico web y testers** recomendadas por el mentor senior.
3. El **Ecosistema Apple y Gestión Corporativa de Talleres** propuesto para el nivel élite.

Sin embargo, el orden de los archivos importados en `modules-data.js` tiene un **vacío pedagógico crítico**:
* **El problema de las bases:** El *Módulo 13 (Fundamentos Electrónicos Aplicados)* enseña la Ley de Ohm, capacitores, inductores y MOSFETs. Sin embargo, los *Módulos 1, 2 y 3* exigen que el alumno ya domine estos conceptos para comprender la secuencia de encendido, el funcionamiento de fuentes Buck conmutadas, y realizar mediciones con osciloscopio en el bus SPI de la BIOS.
* **La progresión de la soldadura:** El *Módulo 4 (Microelectrónica)* introduce soldadura básica, pero el reballing avanzado BGA está en el *Módulo 9* y la soldadura de puertos USB-C en el *Módulo 8*. Deben agruparse bajo un hilo lógico.

---

## 🚀 Propuesta: Ruta de Aprendizaje Optimizada (20 Módulos)

A continuación se muestra el orden sugerido para la próxima actualización de la aplicación, reestructurado en **8 fases de aprendizaje lógico**:

| Fase | Nuevo # | Módulo Original | Título del Módulo | Justificación Pedagógica / Razón del Cambio |
| :--- | :---: | :---: | :--- | :--- |
| **Fase 1: Fundamentos** | **1** | Módulo 13 | Fundamentos Electrónicos Aplicados | **Paso Cero:** El estudiante debe entender qué es un capacitor, diodo, resistencia y MOSFET antes de leer un diagrama o medir una placa. |
| **Fase 2: Arquitectura** | **2** | Módulo 1 | Arquitectura Electrónica y Secuencia de Encendido | **El Mapa:** Explica cómo interactúan el CPU, PCH y Super I/O, y los estados ACPI (S5 a S0). |
| | **3** | Módulo 2 | Ingeniería Inversa con Esquemáticos y Boardview | **Navegación:** Enseña a leer la simbología, buscar líneas de voltaje y usar software de Boardview. |
| **Fase 3: Medición** | **4** | Módulo 3 | Diagnóstico Electrónico, Mediciones y Osciloscopio | **Herramientas de Análisis:** Medición de impedancias, uso de osciloscopio en señales analógicas/digitales (BIOS, cristales). |
| **Fase 4: Soldadura** | **5** | Módulo 4 | Microelectrónica, Soldadura y Herramientas | **Destreza Manual:** Técnicas básicas e intermedias de soldadura SMD, uso de flux, cautín y reconstrucción de pistas. |
| **Fase 5: Especialidad** | **6** | Módulo 7 | VRM y Regulación de Voltaje | **Fuentes de Poder:** Cómo operan las fuentes Buck multipase del CPU (VCORE) y GPU. |
| | **7** | Módulo 8 | USB-C y Power Delivery | **Carga Moderna:** Protocolo de negociación USB-PD, lógica de entrada de energía y líneas CC1/CC2. |
| | **8** | Módulo 5 | Firmware, BIOS y Seguridad de Bajo Nivel | **Lógica de Software:** Uso de programadores (CH341A, RT809F), desbrickeo y limpieza de región Intel ME. |
| | **9** | Módulo 14 | Debugging y POST Analysis | **Análisis de Arranque:** Códigos POST, lectura de tarjetas debug LPC/eSPI y checkpoints de BIOS. |
| **Fase 6: Avanzado** | **10** | Módulo 9 | BGA y Reparaciones Avanzadas | **Soldadura Compleja:** Reballing de integrados de gran escala, perfiles térmicos y remoción de resinas (underfill). |
| | **11** | Módulo 15 | Testers Especializados para Diagnóstico Rápido | **Eficiencia en Taller:** Uso de tarjetas tester DDR, socket de CPU, comprobadores de puertos USB y probadores de inductores. |
| | **12** | Módulo 16 | Suite de Diagnóstico Web y Periféricos | **Validación de Componentes:** APIs de navegador para probar cámaras, micrófonos, teclados y pantallas. |
| | **13** | Módulo 17 | Rescate de Equipos con Daño por Líquidos | **Química aplicada:** Lavado ultrasónico, remoción de corrosión galvánica y secado controlado en horno. |
| | **14** | Módulo 18 | Ecosistema Apple: MacBooks Intel y Apple Silicon | **Mercado Premium:** Arquitecturas exclusivas de Apple, chip de seguridad T2, lógicas M1/M2/M3 y CD3215. |
| **Fase 7: Diagnóstico** | **15** | Módulo 10 | Casos Reales de Laboratorio y Metodología | **Integración Práctica:** Diagnóstico de cortos absolutos, equipos mojados, sin video y fallas intermitentes. |
| | **16** | Módulo 11 | Software Técnico y Linux | **Prueba de Estabilidad:** Entornos Linux Live, MemTest, stress-testing de GPU/CPU y auditoría de hardware. |
| **Fase 8: Negocio** | **17** | Módulo 12 | Producción y Flujo Industrial | **Trabajo a Escala:** Procesamiento de lotes corporativos, clonación masiva (PXE/MDT) y despliegue rápido. |
| | **18** | Módulo 6 | QA, Logística y Estandarización de Laboratorio | **Control de Retornos:** Estructuración de un checklist estricto de control de calidad final del equipo. |
| | **19** | Módulo 19 | Gestión de Part Numbers, FRUs y Compatibilidad | **Cadena de Suministro:** Cruce de partes en Lenovo PSREF, HP PartSurfer, programación de EDID en pantallas LCD. |
| | **20** | Módulo 20 | Atención Corporativa y Gestión Profesional de Taller | **Crecimiento de Negocio:** Redacción de reportes técnicos, contratos de SLA corporativos, precios y reputación. |

---

## 🛠️ Guía de Implementación en Código

Para aplicar esta ruta pedagógica en el portal interactivo sin perder el progreso del usuario, se debe seguir este flujo técnico:

### Paso 1: Reordenar los archivos de datos
Se sugiere renombrar los archivos en la carpeta `data/` o simplemente cambiar la asignación de IDs dentro de cada archivo JavaScript para reflejar su nueva posición. 
Por ejemplo, en `data/module-13.js` (que ahora será el Módulo 1):
```javascript
export const module13 = {
    id: 1, // Cambiar de 13 a 1
    title: "Fundamentos Electrónicos Aplicados",
    // ...
};
```

### Paso 2: Actualizar el Indexador `modules-data.js`
Modificar el arreglo `MODULES_DATA` para cargarlos en el orden del mapa pedagógico:
```javascript
import { module13 } from './data/module-13.js'; // Ahora Módulo 1
import { module1 } from './data/module-1.js';   // Ahora Módulo 2
import { module2 } from './data/module-2.js';   // Ahora Módulo 3
// ...

export const MODULES_DATA = [
  module13, // ID 1
  module1,  // ID 2
  module2,  // ID 3
  // ...
];
```

### Paso 3: Limpiar el localStorage del alumno
Dado que la aplicación almacena el progreso de las lecciones completadas y respuestas de quizzes usando el ID del módulo, cambiar los IDs alterará el progreso guardado. Se recomienda añadir una función de migración en `app.js` o notificar al usuario que la plataforma ha sido actualizada estructuralmente.

---

## 📋 Conclusión del Análisis
Esta nueva ruta pedagógica garantiza que un alumno sin experiencia pueda iniciar desde las bases eléctricas elementales y avanzar gradualmente, adquiriendo primero el lenguaje técnico (esquemáticos), luego la destreza instrumental (osciloscopio) y manual (soldadura), para culminar en la resolución de fallas complejas de placa base y la administración profesional de su taller.
