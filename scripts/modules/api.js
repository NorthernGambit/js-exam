export async function fetchRecommendedMovies() {
	const response = await fetch(
		"https://santosnr6.github.io/Data/favoritemovies.json",
	);
	return await response.json();
}

export async function fetchBroadIMDB(userQuery) {
	userQuery = userQuery.trim().toLowerCase();
	const response = await fetch(
		`http://www.omdbapi.com/?apikey=ebe983bd&s=${userQuery}`,
	);
	return response.json();
}
