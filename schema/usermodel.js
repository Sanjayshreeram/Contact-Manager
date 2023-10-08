const mongoose=require('mongoose');


const userschema=mongoose.Schema({

         username:{

            type:String,
            required:[true,"please provide username"]
         },
         email:{
            type:String,
            required:[true,"please provide email"],
            unique:[true,'Email address already taken']


         },
         password:{

            type:String,
            required:[true,'please add password']
         }



    
},
{
    timestamp:true,
}




)
module.exports=mongoose.model('User',userschema);