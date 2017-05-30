import { Injectable } from '@angular/core';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/retry';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';
import { GET_ALL, GET_ALL_COMPLETE, SwapiGetAllComplete } from '../actions/swapi-film.actions';
import { MoviedbLoadComplete } from '../actions/moviedb.actions';
import { SwapiService } from '../shared/swapi.service';
import { MoviedbService } from '../shared/moviedb.service';
import { Film } from '../../../schemas/films.d';

@Injectable()
export class FilmEffects {

	@Effect()
	public getAllFilms$ = this.actions$
		.ofType(GET_ALL)
		.startWith(GET_ALL)
		.switchMap(() => this.swapiService.getAllFilms()
			.map((res: any) =>
				new SwapiGetAllComplete(res.results))
			.catch((err: any) => Observable.of(new SwapiGetAllComplete([])))
		);

	/**
	 * For each result when we load all films we need to find the imdb id
	 */
	@Effect()
	public getAllComplete$ = this.actions$
		.ofType(GET_ALL_COMPLETE)
		.map(toPayload)
		.switchMap((films: Film[]) =>
			// here we need to kick off the loads for all the characters and
			films.reduce((observable, film) => observable.merge(
				this.moviedbService.searchMovies(film.title, film.release_date.slice(0, 4))
				.map((result: any) => result.results)
				.map((titles: any[]) => titles.reduce((prev, curr) => prev))
				.map(movie => new MoviedbLoadComplete({ movie: movie, swapi: film }))
			), Observable.of()));

	constructor(
		private actions$: Actions,
		private swapiService: SwapiService,
		private moviedbService: MoviedbService
	) {}
}
