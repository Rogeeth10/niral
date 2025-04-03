const results = [
    {
        name: 'Bala prakash',
        department: 'testing',
        score: '93%',
        date: '2023-09-01',
        details: 'Great understanding of vocabulary and communication skills.'
    },
    {
        name: 'logeshwaran',
        department: 'IT',
        score: '90%',
        date: '2023-09-05',
        details: 'Excellent pronunciation and articulation.'
    },
    {
        name: 'Abishek',
        department: 'developing',
        score: '92%',
        date: '2023-09-10',
        details: 'Needs improvement in listening skills.'
    },
    {
        name: 'kishore kumar',
        department: 'marketing',
        score: '95%',
        date: '2023-09-15',
        details: 'Outstanding performance in all areas.'
    }
];

const reportList = document.getElementById('report-list');
const searchBar = document.getElementById('search-bar');
const departmentFilter = document.getElementById('department-filter');

// Function to display results
function displayResults(resultsToDisplay) {
    reportList.innerHTML = '';
    resultsToDisplay.forEach(result => {
        const reportItem = document.createElement('li');
        reportItem.className = 'report-item';
        reportItem.innerHTML = `
            <span>${result.name} (${result.department}) - Score: ${result.score}</span>
            <button class="report-button" onclick="viewDetails('${result.name}')">View Details</button>
        `;
        reportList.appendChild(reportItem);
    });
}

// Function to view details
function viewDetails(name) {
    const result = results.find(r => r.name === name);
    if (result) {
        alert(`Details for ${name}:\nScore: ${result.score}\nDate: ${result.date}\nRemarks: ${result.details}`);
    }
}

// Initial display of results
displayResults(results);

// Search and filter functionality
searchBar.addEventListener('input', () => {
    const searchTerm = searchBar.value.toLowerCase();
    const filteredResults = results.filter(result => result.name.toLowerCase().includes(searchTerm));
    displayResults(filteredResults);
});

departmentFilter.addEventListener('change', () => {
    const selectedDepartment = departmentFilter.value;
    const filteredResults = results.filter(result =>
        selectedDepartment === '' || result.department === selectedDepartment
    );
    displayResults(filteredResults);
});

// Mobile navigation functionality
document.addEventListener("DOMContentLoaded", function() {
    const mobileNavToggle = document.querySelector(".mobile-nav-toggle");
    const navMenu = document.getElementById("navmenu");

    mobileNavToggle.addEventListener("click", function() {
        navMenu.classList.toggle("active");
    });
});
