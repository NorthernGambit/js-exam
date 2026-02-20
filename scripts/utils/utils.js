export function log(msg) {
	console.log(msg);
}

export function randomNumGen(num) {
	return Math.floor(Math.random() * num + 1);
}

export function checkImage(img) {}

export function getPosterSrc(movie, imgRef) {
	//AI assisted code
	imgRef.onerror = function () {
		this.src = "/res/icons/missing-poster.svg";
		log(`Fallback triggered for: ${movie.Title}`);
		this.onerror = null;
	};

	if (movie.Poster === "N/A") {
		// imgRef.src = "/res/icons/missing-poster.svg";
		log(`Fallback triggered using 'N/A' for: ${movie.Title}`);
		return "/res/icons/missing-poster.svg";
	} else {
		// imgRef.src = movie.Poster;
		return movie.Poster;
	}
	//
}
