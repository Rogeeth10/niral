// Function to check if an element is in the viewport
const isInViewport = (element) => {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
};

// Animation trigger on scroll
const textElements = document.querySelectorAll('.about-section h3, .about-section p, .banner-content h2, .banner-content p');

const handleScroll = () => {
    textElements.forEach(element => {
        if (isInViewport(element)) {
            element.classList.add('animate'); // Add the animation class
        }
    });
};

// Event listener for scroll
window.addEventListener('scroll', handleScroll);

// Initial check to animate elements already in view
handleScroll();
