import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import * as variables from './config/swapi.variables';
@Injectable()
export class SwapiService {
	public static GET_ID_FROM_SWAPI_URL(url): string {
		return url.split('/').filter(i => i).pop();
	}

	constructor(private http: Http) {}

	public getAllFilms() {
		return this.http.get(variables.FILMS_URL).map(res => res.json());
	}

	public getAllPeople() {
		return this.http.get(variables.PEOPLE_URL).map(res => res.json());
	}

	public getResourceByURL < T > (url: string): Observable < T > {
		return this.http.get(this.convertUrlToHttps(url)).map(res => < T > res.json());
	}

	public convertUrlToHttps(url: string) {
		return url.replace(/http(?!s)/, 'https');
	}

}
