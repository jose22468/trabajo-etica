const questions = [
  {
    virtue: "Prudencia",
    question: "Antes de compartir una noticia alarmante en el grupo del barrio, ¿qué acción muestra prudencia?",
    answers: ["Publicarla rápido para advertir a todos.", "Verificar la fuente y pensar en sus posibles consecuencias.", "Ignorar siempre cualquier noticia.", "Compartirla solo con amistades cercanas."],
    correct: 1,
    explanation: "La prudencia ayuda a deliberar bien antes de actuar. Verificar y valorar consecuencias evita tanto la imprudencia como la indiferencia.",
  },
  {
    virtue: "Justicia",
    question: "En un trabajo grupal, una compañera hizo la mayor parte de la investigación. ¿Qué es lo más justo?",
    answers: ["Repartir el reconocimiento según los aportes reales.", "Poner el mismo reconocimiento aunque nadie haya colaborado.", "Dejar su nombre fuera para evitar discusiones.", "Dar todo el crédito a quien presenta."],
    correct: 0,
    explanation: "La justicia da a cada persona lo que le corresponde. Reconocer los aportes reales favorece la confianza y la responsabilidad colectiva.",
  },
  {
    virtue: "Fortaleza",
    question: "Ves que se burlan de un estudiante nuevo. ¿Qué respuesta refleja fortaleza?",
    answers: ["Unirse para no quedar aislado.", "Alejarse y no decir nada nunca.", "Intervenir con respeto, pedir que paren y buscar apoyo si es necesario.", "Responder con insultos más fuertes."],
    correct: 2,
    explanation: "La fortaleza permite sostener lo correcto ante la dificultad. No es agresividad: busca enfrentar el maltrato con firmeza y respeto.",
  },
  {
    virtue: "Templanza",
    question: "Durante una discusión en redes sociales, alguien te provoca. ¿Qué opción es más templada?",
    answers: ["Responder de inmediato con enojo.", "Pausar, regular el impulso y responder con argumentos respetuosos o retirarse.", "Publicar capturas para humillarlo.", "No expresar nunca una opinión."],
    correct: 1,
    explanation: "La templanza ordena deseos y emociones. Su término medio evita tanto el arrebato como la pasividad que renuncia sin razón a dialogar.",
  },
  {
    virtue: "Solidaridad",
    question: "Una familia vecina perdió parte de sus pertenencias en una inundación. ¿Cuál es una respuesta solidaria?",
    answers: ["Organizar ayuda con lo que necesitan y respetar su dignidad.", "Tomar fotografías y compartirlas sin permiso.", "Esperar a que otra persona resuelva todo.", "Donar objetos dañados que ya no sirven."],
    correct: 0,
    explanation: "La solidaridad reconoce que el bien propio está unido al de otras personas. Ayudar según necesidades reales convierte la generosidad en compromiso social.",
  },
  {
    virtue: "Generosidad",
    question: "Tienes tiempo para apoyar una tutoría gratuita de tu curso. ¿Qué decisión es generosa y equilibrada?",
    answers: ["Comprometerte a ayudar en un horario que puedas cumplir.", "Prometer ayuda diaria aunque sabes que no podrás asistir.", "No compartir nunca lo que sabes.", "Aceptar para que te elogien, sin prepararte."],
    correct: 0,
    explanation: "La generosidad comparte bienes, tiempo y conocimientos de manera responsable. Como hábito, se cultiva con acciones constantes y posibles, no con promesas vacías.",
  },
  {
    virtue: "Honestidad",
    question: "Encuentras una billetera en la biblioteca. ¿Qué debes hacer?",
    answers: ["Quedarte con el dinero si nadie observa.", "Entregarla al punto de información e indicar dónde la encontraste.", "Publicar sus documentos personales en internet.", "Esconderla para buscar luego al dueño."],
    correct: 1,
    explanation: "La honestidad respeta lo ajeno incluso cuando nadie vigila. Repetir este tipo de decisiones forma un carácter digno de confianza.",
  },
  {
    virtue: "Responsabilidad",
    question: "Te corresponde llevar materiales a una jornada ambiental. ¿Qué conducta es responsable?",
    answers: ["Avisar con tiempo si surge un impedimento y buscar una solución.", "No asistir ni responder mensajes.", "Culpar a otra persona por olvidarlos.", "Llevarlos solo si habrá una recompensa."],
    correct: 0,
    explanation: "La responsabilidad cumple los compromisos y repara o comunica a tiempo cuando algo cambia. Así el grupo puede confiar y actuar por el bien común.",
  },
  {
    virtue: "Respeto",
    question: "En una reunión comunitaria, una persona tiene una opinión distinta a la tuya. ¿Qué haces?",
    answers: ["Interrumpir para imponer tu idea.", "Escuchar, responder a las razones y buscar acuerdos posibles.", "Ridiculizar su forma de hablar.", "Aceptar todo sin pensar."],
    correct: 1,
    explanation: "El respeto reconoce la dignidad de quien piensa diferente. Escuchar críticamente es un camino equilibrado entre imponer la propia voz y renunciar al diálogo.",
  },
  {
    virtue: "Perseverancia",
    question: "El grupo no logra organizar su primera actividad de servicio. ¿Qué muestra perseverancia?",
    answers: ["Abandonar al primer error.", "Revisar lo que falló, ajustar el plan y continuar colaborando.", "Repetir el mismo plan sin escucharse.", "Dejar toda la tarea a una persona."],
    correct: 1,
    explanation: "La perseverancia sostiene el esfuerzo hacia un bien valioso. La virtud se vuelve hábito al aprender de los errores y actuar de nuevo con mejor criterio.",
  },
];

const elements = {
  start: document.querySelector("#start-screen"), quiz: document.querySelector("#quiz-screen"), end: document.querySelector("#end-screen"),
  startButton: document.querySelector("#start-button"), restartButton: document.querySelector("#restart-button"), nextButton: document.querySelector("#next-button"),
  progress: document.querySelector("#progress-text"), progressBar: document.querySelector("#progress-bar"), score: document.querySelector("#score"),
  virtue: document.querySelector("#virtue-tag"), question: document.querySelector("#question-heading"), answers: document.querySelector("#answers"),
  feedback: document.querySelector("#feedback"), finalScore: document.querySelector("#final-score"), finalTotal: document.querySelector("#final-total"), finalMessage: document.querySelector("#final-message"),
};
let currentQuestion = 0;
let score = 0;

function startGame() {
  currentQuestion = 0; score = 0;
  elements.start.hidden = true; elements.end.hidden = true; elements.quiz.hidden = false;
  renderQuestion();
}

function renderQuestion() {
  const item = questions[currentQuestion];
  elements.progress.textContent = `Pregunta ${currentQuestion + 1} de ${questions.length}`;
  elements.progressBar.style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;
  elements.score.textContent = score; elements.virtue.textContent = item.virtue; elements.question.textContent = item.question;
  elements.answers.replaceChildren(); elements.feedback.hidden = true; elements.nextButton.hidden = true;
  item.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.type = "button"; button.className = "answer-button"; button.textContent = answer;
    button.addEventListener("click", () => selectAnswer(index));
    elements.answers.append(button);
  });
  elements.question.focus();
}

function selectAnswer(selectedIndex) {
  const item = questions[currentQuestion];
  const buttons = elements.answers.querySelectorAll("button");
  buttons.forEach((button, index) => {
    button.disabled = true;
    if (index === item.correct) button.classList.add("is-correct");
    if (index === selectedIndex && index !== item.correct) button.classList.add("is-incorrect");
  });
  const isCorrect = selectedIndex === item.correct;
  if (isCorrect) score += 1;
  elements.score.textContent = score;
  elements.feedback.className = `feedback ${isCorrect ? "feedback-correct" : "feedback-incorrect"}`;
  elements.feedback.innerHTML = `<strong>${isCorrect ? "¡Respuesta correcta!" : "Aún no."}</strong> ${item.explanation}`;
  elements.feedback.hidden = false;
  elements.nextButton.textContent = currentQuestion === questions.length - 1 ? "Ver mi resultado" : "Siguiente desafío";
  elements.nextButton.hidden = false; elements.nextButton.focus();
}

function nextQuestion() {
  currentQuestion += 1;
  if (currentQuestion < questions.length) renderQuestion(); else showResults();
}

function showResults() {
  elements.quiz.hidden = true; elements.end.hidden = false;
  elements.finalScore.textContent = score; elements.finalTotal.textContent = questions.length;
  elements.finalMessage.textContent = score >= 8 ? "¡Excelente! Tu ruta refleja decisiones muy orientadas al bien común." : score >= 5 ? "¡Buen recorrido! Sigue practicando estas virtudes en tus decisiones diarias." : "Cada decisión es una oportunidad para entrenar el carácter y cuidar a la comunidad.";
  document.querySelector("#end-heading").focus();
}

elements.startButton.addEventListener("click", startGame);
elements.restartButton.addEventListener("click", startGame);
elements.nextButton.addEventListener("click", nextQuestion);
