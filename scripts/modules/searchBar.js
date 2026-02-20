import createSearchPopupHTML from "../components/searchPopup.js";
import { log } from "../utils/utils.js";
import { fetchBroadIMDB } from "./api.js";

const inputRef = document.querySelector("#searchInput");
const popupRef = document.querySelector("#searchPopup");
const btnRef = document.querySelector("#searchBtn");

export async function renderSearchRec(userInput) {
	clearHTML();
	let movies = await fetchBroadIMDB(userInput);
	log(movies);
	if (movies.Search) {
		movies = movies.Search;
		log(movies);
		createSearchPopupHTML(movies);
		popupRef.classList.remove("d-none");
	}
}

export async function loadSearchBarEventListeners() {
	let timeOut;

	inputRef.addEventListener("input", () => {
		clearTimeout(timeOut);

		timeOut = setTimeout(() => {
			if (inputRef.value.trim().length >= 2) {
				renderSearchRec(inputRef.value);
			}
		}, 500);
		if (inputRef.value.length < 2) {
			clearHTML();
		}
	});

	inputRef.addEventListener("focusout", () => {
		popupRef.classList.add("d-none");
	});
	inputRef.addEventListener("focusin", () => {
		popupRef.classList.remove("d-none");
	});

	popupRef.addEventListener("mousedown", (event) => {
		event.preventDefault();

		const click = event.target.closest(".header__search-item");
		log(click);

		if (click) {
			log(click.dataset.imdbID);
			location.href = `/movie.html?imdbid=${click.dataset.imdbID}`;
		}
	});

	btnRef.addEventListener("click", (event) => {
		event.preventDefault();
	});
}

function clearHTML() {
	popupRef.innerHTML = "";
}
