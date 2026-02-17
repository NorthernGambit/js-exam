import { getMovieList, getRandomMovies } from "../data/indexData.js";
import { log } from "../utils/utils.js";
import getMovieCardHTML from "../components/movieCard.js";

const gridRef = document.querySelector("#recommendationsGrid");

export function renderIndexRecList() {
	log("renderIndexRecList()");
	document.querySelector("#recommendationsGrid").innerHTML = "";
	const movieList = getRandomMovies(20);

	for (let movie of movieList) {
		const articleRef = document.createElement("article");
		articleRef.classList.add("movie-card");
		articleRef.dataset.imdbID = movie.imdbID;

		const dirtyHTML = getMovieCardHTML(movie);
		const cleanHTML = DOMPurify.sanitize(dirtyHTML);

		articleRef.innerHTML = cleanHTML;
		gridRef.appendChild(articleRef);
	}
}

export function loadIndexRecEventListener() {
	gridRef.addEventListener("click", (event) => {
		const click = event.target.closest(".movie-card");
		if (click) {
			log(click.dataset.imdbID);
		} else log("Clicked nothing");
	});
}
