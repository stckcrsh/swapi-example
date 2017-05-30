import { SwapiService } from './swapi.service';

describe('Swapi Service', () => {

	it('Should return an id from a swapi url', () => {
		const people6 = 'http://swapi.co/api/people/6/';
		const people7 = 'http://swapi.co/api/people/7/';
		const films3 = 'http://swapi.co/api/films/3/';
		const films4_noslash = 'http://swapi.co/api/films/4';

		expect(SwapiService.GET_ID_FROM_SWAPI_URL(people6)).toEqual('6');
		expect(SwapiService.GET_ID_FROM_SWAPI_URL(people7)).toEqual('7');
		expect(SwapiService.GET_ID_FROM_SWAPI_URL(films3)).toEqual('3');
		expect(SwapiService.GET_ID_FROM_SWAPI_URL(films4_noslash)).toEqual('4');

	});

});
