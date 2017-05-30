import { Action } from '@ngrx/store';

import * as actions from '../../actions/favorite-char.actions';
import { People } from '../../../../schemas/people.d';

const initialState: string = null;

export default function FAV_REDUCER(state: string = initialState, { type, payload }: Action): string {
	switch (type) {
		case actions.NEW_FAV_CHARACTER:
			const char: People = payload;

			return char.url;
		default:
			return state;
	}
};
