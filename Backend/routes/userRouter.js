const router = require('express').Router();
const userControllers = require("../controller/userController");
const errorsMW = require('../middleware/errorsMW');
// user register
router.post('/signup',userControllers.signup);
// user login
router.post('/login',userControllers.login);
// user add note
router.post('/addNote',userControllers.userNotesAdd);
// user get note
router.get('/myNotes',userControllers.getMyNotes);
// user update own values
router.patch('/user',userControllers.updateUserInfos);

module.exports = router;

 
    
     