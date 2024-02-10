import express from 'express';

import PermissionController from '../controllers/PermissionController.js';

const permissionRouter = express.Router();

permissionRouter.get('/getPermissions', PermissionController.getPermissions);

permissionRouter.post('/createPermission', PermissionController.createPermission);

export default permissionRouter;