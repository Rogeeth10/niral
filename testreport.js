const reports = [
    {
        title: 'Vocabulary Test Report 1',
        type: 'vocabulary',
        date: '2023-09-01',
        details: 'You scored 80% on the vocabulary test. Review the words you missed.'
    },
    {
        title: 'Speech Test Report 1',
        type: 'speech',
        date: '2023-09-10',
        details: 'You scored 75% on the speech clarity test. Focus on your pronunciation.'
    },
    {
        title: 'Pronunciation Test Report 1',
        type: 'pronunciation',
        date: '2023-09-15',
        details: 'You scored 85% on the pronunciation test. Great job!'
    },
    {
        title: 'Vocabulary Test Report 2',
        type: 'vocabulary',
        date: '2023-09-20',
        details: 'You scored 90% on the advanced vocabulary test. Keep it up!'
    },
    {
        title: 'Speech Test Report 2',
        type: 'speech',
        date: '2023-09-25',
        details: 'You scored 70% on the advanced speech test. Practice more.'
    },
    {
        title: 'Pronunciation Test Report 2',
        type: 'pronunciation',
        date: '2023-09-30',
        details: 'You scored 95% on the pronunciation challenge. Excellent work!'
    }
];

// DOM elements
const reportList = document.getElementById('report-list');
const searchBar = document.getElementById('search-bar');
const typeFilter = document.getElementById('type-filter');
const dateFilter = document.getElementById('date-filter');
const mobileNavToggle = document.querySelector(".mobile-nav-toggle");
const navMenu = document.getElementById("navmenu");

// Function to display reports based on filter and search
function displayReports(reportsToDisplay) {
    reportList.innerHTML = '';
    reportsToDisplay.forEach(report => {
        const reportItem = document.createElement('li');
        reportItem.className = 'report-item';
        reportItem.innerHTML = `
            <span>${report.title} (${report.type.charAt(0).toUpperCase() + report.type.slice(1)}) - ${report.date}</span>
            <button class="report-button" onclick="viewReport('${report.title}')">View Report</button>
        `;
        reportList.appendChild(reportItem);
    });
}

// Function to simulate viewing a report
function viewReport(reportTitle) {
    const report = reports.find(r => r.title === reportTitle);
    if (report) {
        alert(`Details for ${reportTitle}:\n${report.details}`);
    }
}

// Initial display of reports
displayReports(reports);

// Search and filter functionality
searchBar.addEventListener('input', () => {
    const searchTerm = searchBar.value.toLowerCase();
    const filteredReports = reports.filter(report => report.title.toLowerCase().includes(searchTerm));
    displayReports(filteredReports);
});

typeFilter.addEventListener('change', () => {
    const selectedType = typeFilter.value;
    const filteredReports = reports.filter(report =>
        selectedType === '' || report.type === selectedType
    );
    displayReports(filteredReports);
});

dateFilter.addEventListener('input', () => {
    const selectedDate = dateFilter.value;
    const filteredReports = reports.filter(report =>
        selectedDate === '' || report.date === selectedDate
    );
    displayReports(filteredReports);
});

// Mobile navigation functionality
document.addEventListener("DOMContentLoaded", function() {
    mobileNavToggle.addEventListener("click", function() {
        navMenu.classList.toggle("active");
    });
});