import {
	fakeAsync,
	inject,
	TestBed,
	tick
} from '@angular/core/testing';
import { EffectsRunner, EffectsTestingModule } from '@ngrx/effects/testing';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/take';
import { Observable } from 'rxjs/Observable';
import { People } from '../../../schemas/people.d';
import {
	SwapiGetAllPeopleAction,
	SwapiGetAllPeopleComplete,
	SwapiGetNextPagePeoplAction
} from '../actions/people.actions';
import { SwapiService } from '../shared/swapi.service';
import { PeopleEffects } from './people.effects';

describe('People Effects', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				EffectsTestingModule
			],
			providers: [
				PeopleEffects,
				{
					provide: SwapiService,
					useValue: jasmine.createSpyObj('swapiService', ['getAllPeople', 'getResourceByURL'])
				}
			]
		});
	});

	let runner: EffectsRunner;
	let peopleEffects: PeopleEffects;

	beforeEach(inject([
			EffectsRunner, PeopleEffects
		],
		(_runner, _peopleEffects) => {
			runner = _runner;
			peopleEffects = _peopleEffects;
		}
	));

	describe('getAllPeople$', () => {
		const person1: any = { name: 'a name1' };
		const person2: any = { name: 'a name2' };
		const person3: any = { name: 'a name3' };

		const people = [person1, person2, person3];

		it('should should call out and get a result of people', fakeAsync(() => {

			const swapiService = TestBed.get(SwapiService);
			swapiService.getAllPeople.and.returnValue(Observable.of({ results: people, next: null }));

			let result = null;
			peopleEffects.getAllPeople$.take(1).subscribe(_result => result = _result);
			tick();

			const expectedResult = new SwapiGetAllPeopleComplete(people);

			runner.queue(new SwapiGetAllPeopleAction());
			expect(result).toEqual(expectedResult);
		}));

		it('should call the next url if it exists', fakeAsync(() => {
			const nextUrl = 'theNextUrl';

			const swapiService = TestBed.get(SwapiService);
			swapiService.getAllPeople.and.returnValue(Observable.of({ results: people, next: nextUrl }));

			let result = null;
			peopleEffects.getAllPeople$.skip(1).subscribe(_result => result = _result);
			tick();

			const expectedResult = new SwapiGetNextPagePeoplAction(nextUrl);

			runner.queue(new SwapiGetAllPeopleAction());
		}));
	});

	describe('getNextPage$', () => {
		const person1: any = { name: 'a name1' };
		const person2: any = { name: 'a name2' };
		const person3: any = { name: 'a name3' };

		const people = [person1, person2, person3];

		const nextUrl = 'theNextUrl';

		it('should return a new complete action when successful', fakeAsync(() => {

			const swapiService = TestBed.get(SwapiService);
			swapiService.getResourceByURL.and.returnValue(Observable.of({ results: people, next: nextUrl }));

			let result = null;
			peopleEffects.getNextPage$.take(1).subscribe(_result => result = _result);
			runner.queue(new SwapiGetNextPagePeoplAction(nextUrl));
			tick();

			const expectedResult = new SwapiGetAllPeopleComplete(people);
			expect(swapiService.getResourceByURL).toHaveBeenCalledWith(nextUrl);
			expect(result).toEqual(expectedResult);
		}));

		it('should return a new get next page action on success', fakeAsync(() => {

			const swapiService = TestBed.get(SwapiService);
			swapiService.getResourceByURL.and.returnValue(Observable.of({ results: people, next: nextUrl }));

			let result = null;
			peopleEffects.getNextPage$.skip(1).subscribe(_result => result = _result);
			runner.queue(new SwapiGetNextPagePeoplAction(nextUrl));
			tick();

			const expectedResult = new SwapiGetNextPagePeoplAction(nextUrl);
			expect(swapiService.getResourceByURL).toHaveBeenCalledWith(nextUrl);
			expect(result).toEqual(expectedResult);
		}));

		it('should skip running if the next page is null', fakeAsync(() => {

			const swapiService = TestBed.get(SwapiService);
			swapiService.getResourceByURL.and.returnValue(Observable.of({ results: people, next: null }));

			let result = null;
			peopleEffects.getNextPage$.subscribe(_result => result = _result);
			runner.queue(new SwapiGetNextPagePeoplAction(null));
			tick();

			const expectedResult = null;
			expect(result).toEqual(expectedResult);
		}));
	});
});
