const cinemaCatalog =require('./api/cinemaCatalog.js');
const repository = require('./repository/repository.js')
const server = require('./server/server.js')

async function start() {
    try {
        const app = await server.start(cinemaCatalog, repository);
        
    } catch (error) {
        console.error("Ocorreu um erro ao iniciar o servidor:", error);
        
    }
}

start();
