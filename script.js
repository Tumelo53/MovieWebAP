const apiKey = 'dded9179c9c834f3bc04e988c0cf14a4'; // Replace with your TMDb API key
const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');
const moviesContainer = document.getElementById('movies-container');

// Event listener for the search button
searchButton.addEventListener('click', () => {
  const query = searchInput.value;
  if (query) {
    searchMovies(query);
  }
});

// Fetch movies from TMDb API
async function searchMovies(query) {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.results.length > 0) {
      displayMovies(data.results);
    } else {
      moviesContainer.innerHTML = `<p>No results found</p>`;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    moviesContainer.innerHTML = `<p>Error fetching data</p>`;
  }
}

// Display movie results
function displayMovies(movies) {
  moviesContainer.innerHTML = ''; // Clear previous results
  movies.forEach(movie => {
    const movieElement = document.createElement('div');
    movieElement.classList.add('movie');
    movieElement.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
      <h3>${movie.title}</h3>
      <p>Year: ${movie.release_date ? movie.release_date.split('-')[0] : 'N/A'}</p>
    `;
    moviesContainer.appendChild(movieElement);
  });
}
