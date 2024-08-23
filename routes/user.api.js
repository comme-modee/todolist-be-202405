const express = require('express');
const userController = require('../controller/user.controller');
const router = express.Router();

router.post('/join', userController.createUser)

router.post('/login', userController.loginUser)

// router.put('/:id', (req, res) => {
//     res.send('update task');
// })

// router.delete('/:id', (req, res) => {
//     res.send('delete task');
// })

module.exports = router;