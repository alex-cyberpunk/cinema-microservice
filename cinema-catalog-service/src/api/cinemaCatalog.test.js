const {test,expect} = require('@jest/globals');
const server = require('../server/server.js');
const cinemaCatalog = require('./cinemaCatalog')
const request = require('supertest');
const repositoryMock = require('../repository/__mocks__/repository.js')

const adminToken = '1';
const guesToken = '2';

jest.mock('../node_modules/jsonwebtoken',()=>{
  return{
    verify: (token)=>{
        if(token === adminToken) return {userId:1,profileId:1}//ADMIN
        else if(token === guesToken) return {userId:2,profileId:2}//GUEST
        else throw  new Error('Invalid token!');
    }
  }
  
})


let app=null;

beforeAll(async()=>{
    process.env.PORT=3004;
    app = await server.start(cinemaCatalog,repositoryMock);
});

afterAll(async()=>{
    await server.stop();
})


test('GET /cities 200 OK' ,async()=>{
   const response = await request(app).get('/cities').set('authorization',`Bearer ${adminToken}`);;
   expect(response.status).toEqual(200);
   expect(Array.isArray(response.body)).toBeTruthy();
   expect(response.body.length).toBeTruthy();
})

test('GET /cities/:cityId/movies 200 OK' ,async()=>{
    const testCityId='1';
    const response = await request(app).get(`/cities/${testCityId}/movies`).set('authorization',`Bearer ${adminToken}`);;
   expect(response.status).toEqual(200);
   expect(response.body).toBeTruthy();
   
  })

test('GET /cities/:cityId/movies 404 NOT FOUND' ,async()=>{
    const testCityId='-1';
    const response = await request(app).get(`/cities/${testCityId}/movies`).set('authorization',`Bearer ${adminToken}`);;
    expect(response.status).toEqual(404);
  })  

  test('GET /cities/:cityId/movies/:movieId 200 OK' ,async()=>{
    const testMovieId='1';
    const testCityId='1';
    const response = await request(app).get(`/cities/${testCityId}/movies/${testMovieId}`).set('authorization',`Bearer ${adminToken}`);;
    expect(response.status).toEqual(200);
    expect(response.body).toBeTruthy();
  })

test('GET /cities/:cityId/movies/:movieId 404 NOT FOUND' ,async()=>{
    const testCityId='1';
    const testMovieId='-1';
    const response = await request(app).get(`/cities/${testCityId}/movies/${testMovieId}`).set('authorization',`Bearer ${adminToken}`);;
    expect(response.status).toEqual(404);
  })    

  test('GET /cities/:cityId/cinemas 200 OK' ,async()=>{
    const testCityId='1';
    const response = await request(app).get(`/cities/${testCityId}/movies`).set('authorization',`Bearer ${adminToken}`);;
    expect(response.status).toEqual(200);
    expect(response.body).toBeTruthy();
  })

test('GET /cities/:cityId/cinemas 404 NOT FOUND' ,async()=>{
    const testCityId='-1';
    const response = await request(app).get(`/cities/${testCityId}/movies`).set('authorization',`Bearer ${adminToken}`);;
   expect(response.status).toEqual(404);
  })    

  test('GET /cinemas/:cinemaId/movies 200 OK' ,async()=>{
    const testcinemaId='1';
    const response = await request(app).get(`/cinemas/${testcinemaId}/movies`).set('authorization',`Bearer ${adminToken}`);;
    expect(response.status).toEqual(200);
     expect(response.body).toBeTruthy();
  })

test('GET /cinemas/:cinemaId/movies 404 NOT FOUND' ,async()=>{
    const testcinemaId='-1';
    const response = await request(app).get(`/cinemas/${testcinemaId}/movies`).set('authorization',`Bearer ${adminToken}`);;
   expect(response.status).toEqual(404);
  })
  
test('GET /cinemas/:cinemaId/movies/:movieId 200 OK' ,async()=>{
    const testcinemaId='1';
    const testMovieId='1';
    const response = await request(app).get(`/cinemas/${testcinemaId}/movies/${testMovieId}`).set('authorization',`Bearer ${adminToken}`);;
    expect(response.status).toEqual(200);
     expect(response.body).toBeTruthy();
  })

test('GET /cinemas/:cinemaId/movies/:movieId 404 NOT FOUND' ,async()=>{
    const testcinemaId='1';
    const testMovieId='-1';
    const response = await request(app).get(`/cinemas/${testcinemaId}/movies/${testMovieId}`).set('authorization',`Bearer ${adminToken}`);;
   expect(response.status).toEqual(404);
  })
