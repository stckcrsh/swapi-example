import { Action } from '@ngrx/store';

import { People } from '../../../schemas/people.d';

export const NEW_WORST_CHAR = '[UI] New Worst character';

export class NewWorstCharAction implements Action {
	readonly type = NEW_WORST_CHAR;

	constructor(public payload: People) {}
}

export type Actions
	= NewWorstCharAction;
