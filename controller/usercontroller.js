const asyncHandler=require('express-async-handler');
const User=require('../schema/usermodel');
const bcrypt=require('bcrypt');
const dotenv=require('dotenv').config();
const jwt=require('jsonwebtoken')


const loginuser=asyncHandler( async(req,res)=>{
    const {email,password}=req.body;

    if(!email ||!password)
    {
        res.status(400);
        throw new Error('All fields are mandatory');
    }
    const user= await User.findOne({email});
    if(!user)
    {
        res.status(400);
        throw new Error('NO user found please register');

    }
    //if password and hashed password match
    if(user && (await bcrypt.compare(password,user.password)) )
    {   //pass payload 
        //if match create a access token
       const accessToken=jwt.sign({

        user:{
            username:user.username,
            email:user.email,
            id:user.id
        }
       },process.env.ACCESS_TOKEN,
       {expiresIn:"10m"})
       res.status(200).json({accessToken})
    }
    else
    {
        res.status(400)
        throw new Error('password is not valid')

    }



    res.json({message:'login user'})



});

const registeruser=asyncHandler(async(req,res)=>{

    const {username,email,password}=req.body;

    if(!username||!email||!password)
    {
        res.status(400);
        throw new Error('All fields are mandatory')
    }

    const userAvailable= await User.findOne({email});
    //check if user already exists 
    if(userAvailable)
    {
        res.status(400);
        throw new Error('user already registered')
    }
    //hash password
    const hashedpassword=await bcrypt.hash(password,10);
    console.log({hashedpassword})
    const userinfo=await User.create(
        {
            username,
            email,
            password:hashedpassword
        }


    );

    if(userinfo)
    res.status(200).json({email,username})
else
{
    res.status(400)
    throw new Error('all fields are mandatory')
}
    console.log('user created successfully')


    //before creating new user decrypt the password using bcrypt




    res.json({message:'registered user'})


});

//cureent user info
//@access token is necessary 
const getcureentuser=asyncHandler(async(req,res)=>{


    res.json({message:'cureent user information'})
})


module.exports={loginuser,registeruser,getcureentuser};