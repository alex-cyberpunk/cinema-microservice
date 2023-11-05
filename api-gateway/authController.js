const jwt = require('jsonwebtoken'); 

async function doLogin(req,res,next){
    const email = req.body.email;
    const password = req.body.password;

    if(email === 'alex.matias@usp.br'
    && password === '123456'){

        const token = jwt.sign({userId : 1},
            process.env.SECRET,{expiresIn:process.env.EXPIRES})//Passe poucas infos 
        res.json({token});    
    }
    else res.sendStatus(401);
}

async function doLogout(req,res,next){
    
}

module.exports={doLogin,doLogout};