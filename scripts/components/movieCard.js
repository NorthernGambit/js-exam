import { getFavList, movieIsInFav } from "../data/localFav.js";
import { log } from "../utils/utils.js";

export default function getMovieCardHTML(movie) {
	log("getMovieCardHTML()");
	const poster = movie.Poster || "../res/icons/missing-poster.svg";
	let star;

	if (movieIsInFav(movie.imdbID)) {
		star = "star-filled";
	} else {
		star = "star-empty";
	}

	return `
    <figure class="movie-card__img-container">
		<img src="${poster}" alt="Poster for ${movie.Title}" class="movie-card__img" />
		<figcaption class="movie-card__figcaption" id="movieCardFav" data-imdb-i-d="${movie.imdbID}" data-title="${movie.Title}" data-poster="${poster}">
		<i class="material-symbols-outlined ${star}">star</i>
		</figcaption>
	</figure>
	<h3 class="movie-card__title">${movie.Title}</h3>
    `;
}
