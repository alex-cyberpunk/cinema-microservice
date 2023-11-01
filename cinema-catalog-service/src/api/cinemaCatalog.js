module.exports=(app,repository)=>{
    
    app.get('/cities/:cityId/movies',async(req,res,next)=>{
        const movies =  await repository.getMoviesByCityId(req.params.cityId);
        if(!movies) return res.sendStatus(404);
        //console.log(req.params.cityId)
        res.json(movies);
    })

    app.get('/cities/:cityId/movies/:movieId',async(req,res,next)=>{
        const session =  await repository.getMovieSessionByCityId(req.params.movieId,req.params.cityId);
        if(!session) return res.sendStatus(404);

        res.json(session);
    })

    app.get('/cities/:cityId/cinemas',async(req,res,next)=>{
        const cinemas =  await repository.getAllCinemasByCityId(req.params.cityId);
        if(!cinemas) return res.sendStatus(404);

        res.json(cinemas);
    })

    app.get('/cities',async(req,res,next)=>{
        const cities = await repository.getAllCities();
        res.json(cities);
    })
    
    //rotas de cinema
    app.get('/cinemas/:cinemaId/movies/:movieId',async(req,res,next)=>{
        const session =  await repository.getMovieSessionByCinemaId(req.params.movieId,req.params.cinemaId);
        if(!session) return res.sendStatus(404);

        res.json(session);
    })
    app.get('/cinemas/:cinemaId/movies',async(req,res,next)=>{
        const cinemas =  await repository.getAllCinemasByCityId(req.params.cinemaId);
        if(!cinemas) return res.sendStatus(404);

        res.json(cinemas);
    })

    

    
}