import { Action } from '@ngrx/store';

import * as worstActions from '../../actions/worst-char.actions';
import { People } from '../../../../schemas/people.d';

const initialState: string = null;

export default function WORST_REDUCER(state: string = initialState, { type, payload }: Action): string {
	switch (type) {
		case worstActions.NEW_WORST_CHAR:
			const char: People = payload;

			return char.url;
		default:
			return state;
	}
};
