const validationMiddleware= require('../middlewares/validationMiddleware.js')

module.exports=(app,repository)=>{
    
    app.get('/movies/premieres',async(req,res,next)=>{
        const movies = await repository.getMoviesPremieres();
        res.json(movies);
    })

    //Pode ser q nao retorne valr=ores e necessarios mais branchs
    app.get('/movies/:id',async(req,res,next)=>{
        const movie =  await repository.getMovieById(req.params.id);
        console.log(movie);
        if(!movie) return res.sendStatus(404);

        res.json(movie);
    })

    app.get('/movies',async(req,res,next)=>{
        const movies = await repository.getAllMovies();
        res.json(movies);
    })

    app.post('/movies',validationMiddleware.validateMovie,async(req,res,next)=>{
        const titulo = req.body.titulo;
        const sinopse = req.body.sinopse;
        const duracao = parseInt(req.body.duracao);
        const dataLancamento = new Date(req.body.dataLancamento);
        const imagem = req.body.imagem;
        const categoria = req.body.categoria;

        const result = await repository.addMovie({titulo,sinopse,duracao,dataLancamento,imagem,categoria})
        res.status(201).json(result);
    })

    app.delete('/movies/:id',async(req,res,next)=>{
        const id =  req.params.id;
        const result = await repository.deleteMovie(id);
        res.sendStatus(204);
    })
}