function generateQuestion() {
  const operations = ['+', '-', '*', '/', '√'];
  const operation = operations[Math.floor(Math.random() * operations.length)];
  let questionText = '';

  switch (operation) {
    case '+':
      const a1 = Math.floor(Math.random() * 20);
      const a2 = Math.floor(Math.random() * 20);
      currentAnswer = a1 + a2;
      questionText = `${a1} + ${a2}`;
      break;

    case '-':
      const b1 = Math.floor(Math.random() * 20);
      const b2 = Math.floor(Math.random() * 20);
      if (b1 >= b2) {
        currentAnswer = b1 - b2;
        questionText = `${b1} - ${b2}`;
      } else {
        currentAnswer = b2 - b1;
        questionText = `${b2} - ${b1}`;
      }
      break;

    case '*':
      const m1 = Math.floor(Math.random() * 10);
      const m2 = Math.floor(Math.random() * 10);
      currentAnswer = m1 * m2;
      questionText = `${m1} × ${m2}`;
      break;

    case '/':
      const d2 = Math.floor(Math.random() * 9) + 1; // divisor entre 1 e 9
      const d1 = d2 * Math.floor(Math.random() * 10); // múltiplo do divisor
      currentAnswer = d1 / d2;
      questionText = `${d1} ÷ ${d2}`;
      break;

    case '√':
      const n = Math.pow(Math.floor(Math.random() * 20), 2); // gera quadrado perfeito
      currentAnswer = Math.sqrt(n);
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
