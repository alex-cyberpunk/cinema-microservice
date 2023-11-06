const schema = require('../schemas/movieSchema.js');
const jwt = require('jsonwebtoken')

const ADMIN_PROFILE = 1;

function validateMovie(req,res,next){
    const { error } = schema.validate(req.body);
    if(error){
        const { details } = error;
        return res.status(422).json(details.map(d=>d.message));
    }

    next();

}

async function validateToken(req,res,next){
    let token= req.headers['authorization'];
    token = token.replace('Bearer ', '');
    if(!token) return res.sendStatus(401); 
    
    try{
        console.log("o token e")
        console.log(token)
        const {userId,profileId}=jwt.verify(token,process.env.SECRET)
        res.locals.userId=userId;
        res.locals.profileId=profileId;
        next();
    }
    catch(err){
        console.log(err)
        res.sendStatus(401);
    }
    
}

function validateAdmin(req,res,next){
    const {profileId} = res.locals.profileId;
    if(profileId==ADMIN_PROFILE)
        next();
    else    
        res.sendStatus(403);
}

module.exports={
    validateMovie,
    validateToken,
    validateAdmin
}