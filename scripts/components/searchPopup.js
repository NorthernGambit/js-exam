import { getPosterSrc, log } from "../utils/utils.js";

export default async function createSearchPopupHTML(movies) {
	log("createSearchPopupHTML()");
	const popupRef = document.querySelector("#searchPopup");
	for (let movie of movies) {
		const liRef = document.createElement("li");
		liRef.classList.add("header__search-item");
		liRef.dataset.imdbID = movie.imdbID;

		const imgRef = document.createElement("img");
		imgRef.classList.add("header__search-popup-img");

		imgRef.src = getPosterSrc(movie, imgRef);

		const title = movie.Title || "Error: Title Not Found";
		imgRef.alt = `Poster of the movie ${title}`;

		liRef.append(imgRef, title);
		popupRef.appendChild(liRef);
	}
}
