const lessons = [
    {
        title: 'Basic Vocabulary',
        description: 'Learn fundamental vocabulary words for everyday use.',
        difficulty: 'beginner',
        content: [
            'What is vocabulary?',
            'Importance of vocabulary.',
            'Common basic words.'
        ],
        exercises: [
            '1. Match the word with its definition.',
            '2. Fill in the blanks with the correct vocabulary.',
            '3. Create a sentence using the word "apple".',
            '4. Identify synonyms for the following words: happy, big, fast.',
            '5. Unscramble the following words: elgth, onhoyg.',
            '6. Choose the correct word in context: "She is very ___ (happy/sad) today."',
            '7. Write down five vocabulary words you learned today.'
        ]
    },
    {
        title: 'Common Phrases',
        description: 'Explore useful phrases for communication.',
        difficulty: 'beginner',
        content: [
            'Greetings and introductions.',
            'Common expressions.',
            'Simple conversational phrases.'
        ],
        exercises: [
            '1. Translate the following phrases to your language.',
            '2. Write a dialogue using common phrases.',
            '3. Practice saying the phrases aloud.',
            '4. Identify the phrases used in a short video.',
            '5. Create a poster with your favorite phrases.',
            '6. Record yourself using the phrases in a conversation.',
            '7. Write down a situation where you would use these phrases.'
        ]
    },
    {
        title: 'Intermediate Vocabulary',
        description: 'Expand your vocabulary with intermediate words.',
        difficulty: 'intermediate',
        content: [
            'Understanding context.',
            'Using new words in sentences.',
            'Practice exercises.'
        ],
        exercises: [
            '1. Write a paragraph using five new words.',
            '2. Fill in the blanks in the sentences with the correct word.',
            '3. Choose the correct word to complete the sentence.',
            '4. Create a mind map of new vocabulary.',
            '5. Make flashcards for the new words.',
            '6. Use the words in a conversation with a partner.',
            '7. Write a short story using the new vocabulary.'
        ]
    },
    {
        title: 'Advanced Vocabulary',
        description: 'Master advanced vocabulary for fluent communication.',
        difficulty: 'advanced',
        content: [
            'Idiomatic expressions.',
            'Technical vocabulary.',
            'Contextual usage.'
        ],
        exercises: [
            '1. Explain the meaning of five idioms.',
            '2. Write sentences using the idioms correctly.',
            '3. Create a presentation using technical vocabulary.',
            '4. Practice using advanced vocabulary in a group discussion.',
            '5. Write a report using at least ten advanced words.',
            '6. Analyze a text and identify advanced vocabulary used.',
            '7. Create an advanced vocabulary quiz for your peers.'
        ]
    }
];

const lessonList = document.getElementById('lesson-list');
const searchBar = document.getElementById('search-bar');
const difficultyFilters = document.querySelectorAll('.difficulty-filter');
let currentLessonIndex = null;

function displayLessons(lessonsToDisplay) {
    lessonList.innerHTML = '';
    lessonsToDisplay.forEach((lesson, index) => {
        const lessonItem = document.createElement('li');
        lessonItem.className = 'lesson-item';
        lessonItem.innerHTML = `
            <span>${lesson.title} (${lesson.difficulty.charAt(0).toUpperCase() + lesson.difficulty.slice(1)})</span>
            <button class="lesson-button" onclick="viewLessonDetail(${index})">Start Lesson</button>
        `;
        lessonList.appendChild(lessonItem);
    });
}

function viewLessonDetail(index) {
    const lesson = lessons[index];
    document.getElementById('lesson-title').innerText = lesson.title;
    document.getElementById('lesson-description').innerText = lesson.description;
    document.getElementById('lesson-difficulty').innerText = lesson.difficulty.charAt(0).toUpperCase() + lesson.difficulty.slice(1);
    document.getElementById('main-screen').style.display = 'none';
    document.getElementById('detail-screen').style.display = 'block';
    currentLessonIndex = index;
}

function startLesson() {
    const lesson = lessons[currentLessonIndex];
    document.getElementById('content-title').innerText = lesson.title;
    document.getElementById('content').innerHTML = lesson.content[0];

    // Display exercises
    const exercisesDiv = document.getElementById('exercises');
    exercisesDiv.innerHTML = '<h3>Exercises:</h3><ul>' + lesson.exercises.map(ex => `<li>${ex}</li>`).join('') + '</ul>';

    document.getElementById('detail-screen').style.display = 'none';
    document.getElementById('content-screen').style.display = 'block';
    updateNavigationButtons();
}

function updateNavigationButtons() {
    const lesson = lessons[currentLessonIndex];
    const contentDiv = document.getElementById('content');
    const contentArray = lesson.content;

    document.getElementById('prev-button').style.display = contentArray.length > 1 ? 'block' : 'none';
    document.getElementById('next-button').style.display = contentArray.length > 1 ? 'block' : 'none';
}

function nextLessonContent() {
    const lesson = lessons[currentLessonIndex];
    const contentArray = lesson.content;
    const contentDiv = document.getElementById('content');
    const currentContent = contentDiv.innerHTML;

    const nextIndex = contentArray.indexOf(currentContent) + 1;
    if (nextIndex < contentArray.length) {
        contentDiv.innerHTML = contentArray[nextIndex];
    }
    updateNavigationButtons();
}

function previousLessonContent() {
    const lesson = lessons[currentLessonIndex];
    const contentArray = lesson.content;
    const contentDiv = document.getElementById('content');
    const currentContent = contentDiv.innerHTML;

    const prevIndex = contentArray.indexOf(currentContent) - 1;
    if (prevIndex >= 0) {
        contentDiv.innerHTML = contentArray[prevIndex];
    }
    updateNavigationButtons();
}

function completeLesson() {
    document.getElementById('content-screen').style.display = 'none';
    document.getElementById('completion-screen').style.display = 'block';
}

function reviewLesson() {
    document.getElementById('completion-screen').style.display = 'none';
    document.getElementById('detail-screen').style.display = 'block';
}

function nextLesson() {
    document.getElementById('completion-screen').style.display = 'none';
    document.getElementById('main-screen').style.display = 'block';
}

function returnToMain() {
    document.getElementById('completion-screen').style.display = 'none';
    document.getElementById('main-screen').style.display = 'block';
}

function goBackToMain() {
    document.getElementById('detail-screen').style.display = 'none';
    document.getElementById('main-screen').style.display = 'block';
}

function filterLessons() {
    const searchText = searchBar.value.toLowerCase();
    const selectedDifficulties = Array.from(difficultyFilters)
        .filter(filter => filter.checked)
        .map(filter => filter.value);

    const filteredLessons = lessons.filter(lesson => {
        const matchesSearch = lesson.title.toLowerCase().includes(searchText);
        const matchesDifficulty = selectedDifficulties.length ? selectedDifficulties.includes(lesson.difficulty) : true;
        return matchesSearch && matchesDifficulty;
    });

    displayLessons(filteredLessons);
}

// Event listeners
searchBar.addEventListener('input', filterLessons);
difficultyFilters.forEach(filter => {
    filter.addEventListener('change', filterLessons);
});

// Initial display of all lessons
displayLessons(lessons);

// Mobile navigation toggle
document.addEventListener("DOMContentLoaded", function() {
    const mobileNavToggle = document.querySelector(".mobile-nav-toggle");
    const navMenu = document.getElementById("navmenu");

    mobileNavToggle.addEventListener("click", function() {
        navMenu.classList.toggle("active");
    });
});


function navigate() {
    window.location.href = "https://www.example.com";
}