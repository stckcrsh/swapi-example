import { SwapiGetAllComplete } from './swapi-film.actions';
import { Action } from '@ngrx/store';

import { People } from '../../../schemas/people.d';

export const LOAD = '[Swapi] Person Load';
export const LOAD_COMPLETE = '[Swapi] person Load Complete';
export const GET_ALL_PEOPLE = '[Swapi] Get all people';
export const GET_NEXT_PAGE_PEOPLE = '[Swapi] Get the next page of people';
export const GET_ALL_PEOPLE_COMPLETE = '[Swapi] get all people Complete';

export class SwapiLoadPersonAction implements Action {
	readonly type = LOAD;

	constructor(public payload: string) {}
}
export class SwapiLoadPersonComplete implements Action {
	readonly type = LOAD_COMPLETE;

	constructor(public payload: People) {}
}
export class SwapiGetAllPeopleAction implements Action {
	readonly type = GET_ALL_PEOPLE;

	constructor() {}
}
export class SwapiGetAllPeopleComplete implements Action {
	readonly type = GET_ALL_PEOPLE_COMPLETE;

	constructor(public payload: People[]) {}
}

export class SwapiGetNextPagePeoplAction implements Action {
	readonly type = GET_NEXT_PAGE_PEOPLE;

	constructor(public payload: string) {}
}

export type Actions
	= SwapiLoadPersonAction |
	SwapiLoadPersonComplete |
	SwapiGetAllPeopleAction |
	SwapiGetAllPeopleComplete |
	SwapiGetNextPagePeoplAction;
