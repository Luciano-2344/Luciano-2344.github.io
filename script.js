let score = 0;
let currentAnswer = 0;
let errors = 0;
const maxErrors = 4;
const maxScore = 15;

let timeLeft = 35;
let timerInterval;

const timerEl = document.getElementById('timer');
const questionEl = document.getElementById('question');
const answerInput = document.getElementById('answer');
const btnAnswer = document.getElementById('btn-answer');
const feedbackEl = document.getElementById('feedback');
const scoreEl = document.getElementById('score');
const gameContainer = document.querySelector('.game-container');
const btnStart = document.getElementById('btn-start');

function startTimer() {
  clearInterval(timerInterval);
  timeLeft = 35;
  timerEl.textContent = `Tempo restante: ${timeLeft}s`;

  timerInterval = setInterval(() => {
    timeLeft--;
    timerEl.textContent = `Tempo restante: ${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      endGame('⏰ Tempo esgotado! Jogo encerrado.');
    }
  }, 1000);
}

function generateQuestion() {
  const operations = ['+', '-'];
  const operation = operations[Math.floor(Math.random() * operations.length)];

  const num1 = Math.floor(Math.random() * 20);
  const num2 = Math.floor(Math.random() * 20);

  let questionText = '';

  if (operation === '+') {
    currentAnswer = num1 + num2;
    questionText = `${num1} + ${num2}`;
  } else {
    if (num1 >= num2) {
      currentAnswer = num1 - num2;
      questionText = `${num1} - ${num2}`;
    } else {
      currentAnswer = num2 - num1;
      questionText = `${num2} - ${num1}`;
    }
  }

  questionEl.textContent = questionText;
  answerInput.value = '';
  answerInput.focus();
  feedbackEl.textContent = '';
  updateStatus();
  startTimer();
}

function updateStatus() {
  scoreEl.textContent = `Pontuação: ${score} | Tentativas restantes: ${maxErrors - errors}`;
}

function endGame(message) {
  clearInterval(timerInterval);
  feedbackEl.textContent = message;
  btnAnswer.disabled = true;
  answerInput.disabled = true;
  btnStart.style.display = 'block';
  btnStart.textContent = 'Recomeçar';
}

function checkAnswer() {
  const userAnswer = parseInt(answerInput.value.trim());

  if (isNaN(userAnswer)) {
    alert('Por favor, digite um número.');
    return;
  }

  if (userAnswer === currentAnswer) {
    score++;
    feedbackEl.textContent = '✅ Correto!';
    feedbackEl.style.color = '#b2f2bb';
  } else {
    errors++;
    feedbackEl.textContent = `❌ Errado! Resposta correta: ${currentAnswer}`;
    feedbackEl.style.color = '#ffb3b3';
  }

  updateStatus();

  if (score >= maxScore) {
    endGame('🎉 Parabéns! Você atingiu a meta de 15 pontos! 🎉');
    return;
  }

  if (errors >= maxErrors) {
    endGame('😞 Você errou 4 vezes. Jogo encerrado.');
    return;
  }

  setTimeout(generateQuestion, 1500);
  startTimer();
}

btnAnswer.addEventListener('click', checkAnswer);
answerInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    checkAnswer();
  }
});

btnStart.addEventListener('click', () => {
  score = 0;
  errors = 0;
  updateStatus();

  feedbackEl.textContent = '';
  btnAnswer.disabled = false;
  answerInput.disabled = false;
  gameContainer.style.display = 'block';
  btnStart.style.display = 'none';
  generateQuestion();
});
