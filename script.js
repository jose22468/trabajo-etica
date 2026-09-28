const levels = [
  { name: "Prudencia", guide: "Sócrates", icon: "🧔🏻", hint: "Antes de actuar, pregúntate: ¿sé que esto es verdadero y bueno?", questions: [
    ["Antes de reenviar una noticia alarmante del barrio, ¿qué conviene hacer?", ["Reenviarla rápido", "Verificar la fuente y las consecuencias", "Ignorar siempre las noticias", "Compartirla solo con amistades"], 1, "La prudencia delibera antes de actuar; evita tanto la imprudencia como la indiferencia."],
    ["Un amigo te pide decidir por él algo importante. ¿Qué respuesta es prudente?", ["Decidir sin escucharlo", "Escuchar los datos y ayudarle a considerar consecuencias", "Decirle que haga cualquier cosa", "Evitar hablar del tema"], 1, "Elegir bien exige escuchar, pensar y orientar la acción hacia el bien."],
  ]},
  { name: "Justicia", guide: "Aristóteles", icon: "🏛️", hint: "La justicia busca dar a cada persona lo que le corresponde.", questions: [
    ["Una compañera hizo la mayor parte de un trabajo grupal. ¿Qué es justo?", ["Reconocer los aportes reales", "Dar crédito solo a quien expone", "Excluirla del trabajo", "Ignorar el esfuerzo de todos"], 0, "La justicia reconoce lo que corresponde a cada persona y fortalece la convivencia."],
    ["Solo queda un cupo para una actividad y hay criterios públicos de selección. ¿Qué haces?", ["Elegir a mi mejor amigo sin revisar", "Aplicar los criterios de forma igual", "Cancelar la actividad", "Elegir al azar aunque haya criterios"], 1, "La justicia pide actuar con reglas razonables y no favorecer caprichosamente."],
  ]},
  { name: "Fortaleza", guide: "Sócrates", icon: "🧔🏻", hint: "Hacer lo correcto puede ser difícil; la fortaleza da ánimo sin caer en violencia.", questions: [
    ["Ves que se burlan de un estudiante nuevo. ¿Qué muestra fortaleza?", ["Unirse a la burla", "Irse sin actuar", "Pedir con respeto que paren y buscar apoyo", "Insultar más fuerte"], 2, "La fortaleza enfrenta el maltrato con firmeza y respeto, no con agresividad."],
    ["Tu grupo quiere abandonar una campaña ambiental tras un error. ¿Qué haces?", ["Abandonar de inmediato", "Revisar el error y volver a intentarlo", "Culpar a una sola persona", "Repetir el error sin cambios"], 1, "La fortaleza y la perseverancia sostienen el esfuerzo hacia un bien valioso."],
  ]},
  { name: "Templanza", guide: "Aristóteles", icon: "🏛️", hint: "La virtud encuentra un término medio razonado entre el exceso y el defecto.", questions: [
    ["Alguien te provoca en redes sociales. ¿Qué es más templado?", ["Responder con enojo", "Pausar y responder con respeto o retirarse", "Humillarlo públicamente", "No expresar nunca una opinión"], 1, "La templanza ordena las emociones: evita el arrebato y la pasividad irreflexiva."],
    ["En una celebración hay mucha comida y quieres cuidar tu salud. ¿Qué haces?", ["Comer hasta sentirte mal", "Elegir una porción razonable y disfrutar", "No comer nada por miedo", "Criticar a quienes comen"], 1, "Para Aristóteles, el término medio no es una cantidad fija: depende de elegir razonablemente."],
  ]},
  { name: "Solidaridad", guide: "Aristóteles", icon: "🏛️", hint: "El bien propio se conecta con el bien común: aquí se practica la generosidad.", questions: [
    ["Una familia perdió pertenencias en una inundación. ¿Qué es solidario?", ["Organizar ayuda según sus necesidades y con respeto", "Tomar fotos sin permiso", "Esperar que alguien más actúe", "Donar objetos inútiles"], 0, "La solidaridad respeta la dignidad y responde a necesidades reales."],
    ["Puedes ayudar en una tutoría gratuita. ¿Qué decisión es generosa?", ["Prometer más de lo que puedes cumplir", "Ayudar en un horario realista y prepararte", "Negarte siempre a compartir lo que sabes", "Ayudar solo por aplausos"], 1, "La generosidad se vuelve hábito mediante acciones posibles, constantes y orientadas a otras personas."],
  ]},
];

const bossQuestions = [
  ["La Sombra del Vicio dice: «La virtud es solo saber definiciones». ¿Cómo la contradices?", ["La virtud se forma practicando elecciones buenas", "Basta memorizar palabras", "No importa cómo actuamos", "Cada quien decide sin pensar"], 0, "Aristóteles entiende la virtud como un hábito: se aprende al obrar bien repetidamente."],
  ["La sombra propone ayudar para recibir fama. ¿Cuál respuesta la vence?", ["Buscar reconocimiento siempre", "Ayudar por el bien de las personas y la comunidad", "No ayudar nunca", "Ayudar para controlar a los demás"], 1, "El compromiso social busca el bien común, no usar a las personas como medios."],
  ["¿Qué enseñanza une a Sócrates y Aristóteles en esta aventura?", ["Examinar las acciones y practicar buenas decisiones", "Actuar por impulso", "Evitar toda responsabilidad", "Imponer siempre la propia opinión"], 0, "Sócrates invita a examinar la vida; Aristóteles destaca la práctica de hábitos virtuosos."],
];

const el = {
  start: document.querySelector("#start-screen"), game: document.querySelector("#game-screen"), end: document.querySelector("#end-screen"), world: document.querySelector("#game-world"), player: document.querySelector("#player"),
  level: document.querySelector("#level-text"), count: document.querySelector("#challenge-count"), guide: document.querySelector("#guide"), guideIcon: document.querySelector("#guide-icon"), guideName: document.querySelector("#guide-name"), speech: document.querySelector("#guide-speech"), nodes: document.querySelector("#question-nodes"), portal: document.querySelector("#portal"),
  modal: document.querySelector("#question-modal"), modalVirtue: document.querySelector("#modal-virtue"), modalTitle: document.querySelector("#modal-title"), modalAnswers: document.querySelector("#modal-answers"), modalFeedback: document.querySelector("#modal-feedback"), closeModal: document.querySelector("#close-modal"),
  boss: document.querySelector("#boss-modal"), bossAnswers: document.querySelector("#boss-answers"), bossFeedback: document.querySelector("#boss-feedback"), bossNext: document.querySelector("#boss-next"), bossIntro: document.querySelector("#boss-intro"), final: document.querySelector("#final-message"),
};
let levelIndex = 0, solved = new Set(), activeQuestion = null, bossIndex = 0, keys = new Set();
let player = { x: 45, y: 270 };

function startGame() { levelIndex = 0; solved = new Set(); el.start.hidden = true; el.end.hidden = true; el.game.hidden = false; loadLevel(); el.world.focus(); }
function loadLevel() {
  const level = levels[levelIndex]; solved = new Set(); player = { x: 45, y: 270 }; el.level.textContent = `Nivel ${levelIndex + 1}: ${level.name}`; el.guideIcon.textContent = level.icon; el.guideName.textContent = level.guide; el.speech.textContent = `${level.guide}: «${level.hint}»`; el.portal.disabled = true; el.portal.setAttribute("aria-label", "Portal bloqueado: responde los dos retos");
  el.nodes.replaceChildren(); level.questions.forEach((_, index) => { const node = document.createElement("div"); node.className = "question-node"; node.dataset.index = index; node.style.left = index ? "62%" : "39%"; node.style.top = index ? "63%" : "28%"; node.textContent = "?"; node.setAttribute("aria-label", `Reto ${index + 1}`); el.nodes.append(node); }); updatePlayer(); updateCount();
}
function updateCount() { el.count.textContent = `${solved.size}/2`; }
function updatePlayer() { el.player.style.left = `${player.x}px`; el.player.style.top = `${player.y}px`; }
function collision(aX, aY, bX, bY, distance = 45) { return Math.hypot(aX - bX, aY - bY) < distance; }
function movePlayer() {
  if (el.game.hidden || !el.modal.hidden || !el.boss.hidden) return;
  const speed = 4, maxX = el.world.clientWidth - 52, maxY = el.world.clientHeight - 52;
  if (keys.has("arrowleft") || keys.has("a")) player.x -= speed;
  if (keys.has("arrowright") || keys.has("d")) player.x += speed;
  if (keys.has("arrowup") || keys.has("w")) player.y -= speed;
  if (keys.has("arrowdown") || keys.has("s")) player.y += speed;
  player.x = Math.max(0, Math.min(maxX, player.x)); player.y = Math.max(0, Math.min(maxY, player.y)); updatePlayer();
  el.nodes.querySelectorAll(".question-node:not(.is-solved)").forEach(node => { const rect = node.getBoundingClientRect(), worldRect = el.world.getBoundingClientRect(); if (collision(player.x + 24, player.y + 24, rect.left - worldRect.left + 29, rect.top - worldRect.top + 29)) openQuestion(Number(node.dataset.index)); });
}
function openQuestion(index) { activeQuestion = index; const [question, answers] = levels[levelIndex].questions[index]; el.modalVirtue.textContent = `${levels[levelIndex].name} · Reto ${index + 1}`; el.modalTitle.textContent = question; el.modalAnswers.replaceChildren(); el.modalFeedback.hidden = true; el.closeModal.hidden = true; answers.forEach((answer, answerIndex) => { const button = document.createElement("button"); button.className = "answer-button"; button.type = "button"; button.textContent = answer; button.addEventListener("click", () => answerLevel(answerIndex)); el.modalAnswers.append(button); }); el.modal.hidden = false; el.modalAnswers.querySelector("button").focus(); }
function answerLevel(answerIndex) { const [, , correct, explanation] = levels[levelIndex].questions[activeQuestion]; const right = answerIndex === correct; const buttons = el.modalAnswers.querySelectorAll("button"); buttons.forEach((button, index) => { button.disabled = true; if (index === correct) button.classList.add("is-correct"); if (index === answerIndex && !right) button.classList.add("is-incorrect"); }); el.modalFeedback.className = `feedback ${right ? "feedback-correct" : "feedback-incorrect"}`; el.modalFeedback.innerHTML = `<strong>${right ? "¡Reto superado!" : "Aún no."}</strong> ${explanation}`; el.modalFeedback.hidden = false; el.closeModal.hidden = false;
  if (right) { solved.add(activeQuestion); el.nodes.querySelector(`[data-index="${activeQuestion}"]`).classList.add("is-solved"); updateCount(); if (solved.size === 2) { el.portal.disabled = false; el.portal.setAttribute("aria-label", "Portal activo: avanzar al siguiente nivel"); el.speech.textContent = "¡Excelente! Los dos retos están resueltos: el portal está abierto."; } }
}
function closeQuestion() { el.modal.hidden = true; el.world.focus(); }
function usePortal() { if (el.portal.disabled) return; if (levelIndex === levels.length - 1) startBoss(); else { levelIndex += 1; loadLevel(); el.world.focus(); } }
function startBoss() { el.boss.hidden = false; bossIndex = 0; renderBoss(); }
function renderBoss() { const [question, answers] = bossQuestions[bossIndex]; el.bossIntro.textContent = `Reto final ${bossIndex + 1} de ${bossQuestions.length}: ${question}`; el.bossAnswers.replaceChildren(); el.bossFeedback.hidden = true; el.bossNext.hidden = true; answers.forEach((answer, index) => { const button = document.createElement("button"); button.className = "answer-button"; button.type = "button"; button.textContent = answer; button.addEventListener("click", () => answerBoss(index)); el.bossAnswers.append(button); }); el.bossAnswers.querySelector("button").focus(); }
function answerBoss(answerIndex) { const [, , correct, explanation] = bossQuestions[bossIndex], right = answerIndex === correct; const buttons = el.bossAnswers.querySelectorAll("button"); buttons.forEach((button, index) => { button.disabled = true; if (index === correct) button.classList.add("is-correct"); if (index === answerIndex && !right) button.classList.add("is-incorrect"); }); el.bossFeedback.className = `feedback ${right ? "feedback-correct" : "feedback-incorrect"}`; el.bossFeedback.innerHTML = `<strong>${right ? "¡Golpe de virtud!" : "La sombra resiste."}</strong> ${explanation}`; el.bossFeedback.hidden = false; el.bossNext.hidden = false; el.bossNext.textContent = right ? (bossIndex === bossQuestions.length - 1 ? "Vencer a la sombra" : "Siguiente reto final") : "Intentar el reto de nuevo"; el.bossNext.dataset.right = right; }
function nextBoss() { if (el.bossNext.dataset.right !== "true") { renderBoss(); return; } bossIndex += 1; if (bossIndex < bossQuestions.length) renderBoss(); else { el.boss.hidden = true; el.game.hidden = true; el.end.hidden = false; el.final.textContent = "Con prudencia, justicia, fortaleza, templanza y solidaridad venciste a la Sombra del Vicio. Tu explorador demuestra que el buen obrar se aprende practicándolo."; document.querySelector("#end-heading").focus(); } }
document.addEventListener("keydown", event => { const key = event.key.toLowerCase(); if (["arrowleft", "arrowright", "arrowup", "arrowdown", "w", "a", "s", "d"].includes(key)) { keys.add(key); event.preventDefault(); } }); document.addEventListener("keyup", event => keys.delete(event.key.toLowerCase()));
function tick() { movePlayer(); requestAnimationFrame(tick); } tick();
document.querySelector("#start-button").addEventListener("click", startGame); document.querySelector("#restart-button").addEventListener("click", startGame); el.closeModal.addEventListener("click", closeQuestion); el.portal.addEventListener("click", usePortal); el.bossNext.addEventListener("click", nextBoss);
