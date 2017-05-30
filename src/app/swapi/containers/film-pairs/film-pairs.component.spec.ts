import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmPairsComponent } from './film-pairs.component';

describe('FilmPairsComponent', () => {
	let component: FilmPairsComponent;
	let fixture: ComponentFixture < FilmPairsComponent > ;

	const pairs: any = [
		[{ pairs: '1' }],
		[{ pairs: '2' }]
	];

	beforeEach(async(() => {
		TestBed.configureTestingModule({
				declarations: [FilmPairsComponent],
				schemas: [NO_ERRORS_SCHEMA]
			})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(FilmPairsComponent);
		component = fixture.componentInstance;
		component.filmPairs = pairs;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
