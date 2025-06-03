let score = 0;
let currentAnswer = 0;

function generateQuestion() {
  const num1 = Math.floor(Math.random() * 20) + 1;
  const num2 = Math.floor(Math.random() * 20) + 1;
  const operations = ['+', '-', '*', '/'];
  const operation = operations[Math.floor(Math.random() * operations.length)];

  let questionText = '';

  switch (operation) {
    case '+':
      currentAnswer = num1 + num2;
      questionText = `${num1} + ${num2}`;
      break;

    case '-':
      // garantir resultado não negativo
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
      // garantir divisão exata (inteira)
      currentAnswer = num1;
      const product = num1 * num2;
      questionText = `${product} ÷ ${num2}`;
      break;
  }

  document.getElementById('question').textContent = questionText;
  document.getElementById('answer').value = '';
  document.getElementById('answer').focus();
  document.getElementById('feedback').textContent = '';
}

function checkAnswer() {
  const userAnswer = Number(document.getElementById('answer').value.trim());

  if (userAnswer === currentAnswer) {
    score++;
    document.getElementById('feedback').textContent = '✅ Correto!';
    document.getElementById('feedback').style.color = '#b2f2bb';
  } else {
    document.getElementById('feedback').textContent = `❌ Errado! A resposta correta é ${currentAnswer}.`;
    document.getElementById('feedback').style.color = '#ffb3b3';
  }

  document.getElementById('score').textContent = `Pontuação: ${score}`;

  // gerar próxima pergunta após 1.5 segundos
  setTimeout(generateQuestion, 1500);
}

document.getElementById('btn-answer').addEventListener('click', () => {
  const answerInput = document.getElementById('answer');
  if (answerInput.value.trim() === '') {
    alert('Por favor, digite uma resposta.');
    return;
  }
  checkAnswer();
});

document.getElementById('answer').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    document.getElementById('btn-answer').click();
  }
});

// iniciar o jogo gerando a primeira pergunta
generateQuestion();
