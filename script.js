
function generateQuestion() {
  const num1 = generateDecimalNumber();
  const num2 = generateDecimalNumber();
  const operations = ['+', '-', '*', '/', '√'];
  const operation = operations[Math.floor(Math.random() * operations.length)];

  let questionText = '';

  switch (operation) {
    case '+':
      const n1 = Math.round(num1);
      const n2 = Math.round(num2);
      currentAnswer = +(n1 + n2).toFixed(1);
      questionText = `${n1} + ${n2}`;
      break;

    case '-':
      const a = Math.round(num1);
      const b = Math.round(num2);
      if (a >= b) {
        currentAnswer = +(a - b).toFixed(1);
        questionText = `${a} - ${b}`;
      } else {
        currentAnswer = +(b - a).toFixed(1);
        questionText = `${b} - ${a}`;
      }
      break;

    case '*':
      const m1 = Math.round(num1);
      const m2 = Math.round(num2);
      currentAnswer = +(m1 * m2).toFixed(1);
      questionText = `${m1} × ${m2}`;
      break;

    case '/':
      let dividend, divisor;
      const d1 = Math.round(num1);
      const d2 = Math.round(num2) || 1; // evita divisão por 0
      if (d1 >= d2) {
        dividend = d1;
        divisor = d2;
      } else {
        dividend = d2;
        divisor = d1 || 1; // evita divisão por 0
      }
      currentAnswer = +(dividend / divisor).toFixed(1);
      questionText = `${dividend} ÷ ${divisor}`;
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
