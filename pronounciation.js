document.addEventListener("DOMContentLoaded", function() {
    const lessons = [
        {
            title: 'Basic Sounds',
            difficulty: 'beginner',
            content: 'Learn the fundamental sounds of English, including consonants and vowels.',
            exercises: [
                'Practice saying the vowel sounds: a, e, i, o, u.',
                'Identify consonant sounds in simple words.',
                'Record yourself pronouncing basic sounds and listen for clarity.'
            ]
        },
        {
            title: 'Vowel Pronunciation',
            difficulty: 'beginner',
            content: 'Focus on how to correctly pronounce short and long vowels.',
            exercises: [
                'Practice minimal pairs: bit vs. beat, hat vs. hate.',
                'Read aloud sentences emphasizing vowel sounds.',
                'Watch videos on vowel pronunciation and repeat.'
            ]
        },
        {
            title: 'Consonant Clarity',
            difficulty: 'intermediate',
            content: 'Improve your pronunciation of consonant sounds for better clarity.',
            exercises: [
                'Practice tongue twisters that focus on difficult consonants.',
                'Record and compare your pronunciation with native speakers.',
                'Engage in reading exercises emphasizing consonant clarity.'
            ]
        },
        {
            title: 'Intonation Patterns',
            difficulty: 'intermediate',
            content: 'Understand the importance of intonation and how it affects meaning.',
            exercises: [
                'Practice sentences with rising and falling intonation.',
                'Listen to songs and mimic the intonation patterns.',
                'Record yourself and analyze your intonation.'
            ]
        },
        {
            title: 'Advanced Pronunciation Techniques',
            difficulty: 'advanced',
            content: 'Master complex sounds and enhance your overall pronunciation.',
            exercises: [
                'Practice shadowing exercises with advanced speakers.',
                'Work on challenging words and phrases with difficult sounds.',
                'Engage in role-playing scenarios to practice pronunciation in context.'
            ]
        },
        {
            title: 'Pronunciation for Fluent Speech',
            difficulty: 'advanced',
            content: 'Learn techniques to make your speech more fluid and natural.',
            exercises: [
                'Practice linking sounds in connected speech.',
                'Engage in conversations with a focus on fluency.',
                'Record yourself speaking naturally and assess your fluidity.'
            ]
        },
        {
            title: 'Common Mispronunciations',
            difficulty: 'intermediate',
            content: 'Identify and correct frequently mispronounced words.',
            exercises: [
                'Create a list of words you commonly mispronounce.',
                'Use online resources to hear correct pronunciations.',
                'Practice saying those words multiple times daily.'
            ]
        },
        {
            title: 'Linking Sounds',
            difficulty: 'advanced',
            content: 'Practice how to link sounds for smoother speech transitions.',
            exercises: [
                'Read sentences focusing on linking sounds.',
                'Record your speech and note where you link words.',
                'Listen to fluent speakers and mimic their linking.'
            ]
        },
        {
            title: 'Speech Rhythm and Flow',
            difficulty: 'intermediate',
            content: 'Develop a sense of rhythm in your speech for better communication.',
            exercises: [
                'Clap along to the rhythm of sentences as you read them.',
                'Engage in poetry reading to practice rhythm.',
                'Record and listen for rhythmic patterns in your speech.'
            ]
        },
        {
            title: 'Accent Reduction Strategies',
            difficulty: 'advanced',
            content: 'Techniques to reduce your accent and improve pronunciation.',
            exercises: [
                'Practice with a language partner focusing on accent reduction.',
                'Engage in exercises targeting specific accent traits.',
                'Use speech recognition software to gauge improvement.'
            ]
        }
    ];

    const lessonList = document.getElementById('lesson-list');
    const searchBar = document.getElementById('search-bar');
    const difficultyFilter = document.getElementById('difficulty-filter');
    const mobileNavToggle = document.querySelector(".mobile-nav-toggle");
    const navMenu = document.getElementById("navmenu");

    // Function to display lessons based on filter and search
    function displayLessons(lessonsToDisplay) {
        lessonList.innerHTML = '';
        lessonsToDisplay.forEach(lesson => {
            const lessonItem = document.createElement('li');
            lessonItem.className = 'lesson-item';
            lessonItem.innerHTML = `
                <span>${lesson.title} (${lesson.difficulty.charAt(0).toUpperCase() + lesson.difficulty.slice(1)})</span>
                <button class="lesson-button" onclick="toggleLesson('${lesson.title}')">Start Lesson</button>
                <div class="lesson-content" id="${lesson.title.replace(/\s+/g, '-').toLowerCase()}" style="display: none;">
                    <p><strong>Content:</strong> ${lesson.content}</p>
                    <p><strong>Exercises:</strong></p>
                    <ul>
                        ${lesson.exercises.map(ex => `
                            <li>${ex} <button class="try-yourself-button">Try Yourself</button></li>
                        `).join('')}
                    </ul>
                </div>
            `;
            lessonList.appendChild(lessonItem);
        });
    }

    // Function to toggle lesson content visibility
    window.toggleLesson = function(lessonTitle) {
        const contentId = lessonTitle.replace(/\s+/g, '-').toLowerCase();
        const contentDiv = document.getElementById(contentId);
        contentDiv.style.display = contentDiv.style.display === 'none' ? 'block' : 'none';
    };

    // Initial display of lessons
    displayLessons(lessons);

    // Search and filter functionality
    searchBar.addEventListener('input', () => {
        const searchTerm = searchBar.value.toLowerCase();
        const filteredLessons = lessons.filter(lesson => lesson.title.toLowerCase().includes(searchTerm));
        displayLessons(filteredLessons);
    });

    difficultyFilter.addEventListener('change', () => {
        const selectedDifficulty = difficultyFilter.value;
        const filteredLessons = lessons.filter(lesson =>
            selectedDifficulty === '' || lesson.difficulty === selectedDifficulty
        );
        displayLessons(filteredLessons);
    });

    // Mobile navigation toggle
    mobileNavToggle.addEventListener("click", function() {
        navMenu.classList.toggle("active");
    });
});