import { Action } from '@ngrx/store';

import { Film } from '../../../schemas/films.d';

export const LOAD_MOVIE_COMPLETE = '[Moviedb] Movie loaded Complete';

export class MoviedbLoadComplete implements Action {
	readonly type = LOAD_MOVIE_COMPLETE;

	constructor(public payload: {movie: string, swapi: Film}) {}
}

export type Actions
	= MoviedbLoadComplete;
