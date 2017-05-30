import { Component, OnInit, Input } from '@angular/core';

import { IFilm } from '../../../models/film';

@Component({
	selector: 'sw-film-card',
	templateUrl: './film-card.component.html',
	styleUrls: ['./film-card.component.scss']
})
export class FilmCardComponent implements OnInit {

	@Input() public film: IFilm;

	constructor() {}

	ngOnInit() {

	}

	public filterSelectCharacters(characters: any[]) {
		return characters.filter((person) => person instanceof Object).filter((i, idx) => idx < 3);
	}

}
