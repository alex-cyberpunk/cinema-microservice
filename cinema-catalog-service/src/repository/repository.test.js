//require('dotenv-safe').config();
const  {test,expect} = require('@jest/globals');
const repository = require('./repository');

let cityId = null;
let cinemaId=null;
let movieId=null;
beforeAll(async ()=>{
    const cities = await repository.getAllCities();
    cityId = cities[1]._id;
    
    const cinemas = await repository.getAllCinemasByCityId(cityId);
    //console.log(cinemas)
    cinemaId = cinemas[0]._id;
    
    movieId = cinemas[0].salas[0].sessoes[0].idFilme

})

test('getAllCities', async()=>{
    const cities = await repository.getAllCities();
    expect(Array.isArray(cities)).toBeTruthy();
    expect(cities.length).toBeTruthy();

})

test('getAllCinemasByCityId', async()=>{
    const cinemas = await repository.getAllCinemasByCityId(cityId);
    expect(cinemas).toBeTruthy();
    expect(Array.isArray(cinemas)).toBeTruthy();

})
test('getMoviesByCinemaId', async()=>{
    const movies = await repository.getMoviesByCinemaId(cinemaId);
    //console.log(movies)
    expect(movies).toBeTruthy();
    expect(movies.length).toBeTruthy();

})
test('getMoviesByCityId', async()=>{
    const movies = await repository.getMoviesByCityId(cityId);
    //console.log(movies)
    expect(movies).toBeTruthy();
    expect(movies.length).toBeTruthy();

})

test('getMovieSessionByCityId', async()=>{
    const movieSessions = await repository.getMovieSessionByCityId(movieId,cityId);
    expect(movieSessions).toBeTruthy();
    expect(movieSessions.length).toBeTruthy();

})

test('getMovieSessionByCinemaId', async()=>{
    const movieSessions = await repository.getMovieSessionByCinemaId(movieId,cinemaId);
    console.log(movieSessions)
    expect(Array.isArray(movieSessions)).toBeTruthy();
    expect(movieSessions.length).toBeTruthy();

})