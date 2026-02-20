import { log } from "../utils/utils.js";

export function updateLocalFav(imdbID, title) {
	let favList = [];
	if (localStorage.getItem("favList")) {
		log("favlist exists in local storage");
		favList = JSON.parse(localStorage.getItem("favList"));
	} else {
		log("favlist doesn't exists in local storage");
	}

	const isInFav = favList.find((movie) => movie.imdbID === imdbID);
	if (isInFav) {
		favList.splice(favList.indexOf(isInFav), 1);
		log(`Removed ${imdbID} from favList`);
	} else {
		const movie = {
			imdbID: imdbID,
			imdbTitle: title,
		};

		favList.push(movie);
		log(`Added ${imdbID} to favList`);
	}

	localStorage.setItem("favList", JSON.stringify(favList));
	log(favList);
}

export function getFavList() {
	return JSON.parse(localStorage.getItem("favList")) || [];
}
