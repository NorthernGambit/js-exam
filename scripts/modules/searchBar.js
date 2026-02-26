import createSearchPopupHTML from "../components/searchPopup.js";
import { log } from "../utils/utils.js";
import { fetchBroadIMDB } from "./api.js";

const inputRef = document.querySelector("#searchInput");
const popupRef = document.querySelector("#searchPopup");
const btnRef = document.querySelector("#searchBtn");

export async function renderSearchRec(userInput) {
	log("renderSearchRec()");
	clearHTML();
	let movies = await fetchBroadIMDB(userInput);
	if (movies.Search) {
		movies = movies.Search;
		createSearchPopupHTML(movies);
		popupRef.classList.remove("d-none");
	}
}

export async function loadSearchBarEventListeners() {
	log("loadSearchBarEventListeners()");
	let timeOut;

	inputRef.addEventListener("input", () => {
		clearTimeout(timeOut);

		timeOut = setTimeout(() => {
			if (inputRef.value.trim().length >= 2) {
				renderSearchRec(inputRef.value);
			}
		}, 500);
		if (inputRef.value.trim().length < 2) {
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

		if (click) {
			location.href = `/movie.html?imdbid=${click.dataset.imdbID}`;
		}
	});

	btnRef.addEventListener("click", (event) => {
		event.preventDefault();
		location.href = `/search.html?query=${inputRef.value.trim().toLowerCase()}`;
	});
}

function clearHTML() {
	log("clearHTML()");
	popupRef.innerHTML = "";
}
