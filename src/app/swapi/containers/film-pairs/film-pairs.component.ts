import { Component, Input } from '@angular/core';

@Component({
	selector: 'sw-film-pairs',
	templateUrl: './film-pairs.component.html',
	styleUrls: ['./film-pairs.component.scss']
})
export class FilmPairsComponent {

	@Input() public filmPairs: any;

	constructor() {}

}
