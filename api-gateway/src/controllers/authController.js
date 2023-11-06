const jwt = require('jsonwebtoken'); 
const repository=require('../repository/repository.js')

async function doLogin(req,res,next){
    const email = req.body.email;
    const password = req.body.password;
    console.log(email)
    try{
        const user = await repository.getUser(email,password);
        console.log(user)
        const token = jwt.sign({userId:user._id , profileId: user.profileId},
            process.env.SECRET,
            {expiresIn:parseInt(process.env.EXPIRES)});
        
        res.json({token})    
    }

    catch(error){
        res.sendStatus(401);
    }
}

async function validateBlacklist(req,res,next){
    let token = req.headers['authorization'];
    if(!token) return next();

    token = token.replace('Bearer','');
    const isBlacklisted=await repository.checkBlacklisToken(token);

    if(isBlacklisted)
        return res.sendStatus(401);
    else
        next()
}


async function validateLoginSchema(req,res,next){
    const schema = require('../schema/login')
    console.log("amigo estou aqui")
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
    console.log(token);
    try{
        const {userId,profileId}=jwt.verify(token,process.env.SECRET)
        res.locals.userId=userId;
        res.locals.profileId=profileId;
        next();
    }
    catch(error){
        console.log(error)
        return res.sendStatus(401);
    }
    
}

async function doLogout(req,res,next){
    let token= req.headers['authorization'];
    token = token.replace('Bearer','');
    await repository.blacklisToken(token)
    return res.sendStatus(200);
}

module.exports={doLogin,doLogout,validateToken,validateLoginSchema,validateBlacklist};