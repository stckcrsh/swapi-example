import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './containers/home/home.component';
import { PeopleComponent } from './containers/people/people.component';
import { SwapiTemplateComponent } from './swapi-template.component';

const routes: Routes = [{
		path: '',
		component: SwapiTemplateComponent,
		children: [
			{ path: '', component: HomeComponent },
			{ path: 'people', component: PeopleComponent }
		]
	},

]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class SwapiRoutingModule {}
