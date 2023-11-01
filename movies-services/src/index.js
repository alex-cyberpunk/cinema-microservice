const movies =require('./api/movies.js');
const repository = require('./repository/repository.js')
const server = require('./server/server.js')

async function start() {
    try {
        const app = await server.start(movies, repository);
        
    } catch (error) {
        console.error("Ocorreu um erro ao iniciar o servidor:", error);
        
    }
}

start();


