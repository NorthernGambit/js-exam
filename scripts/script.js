import { getRandomMovies, loadRecMovies } from "./data/indexData.js";
import { renderTrailer } from "./modules/caroussel.js";
import renderIndexRecList from "./pages/index.js";
import { log } from "./utils/utils.js";

if (
	window.location.pathname === "/" ||
	window.location.pathname.includes("index.html")
) {
	console.log("index.html");
	await loadRecMovies();
	const rndMovies = getRandomMovies(5);
	log(rndMovies);
	rndMovies.forEach((movie, index) => {
		renderTrailer(movie, index + 1);
	});
	renderIndexRecList();
} else if (window.location.pathname.includes("favorites.html")) {
	console.log("favorites.html");
} else if (window.location.pathname.includes("movie.html")) {
	console.log("movie.html");
} else if (window.location.pathname.includes("search.html")) {
	console.log("search.html");
}
