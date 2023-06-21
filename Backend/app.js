//project start
const express = require('express');
//Error class for potential errors
const createError = require('http-errors');
const errors =require('./middleware/errorsMW');
//get route files
const userRouter = require('./routes/userRouter');
const adminRouter = require('./routes/adminRouter');
const indexRouter = require('./routes/indexRouter');
//mongoose
const mongoose = require('mongoose');
//db connection
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/noteTaken',{useNewUrlParser: true,useUnifiedTopology: true}).then(_ => console.log("baglanti basarili"));
}
//app start
const app = express();
app.use(express.urlencoded({ extended:false}));
app.use(express.json());
app.use(express.static('public')); 
//errors
app.use(errors);
//routes
app.use('/users',userRouter);
app.use('/admin',adminRouter); 
app.use('/',indexRouter);




app.listen('3000', _ => {
    console.log('server start');  
});  


 