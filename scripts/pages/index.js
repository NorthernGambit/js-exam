import { getMovieList, getRandomMovies } from "../data/indexData.js";
import { log } from "../utils/utils.js";
import getMovieCardHTML from "../components/movieCard.js";
import { updateLocalFav } from "../data/localFav.js";

const gridRef = document.querySelector("#recommendationsGrid");
let currentMovieList;

export function renderIndexRecList(movieList) {
	log("renderIndexRecList()");
	if (movieList === "default") {
		movieList = currentMovieList;
	}

	document.querySelector("#recommendationsGrid").innerHTML = "";

	for (let movie of movieList) {
		const articleRef = document.createElement("article");
		articleRef.classList.add("movie-card");
		articleRef.dataset.imdbID = movie.imdbID;

		const dirtyHTML = getMovieCardHTML(movie);
		const cleanHTML = DOMPurify.sanitize(dirtyHTML);

		articleRef.innerHTML = cleanHTML;
		gridRef.appendChild(articleRef);
	}
	currentMovieList = movieList;
}

export function loadIndexRecEventListener() {
	log("loadIndexRecEventListener()");
	gridRef.addEventListener("click", (event) => {
		if (event.target.closest("#movieCardFav")) {
			const click = event.target.closest("#movieCardFav");

			updateLocalFav(click.dataset.imdbID, click.dataset.title);

			renderIndexRecList(currentMovieList);
		} else {
			const click = event.target.closest(".movie-card");
			if (click) {
				location.href = `/movie.html?imdbid=${click.dataset.imdbID}`;
			}
		}
	});
}
