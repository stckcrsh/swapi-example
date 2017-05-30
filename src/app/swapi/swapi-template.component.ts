import { Component } from '@angular/core';

@Component({
	selector: 'sw-swapi-template',
	template: `
		<sw-nav></sw-nav>
		<div class="o-container u-pt">
			<router-outlet></router-outlet>
		</div>
	`
})
export class SwapiTemplateComponent {}
