const { ObjectId } = require('mongodb');
const database = require('../config/database.js')

async function getAllCities(){
    const db = await database.connect();
    return db.collection('cinemaCatalog').find({}).
                                        project({cidade:1 ,uf:1 ,pais:1}).    
                                        toArray();
}

async function getAllCinemasByCityId(cityId){
    const objCityId= new ObjectId(cityId)
    const db = await database.connect();
    const city =await db.collection('cinemaCatalog').findOne({_id:objCityId},{projection:{cinemas:1}}); 
    
    return city.cinemas;
}

/** Exemplo de unwind
 * {id: 1 , frutas : ["maca" , "laranja"]},{id:2, furtas ["laranja","banana"]}
 * {id: 1 , frutas :"maca" },{id: 1 , frutas : "laranja"},{id:2, frutas "laranja"},{id:2, frutas:"banana"]}
 * 
 * 
*/

async function getMoviesByCinemaId(cinemaId) {
    const objCinemaId = new ObjectId(cinemaId);
    const db = await database.connect();
  
    const group = await db.collection('cinemaCatalog').aggregate([
      { $match: { "cinemas._id": objCinemaId } },
      { $unwind: "$cinemas" },
      { $unwind: "$cinemas.salas" },
      { $unwind: "$cinemas.salas.sessoes" },
      {
        $group: {
          _id: {
            titulo: "$cinemas.salas.sessoes.filme",
            _id: "$cinemas.salas.sessoes.idFilme"
          }
        }
      }
    ]).toArray();
  
    return group.map(g=>g._id);
  }

  async function getMoviesByCityId(cinemaId) {
    const objCityId = new ObjectId(cinemaId);
    const db = await database.connect();
  
    const group = await db.collection('cinemaCatalog').aggregate([
      { $match: { "_id": objCityId } },
      { $unwind: "$cinemas" },
      { $unwind: "$cinemas.salas" },
      { $unwind: "$cinemas.salas.sessoes" },
      {
        $group: {
          _id: {
            titulo: "$cinemas.salas.sessoes.filme",
            _id: "$cinemas.salas.sessoes.idFilme"
          }
        }
      }
    ]).toArray();
  
    return group.map(g=>g._id);
  }
  async function getMovieSessionByCityId(movieId,cityId){
    const objCityId = new ObjectId(cityId);
    const objMovieId = new ObjectId(movieId);
    const db = await database.connect();
  
    const group = await db.collection('cinemaCatalog').aggregate([
        { $match: { "_id": objCityId } },
        { $unwind: "$cinemas" },
        { $unwind: "$cinemas.salas" },
        { $unwind: "$cinemas.salas.sessoes" },
        { $match: { "cinemas.salas.sessoes.idFilme": objMovieId } },
        {
          $group: {
            _id: {
              titulo: "$cinemas.salas.sessoes.filme",
              _id: "$cinemas.salas.sessoes.idFilme",
              cinema: "$cinemas.nome",
              idCinema: "$cinemas._id",
              sala: "$cinemas.salas.nome", // Campo de sala
              sessoes: "$cinemas.salas.sessoes" // Campo de sessoes
            }
          }
        }
      ]).toArray();
      
  
    return group.map(g=>g._id); 
  }
  
  async function getMovieSessionByCinemaId(movieId,cinemaId){
    const objCinemaId = new ObjectId(cinemaId);
    const objMovieId = new ObjectId(movieId);
    const db = await database.connect();
  
    const group = await db.collection('cinemaCatalog').aggregate([
        { $match: { "cinemas._id": objCinemaId } },
        { $unwind: "$cinemas" },
        { $unwind: "$cinemas.salas" },
        { $unwind: "$cinemas.salas.sessoes" },
        { $match: { "cinemas.salas.sessoes.idFilme": objMovieId } },
        {
          $group: {
            _id: {
              titulo: "$cinemas.salas.sessoes.filme",
              _id: "$cinemas.salas.sessoes.idFilme",
              cinema: "$cinemas.nome",
              idCinema: "$cinemas._id",
              sala: "$cinemas.salas.nome", // Campo de sala
              sessoes: "$cinemas.salas.sessoes" // Campo de sessoes
            }
          }
        }
      ]).toArray();
      
  
    return group.map(g=>g._id); 
  }
  

module.exports = {getAllCities,getAllCinemasByCityId,getMoviesByCinemaId,getMoviesByCityId,getMovieSessionByCityId,getMovieSessionByCinemaId}