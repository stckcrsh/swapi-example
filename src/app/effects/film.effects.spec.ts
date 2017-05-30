import {
	fakeAsync,
	inject,
	TestBed,
	tick
} from '@angular/core/testing';
import { EffectsRunner, EffectsTestingModule } from '@ngrx/effects/testing';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';
import { Film } from '../../../schemas/films';
import { SwapiGetAllAction, SwapiGetAllComplete } from '../actions/swapi-film.actions';
import { SwapiService } from '../shared/swapi.service';
import { MoviedbService } from '../shared/moviedb.service';
import { FilmEffects } from './film.effects';

describe('Film Effects', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				EffectsTestingModule
			],
			providers: [
				FilmEffects,
				{
					provide: SwapiService,
					useValue: jasmine.createSpyObj('swapiService', ['getAllFilms'])
				},
				{
					provide: MoviedbService,
					useValue: jasmine.createSpyObj('moviedbService', ['searchMovies'])
				}
			]
		});
	});

	let runner: EffectsRunner;
	let filmEffects: FilmEffects;

	beforeEach(inject([
			EffectsRunner, FilmEffects
		],
		(_runner, _filmEffects) => {
			runner = _runner;
			filmEffects = _filmEffects;
		}
	));

	describe('getAllFilms$', () => {
		it('should initialize itself then call out and get all films', fakeAsync(() => {
			const film1: any = { url: 'some url1' };
			const film2: any = { url: 'some url2' };
			const film3: any = { url: 'some url3' };

			const films = [film1, film2, film3];

			const swapiService = TestBed.get(SwapiService);
			swapiService.getAllFilms.and.returnValue(Observable.of({ results: films }));

			let result = null;
			filmEffects.getAllFilms$.subscribe(_result => result = _result);
			tick();

			const expectedResult = new SwapiGetAllComplete(films);
			expect(result).toEqual(expectedResult);
		}));

		it('should return a new SwapiGetAllComplete Action with the results on success', fakeAsync(() => {
			const film1: any = { url: 'some url1' };
			const film2: any = { url: 'some url2' };
			const film3: any = { url: 'some url3' };

			const films = [film1, film2, film3];

			const swapiService = TestBed.get(SwapiService);
			swapiService.getAllFilms.and.returnValue(Observable.of({ results: films }));

			const expectedResult = new SwapiGetAllComplete(films);
			runner.queue(new SwapiGetAllAction());

			let result = null;
			filmEffects.getAllFilms$.subscribe(_result => result = _result);
			tick();
			expect(result).toEqual(expectedResult);
		}));

		it('should return a new SwapiGetAllComplete Action with no results on an error', fakeAsync(() => {

			const swapiService = TestBed.get(SwapiService);
			swapiService.getAllFilms.and.returnValue(Observable.throw(new Error()));

			const expectedResult = new SwapiGetAllComplete([]);
			runner.queue(new SwapiGetAllAction());

			let result = null;
			filmEffects.getAllFilms$.subscribe(_result => result = _result);
			tick();
			expect(result).toEqual(expectedResult);
		}));
	});
});
