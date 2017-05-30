import { Action } from '@ngrx/store';

import { createSelector } from 'reselect';

import { Film } from '../../../schemas/films.d';
import { IFilm } from '../models/film';
import { IMovieShort } from '../models/moviedb';
import * as swapi from '../actions/swapi-film.actions';
import * as moviedb from '../actions/moviedb.actions';
import { POSTER_PATH } from '../shared/config/moviedb.variables';
import { SwapiService } from '../shared/swapi.service';

export interface IFilmState {
	entities: {
		[id: string]: IFilm;
	};
	ids: string[];
}

const initialState: IFilmState = {
	entities: {},
	ids: []
};

export function SWAPI_FILM_REDUCER(state: IFilmState = initialState, { type, payload }: Action): IFilmState {
	switch (type) {

		/**
		 * When all the films are returned we get them in a list of swapi films
		 */
		case swapi.GET_ALL_COMPLETE:
			const films: Film[] = payload;

			const entities = films.reduce((prev: {
				[id: string]: IFilm
			}, film: Film) => {
				const swapiId = SwapiService.GET_ID_FROM_SWAPI_URL(film.url);
				const defaultEntity = state.entities[swapiId] || {};

				return { ...prev,
					[swapiId]: { ...defaultEntity,
						swapiId: swapiId,
						swapi: film
					}
				};
			}, {});

			const ids = films.map((film: Film) => SwapiService.GET_ID_FROM_SWAPI_URL(film.url));

			return Object.assign({}, state, {
				ids: ids,
				entities: entities
			});

		case moviedb.LOAD_MOVIE_COMPLETE:
			const movie: IMovieShort = payload.movie;
			const film: Film = payload.swapi;
			const swapId = SwapiService.GET_ID_FROM_SWAPI_URL(film.url);

			const entity = Object.assign({},
				state.entities[swapId] || {}, {
					movieDbId: movie.id,
					movieDb: movie,
					posterPath: POSTER_PATH(movie.poster_path)
				}
			);

			return Object.assign({}, state, {
				entities: Object.assign({}, state.entities, {
					[swapId]: entity
				}),
				ids: state.ids
			});
		default:
			return state;
	}
}

export const getIds = (state: IFilmState) => state.ids;
export const getEntities = (state: IFilmState) => state.entities;

export const getAllFilms = createSelector(
	getIds,
	getEntities,
	(ids: string[], entities: {
		[id: string]: IFilm;
	}) => ids.map((id: string) => entities[id])
);
