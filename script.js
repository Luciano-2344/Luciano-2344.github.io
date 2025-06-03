let score = 0;
let currentAnswer = 0;
let errors = 0;
const maxErrors = 4;
const maxScore = 15;

function generateIntegerNumber(max = 20) {
  // Gera inteiro entre 1 e max (padrão 20)
  return Math.floor(Math.random() * max) + 1;
}

function generatePerfectSquare(maxRoot = 20) {
  // Gera um quadrado perfeito: (1^2, 2^2, ..., maxRoot^2)
  const root = generateIntegerNumber(maxRoot);
  return { root, square: root * root };
}

function generateQuestion() {
  const operations = ['+', '-', '*', '/', '√'];
  const operation = operations[Math.floor(Math.random() * operations.length)];
  
  let questionText = '';

  if (operation === '√') {
    // gera raiz quadrada de um quadrado perfeito
    const { root, square } = generatePerfectSquare();
    currentAnswer = root;
    questionText = `√${square}`;
  } else {
    const num1 = generateIntegerNumber();
    const num2 = generateIntegerNumber();

    switch (operation) {
      case '+':
        currentAnswer = num1 + num2;
        questionText = `${num1} + ${num2}`;
        break;

      case '-':
        if (num1 >= num2) {
          currentAnswer = num1 - num2;
          questionText = `${num1} - ${num2}`;
        } else {
          currentAnswer = num2 - num1;
          questionText = `${num2} - ${num1}`;
        }
        break;

      case '*':
        currentAnswer = num1 * num2;
        questionText = `${num1} × ${num2}`;
        break;

      case '/':
        // para divisão, garantir divisão exata (sem resto)
        // gera dividend = num1 * num2 para garantir divisibilidade
        const dividend = num1 * num2;
        currentAnswer = num1; // porque dividend / num2 = num1
        questionText = `${dividend} ÷ ${num2}`;
        break;
    }
  }

  document.getElementById('question').textContent = questionText;
  document.getElementById('answer').value = '';
  document.getElementById('answer').focus();
  document.getElementById('feedback').textContent = '';
  updateStatus();
}

function updateStatus() {
  document.getElementById('score').textContent = `Pontuação: ${score} | Tentativas restantes: ${maxErrors - errors}`;
}

function endGame(message) {
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

  if (userAnswer === currentAnswer) {
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

// Exibe a meta acima da pontuação
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
