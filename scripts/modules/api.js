import { log } from "../utils/utils.js";

export async function fetchRecommendedMovies() {
	try {
		const response = await fetch(
			"https://santosnr6.github.io/Data/favoritemovies.json",
		);
		return await response.json();
	} catch (error) {
		error.log(error.message);
	}
}

export async function fetchBroadIMDB(userQuery) {
	try {
		userQuery = userQuery.trim().toLowerCase();
		const response = await fetch(
			`http://www.omdbapi.com/?apikey=ebe983bd&s=${userQuery}`,
		);
		return response.json();
	} catch (error) {
		error.log(error.message);
	}
}

export async function fetchDetailedIMDB(imdbID) {
	try {
		const response = await fetch(
			`http://www.omdbapi.com/?apikey=ebe983bd&plot=full&i=${imdbID}`,
		);
		return response.json();
	} catch (error) {
		console.error(error.message);
	}
}

async function convertId(imdbID, type) {
	try {
		const response = await fetch(
			`https://api.themoviedb.org/3/find/${imdbID}?api_key=bb311b5159a220281b28bfa430c0f4fc&external_source=imdb_id`,
		);
		const value = await response.json();
		log(value);

		if (type === "tv") {
			return value.tv_results[0].id;
		} else if (type === "movie") {
			return value.movie_results[0].id;
		}
	} catch (error) {
		console.error(error.message);
	}
}

export async function fetchTrailer(imdbID, type) {
	try {
		if (type === "series") {
			type = "tv";
		}
		log(type);

		const id = await convertId(imdbID, type);
		log(`new id = ${id}`);

		const response = await fetch(
			`https://api.themoviedb.org/3/${type}/${id}/videos?api_key=bb311b5159a220281b28bfa430c0f4fc`,
		);
		const value = await response.json();
		log(value.results);

		const trailer =
			value.results.find((video) => video.type === "Trailer") || null;
		log(trailer);

		return trailer.key;
	} catch (error) {
		console.error(error.message);
	}
}
