const UserModel = require("../models/userModel");
const UserNotesModel = require("../models/userNotesModel");
const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const fileProc =require("../fileProc/fileWrite");

const getDateAndWriteLogFile = (userName,message) =>{
    const now = new Date();
    const formattedDate = now.toLocaleDateString(); // YYYY-AA-GG 
    const formattedTime = now.toLocaleTimeString(); // SS:DD:SS 
    fileProc(`${userName} named user  ${formattedDate+" "+formattedTime} at date  ${message}`);
}
/*
if user get request createdAt updatedAt id --v like we dont want to user's saw this
 unexpected data
    delete req.body.createdAt;
    delete req.body.updatedAt;
*/
const signup = async (req,res,next) =>{
    responseMessage ={
        message : ""
    }
    try {
        const insertedUser = new UserModel(req.body);
        const result = await  insertedUser.save();
        if(result){
            responseMessage.message ="succesfully register";
        }
        getDateAndWriteLogFile(req.body.userName,responseMessage.message);
        res.json(responseMessage.message);
    } catch (error) {
        console.log(error);
    }
}
const login = async (req,res) =>{
    try{
        let responseMessage ={
            message : "",
            token : "",
        }
        // if email or password is empty 
        if(req.body.email === '' || req.body.password === ''){
            res.json("input cant be equal empty");
            return
        }
        const user = await UserModel.login(req.body.email , req.body.password);
        if(user.name){
            const token = await user.generateToken();
            responseMessage.token = token;
            responseMessage.message ="succesfully login";
            getDateAndWriteLogFile(req.body.email,responseMessage.message);
            

        }
        else{
            responseMessage.message = "email/username or password wrong";
        }
        res.json(responseMessage);
       }    
       catch(error){
        console.log(error)
       }   
}
//user notes proccess
const userNotesAdd = async (req,res) =>{
    try{
        responseMessage ={
            userName :"",
            note : "",
            message : ""
        }
        const jwtResult = jwt.verify(req.header('Authorization').replace('Bearer ',''), 'secretKey');
        const  findUser = await UserModel.findById({_id : jwtResult._id});
        const insertedUserNote = new UserNotesModel(req.body);
        insertedUserNote.userName = findUser.userName;
        await insertedUserNote.save();
        responseMessage ={userName :insertedUserNote.userName, note : req.body.note, message :"note was succesfully inserted"};
        getDateAndWriteLogFile(insertedUserNote.userName,responseMessage.message);
        res.json(responseMessage);
    }catch(err){
        res.send({
            hata : err
        });
    }
}

const userNotesDelete = async (req,res) => {
    try {
        responseMessage ={
            userName :"",
            note : "",
            message : ""
        }
        const jwtResult = jwt.verify(req.header('Authorization').replace('Bearer ',''), 'secretKey');
        const  findUser = await UserModel.findById({_id : jwtResult._id});

        const findUserNote = await UserNotesModel.find({note : req.body.note});
        if(findUserNote.length > 0){
            await UserNotesModel.deleteOne({note:req.body.note});
            responseMessage ={userName :findUser.userName, note : req.body.note, message :"note was succesfully deleted"};
            getDateAndWriteLogFile(findUser.userName,responseMessage.message);
        }
        else{
            responseMessage ={userName :findUser.userName, note : req.body.note, message :"this note not exist"};
        }
        res.json(responseMessage);

    } catch (error) {
        res.send({
            hata : err
        });
    }


}


const userNotesUpdate = async (req,res) => {
    try {
        responseMessage ={
            userName :"",
            note : "",
            message : ""
        }
        const jwtResult = jwt.verify(req.header('Authorization').replace('Bearer ',''), 'secretKey');
        const  findUser = await UserModel.findById({_id : jwtResult._id});

        const findUserNote = await UserNotesModel.find({userName : findUser.userName});
        if(findUserNote.length > 0){
            await UserNotesModel.updateOne({note:req.body.note}); 
            responseMessage ={userName :findUser.userName, note : req.body.note, message :"note was succesfully updated"};
            getDateAndWriteLogFile(findUser.userName,responseMessage.message);
        }
        else{
            responseMessage ={userName :findUser.userName, note : req.body.note, message :"this note not exist"};
        }
        res.json(responseMessage);
    } catch (error) {
        res.send({
            hata : err
        });
    }

}

const getMyNotes = async (req,res) => {
    try{
        responseMessage ={
            notes :[],
        }
        //  jwt verify and id values database control
        // find user and get user notes
        const jwtResult = jwt.verify(req.header('Authorization').replace('Bearer ',''), 'secretKey');
        const findUser = await UserModel.findById({_id : jwtResult._id});
        const userNotes = await UserNotesModel.find({userName : findUser.userName});
        userNotes.forEach(e => {
            responseMessage.notes.push(e.note);
        });
        getDateAndWriteLogFile(findUser.userName,"get all notes");
        res.json(responseMessage)
    }catch(err){
        console.log(err);
        res.send({
            hata : err
        });
    }
}
const updateUserInfos = async (req,res) =>{
    responseMessage ={
        message :"",
    }
    try {
        const jwtResult = jwt.verify(req.header('Authorization').replace('Bearer ',''), 'secretKey');
        const oldUserName = await UserModel.findById({_id : jwtResult._id});
        await UserModel.findOneAndUpdate({_id : jwtResult._id},
            req.body,
            {new:true,runValidators:true , useFindAndModify:false});
                // if user was updated userName and usernotes table updated userName
                if(req.body.userName){
                    try {
                        await UserNotesModel.updateMany({userName : oldUserName.userName},
                            {
                                userName :req.body.userName
                            })
                            responseMessage.message =`this ${oldUserName.userName} old username updated ${req.body.userName} and notes table username was updated`
                    } catch (error) {
                        console.log(error);
                    }
                }
                getDateAndWriteLogFile(oldUserName.userName,"updated own infos");
                res.json(responseMessage);  
    } catch (error) {
        console.log(error);
    }
};
module.exports = {
    signup,
    login,
    userNotesAdd,
    getMyNotes,
    updateUserInfos,
    userNotesDelete,
    userNotesUpdate
}
