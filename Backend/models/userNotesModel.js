const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const schema = mongoose.Schema;

const UserNotesSchema = new schema({
    note :{
        type : String,
        minlength : 1,
        required : true,

    },
    userName :{
        type : String,
        required : true,
        minlength : 3,
        maxlength :100,
       
    }
},{collection:'usernotes', timestamps: true});


const UserNotes = mongoose.model('UserNotes',UserNotesSchema);
module.exports = UserNotes;

