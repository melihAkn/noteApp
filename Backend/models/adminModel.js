const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const schema = mongoose.Schema;

const adminSchema  = new schema ({
    userName :{
        type : String,
        minlength : 3,
        required : true,
        trim : true,
        unique : true
    },
    password : {
        type : String,
        minlength : 8,
        requrired : true,
        trim : true,

    },
    isadmin : {
        type : Boolean,
        default : true,

    }

},{collection :'admin' ,timestamps : true});

adminSchema.methods.generateToken = async function(){
    const loginnedAdmin = this;
    const token = await jwt.sign({_id:loginnedAdmin._id,isadmin:loginnedAdmin.isadmin},
        'secretKey',{expiresIn:'1h'});
    return token;
}

adminSchema.statics.adminLogin = async (userName , password) => {
    
    const filter ={
        userName,
        password
    }
    const adminControl = await Admin.findOne(filter); 
    if(!adminControl){
       return {
        hata : "username or password is wrong"
       }

    }
        return adminControl;
}





const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;




