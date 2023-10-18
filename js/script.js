// Global Window Object
const globalWindow = {
    currentPage: window.location.pathname,
};
// console.log(globalWindow.currentPage);

// Manage NAV links - add active class to nav links
function manageNavLinks() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach((navLink) => {
        if (navLink.getAttribute('href') === globalWindow.currentPage) {
            navLink.classList.add('active');
        }
    });
}

// Init
function init() {
    switch (globalWindow.currentPage) {
        // Home Page
        case '/':
        case '/index.html':
            console.log(
                `Current Page: ${globalWindow.currentPage} (Home Page)`
            );
            break;
        // TV Shows Page
        case '/shows.html':
            console.log(
                `Current Page: ${globalWindow.currentPage} (TV Shows Page)`
            );
            break;
        // Movies Details Page
        case '/movie-details.html':
            console.log(
                `Current Page: ${globalWindow.currentPage} (Movie Details Page)`
            );
            break;
        // TV Details Page
        case '/tv-details.html':
            console.log(
                `Current Page: ${globalWindow.currentPage} (TV Details Page)`
            );
            break;
        // Search Page
        case '/search.html':
            console.log(
                `Current Page: ${globalWindow.currentPage} (Search Page)`
            );
            break;
    }

    // Manage NAV links call
    manageNavLinks();
}

document.addEventListener('DOMContentLoaded', init);
