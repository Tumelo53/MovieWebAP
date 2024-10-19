const apiKey = 'your_omdb_api_key'; // Replace with your OMDb API key
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

// Fetch movies from OMDb API
async function searchMovies(query) {
  const url = `https://www.omdbapi.com/?s=${query}&apikey=${apiKey}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.Response === 'True') {
      displayMovies(data.Search);
    } else {
      moviesContainer.innerHTML = `<p>${data.Error}</p>`;
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
      <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'placeholder.jpg'}" alt="${movie.Title}">
      <h3>${movie.Title}</h3>
      <p>Year: ${movie.Year}</p>
    `;
    moviesContainer.appendChild(movieElement);
  });
}
