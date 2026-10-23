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
    console.log("Search text:",
      searchText);

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

    const favoriteButton = document.createElement("button");
favoriteButton.textContent = "⭐ Add to Favorites";


favoriteButton.addEventListener("click", function () {
    let favorites = JSON.parse(
        localStorage.getItem("favorites") || "[]"
    );

    const alreadySaved = favorites.some(function (item) {
        return item.kannada === phrase.kannada;
    });

    if (alreadySaved) {
        alert("Already added to Favorites!");
        return;
    }

    favorites.push(phrase);

    localStorage.setItem("favorites", JSON.stringify(favorites));

    favoriteButton.textContent = "⭐ Added to Favorites";
});
card.append(word, pronunciation, meaning, listenButton, favoriteButton);
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
document.getElementById("show-favorites").addEventListener("click", function () {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const list = document.getElementById("phrase-list");

    list.innerHTML = "";

    document.getElementById("section-title").textContent = "⭐ Favorite Phrases";
    document.getElementById("message").textContent =
        favorites.length === 0 ? "No favorites saved yet!" : "";

    favorites.forEach(function (phrase) {
        const card = document.createElement("article");
        card.className = "phrase-card";

        const word = document.createElement("p");
        word.className = "kannada";
        word.textContent = phrase.kannada;

        const pronunciation = document.createElement("p");
        pronunciation.textContent = phrase.pronunciation;

        const meaning = document.createElement("p");
        meaning.textContent = phrase.meaning;

        card.append(word, pronunciation, meaning);
        const removeButton = document.createElement("button");
removeButton.textContent = "❌ Remove from Favorites";

removeButton.addEventListener("click", function () {
const updatedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];

const remainingFavorites = updatedFavorites.filter(function (item) {
    return item.kannada !== phrase.kannada;
});

localStorage.setItem("favorites", JSON.stringify(remainingFavorites));

list.innerHTML = "";
document.getElimentaryById("show-favorites").click();
document.getElementById("section-title").textContent = "⭐ Favorite Phrases";
document.getElementById("message").textContent =
    remainingFavorites.length === 0 ? "No favorites saved yet!" : "";

});

card.appendChild(removeButton);
        list.appendChild(card);
    });
});
// Kannada Flashcards
const flashcards = [
  { word: "ನಮಸ್ಕಾರ", pronunciation: "Namaskara", meaning: "Hello / Greetings" },
  { word: "ಧನ್ಯವಾದಗಳು", pronunciation: "Dhanyavadagalu", meaning: "Thank you" },
  { word: "ಹೌದು", pronunciation: "Haudu", meaning: "Yes" },
  { word: "ಇಲ್ಲ", pronunciation: "Illa", meaning: "No" },
  { word: "ದಯವಿಟ್ಟು", pronunciation: "Dayavittu", meaning: "Please" },
  { word: "ಕ್ಷಮಿಸಿ", pronunciation: "Kshamisi", meaning: "Sorry / Excuse me" },
  { word: "ನೀರು", pronunciation: "Neeru", meaning: "Water" },
  { word: "ಊಟ", pronunciation: "Oota", meaning: "Food / Meal" },
  { word: "ಮನೆ", pronunciation: "Mane", meaning: "House / Home" },
  { word: "ಸ್ನೇಹಿತ", pronunciation: "Snehita", meaning: "Friend" }
];

let flashcardIndex = 0;
let meaningVisible = false;

function showFlashcard() {
  const card = flashcards[flashcardIndex];
const learnedButton = document.getElementById("learned-card");
const currentWord =  card.word;

if (learnedButton) {
    const isLearned = learnedCards.includes(currentWord);

    learnedButton.textContent = isLearned
        ? "✅ Learned!"
        : "✅ Mark as Learned";

    learnedButton.disabled = isLearned;
}
  document.getElementById("flashcard-word").textContent = card.word;
  document.getElementById("flashcard-pronunciation").textContent =
    card.pronunciation;

  const meaning = document.getElementById("flashcard-meaning");
  meaning.textContent = card.meaning;
  meaning.hidden = !meaningVisible;

  document.getElementById("reveal-card").textContent =
    meaningVisible ? "🙈 Hide Meaning" : "👀 Reveal Meaning";

  document.getElementById("flashcard-count").textContent =
    "Card " + (flashcardIndex + 1) + " of " + flashcards.length;
}

const revealButton = document.getElementById("reveal-card");

if (revealButton) {
    revealButton.addEventListener("click", function () {
        meaningVisible = !meaningVisible;
        
  showFlashcard();
});
}

let learnedCards = JSON.parse(localStorage.getItem("learnedCards")) || [];
document.getElementById("learned-count").textContent =
    "Learned: " + learnedCards.length;
showFlashcard();
const learnedButton = document.getElementById("learned-card");

if (learnedButton) {
    learnedButton.addEventListener("click", function () {
        const currentWord = flashcards[flashcardIndex].word;

        if (!learnedCards.includes(currentWord)) {
            learnedCards.push(currentWord);
learnedCards = [...new Set(learnedCards)];
            localStorage.setItem(
                "learnedCards",
                JSON.stringify(learnedCards)
            );
        }

        document.getElementById("learned-count").textContent =
            "Learned: " + learnedCards.length;

        showFlashcard();
    });
}




document.getElementById("next-card").addEventListener("click", function () {
  flashcardIndex = (flashcardIndex + 1) % flashcards.length;
  meaningVisible = false;
  showFlashcard();
});

document.getElementById("previous-card").addEventListener("click", function () 
{
  flashcardIndex =
    (flashcardIndex - 1 + flashcards.length) % flashcards.length;
  meaningVisible = false; 
  showFlashcard();
});
document.getElementById("show-learned").addEventListener("click", function () {
    const learnedCards = [
    ...new Set(
        JSON.parse(localStorage.getItem("learnedCards") || "[]")
    )
];

    const list = document.getElementById("phrase-list");
    list.innerHTML = "";

    document.getElementById("section-title").textContent = "📚 Learned Words";
    document.getElementById("message").textContent =
        learnedCards.length === 0 ? "No words learned yet!" : "";

    learnedCards.forEach(function (word) {
        const card = document.createElement("article");
        card.className = "phrase-card";

        const wordElement = document.createElement("p");
        wordElement.className = "kannada";
        wordElement.textContent = word;

        const flashcard = flashcards.find(function (item) {
            return item.word === word;
        });

        const pronunciation = document.createElement("p");
        pronunciation.textContent = flashcard ? flashcard.pronunciation : "";

        const meaning = document.createElement("p");
        meaning.textContent = flashcard ? flashcard.meaning : "";

        card.append(wordElement, pronunciation, meaning);
        list.appendChild(card);
    });
});