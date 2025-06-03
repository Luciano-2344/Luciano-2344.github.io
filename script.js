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

function generateDecimalNumber() {
  return +(Math.random() * 19.9 + 0.1).toFixed(1);
}

function generateQuestion() {
  const num1 = generateDecimalNumber();
  const num2 = generateDecimalNumber();
  const operations = ['+', '-', '*', '/', '√'];
  const operation = operations[Math.floor(Math.random() * operations.length)];

  let questionText = '';

  switch (operation) {
    case '+':
      currentAnswer = +(num1 + num2).toFixed(1);
      questionText = `${Math.round(num1)} + ${Math.round(num2)}`;
      break;

    case '-':
      if (num1 >= num2) {
        currentAnswer = +(num1 - num2).toFixed(1);
        questionText = `${Math.round(num1)} - ${Math.round(num2)}`;
      } else {
        currentAnswer = +(num2 - num1).toFixed(1);
        questionText = `${Math.round(num2)} - ${Math.round(num1)}`;
      }
      break;

    case '*':
      currentAnswer = +(num1 * num2).toFixed(1);
      questionText = `${Math.round(num1)} × ${Math.round(num2)}`;
      break;

    case '/':
      let divisor, dividend;
      if (num1 >= num2) {
        dividend = num1;
        divisor = num2 === 0 ? 1 : num2;
      } else {
        dividend = num2;
        divisor = num1 === 0 ? 1 : num1;
      }
      currentAnswer = +(dividend / divisor).toFixed(1);
      questionText = `${Math.round(dividend)} ÷ ${Math.round(divisor)}`;
      break;

    case '√':
      let n = Math.floor(Math.random() * 400) + 1;
      currentAnswer = Math.round(Math.sqrt(n));
      questionText = `√${n}`;
      break;
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
  btnStart.style.display = 'block'; // Exibe o botão para reiniciar
  btnStart.textContent = 'Recomeçar';
}

function checkAnswer() {
  let inputRaw = answerInput.value.trim().replace(',', '.');
  if (inputRaw === '') {
    alert('Por favor, digite uma resposta.');
    return;
  }
  const userAnswer = Number(inputRaw);

  if (Math.abs(userAnswer - currentAnswer) < 0.15) {
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

// Eventos do botão responder e tecla Enter
btnAnswer.addEventListener('click', checkAnswer);
answerInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    checkAnswer();
  }
});

// Botão de começar/recomeçar
btnStart.addEventListener('click', () => {
  score = 0;
  errors = 0;
  updateStatus();
  feedbackEl.textContent = '';
  btnAnswer.disabled = false;
  answerInput.disabled = false;
  gameContainer.style.display = 'block'; // Exibe o jogo
  btnStart.style.display = 'none'; // Esconde o botão de começar
  generateQuestion();
});

// Exibe meta acima da pontuação
const goalDiv = document.createElement('div');
goalDiv.id = 'goal';
goalDiv.style.marginTop = '15px';
goalDiv.style.fontWeight = '600';
goalDiv.style.fontSize = '1.3rem';
goalDiv.style.color = '#000';
goalDiv.textContent = `Meta: ${maxScore} pontos`;
gameContainer.insertBefore(goalDiv, scoreEl);
