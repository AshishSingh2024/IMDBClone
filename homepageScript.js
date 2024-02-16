const searchInput = document.getElementById("searchInput");
const searchResultsDiv = document.getElementById("searchResults");

searchInput.addEventListener("input", debounce(handleSearch, 300));

async function handleSearch() {
    const query = searchInput.value.trim();
    if (!query) {
        searchResultsDiv.innerHTML = "";
        return;
    }

    const apiKey = 'e3e2025b'; 
    const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${query}`);
    const data = await response.json();
    if (data.Response === "True") {
        const movies = data.Search;
        searchResultsDiv.innerHTML = "";
        movies.forEach(movie => {
            const movieElement = document.createElement("div");
            movieElement.innerHTML = `
                <p>${movie.Title} (${movie.Year})</p>
                <button class="addFavorite" onclick="addToFavorites('${movie.imdbID}')">Add to Favorite</button>
            `;
            searchResultsDiv.appendChild(movieElement);
        });
    } else {
        searchResultsDiv.innerHTML = "<p>No results found</p>";
    }
}

function addToFavorites(imdbID) {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (!favorites.includes(imdbID)) {
        favorites.push(imdbID);
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }
}

function debounce(func, delay) {
    let timeoutId;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(context, args);
        }, delay);
    };
}
