import { Input } from '@angular/core';
import { Component } from '@angular/core';

@Component({
	selector: 'sw-people-small-detail',
	templateUrl: './people-small-detail.component.html',
	styleUrls: ['./people-small-detail.component.scss']
})
export class PeopleSmallDetailComponent {

	@Input() public person: any;
	constructor() {}

}
