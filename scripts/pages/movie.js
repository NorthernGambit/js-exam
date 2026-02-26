import { movieIsInFav, updateLocalFav } from "../data/localFav.js";
import { fetchDetailedIMDB, fetchTrailer } from "../modules/api.js";
import { getPosterSrc, log } from "../utils/utils.js";

let movieDetails;
let poster;

export async function renderMovieInfo() {
	log("renderMovieInfo()");
	const params = new URLSearchParams(window.location.search);
	const value = params.get("imdbid");
	movieDetails = await fetchDetailedIMDB(value);

	document.querySelector("#movieTitle").textContent = movieDetails.Title;

	renderFavBtn(movieDetails.imdbID);

	const posterRef = document.querySelector("#moviePoster");
	poster = getPosterSrc(movieDetails, posterRef);
	posterRef.src = poster;
	posterRef.alt = `Poster of the movie ${movieDetails.Title}`;

	document.querySelector("#movieRated").textContent =
		`Rated ${movieDetails.Rated}`;
	document.querySelector("#movieRuntime").textContent = movieDetails.Runtime;
	document.querySelector("#movieYear").textContent = movieDetails.Year;

	renderTrailer(movieDetails);

	document.querySelector("#moviePlot").textContent = movieDetails.Plot;

	renderRatings(movieDetails);

	renderCredits(movieDetails);
}

async function renderTrailer(movieDetails) {
	log("renderTrailer()");
	const trailerKey = await fetchTrailer(
		movieDetails.imdbID,
		movieDetails.Type,
	);

	const iFrameRef = document.querySelector("#movieTrailer");

	if (trailerKey !== null) {
		iFrameRef.src = `https://www.youtube.com/embed/${trailerKey}`;
	} else {
		iFrameRef.classList.add("d-none");
		const mediaRef = document.querySelector("#movieMedia");
		const trailerNotFoundRef = document.createElement("img");
		trailerNotFoundRef.classList.add("movie-spotlight__trailer-not-found");
		trailerNotFoundRef.src = "/res/trailer-not-found.png";
		trailerNotFoundRef.alt = "Trailer not found";
		mediaRef.appendChild(trailerNotFoundRef);
	}
}

export function renderFavBtn(imdbID) {
	log("renderFavBtn()");
	if (movieIsInFav(imdbID)) {
		document.querySelector("#favStarBtn").textContent =
			"Remove from favorites";
		document.querySelector("#favStar").classList.add("star-filled");
		document.querySelector("#favStar").classList.remove("star-empty");
	} else {
		document.querySelector("#favStarBtn").textContent = "Add to favorites";
		document.querySelector("#favStar").classList.remove("star-filled");
		document.querySelector("#favStar").classList.add("star-empty");
	}
}

function renderRatings(movieDetails) {
	log("renderRatings()");
	const ratingsRef = document.querySelector("#movieRatings");

	for (let rating of movieDetails.Ratings) {
		const itemRef = document.createElement("li");
		itemRef.classList.add("movie-spotlight__ratings-item");
		ratingsRef.appendChild(itemRef);

		const h3Ref = document.createElement("h3");
		h3Ref.classList.add("movie-spotlight__ratings-title");
		if (rating.Source.toLowerCase().includes("internet")) {
			h3Ref.textContent = "IMDB";
		} else {
			h3Ref.textContent = rating.Source;
		}

		const spanRef = document.createElement("span");
		spanRef.classList.add("movie-spotlight__ratings-value");
		spanRef.textContent = rating.Value;

		itemRef.append(h3Ref, spanRef);
	}
}

function renderCredits(movieDetails) {
	log("renderCredits()");
	if (!movieDetails.Director.includes("N/A")) {
		const directorRef = document.querySelector("#movieCreditsDirectors");
		const directors = movieDetails.Director.split(", ");
		for (let director of directors) {
			const liRef = document.createElement("li");
			liRef.classList.add("movie-spotlight__inner-credits-item");
			liRef.textContent = director;
			directorRef.appendChild(liRef);
		}
	} else {
		document.querySelector("#directorsMain").classList.add("d-none");
	}

	if (!movieDetails.Writer.includes("N/A")) {
		const writersRef = document.querySelector("#movieCreditsWriters");
		const writers = movieDetails.Writer.split(", ");
		for (let writer of writers) {
			const liRef = document.createElement("li");
			liRef.classList.add("movie-spotlight__inner-credits-item");
			liRef.textContent = writer;
			writersRef.appendChild(liRef);
		}
	} else {
		document.querySelector("#writersMain").classList.add("d-none");
	}

	if (!movieDetails.Actors.includes("N/A")) {
		const actorsRef = document.querySelector("#movieCreditsActors");
		const actors = movieDetails.Actors.split(", ");
		for (let actor of actors) {
			const liRef = document.createElement("li");
			liRef.classList.add("movie-spotlight__inner-credits-item");
			liRef.textContent = actor;
			actorsRef.appendChild(liRef);
		}
	} else {
		document.querySelector("#actorsMain").classList.add("d-none");
	}
}

export function loadMovieEventListener() {
	log("loadMovieEventListener()");
	document.querySelector("#favGroup").addEventListener("click", (event) => {
		event.preventDefault();

		updateLocalFav(movieDetails.imdbID, movieDetails.Title);
		renderFavBtn(movieDetails.imdbID);
	});
}
