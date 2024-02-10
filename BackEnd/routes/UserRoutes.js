import express from 'express';

const userRouter = express.Router();

import UserControllers from '../controllers/UserControllers.js';

userRouter.post('/Register', UserControllers.RegisterUser);

userRouter.post('/UpdateRole', UserControllers.updateUserRole);

userRouter.post('/Login', UserControllers.LoginUser);

userRouter.get('/Logout', UserControllers.Logout);

userRouter.get('/checkLogin', UserControllers.checkLoggedIn)

userRouter.get('/getUsers', UserControllers.getUsers);

export default userRouter;