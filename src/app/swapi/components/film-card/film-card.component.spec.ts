import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmCardComponent } from './film-card.component';

describe('FilmCardComponent', () => {
	let component: FilmCardComponent;
	let fixture: ComponentFixture < FilmCardComponent > ;

	const film: any = {
		swapiId: '1',
		swapi: {
			title: 'A New Hope',
			director: 'George Lucas',
			characters: [{
					name: 'Luke Skywalker',
					url: 'http://swapi.co/api/people/1/'
				},
				{
					name: 'C-3PO',
					url: 'http://swapi.co/api/people/2/'
				},
				{
					name: 'R2-D2',
					url: 'http://swapi.co/api/people/3/'
				}
			],
			url: 'http://swapi.co/api/films/1/'
		},
		movieDbId: 11,
		movieDb: {
			poster_path: '/tvSlBzAdRE29bZe5yYWrJ2ds137.jpg',
			id: 11,
		},
		posterPath: 'http://image.tmdb.org/t/p/w185//tvSlBzAdRE29bZe5yYWrJ2ds137.jpg'
	};

	beforeEach(async(() => {
		TestBed.configureTestingModule({
				declarations: [FilmCardComponent]
			})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(FilmCardComponent);
		component = fixture.componentInstance;
		component.film = film;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
