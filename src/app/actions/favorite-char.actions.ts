import { Action } from '@ngrx/store';

import { People } from '../../../schemas/people.d';

export const NEW_FAV_CHARACTER = '[UI] New Fav character';

export class NewFavCharAction implements Action {
	readonly type = NEW_FAV_CHARACTER;

	constructor(public payload: People) {}
}

export type Actions
	= NewFavCharAction;
