const {validateMovie,validateToken,validateAdmin}= require('../middlewares/validationMiddleware.js')
const logger = require('../config/logger.js')
module.exports=(app,repository)=>{
    
    app.get('/movies/premieres',validateToken,async(req,res,next)=>{
        const movies = await repository.getMoviesPremieres();
        res.json(movies);
    })

    //Pode ser q nao retorne valr=ores e necessarios mais branchs
    app.get('/movies/:id',validateToken,async(req,res,next)=>{
        const movie =  await repository.getMovieById(req.params.id);
        console.log(movie);
        if(!movie) return res.sendStatus(404);

        res.json(movie);
    })

    app.get('/movies',validateToken,async(req,res,next)=>{
        const movies = await repository.getAllMovies();
        res.json(movies);
    })

    app.post('/movies',validateToken,validateAdmin,validateMovie,async(req,res,next)=>{
        const titulo = req.body.titulo;
        const sinopse = req.body.sinopse;
        const duracao = parseInt(req.body.duracao);
        const dataLancamento = new Date(req.body.dataLancamento);
        const imagem = req.body.imagem;
        const categoria = req.body.categoria;

        const result = await repository.addMovie({titulo,sinopse,duracao,dataLancamento,imagem,categoria})
        
        logger.info(`User ${res.locals.userID} already started at ${result._id} at ${new Date()}`)
        res.status(201).json(result);
    })

    app.delete('/movies/:id',validateToken,validateAdmin,async(req,res,next)=>{
        const id =  req.params.id;
        const result = await repository.deleteMovie(id);

        logger.info(`User ${res.locals.userId} already started at ${id} at ${new Date()}`);
        res.sendStatus(204);
    })
}