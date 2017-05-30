import { Action } from '@ngrx/store';

import { createSelector } from 'reselect';

import { People } from '../../../schemas/people.d';
import * as peopleActions from '../actions/people.actions';
import { SwapiService } from '../shared/swapi.service';

export interface IPeopleState {
	entities: {
		[id: string]: People;
	};
	ids: string[];
}

const initialState: IPeopleState = {
	entities: {},
	ids: []
};

export function SWAPI_PEOPLE_REDUCER(state: IPeopleState = initialState, { type, payload }: Action): IPeopleState {
	switch (type) {
		case peopleActions.LOAD_COMPLETE:
			{
				const person: People = payload;

				const id = person.url;
				const entities = Object.assign({}, state.entities, {
					[id]: person
				});
				const ids = state.ids.indexOf(id) > -1 ? state.ids : state.ids.concat([id]);
				return Object.assign({}, state, {
					entities: entities,
					ids: ids
				});
			}

			// add the new people to the existing ones
		case peopleActions.GET_ALL_PEOPLE_COMPLETE:
			{
				const people: People[] = payload;

				const newIds = people.map((person: People) => person.url);
				const ids = state.ids.concat(newIds).filter((item, idx, arr) => arr.indexOf(item) === idx);

				const entities = Object.assign({}, state.entities, {
					...people.reduce((prev: any, person: People) => ({ ...prev,
						...{
							[person.url]: person
						}
					}), {})
				});
				return { ...state,
					...{
						entities: entities,
						ids: ids
					}
				};
			}
		default:
			return state;
	}
};

export const getEntities = (state: IPeopleState) => state.entities;
export const getIds = (state: IPeopleState) => state.ids;

export const getAllPeople = createSelector(
	getEntities,
	getIds,
	(entities: {
		[id: string]: People;
	}, ids: string[]) => ids.map((id: string) => entities[id])
);
