import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleSmallDetailComponent } from './people-small-detail.component';

describe('PeopleSmallDetailComponent', () => {
	let component: PeopleSmallDetailComponent;
	let fixture: ComponentFixture < PeopleSmallDetailComponent > ;

	const person: any = {
		name: 'a name',
		gender: 'some gender'
	};
	beforeEach(async(() => {
		TestBed.configureTestingModule({
				declarations: [PeopleSmallDetailComponent]
			})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(PeopleSmallDetailComponent);
		component = fixture.componentInstance;
		component.person = person;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
