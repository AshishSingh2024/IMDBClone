window.onload = async function() {
    const imdbID = window.location.search.substring(1).split("=")[1];
    const apiKey = 'e3e2025b'; 
    const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}`);
    const data = await response.json();

    const movieInfoDiv = document.getElementById("movieInfo");
    movieInfoDiv.innerHTML = `
        <h2>${data.Title}</h2>
        <p><img src="${data.Poster}" alt="${data.Title} Poster"></p>
        <p><strong>Plot:</strong> ${data.Plot}</p>
        <!-- Add other movie information as needed -->
        <button onclick="addToFavorites('${data.imdbID}')">Add to Favorite</button>
    `;
}

function addToFavorites(imdbID) {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (!favorites.includes(imdbID)) {
        favorites.push(imdbID);
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }
}
