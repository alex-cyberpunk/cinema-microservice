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
}