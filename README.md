# Running the swapi test 
1. First clone the project
2. cd to `<project_root>`
2. run `npm install`
3. run `npm start`

# Swapi interview test

So here is the list of everything that i have done for this to work and display 

## Angular

I chose to write this using Angular (v4).  I did this because it is what i am the most familiar with.
I generated the project using the angular-cli so most of the boiler plate is from that.

## Testing 

I am not unit testing everything, but i did write tests for specific pieces that i wanted to make sure worked correctly.
The main files for this were the effects files as they do most of the work for the app.
I put in some basic boiler plate tests for the components, not all pass currently.
I would like to finish the tests for the reducers, between the reducers, effects and the selectors that is like 99% of the apps functionality.

## Loading data
I wanted the application to load the minimum amount of data to populate the first page.

So i first make a call to the films list using the FilmEffects file to load all films on initialization.
Then from that i collect the first 3 characters from each film, dedup that list, then make calls for each of the characters from that list.
While those calls are going i also send the movie title through another api themoviedb.org which i use to tie each film to a movie in their database which has movie poster data.

This gives enough data to populate the first page.

## Displaying the films
For the films to display on the first page i need to rehydrate them with character info and also pair them off.

I first create selectors for film data - inside the films.reducer
then some selectors for the people data - inside people.reducer

then we combine them inside the store.reducer to make a fatFilms
finally we use the fatFilms to generate a list that is seperated into pairs
```js
filmPairs = [
	[{film1}, {film2}],
	[{film3}, {film4}],
	[{film5}, {film6}],
	[{film7}]
]
```

This data we can use to display the films properly.

## Fav/Worst Characters

For this section i wanted to make a way to choose a character 
I would like this to be a modal with a card for each person, but for time constraints i kept this as a select

To populate this component we needed to gather all the characters from the api
The people data is paginated and has around 87 characters in it.

To make this work we make a call for the initial list (page 1)
Then inside the people.effects we watch for this call to finish and when it does we load the data we got
into the reducer, then we create another action to load the next page using the next page url. This will continue to run 
till it reaches a page that does not have a url in its 'next' section.

We use that data to hydrate our fav and worst character UI data (ui-state.reducer)

## Crawl data

For the crawl chart i am using the C3 charting library, I have never used it wanted to learn on something small.

For the Crawl data i take all the film data that came in and process it using the getAllFilms selector (side-bar.component)
then i map out the data by converting each film into a column of data `['movie-title', crawl-length ]` then i feed that into the 
c3 load function and that generates the chart.

To get this to work in angular i am using the renderer to append the chart element to the dom.

## SCSS - iotaCss

For the css i wanted to try iotaCss out, it is a newer framework built on OOCSS and uses sass. 

## Utility libraries 

### Ramda
I used Ramda in a few places as my utility library, its similar in functionality to lodash or underscore, 
but is written entirely using functional programming concepts.

### React/reselect
I use the react reselect library to create memoized selectors that speed up the application and make the writing of selectors alot easier.
the main place you will see this is in the store.reducer we use a function called createSelector

### NGRX
I use ngrx for state management in the app, this is a flux style library that keeps the store as an observable that you subscribe to to get data from it.  This also means that we are tightly coupled to Rxjs library which is from the family reactive extensions, which are in many different languages.
