export function log(msg) {
	console.log(msg);
}

export function randomNumGen(num) {
	return Math.floor(Math.random() * num + 1);
}

export function checkImage(img) {}

export async function checkPosterExists(movie) {
	try {
		const response = await fetch(movie.Poster, { method: "HEAD" });
		if (!response.ok) {
			throw new Error("Image does not exist on " + movie.Title);
		}
		return true;
	} catch (error) {
		console.log(error.message);
		return false;
	}
}
