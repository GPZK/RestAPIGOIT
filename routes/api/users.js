const express = require("express");
const { registerNewUser, loginUser } = require("../../service/usersService");
const { validateCredentials} = require('../../models/validation')

const usersRouter = express.Router();

usersRouter.post('/register', validateCredentials, registerNewUser)

usersRouter.get('/login', validateCredentials,  loginUser)

usersRouter.post('/logout', )

usersRouter.get('/current')

module.exports = {
    usersRouter
}