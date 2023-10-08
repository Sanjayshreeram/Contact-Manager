const mongoose=require('mongoose');
const express=require('express');
const errorHandler = require('./ErrorHandler/ErrorHandler');
const dotenv=require('dotenv').config();

const app=express();
const port=process.env.PORT || 5000;


mongoose.connect(process.env.MONGO_URL).then(()=>console.log("connected successfully")).catch((err)=>console.log(err.message))

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(errorHandler)
app.use('/contact',require('./routes/contactroute'))
app.use('/users',require('./routes/userroute'))
//errorhandler



app.listen(port,()=>{

    console.log('listening on port 5000..!')
})

 