import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

@Component({
	selector: 'sw-nav',
	templateUrl: './nav.component.html',
	styleUrls: ['./nav.component.scss']
})
export class NavComponent  {

	constructor(private router: Router) {}

}
