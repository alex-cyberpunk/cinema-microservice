const { ObjectId } = require("mongodb");

const cinemaCatalog =[
  {
    "cinemas":[]  
  }
,{
  "cidade":"Sao Paulo",
  "uf":"SP",
  "pais":"BR",
  "cinemas":[{
          "_id":"6541b9c60fbcc25247096dc2", 
          "nome":"Cinemark Bourbon Ipiranga",
          "salas":[{
                "nome":1,
                "sessoes":[
                  {
                    "idFilme":  "6539cf325d3eaf6f403515e5",
                    "filme": "Os Vingadores Guerra Infinita",
                    "data": new Date("2023-10-11T13:00:00Z"),
                    "valor":25.00,
                    "assentos":[{
                      "numero":"A1",
                      "disponivel":true
                                },
                                {
                                  "numero":"A2",
                                  "disponivel":false
                                }
                                ]
                  },
                  {
                    "idFilme":  "6539cf325d3eaf6f403515e5",
                    "filme": "Os Vingadores Guerra Infinita",
                    "data": new Date("2023-10-10T12:00:00Z"),
                    "valor":25.00,
                    "assentos":[{
                              "numero":"A1",
                              "disponivel":true
                              },
                              {
                                "numero":"A2",
                                "disponivel":true
                              }
                              ]
                  },
                  {
                    "idFilme":  "6539cf325d3eaf6f403515e6",
                    "filme": "Os Vingadores: Era de Ultron",
                    "data":  new Date("2016-05-01T10:00:00.000Z"),
                    "assentos":[{
                      "numero":"A1",
                      "disponivel":true
                                },
                                {
                                  "numero":"A2",
                                  "disponivel":true
                                }
                              ]
                  }]
                      }]
        
              }] 
  
}] 


function getAllCities(){
  return cinemaCatalog.map(catalog=>{
    return {
      "_id":new ObjectId("6541b9c60fbcc25247096dc4"),
      "uf":catalog.uf,
      "pais":catalog.pais,
      "cidade":catalog.cidade
      }
    })
}

function getAllCinemasByCityId(cityId){
  if(cityId<0) return null;
  return cinemaCatalog[1].cinemas;
}

 function getMoviesByCinemaId(cinemaId) {
  if(cinemaId<0) return null;
  return getAllCinemasByCityId().map(cinema=> {
    return {
      titulo: cinema.salas[0].sessoes[0].filme,
      _id: cinema.salas[0].sessoes[0].idFilme
    }  
    })
  }

 function getMoviesByCityId(cityId) {
  return getMoviesByCinemaId(cityId);
}

function getMovieSessionByCityId(movieId,cityId){
  if(cityId<0 || movieId<0 ) return null;
  return getAllCinemasByCityId().map(cinema=> {
    return {
      titulo: cinema.salas[0].sessoes[0].filme,
      _id: cinema.salas[0].sessoes[0].idFilme,
      cinema:cinema.nome,
      idCinema:cinema._id,
      sala: cinema.salas[0].nome,
      sessao: cinema.salas[0].sessoes[0]
    }  
    })
   
}

function getMovieSessionByCinemaId(movieId,cinemaId){
  return getMovieSessionByCityId(movieId,cinemaId);
}

module.exports = {getAllCities,getAllCinemasByCityId,getMoviesByCinemaId,getMoviesByCityId,getMovieSessionByCityId,getMovieSessionByCinemaId}