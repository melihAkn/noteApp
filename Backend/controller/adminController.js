const UserModel = require('../models/userModel');
const UserNotesModel = require('../models/userNotesModel');
const AdminModel = require('../models/adminModel');

const welcomeAboard = async (req,res) =>{
    res.json({message : "welcome"});
}

//admin login
const adminLogin = async (req,res) =>{
    responseMessage = {
        token : "",
        userName : "",
        message : ""
    }
    try {
        const login = await AdminModel.adminLogin(req.body.userName , req.body.password);
        const token = await login.generateToken();
        responseMessage.token = token;
        responseMessage.userName =req.body.userName;
        responseMessage.message ="you were succesfully login";
        res.json(responseMessage);
    } catch (error) {
        res.json({
            hata : error,
        })
    }
}
//new admin register
const adminRegister = async (req,res) =>{
    const insertedAdmin = new AdminModel(req.body);
    const result = await insertedAdmin.save();
    res.json(result);
}

// user proccess
const getAllUser = async (req,res) =>{
    const filter ={};
    const getUser = await UserModel.find(filter);
    console.log(getUser.length);
    res.send(getUser);
}
const getUser = async(req,res)=>{
    const filter = {
        userName : req.body.userName
    }
    responseMessage = {
        message : "",
        user : []
    }
    const findUser = await UserModel.find(filter);
    if(!findUser){
        responseMessage.message = `${req.body.userName} this username not registered`;
    }
    else{
        responseMessage.message = `${req.body.userName}  this named user succesfully get`;
        responseMessage.user.push(findUser);
    }
 res.json(responseMessage);
}
//if all users was deleted will delete usernotes
const deleteAllUser = async (req,res) =>{
    await UserModel.deleteMany({});
    await UserNotesModel.deleteMany({});
    res.json({message : "all user and notes was deleted"})
}
//kullanıcı silinirse kullanicinin notuda silinmeli
const deleteUser = async (req,res) =>{
    const filter = {
        $or: [
            { email: req.body.userName },
            { userName: req.body.userName }
          ],
      };
      responseMessage = {
        message :"",
        userName :"",
      }
      const findUser = await UserModel.find(filter);
      console.log(findUser);
      if(findUser.length !==0){
        await UserModel.deleteOne(filter);
        responseMessage.userName =findUser.userName;
        await UserNotesModel.deleteMany(findUser.userName);
        responseMessage.message =` ${req.body.userName}  this named user and user note was deleted`;
      }
      else{
        responseMessage.message =`${req.body.userName}  this named doesnt find`;
      }
      res.json(responseMessage.message);
}






 
module.exports={
    welcomeAboard,
    adminRegister,
    adminLogin,
    getUser,
    getAllUser,
    deleteUser,
    deleteAllUser, 
}
 