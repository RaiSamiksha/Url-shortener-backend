const express = require('express');
const { usersController } = require('../../controller');

const router = express.Router();

router.post('/signup', usersController.createUser); // Fixed method name
router.post('/login', usersController.loginUser);   // Fixed method name

module.exports = router;
