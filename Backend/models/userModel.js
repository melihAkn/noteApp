const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const schema = mongoose.Schema;
const UserSchema = new schema ({
    name:{
        type : String,
        required : true,
        trim : true,
        maxlength : 50,
        minlength : 3,
    },
    surName:{
        type : String,
        required : true,
        trim : true,
        maxlength : 50,
        minlength : 3,
    },
    email:{
        type : String,
        required : true,
        trim : true,
        maxlength : 50,
        minlength : 8,
        unique : true
    },
    userName:{
        type : String,
        required : true,
        trim : true,
        maxlength : 50,
        minlength : 5,
        unique : true
    },
    password:{
        type : String,
        required : true,
        trim : true,
        maxlength : 50,
        minlength : 8,
    },
},{collection:'users', timestamps: true});
UserSchema.methods.generateToken = async function(){
    const loginUser = this;
    const token = await jwt.sign({_id:loginUser._id},
        'secretKey',{expiresIn:'1h'});
    return token;
}
UserSchema.statics.login = async (email , password) => {
    const filter = {
        $or: [
            { email: email },
            { userName: email }
          ],
        password: password
      };
    const userFind = await User.findOne(filter);
    if(!userFind){
       return {
        hata : "email/username or password is wrong"
       }
    }
        return userFind;
}
const User = mongoose.model('User', UserSchema);
module.exports = User;





