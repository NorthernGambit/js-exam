import { checkPosterExists, log } from "../utils/utils.js";

export default async function createSearchPopupHTML(movies) {
	const popupRef = document.querySelector("#searchPopup");
	for (let movie of movies) {
		const liRef = document.createElement("li");
		liRef.classList.add("header__search-item");
		liRef.dataset.imdbID = movie.imdbID;

		const imgRef = document.createElement("img");
		imgRef.classList.add("header__search-popup-img");

		//AI assisted code
		imgRef.onerror = function () {
			this.src = "/res/icons/missing-poster.svg";
			console.log("Fallback triggered for:", movie.Title);
			this.onerror = null;
		};

		if (movie.Poster === "N/A") {
			imgRef.src = "/res/icons/missing-poster.svg";
		} else {
			imgRef.src = movie.Poster;
		}
		//

		const title = movie.Title || "Error: Title Not Found";
		imgRef.alt = `Poster of the movie ${title}`;

		liRef.append(imgRef, title);
		popupRef.appendChild(liRef);

		//Remembered that using event.target is more efficient than setting individual listeners
		// liRef.addEventListener("click", () => {
		// 	log(movie.imdbID);
		// });
	}
}
