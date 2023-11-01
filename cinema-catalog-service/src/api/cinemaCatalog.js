module.exports=(app,repository)=>{
    app.get('/cities',async(req,res,next)=>{
        const cities = await repository.getAllCities();
        res.json(cities);
    })

    app.get('/cities/:cityId/movies',async(req,res,next)=>{
        const movies =  await repository.getMoviesByCityId(req.params.id);
        if(!movies) return res.sendStatus(404);

        res.json(movies);
    })

    app.get('/cities/:cityId/movies/:movieId',async(req,res,next)=>{
        const session =  await repository.getMovieSessionByCityId(req.params.id);
        if(!session) return res.sendStatus(404);

        res.json(session);
    })

    app.get('/cities/:cityId/cinemas',async(req,res,next)=>{
        const cinemas =  await repository.getAllCinemasByCityId(req.params.id);
        if(!cinemas) return res.sendStatus(404);

        res.json(cinemas);
    })

    app.get('/cities/:cinemasId/movies',async(req,res,next)=>{
        const movies =  await repository.getMoviesByCinemaId(req.params.id);
        if(!movies) return res.sendStatus(404);

        res.json(movies);
    })

    app.get('/cities/:cinemaId/movie/:movieId',async(req,res,next)=>{
        const session =  await repository.getMovieSessionByCinemaId(req.params.id);
        if(!session) return res.sendStatus(404);

        res.json(session);
    })

    
}