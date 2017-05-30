const SWAPI_URL = 'https://swapi.co/api';

/**
 * Generate all the urls for the star wars api
 */
export const PEOPLE_URL = `${SWAPI_URL}/people`;
export const GET_PERSON_URL = (personId) => `${PEOPLE_URL}/${personId}`;
export const FILMS_URL = `${SWAPI_URL}/films/`;
export const GET_FILM_URL = (filmId) => `${FILMS_URL}/${filmId}`;
export const SPECIES_URL = `${SWAPI_URL}/species/`;
export const GET_SPECIES_URL = (speciesId) => `${SPECIES_URL}/${speciesId}`;
export const STARSHIPS_URL = `${SWAPI_URL}/starships/`;
export const GET_STARSHIP_URL = (starshipId) => `${STARSHIPS_URL}/${starshipId}`;
export const PLANETS_URL = `${SWAPI_URL}/planets/`;
export const GET_PLANET_URL = (planetId) => `${PLANETS_URL}/${planetId}`;
export const VEHICLES_URL = `${SWAPI_URL}/vehicles/`;
export const GET_VEHICLE_URL = (vehicleId) => `${VEHICLES_URL}/${vehicleId}`;
