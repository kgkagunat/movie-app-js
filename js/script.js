// Global Window Object
const globalWindow = {
    currentPage: window.location.pathname,
};
// console.log(globalWindow.currentPage);

// Fetch all data from TMDB API
async function fetchAPIData(endpoint) {
    try {
        // API Key and URL
        const API_KEY = 'bcc56ec49f59a3055407bcfa8f1a49f1';
        const API_URL = `https://api.themoviedb.org/3/`;

        // API response from determined endpoint
        const response = await fetch(
            `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-us`
        );

        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

// Display popular movies
async function displayPopularMovies() {
    try {
        // Fetch popular movies - passing in specified endpoint
        const movieResults = await fetchAPIData('movie/popular');
        console.log(movieResults);
    } catch (error) {
        console.log(error);
    }
}

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
            displayPopularMovies();
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
