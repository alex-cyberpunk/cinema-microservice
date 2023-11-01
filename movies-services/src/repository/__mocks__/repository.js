const movies = [{
    "_id":  "6539cf325d3eaf6f403515e5",
    "titulo": "Os Vingadores Guerra Infinita",
    "sinopse": "Os herois da marvel cacam um gigantao roxo",
    "duracao": 120,
    "dataLancamento": new Date("2023-10-11T00:00:00Z"),
    "imagem": "https://th.bing.com/th/id/OIP.C2EPyVTJWziFwvIlb18_LAHaK-?pid=ImgDet&rs=1",
    "categories": [
      "Aventura",
      "Acao"
    ]
  },
  {
    "_id":  "6539cf325d3eaf6f403515e6",
    "titulo": "Os Vingadores: Era de Ultron",
    "sinopse": "Um robo maluco que cantam a musica do pinoquio e tem piti enfrenta os vingadores",
    "duracao": 110,
    "dataLancamento":  new Date("2016-05-01T00:00:00.000Z"),
    "imagem": "https://th.bing.com/th/id/OIP.KED2AQNFUrCFV4gzRSA8xQHaEK?pid=ImgDet&rs=1",
    "categories": [
      "Aventura",
      "Acao"
    ]
  }];
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

async function addMovie(){
  return movies[0];
}

async function deleteMovie(id){  
  if(!id) throw new Error('Nao foi possivel excluir este filme!');
  return true;
}

module.exports = {getAllMovies, getMovieById, getMoviesPremieres,deleteMovie,addMovie}