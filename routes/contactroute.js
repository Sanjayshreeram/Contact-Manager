const express=require('express');
const router=express.Router();
const validateToken=require('../middleware/validatetoken');
router.use(validateToken);

const {getcontact,createcontact,updatecontact,deletecontact,getsepcificcontact}=require('../controller/contactcontroller')
//get all contacts
router.route("/").get(getcontact);
//post contact // create coonact
router.route("/").post(createcontact)

//get specific conact
router.route("/:id").get(getsepcificcontact)

//put  update conatact
router.route("/:id").put(updatecontact)

//conatact delete

router.route("/:id").delete(deletecontact)


module.exports=router;