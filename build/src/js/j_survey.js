function displaySurvey() {
  const surveyContainer = document.querySelector(".survey-container");
  const questions = [
    {
      id: 1,
      question: "Как вы проводите вечер после работы?",
      options: [
        { text: "Играю в видеоигры", points: 3 },
        { text: "Гуляю с котом", points: 2 },
        { text: "Читаю книгу", points: 1 },
      ],
    },
    {
      id: 2,
      question: "Что вы больше ждете?",
      options: [
        { text: "Релиз новой игры", points: 3 },
        { text: "Новый вид корма для кота", points: 2 },
        { text: "Новую серию любимого шоу", points: 1 },
      ],
    },
    {
      id: 3,
      question: "Что вас больше радует?",
      options: [
        { text: "Прохождение сложного уровня в игре", points: 3 },
        { text: "Кот мурлычет рядом", points: 2 },
        { text: "Успешный день на работе", points: 1 },
      ],
    },
    {
      id: 4,
      question: "Какую футболку вы бы выбрали?",
      options: [
        { text: "С героем видеоигры", points: 3 },
        { text: "С котиком", points: 2 },
        { text: "С мемом", points: 1 },
      ],
    },
    {
      id: 5,
      question: "Какой идеальный выходной?",
      options: [
        { text: "Целый день играю", points: 3 },
        { text: "Целый день провожу с котом", points: 2 },
        { text: "Целый день с друзьями", points: 1 },
      ],
    },
  ];

  let html = "";

  questions.forEach((question) => {
    html += `<div class="question">
                    <p>${question.question}</p>
                    ${question.options
                      .map(
                        (option) =>
                          `<label><input type="radio" name="q${question.id}" value="${option.points}">${option.text}</label><br>`
                      )
                      .join("")}
                  </div>`;
  });

  html += '<button id="submit-survey">Submit Survey</button>';
  surveyContainer.innerHTML = html;

  document
    .getElementById("submit-survey")
    .addEventListener("click", submitSurvey);
}

function submitSurvey() {
  let totalPoints = 0;
  document.querySelectorAll(".question").forEach((question) => {
    const selected = question.querySelector('input[type="radio"]:checked');
    if (selected) {
      totalPoints += parseInt(selected.value);
    }
  });

  displayResults(totalPoints);

  document.querySelector(".result-container").style.display = "block";
}

function displayResults(points) {
    const resultContainer = document.querySelector(".result-container");
  
    if (points < 5) {
      alert("Вы выбрали слишком мало вариантов, пожалуйста, выберите больше!");
      return; 
    }
  
    let resultText = "";
  
    if (points <= 8) {
      resultText = "Вы больше любите котов!";
    } else if (points > 8 && points <= 12) {
      resultText = "Вам нравятся и видеоигры, и коты!";
    } else {
      resultText = "Вы больше любите видеоигры!";
    }
  
    resultContainer.innerHTML = `<h2>Результат опроса</h2><p>${resultText}</p>`;
  }

window.onload = function () {
  displaySurvey();

  const radioGroup = document.querySelector(".survey-container");

  radioGroup.classList.add("j_page");
};
