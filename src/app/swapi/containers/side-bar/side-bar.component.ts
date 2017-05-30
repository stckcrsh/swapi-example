import { IFilm } from '../../../models/film';
import { Component, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { getAllFilms, getFavChar, getWorstChar, IAppState, getAllPeople } from '../../../reducers/store.reducer';
import { NewFavCharAction } from '../../../actions/favorite-char.actions';
import { NewWorstCharAction } from '../../../actions/worst-char.actions';
import { People } from '../../../../../schemas/people.d';

@Component({
	selector: 'sw-side-bar',
	templateUrl: './side-bar.component.html',
	styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnDestroy {

	public favoriteChar$: Observable < People > ;
	public worstChar$: Observable < People > ;
	public characters$: Observable < People[] > ;

	public crawlChart$: Observable < any > ;

	public worstSelect: FormControl = new FormControl();
	public worstSubscription: any;
	public favSelect: FormControl = new FormControl();
	public favSubscription: any;

	constructor(private store$: Store < IAppState > ) {

		this.favoriteChar$ = this.store$.select(getFavChar);
		this.worstChar$ = this.store$.select(getWorstChar);
		this.crawlChart$ = this.store$.select(getAllFilms)
			.map((films: IFilm[]) => ({
				columns: films.map((film: IFilm) => [film.swapi.title, film.swapi.opening_crawl.split(/[ ]|\r\n/).length])
			}));
		this.characters$ = this.store$.select(getAllPeople);

		this.worstSubscription = this.worstSelect.valueChanges.subscribe(this.selectWorst.bind(this));
		this.favSubscription = this.favSelect.valueChanges.subscribe(this.selectFav.bind(this));
	}

	public selectWorst(character) {
		this.store$.dispatch(new NewWorstCharAction(character));
	};
	public selectFav(character) {
		this.store$.dispatch(new NewFavCharAction(character));
	};

	public ngOnDestroy() {
		this.worstSubscription.unsubscribe();
		this.favSubscription.unsubscribe();
	}

}
