const express = require('express');
const { register, getAllUsers, delUser, edit1User, login } = require('../controller/userController');
const authorize = require('../middleware/authorize');
const router = express.Router(); 

router.post('/', register);

router.post('/login', login)

router.get('/allusers', getAllUsers)

router.delete('/del/:id',authorize(["Admin"]), delUser)

router.put('/edituser/:id', authorize(["Admin"]), edit1User)


module.exports = router;