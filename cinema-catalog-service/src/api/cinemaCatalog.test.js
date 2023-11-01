const {test,expect} = require('@jest/globals');
const server = require('../server/server.js');
const cinemaCatalog = require('./cinemaCatalog')
const request = require('supertest');
const repositoryMock = require('../repository/__mocks__/repository.js')

let app=null;

beforeAll(async()=>{
    process.env.PORT=3004;
    app = await server.start(cinemaCatalog,repositoryMock);
});

afterAll(async()=>{
    await server.stop();
})


test('GET /cities 200 OK' ,async()=>{
   const response = await request(app).get('/cities');
   expect(response.status).toEqual(200);
   expect(Array.isArray(response.body)).toBeTruthy();
   expect(response.body.length).toBeTruthy();
})

test('GET /cities/:cityId/movies 200 OK' ,async()=>{
    const testCityId='1';
    const response = await request(app).get(`/cities/${testCityId}/movies`);
   expect(response.status).toEqual(200);
   expect(response.body).toBeTruthy();
   
  })

test('GET /cities/:cityId/movies 404 NOT FOUND' ,async()=>{
    const testCityId='-1';
    const response = await request(app).get(`/cities/${testCityId}/movies`);
    expect(response.status).toEqual(404);
  })  

  test('GET /cities/:cityId/movies/:movieId 200 OK' ,async()=>{
    const testMovieId='1';
    const testCityId='1';
    const response = await request(app).get(`/cities/${testCityId}/movies/${testMovieId}`);
    expect(response.status).toEqual(200);
    expect(response.body).toBeTruthy();
  })

test('GET /cities/:cityId/movies/:movieId 404 NOT FOUND' ,async()=>{
    const testCityId='1';
    const testMovieId='-1';
    const response = await request(app).get(`/cities/${testCityId}/movies/${testMovieId}`);
    expect(response.status).toEqual(404);
  })    

  test('GET /cities/:cityId/cinemas 200 OK' ,async()=>{
    const testCityId='1';
    const response = await request(app).get(`/cities/${testCityId}/movies`);
    expect(response.status).toEqual(200);
    expect(response.body).toBeTruthy();
  })

test('GET /cities/:cityId/cinemas 404 NOT FOUND' ,async()=>{
    const testCityId='-1';
    const response = await request(app).get(`/cities/${testCityId}/movies`);
   expect(response.status).toEqual(404);
  })    

  test('GET /cinemas/:cinemaId/movies 200 OK' ,async()=>{
    const testcinemaId='1';
    const response = await request(app).get(`/cinemas/${testcinemaId}/movies`);
    expect(response.status).toEqual(200);
     expect(response.body).toBeTruthy();
  })

test('GET /cinemas/:cinemaId/movies 404 NOT FOUND' ,async()=>{
    const testcinemaId='-1';
    const response = await request(app).get(`/cinemas/${testcinemaId}/movies`);
   expect(response.status).toEqual(404);
  })
  
test('GET /cinemas/:cinemaId/movies/:movieId 200 OK' ,async()=>{
    const testcinemaId='1';
    const testMovieId='1';
    const response = await request(app).get(`/cinemas/${testcinemaId}/movies/${testMovieId}`);
    expect(response.status).toEqual(200);
     expect(response.body).toBeTruthy();
  })

test('GET /cinemas/:cinemaId/movies/:movieId 404 NOT FOUND' ,async()=>{
    const testcinemaId='1';
    const testMovieId='-1';
    const response = await request(app).get(`/cinemas/${testcinemaId}/movies/${testMovieId}`);
   expect(response.status).toEqual(404);
  })
