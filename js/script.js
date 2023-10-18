// Global Window Object
const globalWindow = {
    currentPage: window.location.pathname,
};
console.log(globalWindow.currentPage);

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
}

document.addEventListener('DOMContentLoaded', init);
