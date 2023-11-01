//require('dotenv-safe').config();
const  {test,expect} = require('@jest/globals');
const repository = require('./repository');

let testMovieId = null;

beforeAll(async ()=>{
    const movies = await repository.getAllMovies();
    testMovieId = movies[0]._id
})

test('getAllMovies', async()=>{
    const movies = await repository.getAllMovies();
    expect(Array.isArray(movies)).toBeTruthy();
    expect(movies.length).toBeTruthy();

})


test('getMovieById', async()=>{
    const movies = await repository.getMovieById(testMovieId);
    expect(movies).toBeTruthy();
    expect(movies._id).toEqual(testMovieId);
    
})

test('getMoviesPremieres', async()=>{
    const monthAgo = new Date();
    const movies = await repository.getMoviesPremieres();
    expect(Array.isArray(movies)).toBeTruthy();
    expect(movies.length).toBeTruthy();
    expect(movies[0].dataLancamento.getTime()).toBeGreaterThanOrEqual(monthAgo.getTime());  
})

test('addMovie', async()=>{
    const movie = {
        titulo:'Teste Movie',
        sinopse:'Sim , esse e um teste de filme da pra notar pelo nome ',
        duracao:69,
        dataLancamento: new Date(),
        imagem:'imagem.jpg',
        categoria:['Aventura']
    };

    let result;

    try{
        result = await repository.addMovie(movie);
        expect(result).toBeTruthy();
    }
    finally{
        console.log(result);
        await repository.deleteMovie(result._id);
    }
    
})

test('deleteMovie', async()=>{
    const movie = {
        titulo:'Teste Movie',
        sinopse:'Sim , esse e um teste de filme da pra notar pelo nome ',
        duracao:69,
        dataLancamento: new Date(),
        imagem:'imagem.jpg',
        categoria:['Aventura']
    };

    const result = await repository.addMovie(movie);
    const result2  = await repository.deleteMovie(result._id);    
    expect(result2).toBeTruthy();
})