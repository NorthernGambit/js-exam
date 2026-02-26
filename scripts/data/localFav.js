import { log } from "../utils/utils.js";

export function updateLocalFav(imdbID, title) {
	let favList = [];

	if (localStorage.getItem("favList")) {
		favList = JSON.parse(localStorage.getItem("favList"));
	}

	const isInFav = favList.find((movie) => movie.imdbID === imdbID);
	if (isInFav) {
		favList.splice(favList.indexOf(isInFav), 1);
	} else {
		const movie = {
			imdbID: imdbID,
			imdbTitle: title,
		};

		favList.push(movie);
	}

	localStorage.setItem("favList", JSON.stringify(favList));
}

export function getFavList() {
	return JSON.parse(localStorage.getItem("favList")) || [];
}

export function movieIsInFav(imdbID) {
	let favList = getFavList();
	if (favList) {
		if (favList.find((favMovie) => favMovie.imdbID === imdbID)) {
			return true;
		} else {
			return false;
		}
	} else {
		return false;
	}
}

export function deleteFavList() {
	log("deleteFavList()");
	let emptyList = [];
	localStorage.setItem("favList", JSON.stringify(emptyList));
}
