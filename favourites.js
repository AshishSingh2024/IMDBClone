window.onload = function() {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const favoriteMoviesList = document.getElementById("favoriteMovies");
    favorites.forEach(async imdbID => {
        const apiKey = 'e3e2025b';
        const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}`);
        const data = await response.json();
        
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <p>${data.Title} (${data.Year})</p>
            <button onclick="removeFromFavorites('${imdbID}')">Remove from Favorites</button>
        `;
        favoriteMoviesList.appendChild(listItem);
    });
}

function removeFromFavorites(imdbID) {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    favorites = favorites.filter(id => id !== imdbID);
    localStorage.setItem("favorites", JSON.stringify(favorites));
}
