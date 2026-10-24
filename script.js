const phrases = [
  {
    category: "Travel",
    kannada: "ಬಸ್ ನಿಲ್ದಾಣ ಎಲ್ಲಿದೆ?",
    pronunciation: "Bus nildana ellide?",
    meaning: "Where is the bus stand?"
  },
  {
    category: "Travel",
    kannada: "ಈ ಬಸ್ ಎಲ್ಲಿಗೆ ಹೋಗುತ್ತದೆ?",
    pronunciation: "Ee bus ellige hoguttade?",
    meaning: "Where does this bus go?"
  },
  {
    category: "Shopping",
    kannada: "ಇದರ ಬೆಲೆ ಎಷ್ಟು?",
    pronunciation: "Idara bele eshtu?",
    meaning: "How much does this cost?"
  },
  {
    category: "Shopping",
    kannada: "ಸ್ವಲ್ಪ ಕಡಿಮೆ ಮಾಡಿ.",
    pronunciation: "Swalpa kadime maadi.",
    meaning: "Please reduce the price a little."
  },
  {
    category: "Hospital",
    kannada: "ನನಗೆ ಸಹಾಯ ಬೇಕು.",
    pronunciation: "Nanage sahaya beku.",
    meaning: "I need help."
  },
  {
    category: "Hospital",
    kannada: "ಆಸ್ಪತ್ರೆ ಎಲ್ಲಿದೆ?",
    pronunciation: "Aaspatre ellide?",
    meaning: "Where is the hospital?"
  },
  {
    category: "College",
    kannada: "ತರಗತಿ ಎಲ್ಲಿದೆ?",
    pronunciation: "Taragati ellide?",
    meaning: "Where is the classroom?"
  },
  {
    category: "College",
    kannada: "ನನಗೆ ಅರ್ಥವಾಗಲಿಲ್ಲ.",
    pronunciation: "Nanage arthavaagalilla.",
    meaning: "I did not understand."
  },
  {
    category: "Workplace",
    kannada: "ದಯವಿಟ್ಟು ಸಹಾಯ ಮಾಡಿ.",
    pronunciation: "Dayavittu sahaya maadi.",
    meaning: "Please help me."
  },
  {
    category: "Workplace",
    kannada: "ಧನ್ಯವಾದಗಳು.",
    pronunciation: "Dhanyavaadagalu.",
    meaning: "Thank you."
  }
];

let currentCategory = "All";

function showPhrases() {
  const searchText = document
    .getElementById("search").value.toLowerCase();

  const filtered = phrases.filter(function (phrase) {
    const matchesCategory =
      currentCategory === "All" ||
      phrase.category === currentCategory;

    const matchesSearch =
      phrase.kannada.toLowerCase().includes(searchText) ||
      phrase.pronunciation.toLowerCase().includes(searchText) ||
      phrase.meaning.toLowerCase().includes(searchText);

    return matchesCategory && matchesSearch;
  });

  const list = document.getElementById("phrase-list");
  list.innerHTML = "";

  document.getElementById("message").textContent =
    filtered.length === 0 ? "No phrases found. Try another search." : "";

  filtered.forEach(function (phrase) {
    const card = document.createElement("article");
    card.className = "phrase-card";

    const word = document.createElement("p");
    word.className = "kannada";
    word.textContent = phrase.kannada;

    const pronunciation = document.createElement("p");
    pronunciation.textContent = phrase.pronunciation;

    const meaning = document.createElement("p");
    meaning.className = "meaning";
    meaning.textContent = phrase.meaning;

    const listenButton = document.createElement("button");
    listenButton.className = "listen";
    listenButton.textContent = "🔊 Listen";

    listenButton.addEventListener("click", function () {
      if (!("speechSynthesis" in window)) {
        alert("Audio is not supported in this browser.");
        return;
      }

      const speech = new SpeechSynthesisUtterance(phrase.kannada);
      speech.lang = "kn-IN";
      window.speechSynthesis.speak(speech);
    });

    card.append(word, pronunciation, meaning, listenButton);
    list.appendChild(card);
  });
}

document.querySelectorAll("[data-category]").forEach(function (button) {
  button.addEventListener("click", function () {
    currentCategory = button.dataset.category;

    document.getElementById("section-title").textContent =
      currentCategory + " Kannada Phrases";

    showPhrases();
  });
});

document.getElementById("search").addEventListener("input", showPhrases);

// Quiz questions
const questions = [
  {
    question: 'What does "ನಮಸ್ಕಾರ" mean?',
    options: ["Goodbye", "Hello / Greetings", "Sorry"],
    answer: "Hello / Greetings"
  },
  {
    question: 'What does "ಧನ್ಯವಾದಗಳು" mean?',
    options: ["Thank you", "Good morning", "Please come"],
    answer: "Thank you"
  },
  {
    question: 'What does "ಇದರ ಬೆಲೆ ಎಷ್ಟು?" mean?',
    options: ["Where is the bus?", "What is your name?", "How much does this cost?"],
    answer: "How much does this cost?"
  }
];

let questionIndex = 0;

function showQuestion() {
  const question = questions[questionIndex];

  document.getElementById("question").textContent = question.question;
  document.getElementById("quiz-result").textContent = "";

  const options = document.getElementById("quiz-options");
  options.innerHTML = "";

  question.options.forEach(function (option) {
    const button = document.createElement("button");
    button.textContent = option;

    button.addEventListener("click", function () {
      document.getElementById("quiz-result").textContent =
        option === question.answer
          ? "Correct! Well done 🎉"
          : "Not quite. Correct answer: " + question.answer;

      options.querySelectorAll("button").forEach(function (item) {
        item.disabled = true;
      });
    });

    options.appendChild(button);
  });
}

document.getElementById("next-question").addEventListener("click", function () {
  questionIndex = (questionIndex + 1) % questions.length;
  showQuestion();
});

showPhrases();
showQuestion();