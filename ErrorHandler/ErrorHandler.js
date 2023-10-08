const constants=require('./constants')
const errorHandler=(err,req,res,next)=>{

   //if not status code then default 500
    const statuscode=res.statuscode ? res.statuscode :500;
    switch(statuscode){

        case constants.VALIDATION_ERROR:
            res.json({

                title:"validation failed",
                message:err.message,
                stackTrace:err.stack
            });
            break;
        case constants.NOT_FOUND:
            res.json({

                title:"NOT FOUND",
                message:err.message,
                stackTrace:err.stack
            });  
            break;

            case constants.FORBIDDEN:
                res.json({
    
                    title:"FORBIDDEN",
                    message:err.message,
                    stackTrace:err.stack
                });  
             break;       
            
            

    }


}

module.exports=errorHandler;