import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { EnvironmentModule } from '../environments/environment';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SwapiModule } from './swapi/swapi.module';
import { reducer } from './reducers/store.reducer';
import { FilmEffects } from './effects/film.effects';
import { PeopleEffects } from './effects/people.effects';

import { SwapiService } from './shared/swapi.service';
import { MoviedbService } from './shared/moviedb.service';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		SwapiModule,
		AppRoutingModule,
		StoreModule.provideStore(reducer),

		EffectsModule.run(FilmEffects),
		EffectsModule.run(PeopleEffects),
		StoreDevtoolsModule.instrumentOnlyWithExtension(),
		EnvironmentModule
	],
	providers: [
		SwapiService,
		MoviedbService
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
