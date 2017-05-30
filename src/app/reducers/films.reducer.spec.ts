import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import * as films from './films.reducer';
import * as swapiActions from '../actions/swapi-film.actions';

describe('Films Reducer', () => {
	let initialState: films.IFilmState;
	beforeEach(() => {

		initialState = {
			entities: {

			},
			ids: []
		};
	});

	describe(swapiActions.GET_ALL_COMPLETE, () => {

		it('should load all films when the swapiload completes', () => {

		});
	});

});
