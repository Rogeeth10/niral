const tests = [
    {
        title: 'Vocabulary Test 1',
        type: 'vocabulary',
        description: 'Test your vocabulary knowledge with this basic test.'
    },
    {
        title: 'Speech Test 1',
        type: 'speech',
        description: 'Assess your speech clarity and fluency with this test.'
    },
    {
        title: 'Pronunciation Test 1',
        type: 'pronunciation',
        description: 'Evaluate your pronunciation skills with common words.'
    },
    {
        title: 'Vocabulary Test 2',
        type: 'vocabulary',
        description: 'Challenge your vocabulary with more advanced words.'
    },
    {
        title: 'Speech Test 2',
        type: 'speech',
        description: 'A comprehensive test on your speech abilities.'
    },
    {
        title: 'Pronunciation Test 2',
        type: 'pronunciation',
        description: 'Practice challenging sounds and improve your pronunciation.'
    }
];

const testList = document.getElementById('test-list');
const searchBar = document.getElementById('search-bar');
const typeFilter = document.getElementById('type-filter');

// Function to display tests based on filter and search
function displayTests(testsToDisplay) {
    testList.innerHTML = '';
    testsToDisplay.forEach(test => {
        const testItem = document.createElement('li');
        testItem.className = 'test-item';
        testItem.innerHTML = `
            <span>${test.title} (${test.type.charAt(0).toUpperCase() + test.type.slice(1)})</span>
            <button class="test-button" onclick="startTest('${test.title}')">Start Test</button>
        `;
        testList.appendChild(testItem);
    });
}

// Function to simulate starting a test
function startTest(testTitle) {
    alert(`Starting ${testTitle}...`);
}

// Initial display of tests
displayTests(tests);

// Search and filter functionality
searchBar.addEventListener('input', () => {
    const searchTerm = searchBar.value.toLowerCase();
    const filteredTests = tests.filter(test => test.title.toLowerCase().includes(searchTerm));
    displayTests(filteredTests);
});

typeFilter.addEventListener('change', () => {
    const selectedType = typeFilter.value;
    const filteredTests = tests.filter(test =>
        selectedType === '' || test.type === selectedType
    );
    displayTests(filteredTests);
});

// Mobile navigation functionality
document.addEventListener("DOMContentLoaded", function() {
    const mobileNavToggle = document.querySelector(".mobile-nav-toggle");
    const navMenu = document.getElementById("navmenu");

    mobileNavToggle.addEventListener("click", function() {
        navMenu.classList.toggle("active");
    });
});
