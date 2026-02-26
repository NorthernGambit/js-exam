import createFavListPopupHTML from "./components/favListPopup.js";
import { getRandomMovies, loadRecMovies } from "./data/indexData.js";
import { renderTrailer } from "./modules/caroussel.js";
import { loadFavPopupEventListeners } from "./modules/favList.js";
import { loadSearchBarEventListeners } from "./modules/searchBar.js";
import {
	loadIndexRecEventListener,
	renderIndexRecList,
} from "./pages/index.js";
import { loadMovieEventListener, renderMovieInfo } from "./pages/movie.js";
import {
	getURLParams,
	loadSearchEventListeners,
	renderSearchResults,
} from "./pages/search.js";
import { log } from "./utils/utils.js";

if (
	window.location.pathname === "/" ||
	window.location.pathname.includes("index.html")
) {
	console.log("index.html");
	indexPageSetup();
} else if (window.location.pathname.includes("favorites.html")) {
	console.log("favorites.html");
} else if (window.location.pathname.includes("movie.html")) {
	console.log("movie.html");
	moviePageSetup();
} else if (window.location.pathname.includes("search.html")) {
	console.log("search.html");
	searchPageSetup();
}

async function indexPageSetup() {
	loadIndexRecEventListener();
	loadSearchBarEventListeners();
	loadFavPopupEventListeners();
	await loadRecMovies();
	const rndMovies = getRandomMovies(5);
	log(rndMovies);
	rndMovies.forEach((movie, index) => {
		renderTrailer(movie, index + 1);
	});
	renderIndexRecList(getRandomMovies(20));
	// loadIndexRecEventListener();
	// loadSearchBarEventListeners();
	// loadFavPopupEventListeners();
}

async function moviePageSetup() {
	loadSearchBarEventListeners();
	loadMovieEventListener();
	loadFavPopupEventListeners();
	await renderMovieInfo();
}

async function searchPageSetup() {
	loadSearchEventListeners();
	loadSearchBarEventListeners();
	loadFavPopupEventListeners();
	const URLParams = await getURLParams();
	if (URLParams) {
		await renderSearchResults(URLParams);
	}
}
