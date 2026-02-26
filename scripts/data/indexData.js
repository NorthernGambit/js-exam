import { fetchRecommendedMovies } from "../modules/api.js";
import { log, randomNumGen } from "../utils/utils.js";

let movieList;

export async function loadRecMovies() {
	log("loadRecMovies()");
	movieList = await fetchRecommendedMovies();
	log("test");
	log(movieList);
}

export function getMovieList() {
	return [...movieList];
}

export function getRandomMovies(num) {
	log("getRandomMovies()");
	let randomMovies = [];
	let isDone = false;

	while (!isDone) {
		const randomIndex = randomNumGen(movieList.length) - 1;

		if (!randomMovies.includes(movieList[randomIndex])) {
			randomMovies.push(movieList[randomIndex]);
		} else {
			log("Duplicate!");
		}

		if (randomMovies.length === num) {
			isDone = true;
		}
	}

	return randomMovies;
}
