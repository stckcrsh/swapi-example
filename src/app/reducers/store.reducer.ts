import { compose } from '@ngrx/core/compose';
import { ActionReducer, combineReducers } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import * as R from 'ramda';
import { createSelector } from 'reselect';
import { People } from '../../../schemas/people.d';
import { IFilm } from '../models/film';
import * as films from './films.reducer';
import * as people from './people.reducer';
import * as ui from './ui-state.reducer';

export interface IAppState {
	films: films.IFilmState;
	people: people.IPeopleState;
	ui: ui.IUIState;
}

const reducers = {
	films: films.SWAPI_FILM_REDUCER,
	people: people.SWAPI_PEOPLE_REDUCER,
	ui: ui.UI_REDUCER
};

const builtReducer: ActionReducer < IAppState > = compose(
	localStorageSync({
		keys: [
			'ui',
			'films',
			'people'
		],
		rehydrate: true
	}),
	combineReducers
)(reducers);

export function reducer(state: any, action: any) {
	return builtReducer(state, action);
}

/**
 * Selectors for the applciation
 */

// Film selectors
export const getFilmState = (state: IAppState) => state.films;
export const getAllFilms = createSelector(
	getFilmState,
	films.getAllFilms
);

// People selectors
export const getPeopleState = (state: IAppState) => state.people;

export const getPeopleEntities = createSelector(
	getPeopleState,
	people.getEntities
);

export const getAllPeople = createSelector(
	getPeopleState,
	people.getAllPeople
);

// ui reducers
export const getUIState = (state: IAppState) => state.ui;
const getFavCharTemp = createSelector(
	getUIState,
	ui.getFavChar
);

export const getFavChar = createSelector(
	getFavCharTemp,
	getPeopleEntities,
	(fav: string, people: {
		[id: string]: People
	}) => people[fav]
);

const getWorstCharTemp = createSelector(
	getUIState,
	ui.getWorstChar
);

export const getWorstChar = createSelector(
	getWorstCharTemp,
	getPeopleEntities,
	(worst: string, people: {
		[id: string]: People
	}) => people[worst]
);

// rehydrates the films with characters
export const getAllFilmsFat = createSelector(
	getAllFilms,
	getPeopleEntities,
	(films: IFilm[], people: {
		[id: string]: People
	}) => {
		return R.map(
			R.over(R.lensPath(['swapi', 'characters']), R.map((url: string) => people[url] || url))
		)(films);
	}
);

export const getFilmPairs = createSelector(
	getAllFilmsFat,
	(films: IFilm[]) => films.reduce((prev, film, idx) => {
		if (idx % 2 === 0) {
			prev.push(films.slice(idx, idx + 2));
		}
		return prev;
	}, [])
);
