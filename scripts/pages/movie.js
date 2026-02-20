import { fetchDetailedIMDB, fetchTrailer } from "../modules/api.js";
import { getPosterSrc, log } from "../utils/utils.js";

export async function renderMovieInfo() {
	const params = new URLSearchParams(window.location.search);
	const value = params.get("imdbid");
	log(value);
	const movieDetails = await fetchDetailedIMDB(value);
	log(movieDetails.Title);
	document.querySelector("#movieTitle").textContent = movieDetails.Title;

	const posterRef = document.querySelector("#moviePoster");
	posterRef.src = getPosterSrc(movieDetails, posterRef);
	document.querySelector("#movieRatedRuntimeGenre").textContent =
		`[${movieDetails.Rated}] - ${movieDetails.Runtime} - ${movieDetails.Genre}`;

	const trailerKey = await fetchTrailer(
		movieDetails.imdbID,
		movieDetails.Type,
	);
	document.querySelector("#movieTrailer").src =
		`https://www.youtube.com/embed/${trailerKey}`;
}
