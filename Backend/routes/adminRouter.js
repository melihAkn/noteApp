const router = require('express').Router();
const adminControllers = require("../controller/adminController");
const adminMW = require('../middleware/adminMW');

router.get('/',adminControllers.welcomeAboard);
//adminler ile ilgili islemler
//admin giris
router.post('/login',adminControllers.adminLogin);
//yeni admin kaydi
router.post('/register',adminControllers.adminRegister);


//kullanicilar ile ilgili islemler
//tum kullanicilari getirme
router.get('/getUsers',adminMW,adminControllers.getAllUser);
//parametrelere gor ekullanici getirme
router.get('/getUser',adminMW,adminControllers.getUser);
//kullanici silme
router.delete('/deleteUser',adminMW,adminControllers.deleteUser);
//tum kullanıcıları ve kullanıcıların notlarınıda silme
router.get('/deleteAllUser',adminMW,adminControllers.deleteAllUser);



module.exports = router; 

 