const lessons = [
    { title: 'Introduction to Public Speaking', difficulty: 'beginner' },
    { title: 'Overcoming Speech Anxiety', difficulty: 'beginner' },
    { title: 'Effective Presentation Skills', difficulty: 'intermediate' },
    { title: 'Advanced Persuasion Techniques', difficulty: 'advanced' },
    { title: 'Articulation and Pronunciation', difficulty: 'intermediate' },
    { title: 'Speech Delivery Techniques', difficulty: 'advanced' },
    { title: 'Improvisational Speaking', difficulty: 'intermediate' },
    { title: 'Body Language for Speakers', difficulty: 'advanced' },
    { title: 'Storytelling for Impact', difficulty: 'intermediate' },
    { title: 'Speech Writing Essentials', difficulty: 'advanced' }
];

// DOM elements
const lessonList = document.getElementById('lesson-list');
const searchBar = document.getElementById('search-bar');
const difficultyFilter = document.getElementById('difficulty-filter');
const mobileNavToggle = document.querySelector(".mobile-nav-toggle");
const navMenu = document.getElementById("navmenu");

// Function to display lessons
function displayLessons(lessonsToDisplay) {
    lessonList.innerHTML = '';
    lessonsToDisplay.forEach(lesson => {
        const lessonItem = document.createElement('li');
        lessonItem.className = 'lesson-item';
        lessonItem.innerHTML = `
            <span>${lesson.title} (${lesson.difficulty.charAt(0).toUpperCase() + lesson.difficulty.slice(1)})</span>
            <button class="lesson-button" onclick="startLesson('${lesson.title}')">Start Lesson</button>
        `;
        lessonList.appendChild(lessonItem);
    });
}

// Function to start a lesson
function startLesson(title) {
    alert(`Starting lesson: ${title}`);
}

// Function to filter lessons based on search and difficulty
function filterLessons() {
    const searchText = searchBar.value.toLowerCase();
    const selectedDifficulty = difficultyFilter.value;

    const filteredLessons = lessons.filter(lesson => {
        const matchesSearch = lesson.title.toLowerCase().includes(searchText);
        const matchesDifficulty = selectedDifficulty ? lesson.difficulty === selectedDifficulty : true;
        return matchesSearch && matchesDifficulty;
    });

    displayLessons(filteredLessons);
}

// Event listeners for filtering lessons
searchBar.addEventListener('input', filterLessons);
difficultyFilter.addEventListener('change', filterLessons);

// Event listener for mobile navigation toggle
document.addEventListener("DOMContentLoaded", function() {
    mobileNavToggle.addEventListener("click", function() {
        navMenu.classList.toggle("active");
    });
});

// Initial display of all lessons
displayLessons(lessons);