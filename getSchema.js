var request = require("request")
var rp = require('request-promise');
var compileFromFile = require('json-schema-to-typescript').compileFromFile;
var fs = require('fs');

const URL_TEMPLATE = (resource) => `https://swapi.co/api/${resource}/schema`;
const SCHEMA_FOLDER = './schemas';

const RESOURCES = [
	'people',
	'films',
	'vehicles',
	'planets',
	'species',
	'starships'
];

if (!fs.existsSync(SCHEMA_FOLDER)) {
	fs.mkdirSync(SCHEMA_FOLDER);
}

Promise.all(
	// grab the schema resources from the internet
	RESOURCES.map((resource) => {
		rp(URL_TEMPLATE(resource)).then((json_string) => {
			fs.writeFileSync(`${SCHEMA_FOLDER}/${resource}.schema.json`, json_string);
		})
	})
).then(() => {
	// turn the new Schema files into typescript interfaces inside the app/swapi
	RESOURCES.map((resource) => {
		compileFromFile(`${SCHEMA_FOLDER}/${resource}.schema.json`).then(
			ts => fs.writeFileSync(`${SCHEMA_FOLDER}/${resource}.d.ts`, ts)
		)
	})
})
