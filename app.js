/**
 * CURSO DE REPARACIÓN PROFESIONAL: PORTAL DE ESTUDIO INTERACTIVO v2.0
 * Lógica de la aplicación y simuladores de hardware.
 * Mejoras v2: Examen Final, Calculadoras, Timer, Mejoras UI, Corrección de bugs.
 */

// Estado Global
let state = {
  currentModuleId: null,   // Null = Dashboard
  activeTab: 'theory',     // theory, simulators, quiz, flashcards, notes
  progress: {},            // { moduleId: { completed, quizScore, timeSpent } }
  userNotes: {},           // { moduleId: "notes text" }
  searchQuery: "",
  sidebarCollapsed: false,
  activeView: 'dashboard', // dashboard, module, final-exam, calculators, resources

  // Timer de Estudio
  studyTimerInterval: null,
  studyTimerSeconds: 0,
  moduleStartTime: null,

  // Simulador de Secuencia de Encendido
  simPowerState: 'G3',

  // Simulador de Instrumentos
  activeInstrument: 'multimeter',
  selectedProbePoint: null,

  // Simulador de Boardview
  activeBvPin: null,

  // Flashcards
  currentFlashcardIndex: 0,
  isCardFlipped: false,

  // Quizzes
  currentQuizQuestionIndex: 0,
  selectedQuizOptionIndex: null,
  quizAnswersSubmitted: false,
  quizScore: 0,

  // Examen Final
  finalExamQuestions: [],
  finalExamCurrent: 0,
  finalExamSelected: null,
  finalExamSubmitted: false,
  finalExamScore: 0,
  finalExamAnswers: [],
};

// ═══════════════════════════════════════════════════════════
// INICIALIZACIÓN
// ═══════════════════════════════════════════════════════════

function loadStateFromStorage() {
  const savedProgress = localStorage.getItem('reparacion_portal_progress_v2');
  if (savedProgress) {
    state.progress = JSON.parse(savedProgress);
  } else {
    for (let i = 1; i <= 14; i++) {
      state.progress[i] = { completed: false, quizScore: 0, timeSpent: 0 };
    }
  }

  const savedNotes = localStorage.getItem('reparacion_portal_notes');
  if (savedNotes) {
    state.userNotes = JSON.parse(savedNotes);
  }
}

function saveProgress() {
  localStorage.setItem('reparacion_portal_progress_v2', JSON.stringify(state.progress));
}

function saveNotes() {
  localStorage.setItem('reparacion_portal_notes', JSON.stringify(state.userNotes));
}

document.addEventListener("DOMContentLoaded", () => {
  loadStateFromStorage();
  renderSidebar();
  updateProgressBar();
  setupTopSearch();

  document.getElementById("logo-btn").addEventListener("click", () => navigateToModule(null));

  // Botón hamburger sidebar
  const hamburger = document.getElementById("sidebar-hamburger");
  if (hamburger) {
    hamburger.addEventListener("click", toggleSidebar);
  }

  navigateToModule(null);
});

// ═══════════════════════════════════════════════════════════
// SIDEBAR Y NAVEGACIÓN
// ═══════════════════════════════════════════════════════════

function toggleSidebar() {
  state.sidebarCollapsed = !state.sidebarCollapsed;
  const sidebar = document.getElementById("app-sidebar-navigation");
  if (sidebar) {
    sidebar.classList.toggle('collapsed', state.sidebarCollapsed);
  }
}

function setupTopSearch() {
  const searchInput = document.getElementById("search-input");
  if (!searchInput) return;
  searchInput.addEventListener("input", (e) => {
    state.searchQuery = e.target.value.toLowerCase();
    renderSidebar();
  });
}

function renderSidebar() {
  const sidebarList = document.getElementById("sidebar-modules");
  if (!sidebarList) return;
  sidebarList.innerHTML = "";

  // Dashboard item
  const dashboardItem = document.createElement("div");
  dashboardItem.className = `module-item ${state.currentModuleId === null && state.activeView === 'dashboard' ? 'active' : ''}`;
  dashboardItem.innerHTML = `<span class="module-num">DB</span><div class="module-title-wrapper"><div class="module-title-text">Dashboard General</div></div>`;
  dashboardItem.addEventListener("click", () => navigateToModule(null));
  sidebarList.appendChild(dashboardItem);

  // Examen Final item
  const examItem = document.createElement("div");
  const allDone = Object.values(state.progress).filter(p => p.completed).length >= 14;
  examItem.className = `module-item ${state.activeView === 'final-exam' ? 'active' : ''} ${allDone ? 'exam-ready' : ''}`;
  examItem.innerHTML = `
    <span class="module-num" style="color: var(--accent-orange);">🏆</span>
    <div class="module-title-wrapper"><div class="module-title-text">Examen Final Global</div></div>
    ${allDone ? '<div class="module-status-icon" style="color:var(--accent-orange)">★</div>' : ''}
  `;
  examItem.addEventListener("click", () => showFinalExam());
  sidebarList.appendChild(examItem);

  // Calculadoras item
  const calcItem = document.createElement("div");
  calcItem.className = `module-item ${state.activeView === 'calculators' ? 'active' : ''}`;
  calcItem.innerHTML = `<span class="module-num" style="color: var(--accent-green);">⚡</span><div class="module-title-wrapper"><div class="module-title-text">Calculadoras Técnicas</div></div>`;
  calcItem.addEventListener("click", () => showCalculators());
  sidebarList.appendChild(calcItem);

  // Separador
  const sep = document.createElement("div");
  sep.style.cssText = "border-bottom: 1px solid var(--border-color); margin: 8px 0;";
  sidebarList.appendChild(sep);

  // Módulos
  MODULES_DATA.forEach(module => {
    if (state.searchQuery && !module.title.toLowerCase().includes(state.searchQuery) && !module.content.toLowerCase().includes(state.searchQuery)) return;

    const isCompleted = state.progress[module.id]?.completed;
    const isActive = state.currentModuleId === module.id && state.activeView === 'module';
    const timeSpent = state.progress[module.id]?.timeSpent || 0;
    const quizScore = state.progress[module.id]?.quizScore || 0;

    const item = document.createElement("div");
    item.className = `module-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`;
    item.innerHTML = `
      <span class="module-num">${module.id.toString().padStart(2, '0')}</span>
      <div class="module-title-wrapper">
        <div class="module-title-text">${module.title.split(":")[0]}</div>
        ${timeSpent > 0 ? `<div class="module-meta">⏱ ${formatTime(timeSpent)} · Quiz: ${quizScore}/${module.quiz.length}</div>` : ''}
      </div>
      <div class="module-status-icon">${isCompleted ? '✔' : '○'}</div>
    `;
    item.addEventListener("click", () => navigateToModule(module.id));
    sidebarList.appendChild(item);
  });
}

function updateProgressBar() {
  let completedCount = 0;
  const total = 14;
  for (let i = 1; i <= total; i++) {
    if (state.progress[i]?.completed) completedCount++;
  }
  const percentage = Math.round((completedCount / total) * 100);
  const fill = document.getElementById("progress-bar-fill");
  const pct = document.getElementById("progress-pct");
  const count = document.getElementById("progress-count");
  if (fill) fill.style.width = `${percentage}%`;
  if (pct) pct.innerText = `${percentage}%`;
  if (count) count.innerText = `${completedCount}/${total} Completados`;
}

function navigateToModule(moduleId) {
  stopStudyTimer();
  state.currentModuleId = moduleId;
  state.activeTab = 'theory';
  state.activeView = moduleId === null ? 'dashboard' : 'module';
  renderSidebar();

  const navTabsContainer = document.getElementById("nav-tabs-container");
  const timerEl = document.getElementById("study-timer-display");

  if (moduleId === null) {
    if (navTabsContainer) navTabsContainer.style.display = "none";
    if (timerEl) timerEl.style.display = "none";
    renderDashboard();
  } else {
    if (navTabsContainer) navTabsContainer.style.display = "flex";
    if (timerEl) timerEl.style.display = "flex";
    startStudyTimer();
    setupTabs();
    renderModuleContent();
  }
}

function setupTabs() {
  const tabs = ['theory', 'simulators', 'quiz', 'flashcards', 'notes'];
  tabs.forEach(tab => {
    const btn = document.getElementById(`tab-${tab}`);
    if (btn) {
      btn.className = `tab-btn ${state.activeTab === tab ? 'active' : ''}`;
      const newBtn = btn.cloneNode(true);
      btn.parentNode.replaceChild(newBtn, btn);
      newBtn.addEventListener("click", () => {
        state.activeTab = tab;
        setupTabs();
        renderModuleContent();
      });
    }
  });
}

// ═══════════════════════════════════════════════════════════
// TIMER DE ESTUDIO
// ═══════════════════════════════════════════════════════════

function startStudyTimer() {
  state.studyTimerSeconds = state.progress[state.currentModuleId]?.timeSpent || 0;
  state.moduleStartTime = Date.now();
  updateTimerDisplay();

  clearInterval(state.studyTimerInterval);
  state.studyTimerInterval = setInterval(() => {
    state.studyTimerSeconds++;
    updateTimerDisplay();
  }, 1000);
}

function stopStudyTimer() {
  if (state.studyTimerInterval) {
    clearInterval(state.studyTimerInterval);
    state.studyTimerInterval = null;
  }
  // Guardar tiempo acumulado
  if (state.currentModuleId && state.moduleStartTime) {
    const elapsed = Math.floor((Date.now() - state.moduleStartTime) / 1000);
    if (!state.progress[state.currentModuleId]) state.progress[state.currentModuleId] = { completed: false, quizScore: 0, timeSpent: 0 };
    state.progress[state.currentModuleId].timeSpent = (state.progress[state.currentModuleId].timeSpent || 0) + elapsed;
    saveProgress();
    state.moduleStartTime = null;
  }
}

function updateTimerDisplay() {
  const el = document.getElementById("study-timer-display");
  if (el) {
    el.innerHTML = `⏱ ${formatTime(state.studyTimerSeconds)}`;
  }
}

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
}

// ═══════════════════════════════════════════════════════════
// DASHBOARD
// ═══════════════════════════════════════════════════════════

function renderDashboard() {
  const container = document.getElementById("content-panel");

  let completedCount = 0;
  let totalScore = 0;
  let gradedCount = 0;
  let totalTimeSpent = 0;

  for (let i = 1; i <= 14; i++) {
    if (state.progress[i]?.completed) completedCount++;
    if (state.progress[i]?.quizScore > 0) { totalScore += state.progress[i].quizScore; gradedCount++; }
    totalTimeSpent += (state.progress[i]?.timeSpent || 0);
  }

  const avgScore = gradedCount > 0 ? Math.round((totalScore / gradedCount) * 10) / 10 : 0;

  let recommendedModuleId = 1;
  for (let i = 1; i <= 14; i++) {
    if (!state.progress[i]?.completed) { recommendedModuleId = i; break; }
  }
  const recommendedModule = MODULES_DATA.find(m => m.id === recommendedModuleId) || MODULES_DATA[0];
  const allDone = completedCount === 14;

  container.innerHTML = `
    <div class="glass-panel dashboard-hero">
      <div class="dashboard-hero-content">
        <div class="dashboard-badge">CURSO COMPLETO</div>
        <h2 class="dashboard-title">REPARACIÓN PROFESIONAL</h2>
        <p class="dashboard-subtitle">Ingeniería de Hardware, Microelectrónica y Diagnóstico Avanzado</p>
        ${allDone ? `
          <div class="completion-banner">
            <span class="completion-icon">🏆</span>
            <div>
              <strong>¡CURSO COMPLETADO!</strong>
              <p>Has terminado los 14 módulos. Realiza el Examen Final para obtener tu certificado.</p>
            </div>
            <button class="btn-primary btn-gold" onclick="showFinalExam()">Tomar Examen Final</button>
          </div>
        ` : ''}
      </div>

      <div class="stats-grid">
        <div class="stat-card-v2 cyan">
          <div class="stat-icon">📊</div>
          <div class="stat-value">${Math.round((completedCount/14)*100)}%</div>
          <div class="card-title-sm">Progreso Global</div>
        </div>
        <div class="stat-card-v2 green">
          <div class="stat-icon">✅</div>
          <div class="stat-value">${completedCount} / 14</div>
          <div class="card-title-sm">Módulos Completos</div>
        </div>
        <div class="stat-card-v2 orange">
          <div class="stat-icon">🎯</div>
          <div class="stat-value">${avgScore} / 5</div>
          <div class="card-title-sm">Promedio Quiz</div>
        </div>
        <div class="stat-card-v2 purple">
          <div class="stat-icon">⏱</div>
          <div class="stat-value">${Math.floor(totalTimeSpent/60)}m</div>
          <div class="card-title-sm">Tiempo Estudio</div>
        </div>
      </div>
    </div>

    <div class="dashboard-grid">
      <div>
        <h3 style="margin-bottom: 20px; font-size: 1.1rem; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 1px;">Plan de Estudios — 14 Módulos</h3>
        <div class="modules-grid-dashboard">
          ${MODULES_DATA.map(m => {
            const isCompleted = state.progress[m.id]?.completed;
            const quizScore = state.progress[m.id]?.quizScore || 0;
            const timeSpent = state.progress[m.id]?.timeSpent || 0;
            const progressPct = isCompleted ? 100 : (quizScore > 0 ? 40 : (timeSpent > 0 ? 20 : 0));
            return `
              <div class="module-dashboard-card ${isCompleted ? 'done' : ''}" onclick="navigateToModule(${m.id})">
                <div class="mdc-num">${m.id.toString().padStart(2,'0')}</div>
                <div class="mdc-body">
                  <div class="mdc-title">${m.title}</div>
                  <div class="mdc-progress-bar">
                    <div class="mdc-progress-fill" style="width: ${progressPct}%"></div>
                  </div>
                  <div class="mdc-meta">
                    ${isCompleted ? '<span class="badge-done">✔ Completado</span>' : (timeSpent > 0 ? `<span class="badge-progress">En progreso</span>` : '<span class="badge-pending">Pendiente</span>')}
                    ${quizScore > 0 ? `<span class="badge-quiz">Quiz: ${quizScore}/5</span>` : ''}
                  </div>
                </div>
                <div class="mdc-arrow">→</div>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <div>
        <div class="glass-panel recommended-panel">
          <div class="rec-label">SIGUIENTE RECOMENDADO</div>
          <div class="rec-module-img">
            <img src="${recommendedModule.image}" alt="${recommendedModule.title}" onerror="this.src='images/power_sequence_diagram.png'">
          </div>
          <h4 class="rec-title">Módulo ${recommendedModule.id}: ${recommendedModule.title.split(":")[0]}</h4>
          <p class="rec-desc">${recommendedModule.objectives[0]}</p>
          <button class="btn-primary" style="width:100%" onclick="navigateToModule(${recommendedModule.id})">Estudiar Ahora →</button>
        </div>

        <div class="glass-panel" style="margin-top: 20px;">
          <h3 style="margin-bottom: 15px; font-size: 1rem; color: var(--accent-cyan);">⚡ Herramientas Rápidas</h3>
          <div class="quick-tools-grid">
            <button class="quick-tool-btn" onclick="showCalculators()">🔢<span>Calculadora Ohm</span></button>
            <button class="quick-tool-btn" onclick="showFinalExam()">🏆<span>Examen Final</span></button>
            <button class="quick-tool-btn" onclick="navigateToModule(1)">⚡<span>Módulo 1</span></button>
            <button class="quick-tool-btn" onclick="navigateToModule(3)">🔬<span>Diagnóstico</span></button>
          </div>
        </div>

        ${Object.keys(state.userNotes).length > 0 ? `
          <div class="glass-panel" style="margin-top: 20px;">
            <h3 style="margin-bottom: 15px; font-size: 1rem;">📝 Notas Recientes</h3>
            <div style="display: flex; flex-direction: column; gap: 8px;">
              ${Object.keys(state.userNotes).slice(-3).map(k => `
                <div class="recent-note-item" onclick="navigateToModule(${k})">
                  <strong>Módulo ${k}:</strong> ${state.userNotes[k].substring(0, 60)}...
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}
      </div>
    </div>
  `;
}

// ═══════════════════════════════════════════════════════════
// RENDERIZAR CONTENIDO DE MÓDULO
// ═══════════════════════════════════════════════════════════

function renderModuleContent() {
  const container = document.getElementById("content-panel");
  const module = MODULES_DATA.find(m => m.id === state.currentModuleId);
  if (!module) return;

  if (state.activeTab === 'theory') {
    renderTheory(container, module);
  } else if (state.activeTab === 'simulators') {
    renderSimulators(module);
  } else if (state.activeTab === 'quiz') {
    resetQuizState(module.id);
    renderQuiz(module);
  } else if (state.activeTab === 'flashcards') {
    state.currentFlashcardIndex = 0;
    state.isCardFlipped = false;
    renderFlashcard(module);
  } else if (state.activeTab === 'notes') {
    renderNotes(module);
  }
}

function renderTheory(container, module) {
  // Extraer headings del contenido para TOC
  const headingMatches = [...module.content.matchAll(/<h3[^>]*>(.*?)<\/h3>/gi)];
  const toc = headingMatches.map((m, i) => ({
    text: m[1].replace(/<[^>]+>/g, ''),
    id: `section-${module.id}-${i}`
  }));

  // Inyectar IDs en los headings
  let contentWithIds = module.content;
  headingMatches.forEach((match, i) => {
    contentWithIds = contentWithIds.replace(match[0], `<h3 id="section-${module.id}-${i}">${match[1]}</h3>`);
  });

  container.innerHTML = `
    <div class="glass-panel">
      <div class="module-header">
        <span class="module-tag">Módulo ${module.id}</span>
        <h2>${module.title}</h2>
      </div>

      <div class="module-image-container">
        <img src="${module.image}" alt="${module.title}" onerror="this.src='images/power_sequence_diagram.png'">
      </div>

      ${toc.length > 1 ? `
        <div class="toc-panel">
          <div class="toc-label">📋 CONTENIDO DEL MÓDULO</div>
          <div class="toc-list">
            ${toc.map(h => `<a class="toc-link" href="#${h.id}">${h.text}</a>`).join('')}
          </div>
        </div>
      ` : ''}

      <div class="objectives-panel">
        <h4>Objetivos del Módulo</h4>
        <ul class="objectives-list">
          ${module.objectives.map(obj => `<li>${obj}</li>`).join('')}
        </ul>
      </div>

      <div class="rich-content">${contentWithIds}</div>

      <h3 style="margin-top: 40px;">Glosario de Señales y Conceptos</h3>
      <div class="glossary-list">
        ${module.glossary.map(item => `
          <div class="glossary-card">
            <div class="glossary-term">${item.term}</div>
            <div class="glossary-definition">${item.definition}</div>
          </div>
        `).join('')}
      </div>

      <div class="content-footer-nav">
        <button class="nav-nav-btn" ${module.id <= 1 ? 'disabled style="opacity:0.3;cursor:default"' : ''} onclick="${module.id > 1 ? `navigateToModule(${module.id - 1})` : ''}">
          ← Módulo Anterior
        </button>
        <button class="btn-primary" onclick="markModuleAsRead(${module.id})">
          ✔ Marcar Leído
        </button>
        <button class="nav-nav-btn" ${module.id >= 14 ? 'disabled style="opacity:0.3;cursor:default"' : ''} onclick="${module.id < 14 ? `navigateToModule(${module.id + 1})` : ''}">
          Siguiente Módulo →
        </button>
      </div>
    </div>
  `;
}

function markModuleAsRead(moduleId) {
  state.progress[moduleId].completed = true;
  saveProgress();
  updateProgressBar();
  renderSidebar();

  // Notificación visual
  const btn = document.querySelector(".btn-primary");
  if (btn) {
    btn.style.background = "linear-gradient(135deg, var(--accent-green) 0%, #00b359 100%)";
    btn.style.boxShadow = "0 4px 15px rgba(0,255,136,0.4)";
    btn.innerText = "✔ ¡Módulo Completado!";
    setTimeout(() => renderModuleContent(), 1200);
  }
}

// ═══════════════════════════════════════════════════════════
// SIMULADORES INTERACTIVOS
// ═══════════════════════════════════════════════════════════

function renderSimulators(module) {
  const container = document.getElementById("content-panel");

  container.innerHTML = `
    <div class="glass-panel">
      <h2>Simuladores Didácticos de Laboratorio</h2>
      <p style="color: var(--text-secondary); margin-bottom: 25px;">
        Experimenta con instrumental virtual y circuitos electrónicos basados en las prácticas del curso.
      </p>

      <div style="display: flex; gap: 10px; margin-bottom: 25px; flex-wrap: wrap;">
        <button class="tab-btn ${state.activeInstrument === 'power' ? 'active' : ''}" onclick="changeSimTab('power')">⚡ Secuencia de Encendido</button>
        <button class="tab-btn ${state.activeInstrument === 'multimeter' ? 'active' : ''}" onclick="changeSimTab('multimeter')">🔬 Multímetro / Osciloscopio</button>
        <button class="tab-btn ${state.activeInstrument === 'boardview' ? 'active' : ''}" onclick="changeSimTab('boardview')">📐 Boardview Interactivo</button>
      </div>

      <div id="simulator-sandbox"></div>
    </div>
  `;

  renderSelectedSimulator();
}

function changeSimTab(tab) {
  state.activeInstrument = tab;
  const module = MODULES_DATA.find(m => m.id === state.currentModuleId);
  renderSimulators(module);
}

function renderSelectedSimulator() {
  const sandbox = document.getElementById("simulator-sandbox");
  if (!sandbox) return;

  if (state.activeInstrument === 'power') {
    sandbox.innerHTML = `
      <div class="simulator-layout">
        <div>
          <h4>Línea de Secuencia Temporal (Intel/AMD)</h4>
          <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 20px;">
            Selecciona un estado de energía ACPI y observa cómo se habilitan progresivamente las señales críticas.
          </p>
          <div class="seq-control-panel">
            <button class="seq-state-btn ${state.simPowerState === 'G3' ? 'active' : ''}" onclick="setPowerState('G3')">G3 — Off Mecánico</button>
            <button class="seq-state-btn ${state.simPowerState === 'S5' ? 'active' : ''}" onclick="setPowerState('S5')">S5 — Standby / Always</button>
            <button class="seq-state-btn ${state.simPowerState === 'S3' ? 'active' : ''}" onclick="setPowerState('S3')">S3 — Suspender a RAM</button>
            <button class="seq-state-btn ${state.simPowerState === 'S0' ? 'active' : ''}" onclick="setPowerState('S0')">S0 — Sistema Encendido</button>
          </div>
          <div class="seq-viz-flow" id="seq-flow-nodes"></div>
        </div>
      </div>
    `;
    updatePowerSequenceSimulator();
  } else if (state.activeInstrument === 'multimeter' || state.activeInstrument === 'oscilloscope') {
    sandbox.innerHTML = `
      <div class="instrument-container">
        <div>
          <h4>Placa Base de Diagnóstico — Lado de Potencia</h4>
          <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 20px;">
            Haz click sobre los puntos de prueba (TP) para medir voltaje o ver la forma de onda.
          </p>
          <div class="motherboard-canvas-panel">
            <div class="mobo-mockup">
              <div class="mobo-grid"></div>
              <div style="position:absolute;top:40%;left:28%;width:110px;height:110px;border:2px solid rgba(255,255,255,0.15);background:rgba(255,255,255,0.01);display:flex;align-items:center;justify-content:center;font-family:var(--font-mono);font-size:0.7rem;color:rgba(255,255,255,0.25);border-radius:4px;">CPU / BGA</div>
              <div style="position:absolute;top:20%;left:72%;width:28px;height:160px;border:1px solid rgba(255,255,255,0.15);background:rgba(255,255,255,0.01);"></div>
              <div style="position:absolute;top:62%;left:10%;width:50px;height:50px;background:#1a1a2e;border:1px solid #333;font-family:var(--font-mono);font-size:0.65rem;color:#666;display:flex;align-items:center;justify-content:center;border-radius:3px;">EC</div>
              <div class="probe-point vin ${state.selectedProbePoint === 'vin' ? 'active' : ''}" onclick="probePoint('vin')" title="VIN — 19V Entrada">1</div>
              <div class="probe-point valw3 ${state.selectedProbePoint === 'valw3' ? 'active' : ''}" onclick="probePoint('valw3')" title="3.3V ALWAYS">2</div>
              <div class="probe-point valw5 ${state.selectedProbePoint === 'valw5' ? 'active' : ''}" onclick="probePoint('valw5')" title="5.0V ALWAYS">3</div>
              <div class="probe-point vram ${state.selectedProbePoint === 'vram' ? 'active' : ''}" onclick="probePoint('vram')" title="VRAM 1.2V">4</div>
              <div class="probe-point vcore ${state.selectedProbePoint === 'vcore' ? 'active' : ''}" onclick="probePoint('vcore')" title="CPU VCORE">5</div>
              <div class="probe-point bios ${state.selectedProbePoint === 'bios' ? 'active' : ''}" onclick="probePoint('bios')" title="BIOS SPI Pin 2">6</div>
              <div style="position:absolute;top:14%;left:12%;font-size:0.6rem;color:var(--text-secondary);font-family:var(--font-mono);">VIN (19V)</div>
              <div style="position:absolute;top:29%;left:43%;font-size:0.6rem;color:var(--text-secondary);font-family:var(--font-mono);">3.3V ALW</div>
              <div style="position:absolute;top:29%;left:58%;font-size:0.6rem;color:var(--text-secondary);font-family:var(--font-mono);">5.0V ALW</div>
              <div style="position:absolute;top:56%;left:78%;font-size:0.6rem;color:var(--text-secondary);font-family:var(--font-mono);">VRAM</div>
              <div style="position:absolute;top:45%;left:38%;font-size:0.6rem;color:var(--text-secondary);font-family:var(--font-mono);">VCORE</div>
              <div style="position:absolute;top:83%;left:28%;font-size:0.6rem;color:var(--text-secondary);font-family:var(--font-mono);">BIOS SPI</div>
            </div>
          </div>
        </div>
        <div class="instrument-screen-panel">
          <div class="instrument-selector">
            <button class="tab-btn ${state.activeInstrument === 'multimeter' ? 'active' : ''}" onclick="setInstrument('multimeter')">Multímetro</button>
            <button class="tab-btn ${state.activeInstrument === 'oscilloscope' ? 'active' : ''}" onclick="setInstrument('oscilloscope')">Osciloscopio</button>
          </div>
          <div id="instrument-display-target"></div>
        </div>
      </div>
    `;
    renderInstrumentDisplay();
  } else if (state.activeInstrument === 'boardview') {
    sandbox.innerHTML = `
      <div class="boardview-grid">
        <div>
          <h4>Visualizador Boardview — Circuito de Entrada</h4>
          <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 20px;">
            Haz click sobre los pines para rastrear las pistas y ver qué componentes interconectan.
          </p>
          <div class="boardview-canvas-container">
            <div id="bv-trace-vin" class="bv-trace-line" style="top:25%;left:15%;width:140px;transform:rotate(15deg);"></div>
            <div id="bv-trace-gate" class="bv-trace-line" style="top:35%;left:22%;width:180px;transform:rotate(-5deg);"></div>
            <div id="bv-trace-standby" class="bv-trace-line" style="top:50%;left:40%;width:80px;transform:rotate(45deg);"></div>
            <div class="bv-component bv-comp-charger">Charger IC<br>U1 (ISL88731)</div>
            <div class="bv-component bv-comp-mosfet1">Q1</div>
            <div class="bv-component bv-comp-mosfet2">Q2</div>
            <div class="bv-component bv-comp-standby">Standby Controller<br>U2 (3.3V/5V)</div>
            <div class="bv-pin ${state.activeBvPin === 'pin1' ? 'highlighted' : ''}" style="top:20%;left:22%;" onclick="clickBvPin('pin1')" title="Pin 1: VCC">1</div>
            <div class="bv-pin ${state.activeBvPin === 'pin2' ? 'highlighted' : ''}" style="top:32%;left:22%;" onclick="clickBvPin('pin2')" title="Pin 21: ACDRV">2</div>
            <div class="bv-pin ${state.activeBvPin === 'pin3' ? 'highlighted' : ''}" style="top:40%;left:18%;" onclick="clickBvPin('pin3')" title="Pin 13: ACOK">3</div>
            <div class="bv-pin ${state.activeBvPin === 'pin2' ? 'highlighted' : ''}" style="top:33%;left:52%;" onclick="clickBvPin('pin2')" title="Gate Q1">G</div>
            <div class="bv-pin ${state.activeBvPin === 'pin4' ? 'highlighted' : ''}" style="top:65%;left:32%;" onclick="clickBvPin('pin4')" title="Pin 6: EN">E</div>
          </div>
        </div>
        <div class="glass-panel">
          <h4 style="color:var(--accent-cyan);margin-bottom:15px;">Información del Pin Boardview</h4>
          <div id="bv-pin-info" style="font-size:0.95rem;line-height:1.5;">
            <span style="font-style:italic;color:var(--text-secondary);">Selecciona un número de pin de cobre para auditar la red.</span>
          </div>
        </div>
      </div>
    `;
  }
}

// Lógica Simulador Secuencia de Energía
const POWER_NODES = [
  { id: 'vin',    name: 'VIN / B+',    label: '19V Entrada', desc: 'Voltaje principal proveniente del cargador. Alimenta los convertidores Buck.',    states: ['S5','S3','S0'] },
  { id: 'alw3',  name: '3.3V ALWAYS', label: '3.3V ALW',    desc: 'Riel primario. Alimenta inmediatamente al EC y BIOS SPI.',                        states: ['S5','S3','S0'] },
  { id: 'acok',  name: 'ACOK',        label: 'Lógica 3.3V', desc: 'Señal del Charger IC que indica que la alimentación de entrada es válida.',         states: ['S5','S3','S0'] },
  { id: 'rsmrst',name: 'RSMRST#',     label: 'Lógica 3.3V', desc: 'El EC libera el reset del PCH, avisando que los rieles ALWAYS están estables.',   states: ['S3','S0'] },
  { id: 'slp_s3',name: 'SLP_S3#',     label: 'Lógica 3.3V', desc: 'El PCH libera suspensión S3 para encender fuentes lógicas secundarias.',           states: ['S0'] },
  { id: 'vram',  name: 'VRAM',        label: '1.2V / 1.5V', desc: 'Voltaje de la memoria RAM principal.',                                              states: ['S3','S0'] },
  { id: 'vr_on', name: 'VR_ON',       label: 'Lógica 3.3V', desc: 'Habilita el chip PWM para arrancar la generación de voltaje VCORE.',                states: ['S0'] },
  { id: 'vcore', name: 'CPU VCORE',   label: '0.8V–1.1V',   desc: 'Voltaje del procesador. Riel de mayor corriente en la placa.',                     states: ['S0'] },
  { id: 'pwrok', name: 'SYS_PWROK',  label: 'Lógica 3.3V', desc: 'Avisa al PCH que todas las fuentes están estables y correctas.',                    states: ['S0'] },
  { id: 'pltrst',name: 'PLTRST#',     label: 'Lógica 3.3V', desc: 'Liberación del reset. El CPU despierta y comienza a leer la BIOS SPI.',             states: ['S0'] }
];

function setPowerState(stateName) {
  state.simPowerState = stateName;
  document.querySelectorAll(".seq-state-btn").forEach(btn => {
    btn.classList.toggle('active', btn.innerText.includes(stateName));
  });
  updatePowerSequenceSimulator();
}

function updatePowerSequenceSimulator() {
  const container = document.getElementById("seq-flow-nodes");
  if (!container) return;
  container.innerHTML = POWER_NODES.map(node => {
    const isActive = node.states.includes(state.simPowerState);
    const val = isActive ? (node.label.includes('19V') ? '19.0 V' : (node.label.includes('3.3V') || node.label.includes('Lógica') ? '3.3 V' : node.label.includes('1.2V') ? '1.2 V' : '1.05 V')) : '0.0 V';
    return `
      <div class="seq-node ${isActive ? 'active' : ''}">
        <div class="seq-node-led"></div>
        <div class="seq-node-name">${node.name}</div>
        <div class="seq-node-val">${val}</div>
        <div class="seq-node-desc">${node.desc}</div>
      </div>
    `;
  }).join('');
}

function setInstrument(inst) {
  state.activeInstrument = inst;
  renderSelectedSimulator();
}

function probePoint(point) {
  state.selectedProbePoint = point;
  renderSelectedSimulator();
}

function renderInstrumentDisplay() {
  const target = document.getElementById("instrument-display-target");
  if (!target) return;

  if (state.activeInstrument === 'multimeter') {
    const vals = { vin:'19.04', valw3:'3.31', valw5:'5.02', vram:'1.20', vcore:'1.05', bios:'3.30' };
    const val = state.selectedProbePoint ? (vals[state.selectedProbePoint] || "0.00") : "0.00";
    target.innerHTML = `
      <div class="multimeter-display">
        <div class="multi-mode-lbl">VOLTAJE CONTINUO (VDC)</div>
        <div class="multi-digits">${val}<span class="multi-unit">V</span></div>
      </div>
      <div class="glass-panel" style="margin-top:15px;padding:20px;">
        <h5>Información de Lectura</h5>
        <p style="font-size:0.9rem;color:var(--text-secondary);margin-top:5px;">${getProbePointDescription(state.selectedProbePoint)}</p>
      </div>
    `;
  } else {
    target.innerHTML = `
      <div class="oscilloscope-display">
        <div class="scope-grid"></div>
        <canvas id="scope-wave-canvas" class="scope-wave-canvas" width="300" height="200"></canvas>
        <div class="scope-readout">
          <span id="scope-param-freq">Frec: --</span>
          <span id="scope-param-vpp">Vpp: --</span>
        </div>
      </div>
      <div class="glass-panel" style="margin-top:15px;padding:20px;">
        <h5>Forma de Onda de Señal</h5>
        <p style="font-size:0.9rem;color:var(--text-secondary);margin-top:5px;">${getProbePointDescription(state.selectedProbePoint)}</p>
      </div>
    `;
    drawOscilloscopeWave();
  }
}

function getProbePointDescription(point) {
  if (!point) return "Selecciona un punto de prueba numerado en la placa para tomar mediciones.";
  const d = {
    vin:   "<strong>Punto 1 — VIN (19V):</strong> Voltaje DC puro de entrada. Con osciloscopio debe ser línea plana estable. Caídas o ruidos severos indican falla en capacitores de entrada.",
    valw3: "<strong>Punto 2 — 3.3V ALWAYS:</strong> Voltaje primario de standby. Con osciloscopio se aprecia el rizo mínimo de conmutación Buck (~50mV a 350 kHz).",
    valw5: "<strong>Punto 3 — 5.0V ALWAYS:</strong> Alimentación para controladores y puertos USB. Con multímetro mide 5.0V estables.",
    vram:  "<strong>Punto 4 — VRAM (1.2V):</strong> Voltaje estable de memoria RAM. Solo aparece cuando la placa sale del estado S3.",
    vcore: "<strong>Punto 5 — CPU VCORE (1.05V):</strong> Nodo de conmutación de alta frecuencia. En el osciloscopio se visualiza la señal PWM cuadrada a 800 kHz antes del filtrado por bobina.",
    bios:  "<strong>Punto 6 — BIOS SPI Pin 2 (Data Out):</strong> Durante la liberación de reset verás ráfagas digitales de 3.3V a velocidades de 20–50 MHz."
  };
  return d[point] || "Sin información disponible.";
}

function drawOscilloscopeWave() {
  const canvas = document.getElementById("scope-wave-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const w = canvas.width, h = canvas.height;
  ctx.clearRect(0, 0, w, h);
  ctx.strokeStyle = "#00ff88";
  ctx.lineWidth = 2.5;
  ctx.shadowColor = "#00ff88";
  ctx.shadowBlur = 8;
  ctx.beginPath();

  const freqLbl = document.getElementById("scope-param-freq");
  const vppLbl  = document.getElementById("scope-param-vpp");

  if (state.selectedProbePoint === 'vin') {
    ctx.moveTo(0, 40); ctx.lineTo(w, 40);
    if (freqLbl) freqLbl.innerText = "Frec: 0.0 Hz";
    if (vppLbl)  vppLbl.innerText  = "Vpp: 19.0 V (DC)";
  } else if (state.selectedProbePoint === 'valw3' || state.selectedProbePoint === 'valw5') {
    ctx.moveTo(0, h/2);
    for (let x = 0; x < w; x++) ctx.lineTo(x, h/2 + Math.sin(x*0.4)*3);
    if (freqLbl) freqLbl.innerText = "Frec: 350 kHz";
    if (vppLbl)  vppLbl.innerText  = "Vpp: 3.3 V (Rizo 45mV)";
  } else if (state.selectedProbePoint === 'vcore') {
    let high = true; ctx.moveTo(0, h/4);
    for (let x = 0; x < w; x += 15) { high = !high; const y = high ? h*0.75 : h*0.25; ctx.lineTo(x, y); ctx.lineTo(x+15, y); }
    if (freqLbl) freqLbl.innerText = "Frec: 850 kHz";
    if (vppLbl)  vppLbl.innerText  = "Vpp: 19.0 V (SW Node)";
  } else if (state.selectedProbePoint === 'bios') {
    ctx.moveTo(0, h*0.7); let y = h*0.7;
    for (let x = 0; x < w; x++) { if (x > 30 && x < 250 && x%6===0) y = Math.random()>0.5 ? h*0.3 : h*0.7; ctx.lineTo(x, y); }
    if (freqLbl) freqLbl.innerText = "Frec: 25 MHz Burst";
    if (vppLbl)  vppLbl.innerText  = "Vpp: 3.3 V (SPI Data)";
  } else {
    ctx.moveTo(0, h/2); ctx.lineTo(w, h/2);
    if (freqLbl) freqLbl.innerText = "Frec: --";
    if (vppLbl)  vppLbl.innerText  = "Vpp: 0.0 V";
  }
  ctx.stroke();
  ctx.shadowBlur = 0;
}

// Boardview
const BV_PIN_DATA = {
  pin1: { name:"U1 Pin 1 — VCC (Alimentación del Integrado de Carga)", desc:"Recibe 19V de la línea principal. Si mide 0V, el IC de carga nunca se encenderá.", trace:"bv-trace-vin" },
  pin2: { name:"U1 Pin 21 — ACDRV (Salida de Gate de MOSFET de Entrada)", desc:"Envía ~25V a las compuertas de los MOSFET Q1/Q2 para saturarlos y permitir el ingreso de corriente.", trace:"bv-trace-gate" },
  pin3: { name:"U1 Pin 13 — ACOK (AC Detect OK)", desc:"Señal lógica al EC indicando que el voltaje y corriente del adaptador son correctos.", trace:"bv-trace-standby" },
  pin4: { name:"U2 Pin 6 — EN (Habilitador del Regulador Standby)", desc:"Entrada de habilitación desde el EC. Cuando sube a 3.3V, el IC standby enciende los voltajes en las bobinas principales.", trace:"bv-trace-standby" }
};

function clickBvPin(pin) {
  state.activeBvPin = pin;
  document.querySelectorAll(".bv-trace-line").forEach(t => t.classList.remove('visible'));
  const infoPanel = document.getElementById("bv-pin-info");
  const data = BV_PIN_DATA[pin];
  if (data && infoPanel) {
    infoPanel.innerHTML = `
      <h5 style="color:var(--accent-cyan);font-weight:700;margin-bottom:10px;">${data.name}</h5>
      <p style="color:var(--text-secondary);margin-bottom:15px;">${data.desc}</p>
      <div style="font-size:0.85rem;padding:10px;background:rgba(0,229,255,0.05);border-radius:4px;border:1px solid var(--accent-cyan-glow);">
        <strong>Red Boardview:</strong> Rastreando conexiones en pista de cobre.
      </div>
    `;
    const activeTrace = document.getElementById(data.trace);
    if (activeTrace) activeTrace.classList.add('visible');
  }
  renderSelectedSimulator();
}

// ═══════════════════════════════════════════════════════════
// QUIZZES
// ═══════════════════════════════════════════════════════════

function resetQuizState(moduleId) {
  state.currentQuizQuestionIndex = 0;
  state.selectedQuizOptionIndex = null;
  state.quizAnswersSubmitted = false;
  state.quizScore = 0;
}

function renderQuiz(module) {
  const container = document.getElementById("content-panel");
  const question = module.quiz[state.currentQuizQuestionIndex];
  const total = module.quiz.length;

  container.innerHTML = `
    <div class="glass-panel">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:25px;">
        <span class="module-tag">EVALUACIÓN MÓDULO ${module.id}</span>
        <span class="quiz-progress">Pregunta ${state.currentQuizQuestionIndex + 1} de ${total}</span>
      </div>
      <div class="quiz-progress-bar-wrap">
        <div class="quiz-progress-bar-fill" style="width:${Math.round(((state.currentQuizQuestionIndex+1)/total)*100)}%"></div>
      </div>
      <div class="question-box">${question.question}</div>
      <div class="options-list">
        ${question.options.map((opt, idx) => {
          let cls = "option-card";
          if (state.selectedQuizOptionIndex === idx) cls += " selected";
          if (state.quizAnswersSubmitted) {
            if (idx === question.answer) cls += " correct";
            else if (state.selectedQuizOptionIndex === idx) cls += " incorrect";
          }
          return `
            <div class="${cls}" onclick="selectQuizOption(${idx})">
              <div class="option-marker">${String.fromCharCode(65 + idx)}</div>
              <div>${opt}</div>
            </div>
          `;
        }).join('')}
      </div>
      <div id="quiz-feedback-box"></div>
      <div class="quiz-actions">
        ${!state.quizAnswersSubmitted ?
          `<button class="btn-primary" onclick="submitQuizAnswer()" ${state.selectedQuizOptionIndex === null ? 'disabled style="opacity:0.5;cursor:default"' : ''}>Comprobar Respuesta</button>` :
          `<button class="btn-primary" onclick="nextQuizQuestion()">${state.currentQuizQuestionIndex + 1 === total ? 'Ver Resultados →' : 'Siguiente Pregunta →'}</button>`
        }
      </div>
    </div>
  `;

  if (state.quizAnswersSubmitted) showQuizFeedback(question);
}

function selectQuizOption(index) {
  if (state.quizAnswersSubmitted) return;
  state.selectedQuizOptionIndex = index;
  renderModuleContent();
}

function submitQuizAnswer() {
  if (state.selectedQuizOptionIndex === null) return;
  state.quizAnswersSubmitted = true;
  const module = MODULES_DATA.find(m => m.id === state.currentModuleId);
  const question = module.quiz[state.currentQuizQuestionIndex];
  if (state.selectedQuizOptionIndex === question.answer) state.quizScore++;
  renderModuleContent();
}

function showQuizFeedback(question) {
  const box = document.getElementById("quiz-feedback-box");
  if (!box) return;
  const isCorrect = state.selectedQuizOptionIndex === question.answer;
  box.innerHTML = `
    <div class="quiz-feedback ${isCorrect ? '' : 'incorrect-feedback'}">
      <div class="feedback-title">${isCorrect ? '✅ ¡Correcto!' : '❌ Respuesta Incorrecta'}</div>
      <p style="font-size:0.95rem;line-height:1.5;color:var(--text-primary);">${question.explanation}</p>
    </div>
  `;
}

function nextQuizQuestion() {
  const module = MODULES_DATA.find(m => m.id === state.currentModuleId);
  const total = module.quiz.length;
  if (state.currentQuizQuestionIndex + 1 < total) {
    state.currentQuizQuestionIndex++;
    state.selectedQuizOptionIndex = null;
    state.quizAnswersSubmitted = false;
    renderModuleContent();
  } else {
    renderQuizResults(module);
  }
}

function renderQuizResults(module) {
  const container = document.getElementById("content-panel");
  const total = module.quiz.length;
  const passed = state.quizScore >= Math.ceil(total * 0.6);

  state.progress[module.id].quizScore = state.quizScore;
  if (passed) state.progress[module.id].completed = true;
  saveProgress();
  updateProgressBar();
  renderSidebar();

  const pct = Math.round((state.quizScore / total) * 100);

  container.innerHTML = `
    <div class="glass-panel quiz-result-view">
      <div class="result-emoji">${passed ? '🏆' : '📚'}</div>
      <h2>Resultados de la Evaluación</h2>
      <p style="color:var(--text-secondary);margin-top:10px;">Módulo ${module.id}: ${module.title}</p>
      <div class="result-score-ring">
        <svg viewBox="0 0 120 120" width="140" height="140">
          <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="10"/>
          <circle cx="60" cy="60" r="50" fill="none" stroke="${passed ? 'var(--accent-green)' : 'var(--accent-orange)'}" stroke-width="10"
            stroke-dasharray="${2*Math.PI*50}" stroke-dashoffset="${2*Math.PI*50*(1-pct/100)}"
            stroke-linecap="round" transform="rotate(-90 60 60)"
            style="filter: drop-shadow(0 0 6px ${passed ? 'var(--accent-green)' : 'var(--accent-orange)'});transition: stroke-dashoffset 1s ease;"/>
          <text x="60" y="60" text-anchor="middle" dy="0.35em" fill="white" font-size="22" font-weight="bold" font-family="JetBrains Mono,monospace">${state.quizScore}/${total}</text>
        </svg>
      </div>
      <h3 style="color:${passed ? 'var(--accent-green)' : 'var(--accent-red)'};">${passed ? 'MÓDULO APROBADO ✔' : 'MÓDULO NO APROBADO'}</h3>
      <p style="color:var(--text-secondary);max-width:500px;margin:20px auto 40px;font-size:0.95rem;">
        ${passed ? '¡Felicidades! Has demostrado dominio del contenido de este módulo. Sigue con el siguiente.' :
                   'Te recomendamos repasar el material teórico y las flashcards antes de intentarlo nuevamente.'}
      </p>
      <div style="display:flex;justify-content:center;gap:20px;flex-wrap:wrap;">
        <button class="nav-nav-btn" onclick="navigateToModule(${module.id})">↺ Repetir Módulo</button>
        ${module.id < 14 ? `<button class="btn-primary" onclick="navigateToModule(${module.id + 1})">Siguiente Módulo →</button>` : `<button class="btn-primary btn-gold" onclick="showFinalExam()">🏆 Tomar Examen Final</button>`}
      </div>
    </div>
  `;
}

// ═══════════════════════════════════════════════════════════
// FLASHCARDS
// ═══════════════════════════════════════════════════════════

function renderFlashcard(module) {
  const container = document.getElementById("content-panel");
  const card = module.flashcards[state.currentFlashcardIndex];
  const total = module.flashcards.length;

  container.innerHTML = `
    <div class="glass-panel flashcard-view-container">
      <h2>Fichas de Estudio Rápido</h2>
      <p style="color:var(--text-secondary);text-align:center;margin-bottom:30px;font-size:0.9rem;">
        Haz click en la ficha para revelar la respuesta. Repasa conceptos clave del módulo.
      </p>
      <div class="flashcard-scene" onclick="flipFlashcard()">
        <div class="flashcard-card ${state.isCardFlipped ? 'is-flipped' : ''}">
          <div class="flashcard-face flashcard-front">
            <div class="fc-label">PREGUNTA</div>
            <div class="card-question">${card.question}</div>
            <div class="fc-hint">TAP PARA VOLTEAR</div>
          </div>
          <div class="flashcard-face flashcard-back">
            <div class="fc-label">RESPUESTA</div>
            <div class="card-answer">${card.answer}</div>
          </div>
        </div>
      </div>
      <div class="flashcard-controls">
        <button class="btn-icon" onclick="prevFlashcard()" ${state.currentFlashcardIndex === 0 ? 'disabled style="opacity:0.3;cursor:default"' : ''}>←</button>
        <div class="flashcard-counter">
          <span>${state.currentFlashcardIndex + 1} / ${total}</span>
          <div class="fc-dots">
            ${Array.from({length: total}, (_, i) => `<span class="fc-dot ${i === state.currentFlashcardIndex ? 'active' : ''}"></span>`).join('')}
          </div>
        </div>
        <button class="btn-icon" onclick="nextFlashcard()" ${state.currentFlashcardIndex + 1 === total ? 'disabled style="opacity:0.3;cursor:default"' : ''}>→</button>
      </div>
    </div>
  `;
}

function flipFlashcard() {
  state.isCardFlipped = !state.isCardFlipped;
  const card = document.querySelector(".flashcard-card");
  if (card) card.classList.toggle('is-flipped', state.isCardFlipped);
}

function prevFlashcard() {
  if (state.currentFlashcardIndex > 0) {
    state.currentFlashcardIndex--;
    state.isCardFlipped = false;
    renderModuleContent();
  }
}

function nextFlashcard() {
  const module = MODULES_DATA.find(m => m.id === state.currentModuleId);
  if (!module) return;
  if (state.currentFlashcardIndex + 1 < module.flashcards.length) {
    state.currentFlashcardIndex++;
    state.isCardFlipped = false;
    renderModuleContent();
  }
}

// ═══════════════════════════════════════════════════════════
// NOTAS DE LABORATORIO
// ═══════════════════════════════════════════════════════════

function renderNotes(module) {
  const container = document.getElementById("content-panel");
  const noteText = state.userNotes[module.id] || "";
  container.innerHTML = `
    <div class="glass-panel notes-container">
      <div class="notes-header">
        <div>
          <h2>📝 Bitácora Personal de Laboratorio</h2>
          <p style="color:var(--text-secondary);font-size:0.9rem;margin-top:5px;">
            Escribe anotaciones de tus prácticas, casos de averías reales, mediciones u observaciones de soldadura.
          </p>
        </div>
        <div id="save-status-lbl" class="save-status">Todos los cambios guardados.</div>
      </div>
      <textarea id="notes-text-area" class="notes-textarea" 
        placeholder="Escribe tus notas de estudio o casos de reparación aquí...&#10;&#10;Ejemplo:&#10;• Laptop HP 840 G3: Corto en línea 3.3V ALW&#10;• Medición en Bobina L1: 0.02Ω → Corto confirmado&#10;• Componente defectuoso: MLCC C204 junto al EC"
        oninput="autoSaveNote(${module.id})">${noteText}</textarea>
      <div style="display:flex;justify-content:space-between;margin-top:15px;font-size:0.85rem;color:var(--text-secondary);">
        <span>Las notas se guardan localmente en tu navegador.</span>
        <span>${noteText.length} caracteres</span>
      </div>
    </div>
  `;
}

let autoSaveTimer = null;
function autoSaveNote(moduleId) {
  const text = document.getElementById("notes-text-area").value;
  const status = document.getElementById("save-status-lbl");
  if (status) status.innerText = "Escribiendo...";
  clearTimeout(autoSaveTimer);
  autoSaveTimer = setTimeout(() => {
    state.userNotes[moduleId] = text;
    saveNotes();
    if (status) status.innerText = "✔ Anotaciones guardadas localmente.";
  }, 800);
}

// ═══════════════════════════════════════════════════════════
// EXAMEN FINAL GLOBAL
// ═══════════════════════════════════════════════════════════

function showFinalExam() {
  stopStudyTimer();
  state.activeView = 'final-exam';
  state.currentModuleId = null;
  renderSidebar();

  const navTabsContainer = document.getElementById("nav-tabs-container");
  const timerEl = document.getElementById("study-timer-display");
  if (navTabsContainer) navTabsContainer.style.display = "none";
  if (timerEl) timerEl.style.display = "none";

  // Generar 20 preguntas aleatorias (2 por módulo)
  if (state.finalExamQuestions.length === 0) {
    const questions = [];
    MODULES_DATA.forEach(module => {
      const shuffled = [...module.quiz].sort(() => Math.random() - 0.5);
      const pick = shuffled.slice(0, Math.min(2, shuffled.length));
      pick.forEach(q => questions.push({ ...q, moduleId: module.id, moduleTitle: module.title }));
    });
    state.finalExamQuestions = questions.sort(() => Math.random() - 0.5).slice(0, 20);
    state.finalExamCurrent = 0;
    state.finalExamSelected = null;
    state.finalExamSubmitted = false;
    state.finalExamScore = 0;
    state.finalExamAnswers = [];
  }

  renderFinalExam();
}

function renderFinalExam() {
  const container = document.getElementById("content-panel");
  const q = state.finalExamQuestions[state.finalExamCurrent];
  const total = state.finalExamQuestions.length;
  const pct = Math.round((state.finalExamCurrent / total) * 100);

  container.innerHTML = `
    <div class="glass-panel">
      <div class="final-exam-header">
        <div>
          <div class="final-exam-badge">🏆 EXAMEN FINAL GLOBAL</div>
          <p style="color:var(--text-secondary);font-size:0.85rem;margin-top:4px;">Módulo ${q.moduleId}: ${q.moduleTitle.split(':')[0]}</p>
        </div>
        <span class="quiz-progress">Pregunta ${state.finalExamCurrent + 1} de ${total}</span>
      </div>

      <div class="quiz-progress-bar-wrap" style="margin-bottom:25px;">
        <div class="quiz-progress-bar-fill" style="width:${pct}%;background:linear-gradient(90deg,var(--accent-orange),var(--accent-cyan))"></div>
      </div>

      <div class="question-box">${q.question}</div>

      <div class="options-list">
        ${q.options.map((opt, idx) => {
          let cls = "option-card";
          if (state.finalExamSelected === idx) cls += " selected";
          if (state.finalExamSubmitted) {
            if (idx === q.answer) cls += " correct";
            else if (state.finalExamSelected === idx) cls += " incorrect";
          }
          return `
            <div class="${cls}" onclick="selectFinalOption(${idx})">
              <div class="option-marker">${String.fromCharCode(65 + idx)}</div>
              <div>${opt}</div>
            </div>
          `;
        }).join('')}
      </div>

      <div id="final-feedback-box"></div>

      <div class="quiz-actions">
        ${!state.finalExamSubmitted ?
          `<button class="btn-primary" onclick="submitFinalAnswer()" ${state.finalExamSelected === null ? 'disabled style="opacity:0.5;cursor:default"' : ''}>Confirmar Respuesta</button>` :
          `<button class="btn-primary" style="background:linear-gradient(135deg,var(--accent-orange),#ff6b00)" onclick="nextFinalQuestion()">
            ${state.finalExamCurrent + 1 === total ? '🏆 Ver Resultados Finales' : 'Siguiente Pregunta →'}
          </button>`
        }
      </div>
    </div>
  `;

  if (state.finalExamSubmitted) {
    const box = document.getElementById("final-feedback-box");
    const isCorrect = state.finalExamSelected === q.answer;
    if (box) box.innerHTML = `
      <div class="quiz-feedback ${isCorrect ? '' : 'incorrect-feedback'}">
        <div class="feedback-title">${isCorrect ? '✅ ¡Correcto!' : '❌ Incorrecto'}</div>
        <p style="font-size:0.95rem;line-height:1.5;">${q.explanation}</p>
      </div>
    `;
  }
}

function selectFinalOption(idx) {
  if (state.finalExamSubmitted) return;
  state.finalExamSelected = idx;
  renderFinalExam();
}

function submitFinalAnswer() {
  if (state.finalExamSelected === null) return;
  state.finalExamSubmitted = true;
  const q = state.finalExamQuestions[state.finalExamCurrent];
  if (state.finalExamSelected === q.answer) state.finalExamScore++;
  state.finalExamAnswers.push({ correct: state.finalExamSelected === q.answer });
  renderFinalExam();
}

function nextFinalQuestion() {
  const total = state.finalExamQuestions.length;
  if (state.finalExamCurrent + 1 < total) {
    state.finalExamCurrent++;
    state.finalExamSelected = null;
    state.finalExamSubmitted = false;
    renderFinalExam();
  } else {
    renderFinalExamResults();
  }
}

function renderFinalExamResults() {
  const container = document.getElementById("content-panel");
  const total = state.finalExamQuestions.length;
  const score = state.finalExamScore;
  const pct = Math.round((score / total) * 100);
  const passed = pct >= 70;

  // Guardar resultado en localStorage
  localStorage.setItem('reparacion_final_exam', JSON.stringify({ score, total, pct, date: new Date().toLocaleDateString('es-MX') }));
  state.finalExamQuestions = []; // Reset para próximo intento

  container.innerHTML = `
    <div class="glass-panel" style="text-align:center;padding:60px 40px;">
      <div style="font-size:5rem;margin-bottom:20px;">${passed ? '🏆' : '📚'}</div>
      <div class="final-exam-badge" style="display:inline-block;margin-bottom:20px;">EXAMEN FINAL GLOBAL</div>
      <h2 style="font-size:2.5rem;margin-bottom:10px;">Resultado: ${pct}%</h2>
      <p style="color:var(--text-secondary);margin-bottom:30px;">${score} respuestas correctas de ${total} preguntas</p>

      <div class="result-score-ring" style="margin:0 auto 30px;">
        <svg viewBox="0 0 160 160" width="200" height="200">
          <circle cx="80" cy="80" r="65" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="14"/>
          <circle cx="80" cy="80" r="65" fill="none"
            stroke="${passed ? 'var(--accent-green)' : 'var(--accent-orange)'}" stroke-width="14"
            stroke-dasharray="${2*Math.PI*65}" stroke-dashoffset="${2*Math.PI*65*(1-pct/100)}"
            stroke-linecap="round" transform="rotate(-90 80 80)"
            style="filter:drop-shadow(0 0 10px ${passed ? 'var(--accent-green)' : 'var(--accent-orange)'}); transition: stroke-dashoffset 1.5s ease;"/>
          <text x="80" y="80" text-anchor="middle" dy="0.35em" fill="white" font-size="28" font-weight="bold" font-family="JetBrains Mono,monospace">${pct}%</text>
        </svg>
      </div>

      <h3 style="font-size:1.8rem;color:${passed ? 'var(--accent-green)' : 'var(--accent-orange)'}; margin-bottom:20px;">
        ${passed ? '¡CERTIFICACIÓN OBTENIDA! ✔' : 'SIGUE PRACTICANDO 💪'}
      </h3>

      ${passed ? `
        <div class="certificate-box">
          <div class="cert-decoration"></div>
          <div class="cert-title">CERTIFICADO DE COMPETENCIA</div>
          <div class="cert-course">Reparación Profesional de Hardware y Microelectrónica</div>
          <div class="cert-detail">Has demostrado conocimiento en los 14 módulos del programa:<br>
            Arquitectura, Esquemáticos, Diagnóstico, Soldadura, Firmware, Redes de Voltaje,<br>
            VRM, USB-C, BGA, Metodología de Laboratorio, Linux, Producción Industrial y POST Analysis.
          </div>
          <div class="cert-date">Fecha: ${new Date().toLocaleDateString('es-MX', { year:'numeric', month:'long', day:'numeric' })}</div>
          <button class="btn-primary btn-gold" onclick="window.print()">🖨 Imprimir Certificado</button>
        </div>
      ` : `
        <p style="color:var(--text-secondary);max-width:500px;margin:0 auto 30px;">
          Obtuviste ${pct}% — necesitas 70% para certificarte. Revisa los módulos con menor puntaje y vuelve a intentarlo.
        </p>
      `}

      <div style="display:flex;justify-content:center;gap:15px;margin-top:30px;flex-wrap:wrap;">
        <button class="nav-nav-btn" onclick="showFinalExam()">↺ Repetir Examen</button>
        <button class="btn-primary" onclick="navigateToModule(null)">← Ir al Dashboard</button>
      </div>
    </div>
  `;
}

// ═══════════════════════════════════════════════════════════
// CALCULADORAS TÉCNICAS
// ═══════════════════════════════════════════════════════════

function showCalculators() {
  stopStudyTimer();
  state.activeView = 'calculators';
  state.currentModuleId = null;
  renderSidebar();

  const navTabsContainer = document.getElementById("nav-tabs-container");
  const timerEl = document.getElementById("study-timer-display");
  if (navTabsContainer) navTabsContainer.style.display = "none";
  if (timerEl) timerEl.style.display = "none";

  const container = document.getElementById("content-panel");
  container.innerHTML = `
    <div class="glass-panel">
      <div class="module-header">
        <span class="module-tag" style="background:rgba(0,255,136,0.1);border-color:var(--accent-green);color:var(--accent-green);">HERRAMIENTAS</span>
        <h2>⚡ Calculadoras Técnicas de Electrónica</h2>
      </div>
      <p style="color:var(--text-secondary);margin-bottom:40px;">Herramientas de cálculo para uso en laboratorio y diagnóstico de placas madre.</p>

      <div class="calculators-grid">

        <!-- Calculadora Ley de Ohm -->
        <div class="calc-card glass-panel">
          <h3 class="calc-title">🔴 Ley de Ohm — V = I × R</h3>
          <p class="calc-desc">Calcula voltaje, corriente o resistencia. Llena dos campos y el tercero se calculará.</p>
          <div class="calc-inputs">
            <div class="calc-field">
              <label>Voltaje (V)</label>
              <input type="number" id="ohm-v" placeholder="Ej: 19" step="0.01" oninput="calcOhm('v')" class="calc-input">
              <span class="calc-unit">Voltios</span>
            </div>
            <div class="calc-field">
              <label>Corriente (I)</label>
              <input type="number" id="ohm-i" placeholder="Ej: 2.5" step="0.001" oninput="calcOhm('i')" class="calc-input">
              <span class="calc-unit">Amperios</span>
            </div>
            <div class="calc-field">
              <label>Resistencia (R)</label>
              <input type="number" id="ohm-r" placeholder="Ej: 7.6" step="0.01" oninput="calcOhm('r')" class="calc-input">
              <span class="calc-unit">Ohmios (Ω)</span>
            </div>
          </div>
          <div id="ohm-result" class="calc-result"></div>
          <div class="calc-formulas">
            <span>V = I × R</span>
            <span>I = V / R</span>
            <span>R = V / I</span>
            <span>P = V × I</span>
          </div>
        </div>

        <!-- Calculadora Divisor de Voltaje -->
        <div class="calc-card glass-panel">
          <h3 class="calc-title">🟡 Divisor de Voltaje</h3>
          <p class="calc-desc">Calcula el voltaje de salida de un divisor resistivo. Útil para analizar circuitos ACDET y sensores del EC.</p>
          <div class="calc-inputs">
            <div class="calc-field">
              <label>Vin — Voltaje de entrada</label>
              <input type="number" id="div-vin" placeholder="Ej: 19" step="0.1" oninput="calcDivider()" class="calc-input">
              <span class="calc-unit">V</span>
            </div>
            <div class="calc-field">
              <label>R1 — Resistencia Superior</label>
              <input type="number" id="div-r1" placeholder="Ej: 620" step="1" oninput="calcDivider()" class="calc-input">
              <span class="calc-unit">kΩ</span>
            </div>
            <div class="calc-field">
              <label>R2 — Resistencia Inferior (a GND)</label>
              <input type="number" id="div-r2" placeholder="Ej: 100" step="1" oninput="calcDivider()" class="calc-input">
              <span class="calc-unit">kΩ</span>
            </div>
          </div>
          <div id="div-result" class="calc-result"></div>
          <div class="calc-formulas"><span>Vout = Vin × R2 / (R1 + R2)</span></div>
        </div>

        <!-- Potencia y Calor -->
        <div class="calc-card glass-panel">
          <h3 class="calc-title">🔥 Potencia Disipada — Efecto Joule</h3>
          <p class="calc-desc">Calcula la potencia disipada como calor al inyectar voltaje en un cortocircuito.</p>
          <div class="calc-inputs">
            <div class="calc-field">
              <label>Voltaje inyectado (V)</label>
              <input type="number" id="pow-v" placeholder="Ej: 1.0" step="0.1" oninput="calcPower()" class="calc-input">
              <span class="calc-unit">Voltios</span>
            </div>
            <div class="calc-field">
              <label>Resistencia del corto (R)</label>
              <input type="number" id="pow-r" placeholder="Ej: 0.5" step="0.01" oninput="calcPower()" class="calc-input">
              <span class="calc-unit">Ohmios</span>
            </div>
          </div>
          <div id="pow-result" class="calc-result"></div>
          <div class="calc-formulas"><span>P = V² / R</span><span>I = V / R</span><span>P = I² × R</span></div>
        </div>

        <!-- Tabla de colores resistencias -->
        <div class="calc-card glass-panel" style="grid-column: 1 / -1;">
          <h3 class="calc-title">🎨 Decodificador de Resistencias SMD (Código Numérico)</h3>
          <p class="calc-desc">Ingresa el código impreso en una resistencia SMD de 3 o 4 dígitos para calcular su valor en ohmios.</p>
          <div style="display:flex;gap:15px;align-items:flex-end;flex-wrap:wrap;">
            <div class="calc-field" style="flex:1;min-width:180px;">
              <label>Código SMD (Ej: 472, 1002, R47, 0R1)</label>
              <input type="text" id="smd-code" placeholder="Ej: 103" oninput="calcSMD()" class="calc-input" style="text-transform:uppercase;">
            </div>
            <div id="smd-result" class="calc-result" style="flex:2;min-width:200px;"></div>
          </div>
          <div class="calc-formulas">
            <span>3 dígitos: XYZ → XY × 10^Z</span>
            <span>4 dígitos: XYZW → XYZ × 10^W</span>
            <span>R = decimal: 4R7 = 4.7Ω</span>
          </div>
        </div>

      </div>
    </div>
  `;
}

function calcOhm(changed) {
  const vEl = document.getElementById('ohm-v');
  const iEl = document.getElementById('ohm-i');
  const rEl = document.getElementById('ohm-r');
  const result = document.getElementById('ohm-result');
  if (!vEl || !iEl || !rEl || !result) return;

  const v = parseFloat(vEl.value);
  const i = parseFloat(iEl.value);
  const r = parseFloat(rEl.value);

  let output = '';
  if (changed === 'v' || changed === 'i') {
    if (!isNaN(v) && !isNaN(i) && i !== 0) { const R = v / i; rEl.value = R.toFixed(4); const P = v * i; output = `R = ${R.toFixed(4)} Ω · Potencia: ${P.toFixed(3)} W (${(P*1000).toFixed(1)} mW)`; }
  } else if (changed === 'v' || changed === 'r') {
    if (!isNaN(v) && !isNaN(r) && r !== 0) { const I = v / r; iEl.value = I.toFixed(4); const P = v * I; output = `I = ${I.toFixed(4)} A (${(I*1000).toFixed(2)} mA) · Potencia: ${P.toFixed(3)} W`; }
  } else if (changed === 'i' || changed === 'r') {
    if (!isNaN(i) && !isNaN(r)) { const V = i * r; vEl.value = V.toFixed(4); const P = V * i; output = `V = ${V.toFixed(4)} V · Potencia: ${P.toFixed(3)} W`; }
  }

  // Recalcular todo si hay 2 valores
  const vals = [!isNaN(v), !isNaN(i), !isNaN(r)].filter(Boolean).length;
  if (vals >= 2) {
    const cv = parseFloat(vEl.value), ci = parseFloat(iEl.value), cr = parseFloat(rEl.value);
    if (!isNaN(cv) && !isNaN(ci)) { const P = cv*ci; output = `⚡ Potencia: ${P.toFixed(3)} W (${(P*1000).toFixed(1)} mW)`; }
    if (!isNaN(cv) && !isNaN(cr) && cr > 0) { const ci2 = cv/cr; output += ` · I = ${ci2.toFixed(4)} A`; }
  }

  result.innerHTML = output ? `<span class="calc-output">${output}</span>` : '';
}

function calcDivider() {
  const vin = parseFloat(document.getElementById('div-vin')?.value);
  const r1  = parseFloat(document.getElementById('div-r1')?.value);
  const r2  = parseFloat(document.getElementById('div-r2')?.value);
  const res = document.getElementById('div-result');
  if (!res) return;
  if (!isNaN(vin) && !isNaN(r1) && !isNaN(r2) && (r1+r2) > 0) {
    const vout = vin * r2 / (r1 + r2);
    const ratio = (vout/vin*100).toFixed(1);
    res.innerHTML = `<span class="calc-output">Vout = ${vout.toFixed(4)} V (${ratio}% de Vin)</span><br><small style="color:var(--text-secondary)">Ejemplo: Detectar 19V del cargador y entregar ${vout.toFixed(2)}V al pin ACDET del EC.</small>`;
  } else {
    res.innerHTML = '';
  }
}

function calcPower() {
  const v = parseFloat(document.getElementById('pow-v')?.value);
  const r = parseFloat(document.getElementById('pow-r')?.value);
  const res = document.getElementById('pow-result');
  if (!res) return;
  if (!isNaN(v) && !isNaN(r) && r > 0) {
    const I = v / r;
    const P = v * v / r;
    res.innerHTML = `<span class="calc-output">Potencia = ${P.toFixed(3)} W · Corriente = ${I.toFixed(4)} A (${(I*1000).toFixed(2)} mA)</span><br><small style="color:var(--text-secondary)">Esta potencia se disipa como calor en el componente en corto — detectable con cámara térmica o Rosin.</small>`;
  } else {
    res.innerHTML = '';
  }
}

function calcSMD() {
  const code = document.getElementById('smd-code')?.value?.trim().toUpperCase();
  const res = document.getElementById('smd-result');
  if (!res || !code) { if(res) res.innerHTML = ''; return; }

  let value = null, unit = 'Ω';

  if (/^[0-9]R[0-9]$/.test(code) || /^R[0-9]+$/.test(code)) {
    value = parseFloat(code.replace('R', '.'));
  } else if (/^[0-9]+R[0-9]+$/.test(code)) {
    value = parseFloat(code.replace('R', '.'));
  } else if (/^[0-9]{3}$/.test(code)) {
    const sig = parseInt(code.substring(0, 2));
    const exp = parseInt(code[2]);
    value = sig * Math.pow(10, exp);
  } else if (/^[0-9]{4}$/.test(code)) {
    const sig = parseInt(code.substring(0, 3));
    const exp = parseInt(code[3]);
    value = sig * Math.pow(10, exp);
  }

  if (value !== null) {
    let display = value >= 1e6 ? `${(value/1e6).toFixed(3)} MΩ` : value >= 1000 ? `${(value/1000).toFixed(3)} kΩ` : `${value.toFixed(3)} Ω`;
    res.innerHTML = `<span class="calc-output">${display}</span>`;
  } else {
    res.innerHTML = `<span style="color:var(--accent-orange)">Código no reconocido. Intenta: 103, 4R7, 472, 1002</span>`;
  }
}
