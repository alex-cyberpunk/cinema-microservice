const {test,expect} = require('@jest/globals');
const server = require('../server/server.js');
const movies = require('./movies')
const request = require('supertest');
const repositoryMock = require('../repository/__mocks__/repository.js')

let app=null;

beforeAll(async()=>{
    process.env.PORT=3002;
    app = await server.start(movies,repositoryMock);
});

afterAll(async()=>{
    await server.stop();
})


test('GET /movies 200 OK' ,async()=>{
   const response = await request(app).get('/movies');
   expect(response.status).toEqual(200);
   expect(Array.isArray(response.body)).toBeTruthy();
   expect(response.body.length).toBeTruthy();
})

test('GET /movies/:id 200 OK' ,async()=>{
    const testMovieId='1';
    const response = await request(app).get(`/movies/${testMovieId}`);
   expect(response.status).toEqual(200);
   expect(response.body).toBeTruthy();
  })

test('GET /movies/:id 404 NOT FOUND' ,async()=>{
    const testMovieId='-1';
    const response = await request(app).get(`/movies/${testMovieId}`);
   expect(response.status).toEqual(404);
  })  
test('GET /movies/premieres 200 OK' ,async()=>{
    const response = await request(app).get('/movies/premieres');
    expect(response.status).toEqual(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body.length).toBeTruthy();
  })

  test('POST /movies/ 201 OK' ,async()=>{
    const movie = {
        titulo:'Teste Movie 2',
        sinopse:'A continuacao q ninguem pediu... ',
        duracao:120,
        dataLancamento: new Date(),
        imagem:'htttp://imagem.jpg',
        categoria:['Aventura']
    };

    const response = await request(app).
                            post('/movies/')
                            .set('Content-Type','application/json')
                            .send(movie);
    
    expect(response.status).toEqual(201);
    expect(response.body).toBeTruthy();
  })
  
  test('POST /movies/ 422 UNPROCESSABLE ENTITY' ,async()=>{
    const movie = {};

    const response = await request(app).
                            post('/movies/')
                            .set('Content-Type','application/json')
                            .send(movie);
    
    expect(response.status).toEqual(422);
  })

  test('DELETE /movies/:id 204 NO CONTENT' ,async()=>{
    const response = await request(app).delete('/movies/1')
    expect(response.status).toEqual(204);
  })  