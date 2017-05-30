import { Film } from '../../../schemas/films.d';
import { IMovieShort } from './moviedb';

export interface IFilm {
	movieDbId: number;
	swapiId: string;
	swapi: Film;
	movieDb: IMovieShort;
	posterPath: string;
}
