import getSearchCardHTML from "../components/searchCard.js";
import { movieIsInFav, updateLocalFav } from "../data/localFav.js";
import { fetchBroadIMDB } from "../modules/api.js";
import { getPosterSrc, log } from "../utils/utils.js";

const listRef = document.querySelector("#searchList");
let movies;

export async function renderSearchResults(userInput) {
	log("renderSearchResults()");
	listRef.innerHTML = "";

	if (!movies) {
		movies = await fetchBroadIMDB(userInput);
		log("fetching broad search movies");
		if (movies.Search) {
			movies = movies.Search;
		}
	}
	for (let movie of movies) {
		const listItemRef = document.createElement("li");
		listItemRef.classList.add("search-results__item");
		listRef.appendChild(listItemRef);

		const dirtyHTML = getSearchCardHTML(movie);
		const cleanHTML = DOMPurify.sanitize(dirtyHTML);
		listItemRef.innerHTML = cleanHTML;

		const imgRef = listItemRef.querySelector("img");
		imgRef.src = await getPosterSrc(movie, imgRef);
		imgRef.alt = `Poster of the movie ${movie.Title}`;

		listItemRef.querySelector(".search-card__fav-star").dataset.poster =
			imgRef.src;
	}
}

export async function getURLParams() {
	log("getURLParams()");
	const params = new URLSearchParams(window.location.search);
	const value = params.get("query");
	return value;
}

export function loadSearchEventListeners() {
	log("loadSearchEventListeners()");
	listRef.addEventListener("click", (event) => {
		if (event.target.closest(".search-card__fav-star")) {
			const click = event.target.closest(".search-card__fav-star");
			renderFavChange(click.dataset.imdbID, click);
			updateLocalFav(click.dataset.imdbID, click.dataset.title);
		} else {
			const click = event.target.closest(".search-card");
			if (click) {
				location.href = `/movie.html?imdbid=${click.dataset.imdbID}`;
			}
		}
	});
}

function renderFavChange(imdbID, iconRef) {
	log("renderFavChange()");
	if (movieIsInFav(imdbID)) {
		iconRef.classList.remove("star-filled");
		iconRef.classList.add("star-empty");
	} else {
		iconRef.classList.add("star-filled");
		iconRef.classList.remove("star-empty");
	}
}
