module.exports=(app,repository)=>{
    
    app.get('/movies/premieres',async(req,res,next)=>{
        const movies = await repository.getMoviePremieres();
        res.json(movies);
    })

    //Pode ser q nao retorne valr=ores e necessarios mais branchs
    app.get('/movies/:id',async(req,res,next)=>{
        const movies =  repository.getMovieById(req.params.id);
        if(!movies) return res.sendStatus(404);

        res.json(movies);
    })

    app.get('/movies',async(req,res,next)=>{
        const movies = repository.getAllMovies();
        res.json(movies);
    })
}