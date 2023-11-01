const cinemaCatalog =[
  {
    "cinemas":[]  
  }
,{
  "cidade":"Sao Paulo",
  "uf":"SP",
  "pais":"BR",
  "cinemas":[{
          "_id":ObjectId(),
          "nome":"Cinemark Bourbon Ipiranga",
          "salas":[{
                "nome":1,
                "sessoes":[
                  {
                    "idFilme":  ObjectId("6539cf325d3eaf6f403515e5"),
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
                    "idFilme":  ObjectId("6539cf325d3eaf6f403515e5"),
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
                    "idFilme":  ObjectId("6539cf325d3eaf6f403515e6"),
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
async function getAllMovies(){
    return movies;
}
async function getMovieById(id){
    if(id == -1 ) return null;
    movies[0]._id=id
    return movies[0];
}
async function getMoviesPremieres(){
    movies[0].dataLancamento = new Date();
    return [movies[0]];
}

module.exports = {getAllMovies, getMovieById, getMoviesPremieres}