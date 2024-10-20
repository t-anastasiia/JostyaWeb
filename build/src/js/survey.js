
const nPageQuestions = [
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

const jPageQuestions = [
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

function displaySurvey(questions) {
  const surveyContainer = document.querySelector(".survey-container");
  let currentQuestionIndex = 0;
  let totalPoints = 0;

  function showQuestion(index) {
    const question = questions[index];
    let html = `<div class="question">
                  <p>${question.question}</p>
                  ${question.options
                    .map(
                      (option) =>
                        `<label><input type="radio" name="q${question.id}" value="${option.points}">${option.text}</label><br>`
                    )
                    .join("")}
                </div>
                <p>Вопрос ${index + 1} из ${questions.length}</p>`;

    html +=
      index < questions.length - 1
        ? '<button id="next-question">Следующий вопрос</button>'
        : '<button id="submit-survey">Завершить опрос</button>';

    surveyContainer.innerHTML = html;

    document
      .getElementById(
        index < questions.length - 1 ? "next-question" : "submit-survey"
      )
      .addEventListener("click", () => {
        const selected = document.querySelector(
          `.question input[type="radio"]:checked`
        );
        if (selected) {
          totalPoints += parseInt(selected.value);
          currentQuestionIndex++;
          if (currentQuestionIndex < questions.length) {
            showQuestion(currentQuestionIndex);
          } else {
            displayResults(totalPoints, questions === nPageQuestions);
          }
        } else {
          showModal("Пожалуйста, выберите один из вариантов ответа!");
        }
      });
  }

  showQuestion(currentQuestionIndex);
}

function displayResults(points, isNPage) {
  const resultContainer = document.querySelector(".result-container");
  let resultText = "";

  if (isNPage) {
    if (points <= 8) {
      resultText = "Вы больше любите котов!";
    } else if (points > 8 && points <= 12) {
      resultText = "Вам нравятся и программирование, и коты!";
    } else {
      resultText = "Вы больше любите программирование!";
    }
  } else {
    if (points <= 8) {
      resultText = "Вы больше любите котов!";
    } else if (points > 8 && points <= 12) {
      resultText = "Вам нравятся и видеоигры, и коты!";
    } else {
      resultText = "Вы больше любите видеоигры!";
    }
  }

  resultContainer.innerHTML = `<h2>Результат опроса</h2><p>${resultText}</p>`;
  resultContainer.style.display = "block";

    // Получаем и отображаем факт о котах через AJAX
    getCatFactWithAjax(function(fact) {
      showModal(`Факт о котах: ${fact}`);
    });
}

window.onload = function () {
  if (document.body.classList.contains("n-page")) {
    displaySurvey(nPageQuestions);
  } else if (document.body.classList.contains("j-page")) {
    displaySurvey(jPageQuestions);
  }
  document.querySelector(".result-container").style.display = "none";
};

function getCatFactWithAjax(callback) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "https://catfact.ninja/fact", true); 

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const response = JSON.parse(xhr.responseText); 
      callback(response.fact); 
    }
  };

  xhr.onerror = function () {
    console.error("Ошибка при запросе факта о котах");
    callback("Не удалось получить факт о котах.");
  };

  xhr.send();
}

function showModal(message) {
  const modal = document.getElementById("modal");
  const modalText = document.getElementById("modal-text");
  const closeButton = document.getElementById("modal-close-button");

  modalText.innerText = message;
  modal.style.display = "flex"; 

  function closeModal() {
    modal.style.display = "none"; 
  }

  closeButton.onclick = closeModal;
  closeSpan.onclick = closeModal;

  window.onclick = function (event) {
    if (event.target == modal) {
      closeModal();
    }
  };
}