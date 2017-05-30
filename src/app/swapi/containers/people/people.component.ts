import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { People } from '../../../../../schemas/people';
import { getAllPeople, IAppState } from '../../../reducers/store.reducer';

@Component({
	selector: 'sw-people',
	templateUrl: './people.component.html',
	styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {

	public people$: Observable < People[] > ;

	constructor(private store$: Store < IAppState > ) {

		this.people$ = this.store$.select(getAllPeople);
	}

	ngOnInit() {}

}
