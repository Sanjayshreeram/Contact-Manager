const asyncHandler=require('express-async-handler');
const jwt=require('jsonwebtoken');

const validatetoken=asyncHandler(async(req,res,next)=>{


    let token;
    let authheader=req.headers.authorization;

    if(authheader && authheader.startsWith("Bearer"))
    {
        token=authheader.split(" ")[1];
        jwt.verify(token,process.env.ACCESS_TOKEN,(err,decoded)=>{

            if(err)
            {
                 res.status(401);
                 throw new Error('user is no authorized')
            }
            console.log({decoded});
            req.user=decoded.user;
            next();
        
        })
    }

   

    if(!token)
    {
        throw new Error('user is not authorized')
    }
})

module.exports=validatetoken;