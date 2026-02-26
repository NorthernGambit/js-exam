import { movieIsInFav } from "../data/localFav.js";
import { log } from "../utils/utils.js";

export default function getSearchCardHTML(movie) {
	log("getSearchCardHTML");
	let star;

	if (movieIsInFav(movie.imdbID)) {
		star = "star-filled";
	} else {
		star = "star-empty";
	}

	return `
		<article class="search-card" data-imdb-i-d="${movie.imdbID}">
			<img src="/res/icons/missing-poster.svg" alt="No poster found" class="search-card__poster" />
			<div class="search-card__info-group">
				<h3 class="search-card__title">${movie.Title}</h3>
				<span class="search-card__year">${movie.Year}</span>
				<i class="material-symbols-outlined search-card__fav-star ${star}" data-imdb-i-d="${movie.imdbID}" data-title="${movie.Title}">star</i>
			</div>
		</article>`;
}
