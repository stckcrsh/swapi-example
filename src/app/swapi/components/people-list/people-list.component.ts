import { People } from '../../../../../schemas/people';
import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'sw-people-list',
	templateUrl: './people-list.component.html',
	styleUrls: ['./people-list.component.scss']
})
export class PeopleListComponent implements OnInit {

	@Input() public people: People[];

	constructor() {}

	ngOnInit() {}

}
