import { fetchRecommendedMovies } from "../modules/api.js";
import { log, randomNumGen } from "../utils/utils.js";

let movieList;
let movieListisLoaded = false;

export async function loadRecMovies() {
	movieList = await fetchRecommendedMovies();
	log(movieList);
}

export function getMovieList() {
	return [...movieList];
}

export function getRandomMovies(num) {
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
