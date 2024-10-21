const nPageQuestions = [
  {
    id: 1,
    question: "What causes the most emotions for you?",
    options: [
      { text: "Cats", points: 3 },
      { text: "Dogs", points: 2 },
      { text: "Programs", points: 1 },
    ],
  },
  {
    id: 2,
    question: "What do you do in your free time?",
    options: [
      { text: "Watch cat videos", points: 3 },
      { text: "Read books", points: 2 },
      { text: "Code", points: 1 },
    ],
  },
  {
    id: 3,
    question: "What inspires you more?",
    options: [
      { text: "Cat photos", points: 3 },
      { text: "Nature", points: 2 },
      { text: "A new framework", points: 1 },
    ],
  },
  {
    id: 4,
    question: "Which mug would you choose?",
    options: [
      { text: "With a cat", points: 3 },
      { text: "With a meme", points: 2 },
      { text: "With a logo of your favorite programming language", points: 1 },
    ],
  },
  {
    id: 5,
    question: "How would you spend your evening?",
    options: [
      { text: "Chatting with a cat", points: 3 },
      { text: "Walking in the fresh air", points: 2 },
      { text: "Solving programming tasks", points: 1 },
    ],
  },
];

const jPageQuestions = [
  {
    id: 1,
    question: "How do you spend your evening after work?",
    options: [
      { text: "Play video games", points: 3 },
      { text: "Walk with a cat", points: 2 },
      { text: "Read a book", points: 1 },
    ],
  },
  {
    id: 2,
    question: "What are you looking forward to more?",
    options: [
      { text: "New game release", points: 3 },
      { text: "New type of cat food", points: 2 },
      { text: "New episode of your favorite show", points: 1 },
    ],
  },
  {
    id: 3,
    question: "What makes you happier?",
    options: [
      { text: "Completing a difficult game level", points: 3 },
      { text: "A cat purring nearby", points: 2 },
      { text: "A successful day at work", points: 1 },
    ],
  },
  {
    id: 4,
    question: "Which t-shirt would you choose?",
    options: [
      { text: "With a video game character", points: 3 },
      { text: "With a cat", points: 2 },
      { text: "With a meme", points: 1 },
    ],
  },
  {
    id: 5,
    question: "What is your ideal day off?",
    options: [
      { text: "Playing all day", points: 3 },
      { text: "Spending the day with a cat", points: 2 },
      { text: "Hanging out with friends all day", points: 1 },
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
                <p>Question ${index + 1} of ${questions.length}</p>`;

    html +=
      index < questions.length - 1
        ? '<button id="next-question">Next question</button>'
        : '<button id="submit-survey">Complete survey</button>';

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
          showModal("Please select an option!");
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
      resultText = "You love cats more!";
    } else if (points > 8 && points <= 12) {
      resultText = "You like both programming and cats!";
    } else {
      resultText = "You love programming more!";
    }
  } else {
    if (points <= 8) {
      resultText = "You love cats more!";
    } else if (points > 8 && points <= 12) {
      resultText = "You like both video games and cats!";
    } else {
      resultText = "You love video games more!";
    }
  }

  resultContainer.innerHTML = `<h2>Survey Result</h2><p>${resultText}</p>`;
  resultContainer.style.display = "block";

  // Get and display a cat fact via AJAX
  getCatFactWithAjax(function (fact) {
    showModal(`Cat fact: ${fact}`);
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
  $.ajax({
    url: "https://catfact.ninja/fact",
    method: "GET",
    dataType: "json",
    success: function (response) {
      callback(response.fact);
    },

    error: function () {
      console.error("Error fetching cat fact");
      callback("Failed to fetch cat fact.");
    },
  });
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

  window.onclick = function (event) {
    if (event.target == modal) {
      closeModal();
    }
  };
}
