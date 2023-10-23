// Global Window Object
const globalWindow = {
    currentPage: window.location.pathname,
    search: {
        term: '',
        type: '',
        page: 1,
        totalPages: 1,
    },
    api: {
        apiKey: 'bcc56ec49f59a3055407bcfa8f1a49f1',
        apiURL: 'https://api.themoviedb.org/3/',
    },
};
// console.log(globalWindow.currentPage);
// console.log(globalWindow.search);

// Fetch all data from TMDB API
async function fetchAPIData(endpoint) {
    try {
        // API Key and URL
        const API_KEY = globalWindow.api.apiKey;
        const API_URL = globalWindow.api.apiURL;

        showSpinner();

        // API response from determined endpoint
        const response = await fetch(
            `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-us`
        );

        // Returns JSON object
        const data = await response.json();
        // console.log(data);
        hideSpinner();
        return data;
    } catch (error) {
        console.log(error);
    }
}

// Request search data from TMDB API
async function searchAPIData() {
    try {
        // API Key and URL
        const API_KEY = globalWindow.api.apiKey;
        const API_URL = globalWindow.api.apiURL;

        showSpinner();

        // API response from determined endpoint
        const response = await fetch(
            `${API_URL}search/${globalWindow.search.type}?api_key=${API_KEY}&language=en-us&query=${globalWindow.search.term}`
        );

        // Returns JSON object
        const data = await response.json();
        // console.log(data);
        hideSpinner();
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

// Display Movie Details
async function displayMovieDetails() {
    try {
        // Get movie ID (query string) from URL -- split string and get ID only
        const movieQueryString = window.location.search;
        const movieId = movieQueryString.split('=')[1];
        // console.log(movieId);

        // Fetch movie details - passing in movie ID
        const data = await fetchAPIData(`movie/${movieId}`);
        // console.log(data);

        buildMovieDetailsElements(data);
    } catch (error) {
        console.log(error);
    }
}

// Display popular TV shows
async function displayPopularTVShows() {
    try {
        // Fetch popular TV shows - passing in specified endpoint
        const data = await fetchAPIData('tv/popular');
        // console.log(data);

        // Set TV show results to data.results property array
        const tvShowResults = data.results;
        // console.log(tvShowResults);

        // Loop through TV show results
        tvShowResults.forEach((show) => {
            // console.log(show);
            buildTVShowElements(show);
        });
    } catch (error) {
        console.log(error);
    }
}

// Display TV Show Details
async function displayPopularTVShowsDetails() {
    try {
        // Get TV show ID (query string) from URL -- split string and get ID only
        const tvShowQueryString = window.location.search;
        const tvShowId = tvShowQueryString.split('=')[1];
        // console.log(tvShowId);

        // Fetch TV show details - passing in TV show ID
        const data = await fetchAPIData(`tv/${tvShowId}`);
        // console.log(data);

        buildTVShowDetailsElements(data);
    } catch (error) {
        console.log(error);
    }
}

// Display Slider-Swiper Movies
async function displaySliderMovies() {
    try {
        const data = await fetchAPIData('movie/now_playing');
        // console.log(data);

        const movieResults = data.results;
        // console.log(movieResults);
        movieResults.forEach((movie) => {
            const div = document.createElement('div');
            div.classList.add('swiper-slide');

            div.innerHTML = `
            <a href="movie-details.html?id=${movie.id}">
              <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
            </a>
            <h4 class="swiper-rating">
              <i class="fas fa-star text-secondary"></i> ${movie.vote_average} / 10
            </h4>
        `;

            document.querySelector('.swiper-wrapper').appendChild(div);
        });

        initSwiper();
    } catch (error) {
        console.log(error);
    }
}

// Search movies & tv shows
async function searchMain() {
    try {
        // Get query string from URL
        const searchQueryString = window.location.search;
        // console.log(searchQueryString);

        // Get query string methods -- get the query string `type` and its value
        const urlSearchParams = new URLSearchParams(searchQueryString);
        // console.log(urlSearchParams.get('type'));

        // Set url search term and type to globalWindow object properties
        globalWindow.search.type = urlSearchParams.get('type');
        globalWindow.search.term = urlSearchParams.get('search-term');

        if (
            globalWindow.search.term !== '' &&
            globalWindow.search.term !== null
        ) {
            const { results, total_pages, page } = await searchAPIData();
            // console.log(results, total_pages, page);

            if (results.length === 0) {
                showAlert('No results found');
                return;
            }

            // Display search results
            displaysSearchResults(results);

            // Clear search term input
            document.querySelector('#search-term').value = '';
        } else {
            showAlert('Please enter a search term');
        }
    } catch (error) {
        console.log(error);
    }
}

// Display search results -- movie or tv show
function displaysSearchResults(results) {
    // Display movie/tv show based on type
    results.forEach((result) => {
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `
        <a href="${globalWindow.search.type}-details.html?id=${result.id}">
            ${
                result.poster_path
                    ? `<img
                src="https://image.tmdb.org/t/p/w500${result.poster_path}"
                class="card-img-top"
                alt="${
                    globalWindow.search.type === 'movie'
                        ? result.title
                        : result.name
                }"
                />`
                    : `<img
              src="images/no-image.jpg"
              class="card-img-top"
              alt="${
                  globalWindow.search.type === 'movie'
                      ? result.title
                      : result.name
              }"
            />`
            }
          </a>
          <div class="card-body">
            <h5 class="card-title">${
                globalWindow.search.type === 'movie'
                    ? result.title
                    : result.name
            }</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${
                  globalWindow.search.type === 'movie'
                      ? result.release_date
                      : result.first_air_date
              }</small>
            </p>
          </div>
        `;

        document.querySelector('#search-results').appendChild(div);
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
            displaySliderMovies();
            displayPopularMovies();
            break;
        // TV Shows Page
        case '/shows.html':
            console.log(
                `Current Page: ${globalWindow.currentPage} (TV Shows Page)`
            );
            displayPopularTVShows();
            break;
        // Movies Details Page
        case '/movie-details.html':
            console.log(
                `Current Page: ${globalWindow.currentPage} (Movie Details Page)`
            );
            displayMovieDetails();
            break;
        // TV Details Page
        case '/tv-details.html':
            console.log(
                `Current Page: ${globalWindow.currentPage} (TV Details Page)`
            );
            displayPopularTVShowsDetails();
            break;
        // Search Page
        case '/search.html':
            console.log(
                `Current Page: ${globalWindow.currentPage} (Search Page)`
            );
            searchMain();
            break;
    }

    // Manage NAV links call
    manageNavLinks();
}

// Show Spinner
function showSpinner() {
    document.querySelector('.spinner').classList.add('show');
}

// Hide Spinner
function hideSpinner() {
    document.querySelector('.spinner').classList.remove('show');
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

// Custom show alert
function showAlert(message, className = 'error') {
    const alertEl = document.createElement('div');
    alertEl.classList.add('alert', className);
    alertEl.appendChild(document.createTextNode(message));
    document.querySelector('#alert').appendChild(alertEl);

    setTimeout(() => {
        alertEl.remove();
    }, 3000);
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

    if (movie.poster_path) {
        imgEl.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        imgEl.alt = movie.title;
    } else {
        imgEl.src =
            'https://via.placeholder.com/500x750.png?text=Image+Not+Available';
        imgEl.alt = 'Image Not Available';
    }

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

// Build movie details elements
function buildMovieDetailsElements(movie) {
    const div = document.createElement('div');

    // Overlay the background image
    displayBackgroundImage('movie', movie.backdrop_path);

    div.innerHTML = `
    <div class="details-top">
          <div>
            <img
              src=https://image.tmdb.org/t/p/w500${movie.poster_path}
              class="card-img-top"
              alt="${movie.title}"
            />
          </div>
          <div>
            <h2>${movie.title}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${movie.vote_average.toFixed(1)} / 10
            </p>
            <p class="text-muted">${movie.release_date}</p>
            <p>
              ${movie.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
              ${movie.genres
                  .map(
                      (genre) =>
                          `<li class="list-group-item">${genre.name}</li>`
                  )
                  .join('')}
            </ul>
            <a href=${
                movie.homepage
            } target="_blank" class="btn">Movie Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Movie Info</h2>
          <ul>
            <li><span class="text-secondary">Budget:</span>$${addCommasToNumbers(
                movie.budget
            )}</li>
            <li><span class="text-secondary">Revenue:</span>$${addCommasToNumbers(
                movie.revenue
            )}</li>
            <li><span class="text-secondary">Runtime:</span>${
                movie.runtime
            } minutes</li>
            <li><span class="text-secondary">Status:</span>${movie.status}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">
          ${movie.production_companies
              .map((company) => `<span>${company.name},</span>`)
              .join(' ')}
          </div>
        </div>
    `;

    const movieDetailsParentEl = document.querySelector('#movie-details');
    movieDetailsParentEl.appendChild(div);
}

// Build TV show elements
function buildTVShowElements(show) {
    // Create Card element
    const cardEl = document.createElement('div');
    cardEl.classList.add('card');

    // Create link element -- append img element to link element
    const linkEl = document.createElement('a');
    linkEl.href = `tv-details.html?id=${show.id}`;

    // Img element
    const imgEl = document.createElement('img');
    imgEl.classList.add('card-img-top');

    if (show.poster_path) {
        imgEl.src = `https://image.tmdb.org/t/p/w500${show.poster_path}`;
        imgEl.alt = show.name;
    } else {
        imgEl.src =
            'https://via.placeholder.com/500x750.png?text=Image+Not+Available';
        imgEl.alt = 'Image Not Available';
    }

    /* ------------------------- */

    // Create card-body element -- append title element and text element to card-body element
    const cardBodyEl = document.createElement('div');
    cardBodyEl.classList.add('card-body');

    // Create title element
    const cardTitleEl = document.createElement('h5');
    cardTitleEl.classList.add('card-title');
    cardTitleEl.textContent = show.name;

    // Create text element -- append small element to card-text element
    const cardTextEl = document.createElement('p');
    cardTextEl.classList.add('card-text');
    const smallTextEl = document.createElement('small');
    smallTextEl.classList.add('text-muted');
    smallTextEl.textContent = `Release date: ${show.first_air_date}`;

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
    const popularTVShowParentEl = document.querySelector('#popular-shows');
    popularTVShowParentEl.appendChild(cardEl);
}

// Build TV show details elements
function buildTVShowDetailsElements(show) {
    const div = document.createElement('div');

    // Overlay the background image
    displayBackgroundImage('tv', show.backdrop_path);
    console.log(show);

    div.innerHTML = `
    <div class="details-top">
          <div>
            <img
              src=https://image.tmdb.org/t/p/w500${show.poster_path}
              class="card-img-top"
              alt=${show.name}
            />
          </div>
          <div>
            <h2>${show.name}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${show.vote_average.toFixed(1)} / 10
            </p>
            <p class="text-muted">Release Date: ${show.first_air_date}</p>
            <p>
              ${show.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
              ${show.genres.map((genre) => `<li>${genre.name}</li>`).join('')}
            </ul>
            <a href=${
                show.homepage
            } target="_blank" class="btn">Visit Show Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Show Info</h2>
          <ul>
            <li><span class="text-secondary">Number Of Episodes:</span> ${
                show.number_of_episodes
            }</li>
            <li>
              <span class="text-secondary">Last Episode To Air:</span> ${
                  show.last_episode_to_air.name
              }
            </li>
            <li><span class="text-secondary">Status:</span> ${show.status}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">${show.production_companies
              .map((company) => `<span>${company.name}, </span>`)
              .join('')}</div>
        </div>
    `;

    const tvDetailsParentEl = document.querySelector('#show-details');
    tvDetailsParentEl.appendChild(div);
}

// Add commas to numbers
function addCommasToNumbers(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Display backdrop image movie/TV show
function displayBackgroundImage(type, backdropPath) {
    const backdropEl = document.createElement('div');
    backdropEl.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${backdropPath})`;
    backdropEl.style.backgroundSize = 'cover';
    backdropEl.style.backgroundPosition = 'center';
    backdropEl.style.backgroundRepeat = 'no-repeat';
    backdropEl.style.height = '100vh';
    backdropEl.style.width = '100vw';
    backdropEl.style.position = 'absolute';
    backdropEl.style.top = '0';
    backdropEl.style.left = '0';
    backdropEl.style.zIndex = '-1';
    backdropEl.style.opacity = '0.1';

    if (type === 'movie') {
        document.querySelector('#movie-details').appendChild(backdropEl);
    } else {
        document.querySelector('#show-details').appendChild(backdropEl);
    }
}

// Init Swiper
function initSwiper() {
    const swiper = new Swiper('.swiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        freeMode: true,
        loop: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        breakpoints: {
            500: {
                slidesPerView: 1,
            },
            700: {
                slidesPerView: 2,
            },
            1000: {
                slidesPerView: 3,
            },
            1200: {
                slidesPerView: 4,
            },
        },
    });
}

document.addEventListener('DOMContentLoaded', init);
