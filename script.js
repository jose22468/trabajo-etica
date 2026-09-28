/* =========================================================
   VIRTUDÓPOLIS — Lógica del juego
   Autores: Jose Miguel Bermudez (67001581)
            Laura Sofia Flores (1109161)
   ========================================================= */

/* =========================================================
   CONFIGURACIÓN GENERAL
   ========================================================= */
const CONFIG = {
  maxWeeks: 12,
  initialVirtue: 50,
  initialCommunity: 50,
  winVirtueThreshold: 40,
  winCommunityThreshold: 60,
  loseThreshold: 10
};

/* =========================================================
   DEFINICIÓN DE LAS 5 VIRTUDES (de las 21 de la lectura)
   ========================================================= */
const VIRTUES = {
  prudencia:   { name: 'Prudencia',   icon: '🦉', color: 'var(--prudencia)'   },
  justicia:    { name: 'Justicia',    icon: '⚖️', color: 'var(--justicia)'    },
  fortaleza:   { name: 'Fortaleza',   icon: '🛡️', color: 'var(--fortaleza)'   },
  templanza:   { name: 'Templanza',   icon: '🍃', color: 'var(--templanza)'   },
  solidaridad: { name: 'Solidaridad', icon: '🤝', color: 'var(--solidaridad)' }
};

/* =========================================================
   EVENTOS DEL JUEGO — cada uno con 3 acciones posibles
   Cada acción tiene: text, effects y feedback
   ========================================================= */
const EVENTS = [
  {
    emoji: '🌊',
    title: 'Inundación en el Distrito del Puente',
    description: 'Una crecida del río ha dejado a varias familias sin hogar. Los recursos son limitados y debes decidir cómo actuar.',
    actions: [
      { text: 'Usar todos los fondos para reconstruir las casas afectadas.',
        effects: { solidaridad: 12, justicia: 6, prudencia: -8, comunidad: 6 },
        feedback: 'La solidaridad inmediata salva a las familias, pero descuidas la prevención futura.' },
      { text: 'Construir un dique para prevenir futuras inundaciones.',
        effects: { prudencia: 12, fortaleza: 6, solidaridad: -6, comunidad: 3 },
        feedback: 'Previenes el futuro, pero dejas solas a las víctimas actuales.' },
      { text: 'Organizar a los vecinos para reconstruir juntos.',
        effects: { solidaridad: 10, fortaleza: 8, templanza: 4, comunidad: 8 },
        feedback: 'La comunidad se une. El compromiso social fortalece todas las virtudes.' }
    ]
  },
  {
    emoji: '🏥',
    title: 'Escasez en el Hospital Central',
    description: 'Faltan medicamentos y hay más pacientes que recursos. Debes decidir cómo distribuirlos.',
    actions: [
      { text: 'Dar prioridad a los casos más graves, sin importar quiénes sean.',
        effects: { justicia: 12, prudencia: 6, solidaridad: 3, comunidad: 5 },
        feedback: 'La justicia distributiva guía tus decisiones. Actúas con imparcialidad.' },
      { text: 'Atender primero a quienes puedan pagar el tratamiento.',
        effects: { justicia: -12, prudencia: 3, comunidad: -8 },
        feedback: 'La eficiencia económica no siempre es justa. La ciudad pierde confianza.' },
      { text: 'Repartir los medicamentos equitativamente entre todos.',
        effects: { justicia: 8, templanza: 6, prudencia: -3, comunidad: 4 },
        feedback: 'La equidad es valiosa, aunque puede no ser la solución más eficiente.' }
    ]
  },
  {
    emoji: '🏫',
    title: 'La Escuela Abandonada',
    description: 'Un edificio escolar lleva años en ruinas. Los niños del barrio no tienen dónde estudiar.',
    actions: [
      { text: 'Reconstruir la escuela con fondos públicos.',
        effects: { justicia: 8, solidaridad: 6, comunidad: 10, templanza: -3 },
        feedback: 'Inviertes en el futuro. La educación transforma comunidades.' },
      { text: 'Convertir el edificio en un centro comercial.',
        effects: { prudencia: -6, justicia: -8, comunidad: -4 },
        feedback: 'El beneficio económico no compensa el abandono de los niños.' },
      { text: 'Pedir a los vecinos que arreglen la escuela voluntariamente.',
        effects: { solidaridad: 12, fortaleza: 6, prudencia: -4, comunidad: 6 },
        feedback: 'El compromiso comunitario es admirable, pero no siempre suficiente.' }
    ]
  },
  {
    emoji: '👴',
    title: 'El Anciano Abandonado',
    description: 'Un anciano sin familia vive solo en la calle. Nadie se ha ocupado de él.',
    actions: [
      { text: 'Llevarlo personalmente a un refugio y visitarlo cada semana.',
        effects: { solidaridad: 14, fortaleza: 5, comunidad: 5 },
        feedback: 'Tu compromiso personal transforma una vida. La solidaridad se hace concreta.' },
      { text: 'Reportarlo a servicios sociales y seguir con tus tareas.',
        effects: { prudencia: 6, justicia: 4, solidaridad: -4 },
        feedback: 'Cumples con tu deber, pero la frialdad deja un sabor amargo.' },
      { text: 'Ignorarlo: no es tu responsabilidad.',
        effects: { solidaridad: -14, justicia: -8, comunidad: -8 },
        feedback: 'La indiferencia también es una forma de injusticia.' }
    ]
  },
  {
    emoji: '🎭',
    title: 'Festival Cultural en la Plaza',
    description: 'Se acerca el festival anual. Hay propuestas muy distintas sobre cómo celebrarlo.',
    actions: [
      { text: 'Celebrarlo con lujo y grandes espectáculos, aunque cueste mucho.',
        effects: { templanza: -12, prudencia: -6, comunidad: 5 },
        feedback: 'El exceso y la falta de moderación empañan la celebración.' },
      { text: 'Hacer una celebración sencilla, participativa y austera.',
        effects: { templanza: 12, prudencia: 6, comunidad: 6 },
        feedback: 'La moderación y la sencillez unen a la comunidad sin excesos.' },
      { text: 'Cancelar el festival para ahorrar.',
        effects: { templanza: 3, prudencia: 4, comunidad: -8, solidaridad: -3 },
        feedback: 'Ahorras, pero la comunidad pierde un espacio de encuentro.' }
    ]
  },
  {
    emoji: '📚',
    title: 'La Biblioteca en Crisis',
    description: 'La biblioteca municipal está a punto de cerrar por falta de presupuesto.',
    actions: [
      { text: 'Aumentar los impuestos para sostenerla.',
        effects: { justicia: 5, prudencia: 8, comunidad: 5, templanza: -4 },
        feedback: 'Inviertes en cultura, pero la carga fiscal pesa sobre algunos.' },
      { text: 'Buscar donaciones privadas.',
        effects: { prudencia: 6, solidaridad: 4, comunidad: 4 },
        feedback: 'La colaboración público-privada da resultados, aunque con dependencia.' },
      { text: 'Cerrarla y usar el espacio para oficinas.',
        effects: { justicia: -6, prudencia: -8, comunidad: -8 },
        feedback: 'Sacrificas el conocimiento por intereses administrativos.' }
    ]
  },
  {
    emoji: '🚗',
    title: 'Accidente en la Avenida Principal',
    description: 'Un conductor ebrio atropelló a una familia. La ciudad exige justicia.',
    actions: [
      { text: 'Aplicar la ley con todo su rigor y reparar a la familia.',
        effects: { justicia: 14, fortaleza: 6, comunidad: 6 },
        feedback: 'La justicia se cumple sin venganza pero sin impunidad.' },
      { text: 'Perdonarlo porque tiene familia que depende de él.',
        effects: { templanza: 5, justicia: -8, comunidad: -3 },
        feedback: 'La misericordia sin justicia puede convertirse en impunidad.' },
      { text: 'Dejar que la comunidad decida su castigo.',
        effects: { justicia: -4, solidaridad: 3, fortaleza: -6, comunidad: 2 },
        feedback: 'La justicia popular puede ser desordenada y arbitraria.' }
    ]
  },
  {
    emoji: '💊',
    title: 'Brote Epidémico',
    description: 'Una enfermedad se propaga rápidamente. Hay que tomar medidas drásticas.',
    actions: [
      { text: 'Cuarentena estricta y obligatoria para todos.',
        effects: { prudencia: 10, fortaleza: 8, templanza: 4, comunidad: 4, solidaridad: -4 },
        feedback: 'La disciplina colectiva contiene el brote, aunque sacrifica libertades.' },
      { text: 'Campaña de concientización y confianza en la responsabilidad individual.',
        effects: { prudencia: 4, solidaridad: 6, templanza: 6, comunidad: 3 },
        feedback: 'Apelas a la virtud cívica. Los resultados dependen de cada uno.' },
      { text: 'No hacer nada y esperar que pase solo.',
        effects: { prudencia: -12, justicia: -6, comunidad: -12 },
        feedback: 'La inacción ante una crisis tiene consecuencias graves.' }
    ]
  },
  {
    emoji: '🔥',
    title: 'Incendio en el Mercado',
    description: 'El mercado principal se quema. Muchos comerciantes pierden todo.',
    actions: [
      { text: 'Reconstruirlo con fondos comunes para todos los afectados.',
        effects: { solidaridad: 10, justicia: 8, comunidad: 8, templanza: -3 },
        feedback: 'La solidaridad institucional ayuda a todos por igual.' },
      { text: 'Ayudar solo a los comerciantes más grandes para reactivar la economía.',
        effects: { prudencia: 4, justicia: -10, solidaridad: -6, comunidad: -4 },
        feedback: 'El criterio económico ignora a los más vulnerables.' },
      { text: 'Organizar una colecta entre vecinos.',
        effects: { solidaridad: 12, fortaleza: 5, comunidad: 6, prudencia: -3 },
        feedback: 'La comunidad responde con generosidad, pero el impacto es limitado.' }
    ]
  },
  {
    emoji: '👶',
    title: 'Orfanato al Borde del Cierre',
    description: 'El orfanato local no puede pagar el alquiler. Los niños quedarán en la calle.',
    actions: [
      { text: 'Comprar el edificio con fondos públicos.',
        effects: { justicia: 8, solidaridad: 10, comunidad: 8, prudencia: -3 },
        feedback: 'Garantizas un hogar a los niños. La inversión social vale la pena.' },
      { text: 'Reubicar a los niños en distintas familias.',
        effects: { solidaridad: 5, prudencia: 6, comunidad: 3 },
        feedback: 'La adopción es valiosa, pero no siempre hay familias disponibles.' },
      { text: 'Dejar que el orfanato cierre por falta de recursos.',
        effects: { solidaridad: -12, justicia: -10, comunidad: -8 },
        feedback: 'Los más vulnerables pagan las consecuencias de la indiferencia.' }
    ]
  },
  {
    emoji: '🏭',
    title: 'Contaminación Industrial',
    description: 'Una fábrica contamina el río y afecta la salud de los vecinos. Genera muchos empleos.',
    actions: [
      { text: 'Cerrarla inmediatamente aunque se pierdan empleos.',
        effects: { justicia: 6, fortaleza: 8, prudencia: 4, solidaridad: -4, comunidad: -3 },
        feedback: 'Priorizas la salud sobre la economía, pero el costo social es alto.' },
      { text: 'Exigir que invierta en tecnología limpia para seguir operando.',
        effects: { prudencia: 10, justicia: 6, templanza: 4, comunidad: 6 },
        feedback: 'Buscas un equilibrio entre el bien común y la actividad económica.' },
      { text: 'Ignorar el problema porque los empleos son más importantes.',
        effects: { justicia: -12, prudencia: -8, solidaridad: -6, comunidad: -8 },
        feedback: 'El bienestar económico no justifica el daño a la salud pública.' }
    ]
  },
  {
    emoji: '🌾',
    title: 'Mala Cosecha',
    description: 'La sequía arruinó la cosecha del año. Hay escasez de alimentos en la ciudad.',
    actions: [
      { text: 'Racionar los alimentos entre todos por igual.',
        effects: { templanza: 10, justicia: 8, comunidad: 6, fortaleza: -3 },
        feedback: 'La moderación y la justicia distributiva protegen a los más débiles.' },
      { text: 'Importar alimentos aunque endeude a la ciudad.',
        effects: { prudencia: 4, solidaridad: 6, comunidad: 5, templanza: -4 },
        feedback: 'Solucionas el presente, pero hipotecas el futuro.' },
      { text: 'Dejar que el mercado regule los precios.',
        effects: { justicia: -10, solidaridad: -8, comunidad: -6 },
        feedback: 'Los más pobres no pueden pagar y el hambre se extiende.' }
    ]
  },
  {
    emoji: '🏠',
    title: 'Desalojo en el Barrio Antiguo',
    description: 'Una inmobiliaria quiere demoler casas históricas para construir lujosos edificios.',
    actions: [
      { text: 'Proteger las casas y a sus habitantes.',
        effects: { justicia: 10, solidaridad: 8, fortaleza: 6, prudencia: -3, comunidad: 6 },
        feedback: 'Defiendes la identidad y los derechos de la comunidad.' },
      { text: 'Permitir la demolición a cambio de nuevos empleos.',
        effects: { prudencia: -4, justicia: -8, solidaridad: -6, comunidad: -6 },
        feedback: 'El progreso a costa del desarraigo deja heridas profundas.' },
      { text: 'Negociar: conservar algunas casas y permitir otras construcciones.',
        effects: { prudencia: 10, justicia: 5, templanza: 6, comunidad: 3 },
        feedback: 'La búsqueda del equilibrio es una manifestación de prudencia.' }
    ]
  },
  {
    emoji: '⚽',
    title: 'Torneo Deportivo Comunitario',
    description: 'Se propone organizar un torneo para unir a los barrios. Hay debate sobre el formato.',
    actions: [
      { text: 'Torneo abierto y gratuito para todos los barrios.',
        effects: { solidaridad: 10, comunidad: 8, templanza: 3 },
        feedback: 'El deporte une a la comunidad y refuerza lazos sociales.' },
      { text: 'Torneo con cuota de inscripción para costearlo.',
        effects: { prudencia: 6, solidaridad: -6, comunidad: 2 },
        feedback: 'La sostenibilidad económica excluye a los más pobres.' },
      { text: 'Competencia de élite con premios para los mejores.',
        effects: { fortaleza: 6, templanza: -6, solidaridad: -4, comunidad: 1 },
        feedback: 'El afán de victoria puede opacar el espíritu comunitario.' }
    ]
  },
  {
    emoji: '🗳️',
    title: 'Elecciones en Virtudópolis',
    description: 'Se acercan las elecciones. Un candidato promete soluciones fáciles pero dudosas.',
    actions: [
      { text: 'Apoyar al candidato con el mejor programa aunque sea impopular.',
        effects: { prudencia: 12, fortaleza: 8, justicia: 5, comunidad: 3 },
        feedback: 'La prudencia te lleva a elegir el bien a largo plazo.' },
      { text: 'Apoyar al que promete regalos inmediatos.',
        effects: { prudencia: -10, justicia: -4, comunidad: -3 },
        feedback: 'Las soluciones fáciles suelen traer problemas difíciles.' },
      { text: 'Llamar a la abstención como protesta.',
        effects: { justicia: -4, solidaridad: -6, comunidad: -5, prudencia: -3 },
        feedback: 'La indiferencia cívica también es una forma de renunciar al bien común.' }
    ]
  }
];

/* =========================================================
   ESTADO DEL JUEGO
   ========================================================= */
let state = {
  virtues: {},
  community: CONFIG.initialCommunity,
  week: 1,
  usedEvents: [],
  decisions: []
};

/* =========================================================
   FUNCIONES PRINCIPALES
   ========================================================= */

/** Muestra una pantalla y oculta las demás */
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/** Inicia una nueva partida */
function startGame() {
  state.virtues = {};
  Object.keys(VIRTUES).forEach(k => state.virtues[k] = CONFIG.initialVirtue);
  state.community = CONFIG.initialCommunity;
  state.week = 1;
  state.usedEvents = [];
  state.decisions = [];

  renderVirtues();
  renderCommunity();
  document.getElementById('week-num').textContent = state.week;
  showScreen('screen-game');
  setTimeout(nextEvent, 300);
}

/** Vuelve a la pantalla inicial */
function restartGame() {
  showScreen('screen-landing');
}

/** Dibuja el panel de las 5 virtudes */
function renderVirtues() {
  const panel = document.getElementById('virtues-panel');
  panel.innerHTML = '';
  Object.entries(VIRTUES).forEach(([key, v]) => {
    const val = state.virtues[key];
    const pct = Math.max(0, Math.min(100, val));
    panel.innerHTML += `
      <div class="virtue" style="--vc: ${v.color};" id="virtue-${key}">
        <div class="vhead">
          <span class="vname">${v.name}</span>
          <span class="vicon">${v.icon}</span>
        </div>
        <div class="vbar"><div class="vfill" style="width: ${pct}%;"></div></div>
        <div class="vvalue">${val}</div>
      </div>
    `;
  });
}

/** Dibuja el medidor de Compromiso Social */
function renderCommunity() {
  const val = Math.max(0, Math.min(100, state.community));
  document.getElementById('community-fill').style.width = val + '%';
  document.getElementById('community-value').textContent = state.community;
}

/** Actualiza una virtud y muestra el efecto flotante */
function updateVirtue(key, delta) {
  const before = state.virtues[key];
  state.virtues[key] = Math.max(0, Math.min(100, before + delta));
  const el = document.getElementById('virtue-' + key);
  if (!el) return;
  el.querySelector('.vfill').style.width = state.virtues[key] + '%';
  el.querySelector('.vvalue').textContent = state.virtues[key];

  if (delta !== 0) {
    const rect = el.getBoundingClientRect();
    showFloatEffect(rect.left + rect.width / 2, rect.top, (delta > 0 ? '+' : '') + delta, delta > 0);
  }
}

/** Actualiza el Compromiso Social */
function updateCommunity(delta) {
  state.community = Math.max(0, Math.min(100, state.community + delta));
  renderCommunity();
  if (delta !== 0) {
    const el = document.getElementById('community-value');
    const rect = el.getBoundingClientRect();
    showFloatEffect(rect.left + rect.width / 2, rect.top, (delta > 0 ? '+' : '') + delta, delta > 0);
  }
}

/** Muestra números flotantes (+ / -) */
function showFloatEffect(x, y, text, good) {
  const el = document.createElement('div');
  el.className = 'float-effect';
  el.textContent = text;
  el.style.left = x + 'px';
  el.style.top = y + 'px';
  el.style.color = good ? '#2ed573' : '#ff4757';
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1500);
}

/** Muestra un mensaje emergente */
function showFeedback(msg, type) {
  const fb = document.getElementById('feedback');
  fb.textContent = msg;
  fb.className = 'show ' + (type || '');
  clearTimeout(fb._timer);
  fb._timer = setTimeout(() => fb.className = '', 3200);
}

/** Carga el siguiente evento aleatorio */
function nextEvent() {
  if (state.usedEvents.length >= CONFIG.maxWeeks || state.usedEvents.length >= EVENTS.length) {
    return endGame();
  }

  let available = EVENTS.filter(e => !state.usedEvents.includes(e));
  if (available.length === 0) return endGame();

  const ev = available[Math.floor(Math.random() * available.length)];
  state.usedEvents.push(ev);
  document.getElementById('week-num').textContent = state.week;

  renderEvent(ev);
}

/** Dibuja la carta de evento y sus 3 acciones */
function renderEvent(ev) {
  const card = document.getElementById('event-card');
  card.innerHTML = `
    <div class="event-emoji">${ev.emoji}</div>
    <div class="event-title">${ev.title}</div>
    <div class="event-desc">${ev.description}</div>
  `;
  card.style.animation = 'none';
  void card.offsetWidth;
  card.style.animation = 'cardIn 0.5s ease';

  const actions = document.getElementById('actions');
  actions.innerHTML = '';
  ev.actions.forEach((a, i) => {
    const btn = document.createElement('button');
    btn.className = 'action-btn';
    btn.innerHTML = `<span class="action-num">${i + 1}</span><span>${a.text}</span>`;
    btn.onclick = () => applyAction(a, ev);
    actions.appendChild(btn);
  });
}

/** Aplica los efectos de la acción elegida */
function applyAction(action, ev) {
  document.querySelectorAll('.action-btn').forEach(b => b.disabled = true);

  state.decisions.push({
    week: state.week,
    event: ev.title,
    action: action.text
  });

  Object.entries(action.effects).forEach(([k, v]) => {
    if (k === 'comunidad') {
      updateCommunity(v);
    } else if (state.virtues[k] !== undefined) {
      updateVirtue(k, v);
    }
  });

  const isGood = Object.values(action.effects).reduce((s, v) => s + v, 0) >= 0;
  showFeedback(action.feedback, isGood ? 'good' : 'bad');

  setTimeout(() => {
    state.week++;
    document.getElementById('week-num').textContent = state.week;

    if (checkDefeat()) return;
    if (state.week > CONFIG.maxWeeks) return endGame();

    nextEvent();
  }, 1800);
}

/** Comprueba si el jugador ha perdido */
function checkDefeat() {
  for (const k of Object.keys(VIRTUES)) {
    if (state.virtues[k] <= CONFIG.loseThreshold) {
      return endGame('defeat', `La virtud de la ${VIRTUES[k].name} ha caído demasiado bajo. Sin ella, Virtudópolis no puede prosperar.`);
    }
  }
  if (state.community <= CONFIG.loseThreshold) {
    return endGame('defeat', 'El Compromiso Social se ha derrumbado. La comunidad se ha desintegrado.');
  }
  return false;
}

/** Finaliza la partida y muestra el resumen */
function endGame(forced, reason) {
  showScreen('screen-end');

  const emojiEl = document.getElementById('end-emoji');
  const titleEl = document.getElementById('end-title');
  const textEl = document.getElementById('end-text');
  const statsEl = document.getElementById('end-stats');

  let isWin = false;
  let message = '';

  if (forced === 'defeat') {
    isWin = false;
    message = reason;
  } else {
    const allOk = Object.values(state.virtues).every(v => v >= CONFIG.winVirtueThreshold);
    const comOk = state.community >= CONFIG.winCommunityThreshold;
    isWin = allOk && comOk;

    if (isWin) {
      message = 'Has guiado a Virtudópolis hacia el buen obrar. Las virtudes florecen y la comunidad prospera. Aristóteles estaría orgulloso: has practicado, no solo conocido, las virtudes.';
    } else if (!comOk) {
      message = 'Algunas virtudes se mantuvieron, pero el Compromiso Social no fue suficiente. La ciudad necesita más unión y solidaridad.';
    } else {
      message = 'La comunidad prosperó, pero algunas virtudes quedaron descuidadas. Un buen gobernante debe cultivar todas las virtudes, no solo algunas.';
    }
  }

  emojiEl.textContent = isWin ? '🏆' : '💔';
  titleEl.textContent = isWin ? '¡Victoria Virtuosa!' : (forced === 'defeat' ? 'Derrota...' : 'Victoria Incompleta');
  titleEl.className = 'end-title ' + (isWin ? 'win' : 'lose');
  textEl.textContent = message;

  let statsHtml = '';
  Object.entries(VIRTUES).forEach(([k, v]) => {
    const val = state.virtues[k];
    const ok = val >= CONFIG.winVirtueThreshold;
    statsHtml += `
      <div class="end-stat">
        <div class="k">${v.icon} ${v.name}</div>
        <div class="v" style="color: ${ok ? '#2ed573' : '#ff4757'};">${val}</div>
      </div>
    `;
  });
  statsHtml += `
    <div class="end-stat">
      <div class="k">🤝 Compromiso Social</div>
      <div class="v" style="color: ${state.community >= CONFIG.winCommunityThreshold ? '#2ed573' : '#ff4757'};">${state.community}</div>
    </div>
  `;
  statsEl.innerHTML = statsHtml;
}

/* =========================================================
   INICIALIZACIÓN Y EVENTOS DE LA UI
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {
  // Botones principales
  document.getElementById('btn-start').addEventListener('click', startGame);
  document.getElementById('btn-restart').addEventListener('click', restartGame);

  // Atajos de teclado 1 / 2 / 3 para elegir acción
  document.addEventListener('keydown', (e) => {
    if (!document.getElementById('screen-game').classList.contains('active')) return;
    const idx = parseInt(e.key) - 1;
    const btns = document.querySelectorAll('.action-btn:not([disabled])');
    if (btns[idx]) btns[idx].click();
  });
});
