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

        // Returns JSON object
        const data = await response.json();
        // console.log(data);
        return data;
    } catch (error) {
        console.log(error);
    }
}

// Display popular movies
async function displayPopularMovies() {
    try {
        // Fetch popular movies - passing in specified endpoint
        const data = await fetchAPIData('movie/popular');
        // console.log(data);

        // Set movie results to data.results property array
        const movieResults = data.results;
        // console.log(movieResults);

        // Loop through movie results
        movieResults.forEach((movie) => {
            // console.log(movie);
            buildMovieElements(movie);
        });
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

// Build movie elements
function buildMovieElements(movie) {
    // Create Card element
    const cardEl = document.createElement('div');
    cardEl.classList.add('card');

    // Create link element -- append img element to link element
    const linkEl = document.createElement('a');
    linkEl.href = `movie-details.html?id=${movie.id}`;

    // Img element
    const imgEl = document.createElement('img');
    imgEl.classList.add('card-img-top');
    imgEl.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    imgEl.alt = movie.title;

    /* ------------------------- */

    // Create card-body element -- append title element and text element to card-body element
    const cardBodyEl = document.createElement('div');
    cardBodyEl.classList.add('card-body');

    // Create title element
    const cardTitleEl = document.createElement('h5');
    cardTitleEl.classList.add('card-title');
    cardTitleEl.textContent = movie.title;

    // Create text element -- append small element to card-text element
    const cardTextEl = document.createElement('p');
    cardTextEl.classList.add('card-text');
    const smallTextEl = document.createElement('small');
    smallTextEl.classList.add('text-muted');
    smallTextEl.textContent = `Release date: ${movie.release_date}`;

    /* ------------------------- */

    // Append small element to text element
    cardTextEl.appendChild(smallTextEl);

    // Append title and text element to card-body element
    cardBodyEl.appendChild(cardTitleEl);
    cardBodyEl.appendChild(cardTextEl);

    // Append img element to link element
    linkEl.appendChild(imgEl);

    // Append link element and card-body element to card element
    cardEl.appendChild(linkEl);
    cardEl.appendChild(cardBodyEl);

    // Append card element to popular-movies element
    const popularMovieParentEl = document.querySelector('#popular-movies');
    popularMovieParentEl.appendChild(cardEl);
}

document.addEventListener('DOMContentLoaded', init);
