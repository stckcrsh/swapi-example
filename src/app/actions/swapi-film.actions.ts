import { Action } from '@ngrx/store';

import { Film } from '../../../schemas/films.d';

export const LOAD = '[Swapi] Film Load';
export const LOAD_COMPLETE = '[Swapi] film Load Complete';
export const GET_ALL = '[Swapi] All Films';
export const GET_ALL_COMPLETE = '[Swapi] All Films Complete';

export class SwapiLoadAction implements Action {
	readonly type = LOAD;

	constructor(public payload: string) {}
}
export class SwapiLoadComplete implements Action {
	readonly type = LOAD_COMPLETE;

	constructor(public payload: Film) {}
}
export class SwapiGetAllAction implements Action {
	readonly type = GET_ALL;

	constructor() {}
}
export class SwapiGetAllComplete implements Action {
	readonly type = GET_ALL_COMPLETE;

	constructor(public payload: Film[]) {}
}

export type Actions
	= SwapiLoadAction |
	SwapiLoadComplete |
	SwapiGetAllAction |
	SwapiGetAllComplete;
