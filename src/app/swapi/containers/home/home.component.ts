import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';

import { IAppState, getFilmPairs } from '../../../reducers/store.reducer';
import { IFilm } from '../../../models/film';

@Component({
	selector: 'sw-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

	public pairs$: Observable < IFilm[] > ;
	constructor(private store$: Store < IAppState > ) {

		this.pairs$ = store$.select(getFilmPairs);
	}

	ngOnInit() {}

}
