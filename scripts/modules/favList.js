import createFavListPopupHTML from "../components/favListPopup.js";
import { deleteFavList, getFavList, updateLocalFav } from "../data/localFav.js";
import { renderIndexRecList } from "../pages/index.js";
import { renderFavBtn } from "../pages/movie.js";
import { renderSearchResults } from "../pages/search.js";
import { log } from "../utils/utils.js";

const popupRef = document.querySelector("#favPopup");
const mainFavBtn = document.querySelector("#favBtn");

export function renderFavList() {
	log("renderFavList()");
	createFavListPopupHTML();
	popupRef.classList.remove("d-none");
}

export function loadFavPopupEventListeners() {
	log("loadFavPopupEventListeners()");
	//Found on w3docs how to detect click outside cleaner
	document.addEventListener("click", (event) => {
		if (!event.target.closest("#favPopup") && event.target !== mainFavBtn) {
			popupRef.classList.add("d-none");
		}
	});

	mainFavBtn.addEventListener("click", (event) => {
		event.preventDefault();

		renderFavList();
	});

	popupRef.addEventListener("click", (event) => {
		const click = event.target;

		if (click.closest(".header__fav-delete-item")) {
			updateLocalFav(click.dataset.imdbID, click.dataset.imdbTitle);
			event.stopPropagation();
			renderFavList(click.dataset.imdbID);
			updatePageStars();
		} else if (click.closest(".header__fav-list-item")) {
			location.href = `/movie.html?imdbid=${click.dataset.imdbID}`;
		}

		if (click.closest("#favDelete")) {
			event.stopPropagation();

			deleteFavList();
			renderFavList();
			updatePageStars();
		}
	});
}

function updatePageStars() {
	log("updatePageStars()");
	if (
		window.location.pathname === "/" ||
		window.location.pathname.includes("index.html")
	) {
		renderIndexRecList("default");
	} else if (window.location.pathname.includes("movie.html")) {
		renderFavBtn();
	} else if (window.location.pathname.includes("search.html")) {
		renderSearchResults();
	}
}
