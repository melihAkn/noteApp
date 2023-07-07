const router = require('express').Router();
const adminControllers = require("../controller/adminController");
const adminMW = require('../middleware/adminMW');
const errorsMW = require('../middleware/errorsMW');
router.get('/',errorsMW,adminControllers.welcomeAboard);
//adminler ile ilgili islemler
//admin giris
router.post('/login',errorsMW,adminControllers.adminLogin);
//yeni admin kaydi
router.post('/register',errorsMW,adminControllers.adminRegister);


//kullanicilar ile ilgili islemler
//tum kullanicilari getirme
router.get('/getUsers',adminMW,errorsMW,adminControllers.getAllUser);
//parametrelere gor ekullanici getirme
router.get('/getUser',adminMW,errorsMW,adminControllers.getUser);
//kullanici silme
router.delete('/deleteUser',adminMW,errorsMW,adminControllers.deleteUser);
//tum kullanıcıları ve kullanıcıların notlarınıda silme
router.get('/deleteAllUser',adminMW,errorsMW,adminControllers.deleteAllUser);



module.exports = router; 

 