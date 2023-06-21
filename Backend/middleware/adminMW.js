const jwt = require('jsonwebtoken');
const admin = require('../models/adminModel');


const isAdmin = async (req,res,next) =>{
    const token = jwt.verify(req.header('Authorization').replace('Bearer ',''),'secretKey');
    
    const idControl = await admin.find({_id:token._id});
    if(!idControl){
       return res.json({
        mesaj : "you are not registered!!!"
            
        });
    }
    next();
};
module.exports = isAdmin; 

 