const express=require('express');
const router=express.Router();
const {loginuser,registeruser,getcureentuser}=require('../controller/usercontroller');
const validatetoken = require('../middleware/validatetoken');





router.post('/login',loginuser);


// router.post('/register',(req,res)=>{


//     res.json({message:'registered user'})
// });

router.post('/register',registeruser);



router.get('/current',validatetoken,getcureentuser);

module.exports=router;