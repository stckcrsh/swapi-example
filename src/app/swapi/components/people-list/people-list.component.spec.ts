import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleListComponent } from './people-list.component';

describe('PeopleListComponent', () => {
	let component: PeopleListComponent;
	let fixture: ComponentFixture < PeopleListComponent > ;

	const people: any = [
		{ person: '1' },
		{ person: '2' }
	];

	beforeEach(async(() => {
		TestBed.configureTestingModule({
				declarations: [PeopleListComponent],
				schemas: [NO_ERRORS_SCHEMA]
			})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(PeopleListComponent);
		component = fixture.componentInstance;
		component.people = people;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
