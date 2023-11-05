const {test,expect} = require('@jest/globals');
const server = require('../server/server.js');
const movies = require('./movies')
const request = require('supertest');
const repositoryMock = require('../repository/__mocks__/repository.js');
const { JsonWebTokenError } = require('jsonwebtoken');
const { error } = require('../../../api-gateway/src/schema/login.js');

const adminToken = '1';
const guesToken = '2';

jest.mock('../node_modules/jsonwebtoken',()=>{
  return{
    verify: (token)=>{
      if(token==='1') return {userId:1,profileId:1}//ADMIN
      else if(token==='2') return {userId:2,profileId:2}//GUEST
      else throw  new Error('Invalid token!');
  
    }
  }
  
})

let app=null;

beforeAll(async()=>{
    process.env.PORT=3002;
    app = await server.start(movies,repositoryMock);
});

afterAll(async()=>{
    await server.stop();
})


test('GET /movies 200 OK' ,async()=>{
   const response = (await request(app).get('/movies')).set('authorization',`Bearer ${adminToken}`);
   expect(response.status).toEqual(200);
   expect(Array.isArray(response.body)).toBeTruthy();
   expect(response.body.length).toBeTruthy();
})

test('GET /movies 401 UNAUTHORIZATE' ,async()=>{
  const response = (await request(app).get('/movies'));
  expect(response.status).toEqual(401);
})


test('GET /movies/:id 200 OK' ,async()=>{
    const testMovieId='1';
    const response = await request(app).get(`/movies/${testMovieId}`).set('authorization',`Bearer ${adminToken}`);
   expect(response.status).toEqual(200);
   expect(response.body).toBeTruthy();
  })

test('GET /movies/:id 404 NOT FOUND' ,async()=>{
    const testMovieId='-1';
    const response = await request(app).get(`/movies/${testMovieId}`);
   expect(response.status).toEqual(404);
  })  
test('GET /movies/premieres 200 OK' ,async()=>{
    const response = await request(app).get('/movies/premieres').set('authorization',`Bearer ${adminToken}`);
    expect(response.status).toEqual(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body.length).toBeTruthy();
  })

  test('GET /movies/premieres 401 OK' ,async()=>{
    const response = await request(app).get('/movies/premieres').set('authorization',`Bearer ${adminToken}`);
    expect(response.status).toEqual(401);
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
                            .send(movie).set('authorization',`Bearer ${adminToken}`);
    
    expect(response.status).toEqual(201);
    expect(response.body).toBeTruthy();
  })
  
  test('POST /movies/ 401 OK' ,async()=>{
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
    
    expect(response.status).toEqual(401);
  })
  
  test('POST /movies/ 403 FORBIDDEN' ,async()=>{
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
                            .send(movie).set('authorization',`Bearer ${guesToken}`);
    
    expect(response.status).toEqual(403);
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
    const response = await request(app).delete('/movies/1').set('authorization',`Bearer ${adminToken}`);
    expect(response.status).toEqual(204);
  })
  
  test('DELETE /movies/:id 204 NO CONTENT' ,async()=>{
    const response = await request(app).delete('/movies/1').set('authorization',`Bearer ${adminToken}`);
    expect(response.status).toEqual(401);
  })

  test('DELETE /movies/:id 403 FORBIDDEN' ,async()=>{
    const response = await request(app).delete('/movies/1').set('authorization',`Bearer ${guesToken}`);
    expect(response.status).toEqual(403);
  })