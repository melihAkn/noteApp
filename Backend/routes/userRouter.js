const router = require('express').Router();
const userControllers = require("../controller/userController");
const errorsMW = require('../middleware/errorsMW');
// user register
router.post('/signup',userControllers.signup,errorsMW);
// user login
router.post('/login',userControllers.login,errorsMW);
// user update own values
router.patch('/user',userControllers.updateUserInfos,errorsMW);


// user add note
router.post('/addNote',userControllers.userNotesAdd,errorsMW);
// user get note
router.get('/myNotes',userControllers.getMyNotes,errorsMW);
//user delete notes
router.delete('/myNotes',userControllers.userNotesDelete,errorsMW);
// user notes update
router.patch('/myNotes',userControllers.userNotesUpdate,errorsMW);
 




module.exports = router;

 
    
     