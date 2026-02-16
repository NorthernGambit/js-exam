export default function getMovieCardHTML(movie) {
	const poster = movie.Poster || "../res/icons/missing-poster.svg";

	return `
    <figure class="movie-card__img-container">
		<img src="${poster}" alt="Poster for ${movie.Title}" class="movie-card__img" />
		<figcaption class="movie-card__fav-icon"></figcaption>
	</figure>
	<h3 class="movie-card__title">${movie.Title}</h3>
    `;
}
