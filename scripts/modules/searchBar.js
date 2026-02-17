import createSearchPopupHTML from "../components/searchPopup.js";
import { log } from "../utils/utils.js";
import { fetchBroadIMDB } from "./api.js";

const inputRef = document.querySelector("#searchInput");
const popupRef = document.querySelector("#searchPopup");

export async function renderSearchRec(userInput) {
	clearHTML();
	let movies = await fetchBroadIMDB(userInput);
	movies = movies.Search;
	log(movies);
	createSearchPopupHTML(movies);
	popupRef.classList.remove("d-none");
}

export async function loadSearchBarEventListeners() {
	let timeOut;

	inputRef.addEventListener("input", () => {
		clearTimeout(timeOut);

		timeOut = setTimeout(() => {
			if (inputRef.value.length >= 2) {
				renderSearchRec(inputRef.value);
			}
		}, 500);
		if (inputRef.value.length < 2) {
			clearHTML();
		}
	});

	inputRef.addEventListener("focusout", () => {
		// setTimeout(() => {
		popupRef.classList.add("d-none");
		// }, 500);
	});
	inputRef.addEventListener("focusin", () => {
		// if (inputRef.value.length >= 2) {
		popupRef.classList.remove("d-none");
		// }
	});

	popupRef.addEventListener("mousedown", (event) => {
		event.preventDefault();

		const click = event.target.closest(".header__search-item");

		if (click) {
			log(event.target.dataset.imdbID);
		}
	});
}

function clearHTML() {
	popupRef.innerHTML = "";
}
