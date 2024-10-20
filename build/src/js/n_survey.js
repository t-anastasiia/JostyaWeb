function displaySurvey() {
  const surveyContainer = document.querySelector(".survey-container");
  const questions = [
    {
      id: 1,
      question: "Что вызывает у вас больше всего эмоций?",
      options: [
        { text: "Кошки", points: 3 },
        { text: "Собаки", points: 2 },
        { text: "Программы", points: 1 },
      ],
    },
    {
      id: 2,
      question: "Чем вы занимаетесь в свободное время?",
      options: [
        { text: "Смотрю видео про котов", points: 3 },
        { text: "Читаю книги", points: 2 },
        { text: "Кодирую", points: 1 },
      ],
    },
    {
      id: 3,
      question: "Что вас больше вдохновляет?",
      options: [
        { text: "Фотографии котов", points: 3 },
        { text: "Природа", points: 2 },
        { text: "Новый фреймворк", points: 1 },
      ],
    },
    {
      id: 4,
      question: "Какую кружку вы выбрали бы?",
      options: [
        { text: "С котиком", points: 3 },
        { text: "С мемом", points: 2 },
        { text: "С логотипом любимого языка программирования", points: 1 },
      ],
    },
    {
      id: 5,
      question: "Как бы вы провели вечер?",
      options: [
        { text: "Общение с котом", points: 3 },
        { text: "Прогулка на свежем воздухе", points: 2 },
        { text: "Решение задач на программирование", points: 1 },
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

  radioGroup.classList.add("n_page");
};
