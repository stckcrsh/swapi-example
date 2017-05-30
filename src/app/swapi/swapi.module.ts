import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SwapiRoutingModule } from './swapi-routing.module';
import { FilmCardComponent } from './components/film-card/film-card.component';
import { HomeComponent } from './containers/home/home.component';
import { SideBarComponent } from './containers/side-bar/side-bar.component';
import { CrawlChartComponent } from './components/crawl-chart/crawl-chart.component';
import { PeopleComponent } from './containers/people/people.component';
import { SwapiTemplateComponent } from './swapi-template.component';
import { NavComponent } from './containers/nav/nav.component';
import { PeopleListComponent } from './components/people-list/people-list.component';
import { PeopleSmallDetailComponent } from './components/people-small-detail/people-small-detail.component';
import { FilmPairsComponent } from './containers/film-pairs/film-pairs.component';

@NgModule({
	declarations: [
		FilmCardComponent,
		HomeComponent,
		SideBarComponent,
		CrawlChartComponent,
		PeopleComponent,
		SwapiTemplateComponent,
		NavComponent,
		PeopleListComponent,
		PeopleSmallDetailComponent,
		FilmPairsComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		ReactiveFormsModule,
		HttpModule,
		SwapiRoutingModule
	],
	providers: [],
})
export class SwapiModule {}
