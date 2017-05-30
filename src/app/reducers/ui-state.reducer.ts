import { Action, combineReducers, ActionReducer } from '@ngrx/store';

import { createSelector } from 'reselect';
import FAV_REDUCER, * as favorite from './ui-reducers/favorite-char.reducer';
import WORST_REDUCER, * as worst from './ui-reducers/worst-char.reducer';

export interface IUIState {
	favoriteChar: string;
	worstChar: string;
}

const reducers = {
	favoriteChar: FAV_REDUCER,
	worstChar: WORST_REDUCER
};

export const UI_REDUCER: ActionReducer < IUIState > = combineReducers(reducers);

export const getFavChar = (state: IUIState) => state.favoriteChar;
export const getWorstChar = (state: IUIState) => state.worstChar;
