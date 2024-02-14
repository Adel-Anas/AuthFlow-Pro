import express from 'express';

const userRouter = express.Router();

import UserControllers from '../controllers/UserControllers.js';

userRouter.post('/Register', UserControllers.RegisterUser);

userRouter.put('/UpdateRole', UserControllers.updateUserRole);

userRouter.post('/Login', UserControllers.LoginUser);

userRouter.get('/checkLogin', UserControllers.checkLoggedIn)

userRouter.get('/getUsers', UserControllers.getUsers);

userRouter.delete('/deleteUser/:id', UserControllers.deleteUser)

export default userRouter;