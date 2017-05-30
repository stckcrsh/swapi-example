import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import * as moviedb from './config/moviedb.variables';

@Injectable()
export class MoviedbService {

	constructor(private http: Http) {}

	public searchMovies(title: string, year: string) {
		return this.http.get(moviedb.SEARCH_MOVIE(title, year)).map(res => res.json());
	}
}
