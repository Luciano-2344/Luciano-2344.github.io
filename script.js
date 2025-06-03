let score = 0;
let currentAnswer = 0;
let errors = 0;
const maxErrors = 4;
const maxScore = 15;

let timeLeft = 30; // segundos
let timerInterval;

function startTimer() {
  clearInterval(timerInterval);
  timeLeft = 30;
  document.getElementById('timer').textContent = `Tempo restante: ${timeLeft}s`;
  timerInterval = setInterval(() => {
    timeLeft--;
    document.getElementById('timer').textContent = `Tempo restante: ${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      endGame('⏰ Tempo esgotado! Jogo encerrado.');
    }
  }, 1000);
}

function generateDecimalNumber() {
  return +(Math.random() * 19.9 + 0.1).toFixed(1);
}

// ... (sua função generateQuestion permanece igual, mas chame startTimer nela para reiniciar o tempo a cada pergunta)

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
      // Raiz quadrada: apenas um número inteiro, pergunta só com um número
      let n = Math.floor(Math.random() * 400) + 1; // de 1 a 400 para raiz quadrada razoável
      currentAnswer = Math.round(Math.sqrt(n));
      questionText = `√${n}`;
      break;
  }

  document.getElementById('question').textContent = questionText;
  document.getElementById('answer').value = '';
  document.getElementById('answer').focus();
  document.getElementById('feedback').textContent = '';
  updateStatus();
  startTimer();
}

function updateStatus() {
  document.getElementById('score').textContent = `Pontuação: ${score} | Tentativas restantes: ${maxErrors - errors}`;
}

function endGame(message) {
  clearInterval(timerInterval);
  document.getElementById('feedback').textContent = message;
  document.getElementById('btn-answer').disabled = true;
  document.getElementById('answer').disabled = true;

  if (!document.getElementById('btn-restart')) {
    const btnRestart = document.createElement('button');
    btnRestart.id = 'btn-restart';
    btnRestart.textContent = 'Recomeçar';
    btnRestart.style.marginTop = '15px';
    btnRestart.style.padding = '12px 25px';
    btnRestart.style.fontSize = '1.2rem';
    btnRestart.style.borderRadius = '12px';
    btnRestart.style.border = 'none';
    btnRestart.style.cursor = 'pointer';
    btnRestart.style.backgroundColor = '#4caf50';
    btnRestart.style.color = 'white';
    btnRestart.style.fontWeight = '600';

    btnRestart.addEventListener('mouseenter', () => {
      btnRestart.style.backgroundColor = '#45a049';
    });
    btnRestart.addEventListener('mouseleave', () => {
      btnRestart.style.backgroundColor = '#4caf50';
    });

    btnRestart.addEventListener('click', () => {
      score = 0;
      errors = 0;
      document.getElementById('btn-answer').disabled = false;
      document.getElementById('answer').disabled = false;
      document.getElementById('feedback').textContent = '';
      btnRestart.remove();
      updateStatus();
      generateQuestion();
    });

    document.querySelector('.game-container').appendChild(btnRestart);
  }
}

function checkAnswer() {
  let inputRaw = document.getElementById('answer').value.trim().replace(',', '.');
  if (inputRaw === '') {
    alert('Por favor, digite uma resposta.');
    return;
  }
  const userAnswer = Number(inputRaw);

  if (Math.abs(userAnswer - currentAnswer) < 0.15) {
    score++;
    document.getElementById('feedback').textContent = '✅ Correto!';
    document.getElementById('feedback').style.color = '#b2f2bb';
  } else {
    errors++;
    document.getElementById('feedback').textContent = `❌ Errado! Resposta correta: ${currentAnswer}`;
    document.getElementById('feedback').style.color = '#ffb3b3';
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
}

document.getElementById('btn-answer').addEventListener('click', () => {
  checkAnswer();
});

document.getElementById('answer').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    checkAnswer();
  }
});

// Adiciona a meta acima da pontuação
const goalDiv = document.createElement('div');
goalDiv.id = 'goal';
goalDiv.style.marginTop = '15px';
goalDiv.style.fontWeight = '600';
goalDiv.style.fontSize = '1.3rem';
goalDiv.style.color = '#fff';
goalDiv.textContent = `Meta: ${maxScore} pontos`;

document.querySelector('.game-container').insertBefore(goalDiv, document.getElementById('score'));

updateStatus();
generateQuestion();
