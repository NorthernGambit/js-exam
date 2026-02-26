import { getFavList } from "../data/localFav.js";
import { log } from "../utils/utils.js";

export default function createFavListPopupHTML() {
	log("createFavListPopupHTML()");
	const favList = getFavList();
	const sectionRef = document.querySelector("#favPopup");
	sectionRef.innerHTML = `
		<button class="header__fav-clear-btn" id="favDelete">Remove all favorites</button>
	`;

	const listRef = document.createElement("ul");
	listRef.classList.add("header__fav-list");
	sectionRef.appendChild(listRef);

	if (favList.length > 0) {
		for (let movie of favList) {
			const listItemRef = document.createElement("li");
			listItemRef.classList.add("header__fav-list-item");
			listItemRef.dataset.imdbID = movie.imdbID;
			listRef.appendChild(listItemRef);

			const title = movie.imdbTitle;
			const deleteBtnRef = document.createElement("button");
			deleteBtnRef.dataset.imdbID = movie.imdbID;
			deleteBtnRef.dataset.imdbTitle = movie.imdbTitle;
			deleteBtnRef.textContent = "X";
			deleteBtnRef.classList.add("header__fav-delete-item");
			listItemRef.append(title, deleteBtnRef);
		}
	}
}
