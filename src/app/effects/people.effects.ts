import { Injectable } from '@angular/core';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { Film } from '../../../schemas/films.d';
import { People } from '../../../schemas/people.d';
import {
	GET_ALL_PEOPLE,
	GET_NEXT_PAGE_PEOPLE,
	LOAD,
	SwapiGetAllPeopleAction,
	SwapiGetAllPeopleComplete,
	SwapiGetNextPagePeoplAction,
	SwapiLoadPersonAction,
	SwapiLoadPersonComplete
} from '../actions/people.actions';
import { GET_ALL_COMPLETE } from '../actions/swapi-film.actions';
import { SwapiService } from '../shared/swapi.service';

@Injectable()
export class PeopleEffects {

	@Effect()
	public loadPerson$ = this.actions$
		.ofType(LOAD)
		.map(toPayload)
		.switchMap((url: string) => this.swapiService.getResourceByURL(url)
			.map((res: any) =>
				new SwapiLoadPersonComplete(res))
			.catch((err: any) => Observable.of())
		);

	@Effect()
	public loadOnFilmComplete$ = this.actions$
		.ofType(GET_ALL_COMPLETE)
		.map(toPayload)
		.switchMap((films: Film[]) => films
			// flat map each films first three characters
			.reduce((prev: any[], film: Film) => prev.concat([...film.characters.slice(0, 3)]), [])

			// remove duplicates before making our calls
			.filter((item, idx, arr) => arr.indexOf(item) === idx)

			// convert each url into a call for that resource then map to complete action
			// retry failures twice then if still failing just ignore
			.map((url: string) => this.swapiService.getResourceByURL(url).retry(2)
				.map((person: People) => new SwapiLoadPersonComplete(person))
				.catch(() => Observable.of())
			)

			// take all the new observables and combine them into a single observable
			.reduce((prev, curr) => prev.merge(curr))

		);

	@Effect()
	public getAllPeople$ = this.actions$
		.ofType(GET_ALL_PEOPLE)
		.startWith(() => new SwapiGetAllPeopleAction())
		.switchMap(() => this.swapiService.getAllPeople()
			.switchMap((res: any) => Observable.from([new SwapiGetAllPeopleComplete(res.results), new SwapiGetNextPagePeoplAction(res.next)]))
			.catch(() => Observable.of())
		);

	@Effect()
	public getNextPage$ = this.actions$
		.ofType(GET_NEXT_PAGE_PEOPLE)
		.map(toPayload)
		.filter(i => i !== null)
		.switchMap((url: string) => this.swapiService.getResourceByURL(url)
			.switchMap((res: any) => Observable.from([new SwapiGetAllPeopleComplete(res.results), new SwapiGetNextPagePeoplAction(res.next)]))
			.catch(() => Observable.of())
		);

	constructor(
		private actions$: Actions,
		private swapiService: SwapiService
	) {}
}
