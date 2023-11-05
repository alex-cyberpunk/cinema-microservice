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
    token = token.replace('Beader','');
    try{
        const {userId}=jwt.verify(token,process.env.SECRET)
        res.locals.userId=userId;
        res.locals.profileId=profileId;
        next();
    }
    catch(error){
        console.log(error)
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
    validateToken
}