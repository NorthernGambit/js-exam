import { getMovieList, getRandomMovies } from "../data/indexData.js";
import { log } from "../utils/utils.js";
import getMovieCardHTML from "../components/movieCard.js";

export default function renderIndexRecList() {
	log("renderIndexRecList()");
	document.querySelector("#recommendationsGrid").innerHTML = "";
	const movieList = getRandomMovies(20);

	for (let movie of movieList) {
		const gridRef = document.querySelector("#recommendationsGrid");
		const articleRef = document.createElement("article");
		articleRef.classList.add("movie-card");

		const dirtyHTML = getMovieCardHTML(movie);
		const cleanHTML = DOMPurify.sanitize(dirtyHTML);

		articleRef.innerHTML = cleanHTML;
		gridRef.appendChild(articleRef);
	}
}
