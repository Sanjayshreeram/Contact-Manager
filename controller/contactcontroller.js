const asyncHandler=require('express-async-handler');
const   Contact=require('../schema/contactmodel')
const getcontact=asyncHandler( async (req,res) =>{
   try{

    const contacts= await Contact.find({user_id:req.user_id})


    res.json({contacts})
   }
    catch(error){

        console.log(error.message);


    }

    
})


const createcontact=asyncHandler(async (req,res) =>{

    const {name,email,phone}=req.body
    if(!name ||!email|| !phone )
    {  res.status(404 );

        throw new Error('all fields are mandatory')
        

    }
    const contact=await Contact.create({
        name,
        email,
        phone,
        user_id:req.user.id
    })
    res.status(200).json(contact)
})

const updatecontact=asyncHandler(async (req,res) =>{

    const {id}=req.params;

    const contact=await Contact.findByIdAndUpdate(

        id,
        req.body,
        {new:true}

    )

    

    res.send(contact)
} )

const getsepcificcontact=asyncHandler(async(req,res)=>{

    const {id}=req.params;


    

    const contact=await Contact.findById(id);
    if(!contact)
    {
        res.status(400)
        console.log('user not found ')
    }
    else
    res.json({contact});



})

const deletecontact = asyncHandler(async (req, res) => {
    
  
    const contact = await Contact.findById(req.params.id);
    
    if (!contact) {
      // Handle the case where the contact with the given ID is not found.
      return res.status(404).json({ message: 'Contact not found' });
    }
  
    await contact.remove();
    
    res.json({ message: 'Contact deleted successfully' });
  });
  

module.exports={getcontact,createcontact,updatecontact,deletecontact,getsepcificcontact}