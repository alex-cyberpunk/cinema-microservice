const jwt = require('jsonwebtoken'); 

async function doLogin(req,res,next){
    const email = req.body.email;
    const password = req.body.password;

    if(email === 'alex.matias@usp.br'
    && password === '123456'){

        const token = jwt.sign({userId : 1},
            process.env.SECRET,{expiresIn:parseInt(process.env.EXPIRES)})//Passe poucas infos 
        res.json({token});    
    }
    else res.sendStatus(401);
}

async function validateToken(req,res,next){
    let token= req.headers['authorization'];
    token = token.replace('Beader','');
    try{
        const {userId}=jwt.verify(token,process.env.SECRET)
        res.locals.userId=userId;
        next();
    }
    catch(error){
        console.log(error)
        res.sendStatus(401);
    }
    
}

async function doLogout(req,res,next){
    res.send('Logout !')
}

module.exports={doLogin,doLogout,validateToken};