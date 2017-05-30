export const MOVIEDB_API_KEY = '7d9cfd196419289854a7c13b6d97e57f';
const MOVIEDB_URL = 'https://api.themoviedb.org/3';

// Creates the url for the poster image from the posterPath
export const POSTER_PATH = (posterPath) => `http://image.tmdb.org/t/p/w185/${posterPath}`;

/**
 *  Generate the Url for the movie database
 *  This is used so that we can pull up movie posters
 */
export const MOVIE_URL = (movieId: string) => `${MOVIEDB_URL}/movie/${movieId}?api_key="${MOVIEDB_API_KEY}"&language=en-US`;
export const SEARCH_MOVIE = (title: string, year: string) =>
	`${MOVIEDB_URL}/search/movie?api_key=${MOVIEDB_API_KEY}&language=en-US&query=${title}&page=1&include_adult=false&year=${year}`;
