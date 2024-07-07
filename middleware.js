const jwt=require('jsonwebtoken');

module.exports=function(req,res,next){
    try{
        let token=req.header('X-token');
        if(!token){
            return res.status(400).send('Token not Found');
        }
        let decoded=jwt.verify(token,'jwtPassword');
        req.user=decoded.user;
        next();
    }
    catch(err){
        console.log(err);
        return res.json.status(400).send('Authentication Error')
    }
}

// We need to verify the token as soon as user enters the data in db

